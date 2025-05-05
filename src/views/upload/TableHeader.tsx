import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
  Button,
  Tooltip,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";
import AddCaseFlags_Form_Flags from "@/components/modals/AddCaseFlags_Form_Flags";
import Alias from "@/components/modals/Alias";
import ContextMenu from "@/components/Common/ContextMenu";
import Upload_Link from "@/components/modals/Upload_Link";
import { SimpleCtx } from "@/components/Common/Context";
import Success_process from "@/components/modals/Success_process";
import Continue_upload from "@/components/modals/Continue_upload";
import Alias_Success from "@/components/modals/Alias_Success";
import { useDispatch, useSelector } from "react-redux";
import { ContextMenuType, FileItem } from "@/shared/config/types";
import { clearSelectFile, deleteSelectFile } from "@/Store/Reducer/CaseSlice";
interface ContextType {
  contextMenu?: ContextMenuType | null;
  handleContextMenu?: (event: React.MouseEvent<any>) => void;
  setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuType | null>>;
  data?: FileItem[];
  handleUpload: () => void;
  setTableData?: any;
}

export default function TableHeader({
  contextMenu,
  setContextMenu,
  handleContextMenu,
  data,
  handleUpload,
  setTableData,
}: ContextType) {
  const [addCaseFlagFlags, setAddCaseFlagFlags] = useState<boolean>(false);
  const [addAliasModel, setAliasModel] = useState<boolean>(false);
  const [uploadLink, setUploadLink] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [leaveScreen, setLeaveScreen] = useState<boolean>(false);
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);
  const [successAlise, setSuccessAlise] = useState<boolean>(false);
  const [isCase, setIsCase] = useState<boolean>(false);
  const [isCheked, setIsChecked] = useState<boolean>(false);

  const theme = useTheme();
  const dispatch = useDispatch();
  const handleCaseRemove = () => {
    // selectedData.tableSelectedData.flatMap((item) => {
    //   if (item?.status?.length > 0) {
    //     return item?.status?.map((i) => {
    //       if (i?.id) {
    //         dispatch(deleteSelectFile(i?.id));
    //       }
    //     });
    //   } else {
    //     dispatch(deleteSelectFile(item?.id));
    //   }
    // });

    const updatedTableSelectedData = selectedData.tableSelectedData.filter(
      (item) => {
        if (item?.status?.length > 0) {
          item.status.forEach((status) => {
            if (status?.id) {
              dispatch(deleteSelectFile(status.id));
            }
          });

          // Update the status array by filtering out items with an id
          item.status = item?.status.filter((status) => !status.id);
        } else {
          dispatch(deleteSelectFile(item?.id));
        }

        // Return true to keep the item in the updated array, or false to remove it
        return item?.status?.length > 0;
      }
    );

    // Update the state with the modified tableSelectedData
    setSelectedData({
      ...selectedData,
      tableSelectedData: updatedTableSelectedData,
      isSelecteAll: false,
    });
    // const selectedIds = new Set(
    //   selectedData.tableSelectedData.flatMap((item) => {
    //     if (item?.status?.length > 0) {
    //       return item?.status?.map((i) => i?.id);
    //     } else {
    //       return [item?.id];
    //     }
    //   })
    // );
    // const newData = data?.filter((item) => {
    //   if (Array.isArray(item?.status) && item?.status?.length > 0) {
    //     const updatedStatus = item.status.filter((statusItem) => {
    //       if (!selectedIds.has(statusItem.id)) {
    //         dispatch(clearSelectFile([statusItem.id]));
    //         return statusItem;
    //       }
    //     });
    //     return (item["status"] = updatedStatus);
    //   } else {
    //     if (!selectedIds.has(item.id)) {
    //       return item;
    //     }
    //   }
    // });
    // setTableData(newData);
  };

  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const calculateIsIndeterminate = (selectedData, data) => {
    const selectedRowCount = selectedData?.tableSelectedData?.length || 0;
    const dataRowCount = data?.length || 0;

    if (selectedRowCount === 0) {
      // No items selected, not indeterminate
      return false;
    } else if (selectedRowCount === dataRowCount) {
      // All items selected, not indeterminate
      return false;
    } else {
      // Some items selected, indeterminate
      return true;
    }
  };
  useEffect(() => {
    // Calculate and set the indeterminate state whenever selectedData or data changes
    const indeterminate = calculateIsIndeterminate(selectedData, data);
    setIsIndeterminate(indeterminate);
  }, [selectedData, data]);

  const { selected, selectedAliasKey, allProjects } = useSelector(
    ({ CaseSlice }) => CaseSlice
  );

  function checkStatusArrayForId(data) {
    // Initialize variables to store the lengths
    let itemStatusLength = 0;
    let dataLength = 0;
    let lendthss = 0;

    // Iterate through the items in the data array
    for (const item of data) {
      // Check if the current item has a status array
      if (Array.isArray(item.status)) {
        lendthss++;
        // Iterate through the status array of the current item
        for (const statusItem of item.status) {
          // Check if the 'id' in the status item matches the idToCheck
          if (statusItem?.id) {
            // Increment the itemStatusLength
            itemStatusLength++;
          }
        }
      }
      // Increment the dataLength for each item in the data array
      dataLength++;
    }

    // Calculate the final length to compare
    const lengthToCompare = itemStatusLength || dataLength;

    // Check the conditions and return the result
    if (lengthToCompare) {
      const objectLength = Object.keys(selected).length;
      const selectedAliasLength = Object.keys(selectedAliasKey).length;
      if (objectLength && lengthToCompare) {
        // if (objectLength === itemStatusLength + dataLength) {
        ///lengthToCompare + itemStatusLength) {

        if (objectLength === selectedAliasLength) {
          return false;
        }
        // }
      } else {
        return true;
      }
    }
    return true;
  }

  const [isTooltip, setIsTooltip] = useState<boolean>(false);

  function areAllElementsSame(arr) {
    if (arr.length === 0) {
      return true; // An empty array is considered to have all elements the same.
    }

    const firstElement = arr[0];

    for (let i = 1; i < arr?.length; i++) {
      if (arr[i] !== firstElement) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (selectedData?.tableSelectedData?.length === data?.length) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [selectedData?.tableSelectedData?.length, data?.length]);

  function checkArray(array) {
    // Check if the array has more than one object
    if (array?.length >= 1) {
      // Iterate through each object in the array
      for (let i = 0; i < array.length; i++) {
        // Check if the current object has a 'status' property and it is an array
        if (
          array[i].hasOwnProperty("status") &&
          Array.isArray(array[i].status)
        ) {
          // Check if the 'status' array has more than one object
          if (array[i].status.length >= 1) {
            return true; // Return true if condition is fulfilled
          }
        }
      }
    }
    return false; // Return false if condition is not fulfilled
  }

  return (
    <>
      {uploadSuccess && (
        <Success_process
          open={uploadSuccess}
          setOpen={setUploadSuccess}
          setLeaveScreen={setLeaveScreen}
        />
      )}

      {uploadLink && (
        <Upload_Link
          uploadLink={uploadLink}
          setUploadLink={setUploadLink}
          setUploadSuccess={setUploadSuccess}
        />
      )}

      {addCaseFlagFlags && (
        <AddCaseFlags_Form_Flags
          addCaseFlagFlags={addCaseFlagFlags}
          setAddCaseFlagFlags={setAddCaseFlagFlags}
          isCase={isCase}
        />
      )}
      {addAliasModel && (
        <Alias
          addAliasModel={addAliasModel}
          setAliasModel={setAliasModel}
          setSuccessAlise={setSuccessAlise}
        />
      )}

      {successAlise && (
        <Alias_Success
          successAlise={successAlise}
          setSuccessAlise={setSuccessAlise}
        />
      )}

      {leaveScreen && (
        <Continue_upload
          leaveScreen={leaveScreen}
          setLeaveScreen={setLeaveScreen}
        />
      )}
      <Card
        variant="outlined"
        className=" common-table-header "
        style={{
          background: theme.palette.primary.light,
        }}
      >
        <div className="flex justify-between flex-row  items-center">
          <div className="flex flex-row  items-center gap-4">
            <FormControlLabel
              className="h-12"
              control={
                <Checkbox
                  color="primary"
                  checked={isCheked}
                  icon={
                    <img src={IconService.Uncheck.src} alt="Uncheck icon" />
                  }
                  checkedIcon={<img src={IconService.checkedIcon.src} />}
                  indeterminateIcon={
                    <img
                      src={IconService.intermidiateminus.src}
                      alt="Uncheck icon"
                    />
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedData({
                        ...selectedData,
                        isSelecteAll: e.target.checked,
                        tableSelectedData: data,
                      });
                    } else if (!e.target.checked) {
                      setSelectedData({
                        ...selectedData,
                        isSelecteAll: e.target.checked,
                        tableSelectedData: [],
                      });
                    } else {
                      setSelectedData({
                        ...selectedData,
                        isSelecteAll: e.target.checked,
                      });
                    }
                  }}
                  indeterminate={isIndeterminate}
                />
              }
              label="Select All"
            />
            {selectedData?.tableSelectedData?.length > 0 && (
              <div className="common-header-selected-section h-12 flex flex-row  items-center gap-6 flex-wrap">
                <span className="flex flex-row  items-center gap-1">
                  <Typography variant="subtitle2" color="text.secondary">
                    Selected
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {selectedData?.tableSelectedData?.length} Folders
                  </Typography>
                </span>
                {!selectedData?.isAllSubMenu && (
                  <>
                    {areAllElementsSame(
                      Object.values(selected)?.map((item) => item)
                    ) && (
                      <span
                        className="flex flex-row  items-center gap-1 chip-label"
                        onClick={() =>
                          !checkArray(selectedData?.tableSelectedData) &&
                          setAliasModel(true)
                        }
                        aria-disabled="true"
                      >
                        <Image
                          src={IconService.AddPrimaryRounded}
                          height={24}
                          width={24}
                          alt=""
                          className={
                            checkArray(selectedData?.tableSelectedData)
                              ? "opacity-25"
                              : ""
                          }
                        />
                        <Typography
                          variant="body1"
                          color={
                            checkArray(selectedData?.tableSelectedData)
                              ? "text.primary"
                              : "text.secondary"
                          }
                        >
                          Add Alias
                        </Typography>
                      </span>
                    )}
                    <span
                      className="flex flex-row  items-center gap-1 chip-label"
                      onClick={() => {
                        setAddCaseFlagFlags(true);
                        setIsCase(true);
                      }}
                    >
                      <Image
                        src={IconService.AddPrimaryRounded}
                        height={24}
                        width={24}
                        alt=""
                      />
                      <Typography variant="body1" color="text.secondary">
                        Add Case Flags
                      </Typography>
                    </span>
                  </>
                )}

                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => {
                    setAddCaseFlagFlags(true);
                    setIsCase(false);
                  }}
                >
                  <Image
                    src={IconService.AddPrimaryRounded}
                    height={24}
                    width={24}
                    alt=""
                  />
                  <Typography variant="body1" color="text.secondary">
                    Add Form Flags
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={handleCaseRemove}
                >
                  <Image
                    src={IconService.DeleteRedRounded}
                    height={24}
                    width={24}
                    alt=""
                  />
                  <Typography variant="body1" color="text.secondary">
                    Delete
                  </Typography>
                </span>
              </div>
            )}
          </div>

          {!selectedData?.tableSelectedData?.length && (
            <div className="flex flex-row items-center gap-4 ">
              {/* <ProjectSelection /> */}
              <ContextMenu
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                handleContextMenu={handleContextMenu}
              />

              <Tooltip
                arrow
                open={isTooltip}
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#ffffff",
                      border: 1,
                      borderColor: "#FF5F5F",
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: "Satoshi-Regular",
                      color: "#FF5F5F",
                      minWidth: "max-content",
                      "& .MuiTooltip-arrow": {
                        color: "#FF5F5F",
                        "&::before": {
                          border: "1px solid #FF5F5F",
                          backgroundColor: "#fff",
                          boxSizing: "border-box",
                        },
                      },
                    },
                  },
                }}
                title={
                  <div className="flex flex-row items-center gap-1">
                    <Image
                      src={IconService.question_mark}
                      height={15}
                      width={15}
                      alt=""
                    />
                    Please select project name and alias for upload
                  </div>
                }
              >
                <Button
                  className=" background px-6 h-12  text-base font-bold"
                  variant="text"
                  color="primary"
                  onMouseEnter={() => {
                    let datss = checkStatusArrayForId(data);

                    setIsTooltip(datss);
                  }}
                  onMouseLeave={() => setIsTooltip(false)}
                  onClick={() => {
                    if (!isTooltip) {
                      handleUpload();
                    }
                  }}
                >
                  <Image
                    src={IconService.UploadIconWhite}
                    width={22}
                    height={22}
                    alt=""
                    className="mr-1"
                  />
                  UPLOAD
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
