import Image from "next/image";
import React, { useContext } from "react";
import ProjectDropdown from "./ProjectDropdown";
import IconService from "@/utils/Icons";
import { Checkbox } from "@mui/material";
import { SimpleCtx } from "../Common/Context";
import { Tooltip } from "@mui/material";

import AliasDropdown from "./AliasDropDown";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "@/utils/HTTP";
import { SESSION } from "@/utils/Enums";
import { setIsCaseError, setIsCaseSuccess } from "@/Store/Reducer/CaseSlice";
import { FileOrFolder } from "@/shared/config/types";

export default function TableRow(props: any) {
  const { data, toggleSelection } = props;
  const { selectedData } = useContext<any>(SimpleCtx);

  const dispatch = useDispatch();
  const {
    selectedAliasKey,
    selected,
    imageFiles,
    selectedFiles,
    isCaseError,
    isCaseSuccess,
  } = useSelector(({ CaseSlice }) => CaseSlice);
  interface LinkFlags {
    _meta: {
      callback_url: string;
    };
    download_url: string;
    fetch_files: boolean;
  }

  const handleFormReupload = async (id: string, index: number) => {
    let caseId = isCaseError[id].caseId;
    const formObj = data?.original?.status[index];
    const linkFlags: LinkFlags = {
      _meta: { callback_url: "https://callback.mquotient.net/api/callback/" },
      download_url: `${selectedFiles.link}`,
      fetch_files: true,
    };
    const mainFile = new File([imageFiles[index]], selectedFiles[index].name, {
      type: "image/png",
    });
    const formdata = new FormData();
    formdata.append("form_num", mainFile.name);
    formdata.append("file_type", mainFile.type);
    formdata.append("filename", mainFile.name);
    formdata.append("alias", `${selectedAliasKey[formObj.id]}`);
    formdata.append("case_template_id", selected[formObj.id]);
    formdata.append("page_type", "form");
    formdata.append("flags", JSON.stringify(linkFlags));
    formdata.append("force_template", "false");
    formdata.append("image", selectedFiles.link ? "" : mainFile);

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
        dispatch(
          setIsCaseError({
            id: formObj.id,
            value: { error: false, caseId: caseId },
          })
        );
        dispatch(
          setIsCaseSuccess({
            id: formObj.id,
            value: { success: true, caseId: caseId },
          })
        );
      } else {
        dispatch(
          setIsCaseError({
            id: formObj.id,
            value: { error: true, caseId: caseId },
          })
        );
        dispatch(
          setIsCaseSuccess({
            id: formObj.id,
            value: { success: false, caseId: caseId },
          })
        );
      }
    }
  };

  return (
    <>
      {data?.original?.status?.map((item: FileOrFolder, index: number) => (
        <>
          <tr
            style={{
              backgroundColor: selectedData?.tableSelectedData
                ?.find((selectedRow) => selectedRow?.id === data?.original?.id)
                ?.status?.some((data: FileOrFolder) => data.id === item.id)
                ? "#F9F6FF"
                : "",
            }}
            className={`fold open   ${
              index == data?.original?.status?.length - 1 ? "fold-last" : ""
            }`}
            key={index}
          >
            <td style={{ borderTop: "1px solid #E7E6F0" }}></td>
            <td
              style={{ borderTop: "1px solid #E7E6F0" }}
              className="sub-tr-padding"
            >
              <div className="flex flex-row items-center gap-1  ml-3 ">
                <Checkbox
                  color="primary"
                  className="p-0"
                  name="tableSelectedData"
                  checked={
                    selectedData?.tableSelectedData
                      ?.find(
                        (selectedRow) => selectedRow?.id === data?.original?.id
                      )
                      ?.status?.some(
                        (data, index: number) => data.id === item.id
                      ) ?? false
                  }
                  checkedIcon={<img src={IconService.checkedIcon.src} />}
                  icon={<img src={IconService.Uncheck.src} />}
                  onChange={() => toggleSelection(data?.original, item)}
                />
                <Image
                  src={IconService.FileIcon}
                  className=" file-folder-icon-size"
                  alt=""
                />{" "}
              </div>
            </td>

            <td style={{ borderTop: "1px solid #E7E6F0" }}>
              <div className="flex flex-row items-center ">
                {item?.item}
                {isCaseError[item?.id]?.error && (
                  <span className="upload-failed case-number-sec">
                    Upload Failed
                    <Tooltip
                      arrow
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "#ffffff",
                            border: 1,
                            borderColor: "#ffffff",
                            fontSize: "14px",
                            fontWeight: 400,
                            fontFamily: "Satoshi-Regular",
                            color: "#524587",
                            boxShadow: " 0px 0px 4px 1px #DFDFFF",
                            minWidth: "max-content",
                            "& .MuiTooltip-arrow": {
                              color: "#ffffff",
                            },
                          },
                        },
                      }}
                      title={
                        <div className="flex flex-row items-center gap-1">
                          Re-Upload
                        </div>
                      }
                    >
                      <Image
                        src={IconService.BackIcon}
                        height={15}
                        width={15}
                        alt=""
                        className="cursor-pointer m-0 "
                        onClick={() => handleFormReupload(item?.id, index)}
                      />
                    </Tooltip>
                    <Tooltip
                      arrow
                      placement="top"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "#ffffff",
                            border: 1,
                            borderColor: "#ffffff",
                            fontSize: "14px",
                            fontWeight: 400,
                            fontFamily: "Satoshi-Regular",
                            color: "#524587",
                            boxShadow: " 0px 0px 4px 1px #DFDFFF",
                            minWidth: "max-content",
                            "& .MuiTooltip-arrow": {
                              color: "#ffffff",
                            },
                          },
                        },
                      }}
                      title={
                        <div className="flex flex-row items-center gap-1">
                          Remove
                        </div>
                      }
                    >
                      <Image
                        src={IconService.CloseIcon}
                        height={15}
                        width={15}
                        alt=""
                        className="cursor-pointer m-0 "
                      />
                    </Tooltip>
                  </span>
                )}
                {isCaseSuccess[item?.id]?.success && (
                  <span className=" upload-success case-number-sec">
                    {" "}
                    Success{" "}
                  </span>
                )}
              </div>
            </td>
            <td style={{ borderTop: "1px solid #E7E6F0" }}> {item?.size}</td>
            <td style={{ borderTop: "1px solid #E7E6F0" }}>
              <ProjectDropdown data={item} isDisabled={true} />
            </td>
            <td style={{ borderTop: "1px solid #E7E6F0" }}>
              <AliasDropdown
                data={item}
                isFolderTyle={
                  selectedAliasKey[data?.original?.id] ? true : false
                }
              />
            </td>
          </tr>
        </>
      ))}
    </>
  );
}
