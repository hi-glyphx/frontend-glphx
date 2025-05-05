import { Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import AddYourCase from "@/views/upload/AddYourCase";
import TableHeader from "@/views/upload/TableHeader";
import CtxProvider from "@/components/Common/Context";
import { useDispatch, useSelector } from "react-redux";
import { formatBytes } from "@/utils/Functions";
import {
  clearSelectFile,
  createCase,
  getAllProjects,
  setClearIsCaseError,
  setClearIsCaseSuccess,
  setClearSelected,
  setClearSelectedAliasKey,
  setIsCaseError,
  setIsCaseSuccess,
} from "@/Store/Reducer/CaseSlice";
import { SESSION } from "@/utils/Enums";
import { BASE_URL } from "@/utils/HTTP";
import { v4 as uuid } from "uuid";
import Warning from "@/components/modals/Warning";
import Success_process from "@/components/modals/Success_process";
import Table from "../../components/tables/UploadTable";
import { uploadColumns } from "@/utils/TableColumns";
import { setLoading } from "@/Store/Reducer/LayoutsSice";
import { ContextMenuType } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { GetClassificationBatches } from "@/Store/Reducer/ClassificationSlice";
interface GeneratedItem {
  item: string;
  type: string;
  size: string;
  fileName: string;
  id: string;
}

interface LinkFlags {
  // _meta: {
  //   callback_url: string;
  // };
  download_url: string;
  fetch_files: boolean;
}

const Upload = () => {
  const [tableData, setTableData] = useState<GeneratedItem[]>([]);
  const [showTabe, setShowTable] = useState<boolean>(false);
  const [caseId, setCaseId] = useState<string>("");
  // const [isCaseError, setIsCaseError] = useState<CaseErrorState>({});
  // const [isCaseSuccess, setIsCaseSuccess] = useState<CaseSuccessState>({});
  const [warningOpen, setWarning] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>("");
  const [isUploadScreen, setIsUploadScreen] = useState<boolean>(false);
  const {
    selectedAliasKey,
    formFlags,
    caseFlags,
    selected,
    imageFiles,
    selectedFiles,
    isCaseError,
    isCaseSuccess,
  } = useSelector(({ CaseSlice }) => CaseSlice);
  const [generatedArray, setGeneratedArray] = useState<GeneratedItem[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const existUserData =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("USER") as any);

  const newGeneratedArray: GeneratedItem[] = [];

  useEffect(() => {
    

    const folderMap: Record<string, any> = {}; // Explicitly type folderMap
    const updatedArray: GeneratedItem[] = [];
  
    selectedFiles.forEach((data) => {
      const { type, form_name, path, name, size, id } = data;
  
      if (type === "link") {
        updatedArray.push({
          item: form_name,
          type: "link",
          size: "N/A",
          fileName: form_name,
          id: id || uuid(),
        });
      } else {
    const pathArray = path.replace("./", "").split("/");


    const obj = {
      item: name,
      type: "file",
      size: size ? formatBytes(size) : "Unknown",
      fileName: name,
      id: id || uuid(),
    };

    

    if (pathArray.length > 1) {
      const folderName = pathArray[0];

      if (folderName !== "." && folderName !== "..") {
        if (!folderMap[folderName]) {
          folderMap[folderName] = {
            item: folderName,
            type: "folder",
            size: 0,
            status: [],
            id: id || uuid(),
          };
          
          updatedArray.push(folderMap[folderName]);
          
        }
        folderMap[folderName].size += size || 0;
        folderMap[folderName].status.push(obj);
      }
    } else {
      updatedArray.push(obj);
    }
      }
    });
  
    Object.keys(folderMap).forEach((key) => {
      folderMap[key].size = formatBytes(folderMap[key].size);
    });
  
    
    
  
    setGeneratedArray(updatedArray);
    setTableData(updatedArray);
  }, [selectedFiles]);
  

  const [contextMenu, setContextMenu] = useState<ContextMenuType | null>(null);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event?.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event?.clientX + 2,
              mouseY: event?.clientY - 6,
            }
          : null
      );
    },
    [contextMenu]
  );
  const handleUpload = async () => {
    dispatch(setLoading(true));
    tableData.forEach(async (obj, i) => {
      try {
        const caseId = await createCaseFunction(obj);
        const link = obj?.type === "link" ? true : false;
        if (obj["status"]) {
          await processStatus(
            obj["status"],
            selectedFiles,
            imageFiles,
            caseId,
            link,
            i
          );
        } else {
          await processStatus(
            [{ id: obj.id }],
            selectedFiles,
            imageFiles,
            caseId,
            link,
            i
          );
        }
      } catch (error) {
        console.error(
          `Error creating case or processing status for object with ID ${obj.id}:`,
          error
        );
      }
    });
    // for (const obj of tableData) {

    // }
    dispatch(setLoading(false));
    // if (!responseArr.includes(false)) {
    setIsSuccess(true);
    dispatch(clearSelectFile());
    dispatch(setClearSelectedAliasKey());
    dispatch(setClearSelected());
    dispatch(setClearIsCaseError());
    dispatch(setClearIsCaseSuccess());

    //   setResponseArr([]);
    // }
  };

  const createCaseFunction = async (obj) => {
    // const caseFlagss = caseFlags[obj.id]?.keyValuePairs.reduce((acc, flag) => {
    //   acc[flag.key] = flag.value;
    //   return acc;
    // }, {});

    const resultObject = {};

    caseFlags[obj.id]?.keyValuePairs.forEach((item) => {
      resultObject[item.key] = item.value;
    });
    const caseObj = {
      case_num: obj.item.split(".")[0],
      case_template_id: selected[obj.id],
      flags: resultObject ? JSON.stringify(resultObject) : "{}",
      created_by: existUserData?.user_id,
    };

    try {
      const caseResponse = await dispatch(createCase(caseObj));

      if (caseResponse) {
        const caseId = caseResponse.payload.item.case_id;
        setCaseId(caseId);
        dispatch(
          setIsCaseError({
            id: obj.id,
            value: { error: false, caseId: caseId },
          })
        );
        dispatch(
          setIsCaseSuccess({
            id: obj.id,
            value: { success: true, caseId: caseId },
          })
        );
        // setIsCaseError((prev) => ({
        //   ...prev,
        //   [obj.id]: false,
        // }));
        // setIsCaseSuccess((prev) => ({
        //   ...prev,
        //   [obj.id]: true,
        // }));
        return caseId;
      }
    } catch (error) {
      dispatch(
        setIsCaseError({
          id: obj.id,
          value: { error: true, caseId: undefined },
        })
      );
      dispatch(
        setIsCaseSuccess({
          id: obj.id,
          value: { success: false, caseId: undefined },
        })
      );

      // setIsCaseError((prev) => ({
      //   ...prev,
      //   [obj.id]: true,
      // }));
      // setIsCaseSuccess((prev) => ({
      //   ...prev,
      //   [obj.id]: false,
      // }));
      console.error(`Error creating case:`, error);
      // throw error;
    }
  };
  const blobToFile = async (blobUrl, filename, fileType) => {
    const response = await fetch(blobUrl);
    const data = await response.blob();
    return new File([data], filename, { type: fileType });
  };

  // const [responseArr, setResponseArr] = useState<boolean[]>([]);

  const processStatus = async (
    statusArray,
    selectedFiles,
    imageFiles,
    caseId,
    link,
    index
  ) => {
    const linkFlags: LinkFlags = {
      // _meta: { callback_url: "https://callback.mquotient.net/api/callback/" },
      download_url: `${selectedFiles[0].link}`,
      fetch_files: true,
    };
    for (let i = 0; i < statusArray.length; i++) {
      let selectedName: any = Object.values(selectedFiles).filter(
        (item: any) => item.id == statusArray[i].id
      );
      try {
        const type = link
          ? "application/pdf"
          : selectedName[0].name.toLowerCase().endsWith(".pdf")
          ? "application/pdf"
          : "image/png";
        const mainFile = await blobToFile(
          imageFiles[index],
          selectedName[0].name,
          type
        );
        const statusObj = statusArray[i];
        const formdata = new FormData();
        formdata.append(
          "form_num",
          link ? selectedName[i]?.form_name : mainFile.name.split(".")[0]
        );
        formdata.append("file_type", mainFile.type);
        formdata.append(
          "filename",
          link ? selectedName[i]?.form_name : mainFile.name.split(".")[0]
        );
        formdata.append(
          "form_template_id",
          `${selectedAliasKey[statusObj.id]}`
        );
        formdata.append("case_template_id", selected[statusObj.id]);
        formdata.append("page_type", "form");
        if (link) {
          if (!linkFlags?.download_url == undefined) {
            formdata.append("flags", JSON.stringify(linkFlags));
          } else {
            const resultObject = { ...linkFlags };

            selectedFiles[0]?.flags.forEach((item) => {
              resultObject[item.key] = item.value;
            });
            const formFlagsresultObject = {};

            formFlags[statusObj.id]?.keyValuePairs.forEach((item) => {
              formFlagsresultObject[item.key] = item.value;
            });

            let updateresultObject = {
              ...resultObject,
              ...formFlagsresultObject,
            };
            formdata.append("flags", JSON.stringify(updateresultObject));
          }
        } else {
          const resultObject = {};

          formFlags[statusObj.id]?.keyValuePairs.forEach((item) => {
            resultObject[item.key] = item.value;
          });

          formdata.append("flags", JSON.stringify({ ...resultObject }));
        }

        formdata.append("force_template", "false");
        formdata.append("image", link == true ? "" : mainFile);
        const SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");
        const requestOptions = {
          method: "POST",
          body: formdata,
          headers: {
            Accept: "*/*",
            Authorization: `Basic ${btoa(
              `${SessionData.username}:${SessionData.password}`
            )}`,
          },
        };

        if (caseId) {
          const response = await fetch(
            `${BASE_URL}/case/${caseId}/forms/`,
            requestOptions
          );
          if (response.status === 202) {
            // setResponseArr((prev) => [...prev, true]);

            dispatch(
              setIsCaseError({
                id: statusArray[i].id,
                value: { error: false, caseId: caseId },
              })
            );
            dispatch(
              setIsCaseSuccess({
                id: statusArray[i].id,
                value: { success: true, caseId: caseId },
              })
            );
          } else {
            // setResponseArr((prev) => [...prev, false]);
            dispatch(
              setIsCaseError({
                id: statusArray[i].id,
                value: { error: true, caseId: caseId },
              })
            );
            dispatch(
              setIsCaseSuccess({
                id: statusArray[i].id,
                value: { success: false, caseId: caseId },
              })
            );
          }
          const result = await response.text();
        }
      } catch (error) {
        console.error(`Error processing status:`, error);
      }
    }
  };
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (
  //       (event.ctrlKey && event.shiftKey && event.key === "R") ||
  //       (event.ctrlKey && event.key === "r") ||
  //       (event.metaKey && event.shiftKey && event.key === "R") ||
  //       (event.metaKey && event.key === "r")
  //     ) {
  //       event.preventDefault();
  //       setWarning(true);
  //       setWarningText(
  //         "Your upload is not completed yet. Would you like to cancel the upload or stay on page and keep it continue?"
  //       );
  //       setIsUploadScreen(true);
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.shiftKey && event.key === "R") ||
        (event.ctrlKey && event.key === "r") ||
        (event.metaKey && event.shiftKey && event.key === "R") ||
        (event.metaKey && event.key === "r")
      ) {
        event.preventDefault();
        setWarning(true);
        setWarningText(
          "Your upload is not completed yet. Would you like to cancel the upload or stay on the page and keep it continue?"
        );
        setIsUploadScreen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleCancel = () => {
    setWarning(false);
    setWarningText("");
    setIsUploadScreen(false);
  };

  const handleSubmit = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (showTabe) {
      dispatch(getAllProjects());
    }
  }, [showTabe, dispatch]);

  return (
    <>
      <Warning
        warningOpen={warningOpen}
        setWarning={() => setWarning(false)}
        text={warningText}
        isUploadScreen={isUploadScreen}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
      <Success_process open={isSuccess} setOpen={setIsSuccess} />
      <div
        className="flex flex-col gap-y-4 h-full"
        onContextMenu={handleContextMenu}
        style={{ cursor: "context-menu" }}
      >
        {/* <Typography variant="h5" color="text.secondary" textAlign="start">
          Assign a Case
        </Typography> */}

        <div className="h-full">
          {!showTabe ? (
            <AddYourCase
              setShowTable={setShowTable}
              contextMenu={contextMenu}
              setContextMenu={setContextMenu}
            />
          ) : (
            <CtxProvider>
              <div className="gap-y-4 flex flex-col upload-table">
                <div>
                  <TableHeader
                    contextMenu={contextMenu}
                    setContextMenu={setContextMenu}
                    data={tableData}
                    handleUpload={handleUpload}
                    setTableData={setTableData}
                  />
                </div>

                <Table
                  columns={uploadColumns(isCaseError, isCaseSuccess)}
                  data={tableData}
                  pagination={false}
                  isCheckbox={true}
                />
              </div>
            </CtxProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
