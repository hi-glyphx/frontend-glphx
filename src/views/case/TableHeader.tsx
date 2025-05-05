import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
} from "@mui/material";

import React, { useContext } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";
import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";
import AddFileLink from "@/components/Common/AddFileLink";
import { SimpleCtx } from "@/components/Common/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  CaseDetailById,
  CaseDownload,
  CaseDownloadReqest,
  CaseList,
  FormDownload,
  MarkAsProcessedform,
  caseAbortProcessingForm,
  caseFormReprocess,
  caseReprocess,
  deleteCase,
  deleteFormCase,
} from "@/Store/Reducer/CaseSlice";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { downloadURI } from "@/utils/Functions";
import { BASE_URL } from "@/utils/HTTP";
import { useRouter } from "next/router";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import moment from "moment";

interface CaseData {
  case_id?: string;
  case_num?: string;
  team_id?: string;
  team?: string;
  documents?: any[]; // You can replace 'any[]' with a specific type if needed
  created?: string;
  completed?: string | null;
  processed?: boolean;
  template?: string;
  is_processing?: boolean;
  length?: string | undefined;
}

interface TYPE {
  isAddButton?: boolean;
  data: CaseData[];
  serachFunction?: (e: string) => void;
  dateTimeFilter?: (e: DateFiler[]) => void;
  tableHeader?: TableColumn[];
}

