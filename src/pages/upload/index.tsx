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
  // Mock data definitions
  const mockCaseResponse = {
    payload: {
      item: {
        case_id: "mock-case-12345",
        case_num: "MOCK-001",
        created_at: new Date().toISOString(),
      }
    }
  };
  
  const mockFormResponse = {
    status: 202,
    formId: "mock-form-12345",
    message: "Form processing started"
  };

  const [tableData, setTableData] = useState<GeneratedItem[]>([]);
  const [showTabe, setShowTable] = useState<boolean>(false);
  const [caseId, setCaseId] = useState<string>("");
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
    
    console.log("Starting mock upload process for", tableData.length, "items");
    
    // Process each item in tableData
    for (const obj of tableData) {
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
            tableData.indexOf(obj)
          );
        } else {
          await processStatus(
            [{ id: obj.id }],
            selectedFiles,
            imageFiles,
            caseId,
            link,
            tableData.indexOf(obj)
          );
        }
      } catch (error) {
        console.error(
          `Error with mock processing for object with ID ${obj.id}:`,
          error
        );
      }
    }
    
    dispatch(setLoading(false));
    setIsSuccess(true);
    dispatch(clearSelectFile());
    dispatch(setClearSelectedAliasKey());
    dispatch(setClearSelected());
    dispatch(setClearIsCaseError());
    dispatch(setClearIsCaseSuccess());
    
    console.log("Mock upload process completed successfully");
  };

  const createCaseFunction = async (obj) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const resultObject = {};
    caseFlags[obj.id]?.keyValuePairs.forEach((item) => {
      resultObject[item.key] = item.value;
    });
    
    console.log("Mock case creation with:", {
      case_num: obj.item.split(".")[0],
      case_template_id: selected[obj.id],
      flags: resultObject ? JSON.stringify(resultObject) : "{}",
      created_by: existUserData?.user_id,
    });

    try {
      // Return mock response instead of API call
      const caseResponse = mockCaseResponse;
      
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
      console.error(`Error creating case:`, error);
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
      download_url: `${selectedFiles[0]?.link || "https://example.com/mock-document.pdf"}`,
      fetch_files: true,
    };

    for (let i = 0; i < statusArray.length; i++) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      let selectedName: any = Object.values(selectedFiles).filter(
        (item: any) => item.id == statusArray[i].id
      );
      
      try {
        console.log("Processing form with mock data:", {
          form_num: link ? selectedName[i]?.form_name : (selectedName[0]?.name || "mock-form").split(".")[0],
          file_type: link ? "application/pdf" : "image/png",
          form_template_id: `${selectedAliasKey[statusArray[i].id]}`,
          case_template_id: selected[statusArray[i].id]
        });

        // Always return success for the mock implementation
        const response = mockFormResponse;
        
        if (response.status === 202) {
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
      } catch (error) {
        console.error(`Error processing status:`, error);
      }
    }
  };

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
      // Replace API call with mock function
      console.log("Loading mock projects data");
      dispatch(getAllProjects()); // Assume this action creator will be modified to return mock data
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
