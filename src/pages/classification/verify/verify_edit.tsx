import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Classify,
  setClearClassify,
} from "@/Store/Reducer/ClassificationSlice";
import IconService from "@/utils/Icons";
import { BASE_URL } from "@/utils/HTTP";
import Table from "@/components/tables/ClassifyTable";
import ImageShow from "@/components/ImageShow";
import Image from "next/image";
import { Dimensions, TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import CommonHeader from "@/components/Common/Header";
import Raise_Ticket from "@/components/modals/Raise_Ticket";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
interface Item {
  flags: {
    do_classify: boolean;
  };
  image_url: string;
  confidence_status?: boolean;
}

interface Result {
  results: Item[];
}

interface Classify {
  items: Result[];
}

const Index = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [dimensions, setDimensions] = useState<Dimensions>({
    height: null,
    width: null,
  });
  const {
    classify,
    verifyUrl,
    indexSelected,
    active_page_num,
    document_imageURLID,
  } = useSelector(({ ClassificationSlice }) => ClassificationSlice);
  const [image1, setImage1] = useState<string>("");
  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setImage1(`${BASE_URL}/media/pages/${verifyUrl}`);
  }, [verifyUrl]);

  const setImage = async (imgPreviw: string) => {
    if (typeof window !== "undefined" && imgPreviw) {
      setImage1(`${BASE_URL}/media/pages/${verifyUrl}`);
    }
  };

  const columns: TableColumn[] = [
    {
      Header: "No.",
      accessor: "page_name",

      Cell: (column) => {
        return <div>{`${parseInt(column?.row?.original?.page_name) + 1}`}</div>;
      },
    },
    {
      Header: "Document Name",
      accessor: "document_name",
      sort: true,
    },
    {
      Header: "Confidence",
      accessor: "confidence",
      sort: true,
      Cell: (column) => {
        return (
          <div onClick={() => setImage(column?.row?.original?.image_url)}>
            {column?.row?.original?.confidence}{" "}
          </div>
        );
      },
    },
    {
      Header: "Status",
      accessor: "status", // accessor
      sort: true,
      Cell: (column) => {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={
              !column?.row?.original?.flags?.do_classify
                ? IconService.check.src
                : column?.row?.original?.confidence_status
                ? IconService.check.src
                : IconService.question_red.src
            }
            alt="ss"
          />
        );
      },
    },
  ];

  // const calculatePercentage = (
  //   value: string | null,
  //   percentage: number
  // ): string | null => {
  //   if (value === null) {
  //     return null;
  //   }
  //   const currentValue = parseFloat(value);
  //   const newValue = Math.round((currentValue * percentage) / 100);

  //   // Limit the zoom levels between 100% and 200%
  //   return Math.min(Math.max(newValue, 100), 200) + "%";
  // };
  // const handleZoomIn = () => {
  //   setDimensions((prevDimensions) => {
  //     const newHeight = calculatePercentage(prevDimensions.height, 110);
  //     const newWidth = calculatePercentage(prevDimensions.width, 110);
  //     return {
  //       height: newHeight,
  //       width: newWidth,
  //     };
  //   });
  // };
  // const handleZoomOut = () => {
  //   setDimensions((prevDimensions) => {
  //     const newHeight = calculatePercentage(prevDimensions.height, 90);
  //     const newWidth = calculatePercentage(prevDimensions.width, 90);
  //     return {
  //       height: newHeight,
  //       width: newWidth,
  //     };
  //   });
  // };

  //zoom value changes here
  const [stageScale, setStageScale] = useState(0.32);
  //moved image right till 90
  //Indicate to gitrepo line 148 for changes are added
  const [stageX, setStageX] = useState(90);
  const [stageY, setStageY] = useState(0);

  const handleZoomIn = () => {
    const scaleBy = 1.2;
    const newScale = stageScale * scaleBy;

    if (newScale <= 2) {
      setStageScale(newScale);
    } else {
      setStageScale(2);
    }
  };

  const handleZoomOut = () => {
    const scaleBy = 1.2;
    const newScale = stageScale / scaleBy;

    if (newScale >= 0.2) {
      setStageScale(newScale);
    } else {
      setStageScale(0.2);
    }
  };

  const handleReset = () => {
    setStageScale(0.32);
    setStageX(0);
    setStageY(0);
  };
  const calculatePercentage = useMemo(() => {
    let percentage: any = (stageScale * 100).toFixed(2);
    // percentage = Math.max(100, Math.min(200, percentage)); // Clamp the value between 100 and 200
    return `${percentage}%`;
  }, [stageScale]);

  // useEffect(() => {
  //   dispatch(Classify());
  // }, [dispatch]);

  const [seconds, setSeconds] = useState<any>();

  const [intigateApi, setintigateApi] = useState(false);
  useEffect(() => {
    if (intigateApi) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          dispatch(Classify()).then((res) => {
            if (!res?.payload?.items?.length) {
              setSeconds(20);
              setintigateApi(true);
            } else {
              setintigateApi(false);
            }
          });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
    return () => dispatch(setClearClassify());
  }, [dispatch, seconds, intigateApi]);

  useEffect(() => {
    if (!intigateApi) {
      dispatch(Classify()).then((res) => {
        if (!res?.payload?.items?.length) {
          setintigateApi(true);
        } else {
          setintigateApi(false);
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // ;
      if (event.ctrlKey) {
        switch (event.keyCode) {
          case 187:
            event.preventDefault();
            handleZoomIn();
            break;
          case 189:
            event.preventDefault();
            handleZoomOut();
            break;
          default:
            break;
        }
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        setRejectOpen(true);
      } else if (event.ctrlKey && event.key === "r") {
        event.preventDefault();
        setOpen(true);
      }
    };

    // document.addEventListener("keydown", handleKeyPress);

    return () => {
      // document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const [divWidth, setDivWidth] = useState(0);
  const [isZoom, setIsZoom] = useState(false);
  const batchListRef = useRef<any>(null);
  const { isSidebarOpen } = useSelector(({ CommonSlice }) => CommonSlice);

  useEffect(() => {
    const updateDivWidth = () => {
      if (batchListRef.current) {
        const boundingBox = batchListRef.current.getBoundingClientRect();

        setDivWidth(batchListRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateDivWidth);
    updateDivWidth(); // Initial measurement

    return () => {
      window.removeEventListener("resize", updateDivWidth);
    };
  }, [batchListRef, isSidebarOpen]);

  var browserZoomLevel: any =
    typeof window !== "undefined" && Math.round(window.devicePixelRatio * 100);

  useEffect(() => {
    if (browserZoomLevel > 100) {
      // alert("Desired view will be at 100%");
      setIsZoom(true);
    } else {
      setIsZoom(false);
    }
  }, [browserZoomLevel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <CommonHeader
        handleRaiseTicket={() => setOpen(true)}
        handleReject={() => setRejectOpen(true)}
        nobatchavailable={!classify?.items[0]?.results?.length ? true : false}
      />
      {isZoom && (
        <div className="zoom-div">
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <VerifiedOutlinedIcon style={{ fontSize: "1rem" }} />
            <p className="text-[10px]">
              For the best GlyphX experience, set your display to 100%
              resolution{" "}
            </p>{" "}
            <a
              href="https://support.microsoft.com/en-us/windows/view-display-settings-in-windows-37f0e05e-98a9-474c-317a-e85422daa8bb#WindowsVersion=Windows_11"
              target="_blank"
              style={{ color: "#ffffff" }}
            >
              <Typography
                textAlign="center"
                style={{
                  fontSize: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Configure Display
              </Typography>
            </a>
          </div>
          <div onClick={() => setIsZoom(false)}>
            <CloseIcon style={{ fontSize: "1rem", marginTop: "5px" }} />
          </div>
        </div>
      )}
      {!classify?.items[0]?.results?.length ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-y-4">
              <Typography
                variant="h4"
                color="text.secondary"
                textAlign="center"
              >
                Reloading Page in {!seconds ? "20" : seconds} Seconds . . .
              </Typography>
              <Typography
                variant="h1"
                color="text.secondary"
                textAlign="center"
              >
                No more batches to verify. Try after some time.
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div className="classifincation-main-layout-section">
          <Card
            variant="outlined"
            className=" max-[1400px]:mt-2 p-4  list-edit-section"
          >
            <div className="p-2 max-[1400px]:p-2 flex gap-x-6 justify-between">
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2">
                  <Typography variant="subtitle1" color="text.secondary.light" className="text-sm">
                    Total Pages:
                  </Typography>
                  <Typography variant="h2" className="text-gradient text-sm" >
                    {classify?.items[0]?.results
                      ? classify?.items[0]?.results?.length
                      : "00"}
                  </Typography>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Typography variant="subtitle1" color="text.secondary.light" className="text-sm">
                    Require Verification Pages:
                  </Typography>
                  <Typography variant="h2" className="text-gradient text-sm">
                    {classify?.items[0]?.results
                      ? classify?.items[0]?.results.filter((item: Item) => {
                          if (
                            !item?.confidence_status &&
                            item?.flags?.do_classify
                          ) {
                            return item;
                          }
                        }).length
                      : "00"}
                  </Typography>
                </div>
                <div className="flex flex-col gap-y-2">
                  <Typography variant="subtitle1" color="text.secondary.light" className="text-sm">
                    Form Name:
                  </Typography>
                  <Typography variant="h2" className="text-gradient text-sm">
                    {classify?.items[0]?.form_num}
                  </Typography>
                  <Typography variant="h2" color="text.secondary"></Typography>
                </div>
              </div>
              <div className="flex gap-x-10">
                <div className="flex flex-col gap-y-2">
                  <Typography variant="subtitle1" color="text.secondary.light" className="text-sm">
                    Threshold Confidence:
                  </Typography>
                  <Typography variant="h2" className="text-gradient text-sm">
                    40
                  </Typography>
                </div>
              </div>
              <div className="pdf-controls gap-2">
                <Typography variant="subtitle1" className="zoom ">
                  Zoom {calculatePercentage}
                </Typography>
                <button
                  className="zoom-btns cursor-pointer"
                  onClick={handleZoomOut}
                  disabled={dimensions?.width === "100%"}
                >
                  <Image src={IconService.ZoomOutIcon} alt="zoomout" />
                </button>
                <button
                  className="zoom-btns cursor-pointer"
                  onClick={handleZoomIn}
                  disabled={dimensions?.width == "200%"}
                >
                  <Image src={IconService.ZoomInIcon} alt="zoomin" />
                </button>
                <button
                  className="reset-btn cursor-pointer"
                  onClick={() => handleReset()}
                >
                  <Image src={IconService.ResetIcon} alt="reset" />
                </button>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-3 gap-x-1">
                <div>
                  {classify?.items[0]?.results && (
                    <>
                      <Table
                        columns={columns}
                        rejectOpen={rejectOpen}
                        setRejectOpen={setRejectOpen}
                        setintigateApi={setintigateApi}
                        data={
                          classify?.items[0]?.results &&
                          classify?.items[0]?.results
                        }
                        handleReset={() => handleReset()}
                      />
                    </>
                  )}
                </div>
                <div
                  className="col-span-2 batchlist-main h-full"
                  ref={batchListRef}
                >
                  <div className="flex flex-row justify-center gap-4 p-3">
                    <Typography variant="h5">
                      {active_page_num?.document_name}
                    </Typography>

                    <Typography variant="h5">
                      {active_page_num?.confidence}
                    </Typography>
                  </div>

                  <div className="batchlist-sub ">
                    <div className="" id="imageContainer">
                      {Object.values(document_imageURLID)[0] ? (
                        <div
                          className={
                            Object.values(document_imageURLID)[0]
                              ? "visible"
                              : "hidden"
                          }
                        >
                          <ImageShow
                            url={`${BASE_URL}/media/pages/${
                              Object.values(document_imageURLID)[0]
                            }`}
                            stageScale={stageScale}
                            setStageScale={setStageScale}
                            stageX={stageX}
                            setStageX={setStageX}
                            stageY={stageY}
                            setStageY={setStageY}
                            divWidth={divWidth}
                          />
                        </div>
                      ) : (
                        <>
                          {classify?.items[0]?.results
                            ?.filter((item: any) => item.flags.do_classify)
                            .map((item1: any, i: any) => {
                              return (
                                <div
                                  className={
                                    indexSelected !== i ? "hidden" : "visible"
                                  }
                                  key={i}
                                >
                                  <ImageShow
                                    url={`${BASE_URL}/media/pages/${item1.image_url}`}
                                    stageScale={stageScale}
                                    setStageScale={setStageScale}
                                    stageX={stageX}
                                    setStageX={setStageX}
                                    stageY={stageY}
                                    setStageY={setStageY}
                                    divWidth={divWidth}
                                  />
                                </div>
                              );
                            })}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Raise_Ticket
        isExtraction={false}
        open={open}
        handleClose={() => setOpen(false)}
        onSubmitToClose={() => setOpen(false)}
      />
      <div ref={bottomRef}></div>
    </>
  );
};

export default Index;