export default function TableHeader({
  isAddButton,
  data,
  serachFunction,
  tableHeader,
}: TYPE) {
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  // const onDeleteCase = () => {
  //   selectedData?.tableSelectedData &&
  //     selectedData?.tableSelectedData?.map((item) => {
  //       dispatch(deleteCase(item?.original?.case_id)).then((res) => {
  //         if (res) {
  //           dispatch(CaseList(`?page=1`));
  //         }
  //       });
  //     });
  // };

  const onDeleteCase = () => {
    const deletePromises = selectedData?.tableSelectedData?.map((item) => {
      return dispatch(deleteCase(item?.original?.case_id)).then((res) => {
        return res;
      });
    });

    Promise.all(deletePromises)
      .then((results) => {
        const allSuccessful = results.every((res) => res);

        if (allSuccessful) {
          dispatch(CaseList("?page=1"));
        } else {
          console.log("some console message");
        }
      })
      .catch((error) => {
        console.log("some console message");
      });
  };

  const onDeleteFormCase = () => {
    const deletePromises = selectedData?.tableSelectedData?.map((item) => {
      return dispatch(deleteFormCase(item?.original?.form_id)).then((res) => {
        return res;
      });
    });

    Promise.all(deletePromises)
      .then((results) => {
        const allSuccessful = results.every((res) => res);

        if (allSuccessful) {
          dispatch(CaseDetailById(id));
        } else {
          console.log("some console message");
        }
      })
      .catch((error) => {
        console.log("some console message");
      });
  };

  const markAsProcessed = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(MarkAsProcessedform(item?.original?.form_id));
        // .then((res) => {
        //   if (res) {
        //     dispatch(CaseList(`?page=1`));
        //   }
        // });
      });
  };

  const onCaseFormReprocess = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        if (item?.original?.form_id) {
          dispatch(caseFormReprocess({ form_id: item?.original?.form_id }));
          // .then((res) => {
          //   if (res) {
          //     dispatch(CaseList(`?page=1`));
          //   }
          // });
        }
      });
  };

  const onCaseReprocess = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        if (item?.original?.case_id) {
          dispatch(caseReprocess({ case_id: item?.original?.case_id }));
          // .then(
          //   (res) => {
          //     if (res) {
          //       dispatch(CaseList(`?page=1`));
          //     }
          //   }
          // );
        }
      });
  };

  const onCaseAbortProcessing = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(caseAbortProcessingForm(item?.original?.form_id));
        // .then((res) => {
        //   if (res) {
        //     dispatch(CaseList(`?page=1`));
        //   }
        // });
      });
  };
  const handleSearch = (e: string) => {

    if(caseDetail?.data?.case_id){
      serachFunction?.(e);
    }else{
      dispatch(
        setSearchParams({
          name: "column",
          value: e,
        })
      );
    }
   
  };

  const convertToString = (item: DateFiler[]) => {
    let updateData = {
      from_date: moment(item[0].startDate).format("YYYY-M-D"),
      to_date: moment(item[0].endDate).format("YYYY-M-D"),
    };
    if (updateData.from_date && updateData.to_date) {
      return `?from_date=${updateData.from_date}&to_date=${updateData.to_date}`;
    }
  };

  const handleDateFilter = (e: DateFiler[]) => {
    dispatch(
      setSearchParams({
        name: "date",
        value: convertToString(e),
      })
    );
    // dispatch(setSearchParams(e));
    // dateTimeFilter?.(e);
  };

  const OnSelectedCaseDownload = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(CaseDownloadReqest({ case_id: item?.original?.case_id })).then(
          (res) => {
            if (res?.payload?.item?.success) {
              dispatch(CaseDownload({ case_id: item?.original?.case_id })).then(
                (res) => {
                  if (res) {
                    downloadURI(
                      `${BASE_URL}/media/cases/${item?.original?.case_id}/content/`,
                      "v1"
                    );
                  }
                }
              );
            }
          }
        );
      });
  };

  const OnSelectedFormDownload = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        if (item?.original?.form_id) {
          dispatch(FormDownload({ form_id: item?.original?.form_id })).then(
            (res) => {
              if (res) {
                downloadURI(
                  `${BASE_URL}/media/forms/${item?.original?.form_id}/content/`,
                  "v1"
                );
              }
            }
          );
        }
      });
  };

  return (
    <>
      <Card
        variant="outlined"
        className="common-table-header"
        style={{
          background: theme.palette.primary.light,
        }}
      >
        <div className="flex justify-between flex-row  items-center">
          <div className="flex flex-row  items-center gap-6">
            <FormControlLabel
              className="h-12"
              control={
                <Checkbox
                  color="primary"
                  checked={
                    data?.length ?  selectedData?.tableSelectedData?.length == data?.length : false
                  }
                  icon={
                    <img src={IconService.Uncheck.src} alt="Uncheck icon"></img>
                  }
                  checkedIcon={<img src={IconService.checkedIcon.src} />}
                  indeterminateIcon={
                    <img
                      src={IconService.intermidiateminus.src}
                      alt="Uncheck icon"
                    ></img>
                  }
                  onChange={(e) => {
                    setSelectedData({
                      ...selectedData,
                      isSelecteAll: e.target.checked,
                    });
                  }}
                  indeterminate={
                    selectedData?.tableSelectedData?.length > 0 &&
                    selectedData?.tableSelectedData?.length < data?.length
                  }
                />
              }
              label={
                selectedData?.tableSelectedData?.length > 0
                  ? `${selectedData?.tableSelectedData?.length} Selected`
                  : "Select All"
              }
            />
            {selectedData?.tableSelectedData?.length > 0 && (
              <div className="common-header-selected-section  h-12 flex flex-row  items-center gap-4 flex-wrap">
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => markAsProcessed()}
                >
                  <Image
                    src={IconService.markProcessed}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Mark as Processed
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  // onClick={() => onCaseAbortProcessing()}
                >
                  <Image
                    src={IconService.abortProcessing}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Abort Processing
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => {
                    if (caseDetail?.data?.case_id) {
                      onCaseFormReprocess();
                    } else {
                      onCaseReprocess();
                    }
                  }}
                >
                  <Image
                    src={IconService.reprocess}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Reprocess
                  </Typography>
                </span>
                {/* {selectedData.tableSelectedData.length <= 1 && (
                  <span className="flex flex-row  items-center gap-1 chip-label ">
                    <Image
                      src={IconService.flag1}
                      height={24}
                      width={24}
                      alt=""
                      className="bg-red-400 rounded-full"
                    />{" "}
                    <Typography variant="body1" color="text.secondary">
                      Flag
                    </Typography>
                  </span>
                )} */}

                {/* {!caseDetail?.data?.case_id && ( */}
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  // onClick={() => OnSelectedCaseDownload()}
                  onClick={() => {
                    if (caseDetail?.data?.case_id) {
                      OnSelectedFormDownload();
                    } else {
                      OnSelectedCaseDownload();
                    }
                  }}
                >
                  <Image
                    src={IconService.download1}
                    height={24}
                    width={24}
                    alt=""
                    className="bg-red-400 rounded-full"
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Download
                  </Typography>
                </span>
                {/* )} */}

                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => {
                    if (caseDetail?.data?.case_id) {
                      onDeleteFormCase();
                    } else {
                      onDeleteCase();
                    }
                  }}
                >
                  <Image
                    src={IconService.DeleteRedRounded}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Delete{" "}
                  </Typography>
                </span>
              </div>
            )}
          </div>

          {!selectedData?.tableSelectedData?.length && (
            <div className="flex flex-row items-center gap-4 ">
              <DropDownSearch
                columns={tableHeader}
                serachFunction={(e: string) => {
                  return handleSearch(e);
                }}
              />
              <CommonDateRangePicker
                dateTimeFilter={handleDateFilter}
                serachFunction={(e: string) => handleSearch(e)}
              />

              {isAddButton && (
                <div>
                  <AddFileLink />
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
