import Image from "next/image";
import IconService from "@/utils/Icons";
import { Tooltip } from "@mui/material";
import AliasDropdown from "@/components/tables/AliasDropDown";
import ProjectDropdown from "@/components/tables/ProjectDropdown";

export const uploadColumns = (isCaseError: object, isCaseSuccess: object) => [
  {
    Header: "Type",
    accessor: "status",
    minWidth: 200,
    Cell: (column: any) => {
      const toggleProps = column?.row?.original?.status
        ? column?.row.getToggleRowExpandedProps()
        : {};

      switch (column?.row?.original?.type) {
        case "folder":
          const isFolderOpen = column?.row?.isExpanded;
          return (
            <div
              className="flex flex-row items-center gap-1 "
              style={{ width: "max-content" }}
            >
              <div
                {...toggleProps}
                className={
                  column?.row?.original?.status?.length?.length > 1
                    ? "accordion-toggle"
                    : ""
                }
              >
                <Image
                  src={IconService.FolderIcon}
                  alt=""
                  className="mr-1 file-folder-icon-size"
                />

                <Image
                  src={ isFolderOpen ? IconService.UPArrow : IconService.DownArrow}
                  alt=""
                  className={`cursor-pointer file-folder-icon-size ${isFolderOpen ? "rotate-180" : ""}`}
                />
              </div>
            </div>
          );

        case "file":
          return (
            <div className="flex flex-row items-center gap-1 ">
              <Image
                src={IconService.FileIcon}
                className="mr-1 file-folder-icon-size"
                alt=""
              />
            </div>
          );
        case "link":
          return (
            <div className="flex flex-row items-center gap-1 ">
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
                      color: "#7260ED",
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
                    http://example.com/gs66w5w3tww
                  </div>
                }
              >
                <Image
                  src={IconService.linkTrack}
                  className="mr-1 file-folder-icon-size"
                  alt=""
                />
              </Tooltip>
            </div>
          );
        default:
          return null;
      }
    },
  },

  {
    Header: "Case Number",
    accessor: "item",
    sort: true,
    minWidth: 200,
    Cell: (column: any) => {
      return (
        <div className="flex flex-row items-center ">
          {column?.row?.original?.item &&
            column?.row?.original?.item.replace(/\.[^.]+$/, "")}
          {isCaseError[column.row.original.id]?.error && (
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
                  <div className="flex flex-row items-center gap-1">Remove</div>
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
          {isCaseSuccess[column.row.original.id]?.success && (
            <span className=" upload-success case-number-sec"> Success </span>
          )}
        </div>
      );
    },
  },
  {
    Header: "Size",
    accessor: "size",
    minWidth: 50,
  },
  {
    Header: "Project Name", 
    accessor: "project",
    minWidth: 50,
    Cell: (column: any) => {
      return <ProjectDropdown data={column?.row?.original} />;
    },
  },
  {
    Header: "Alias", //"Alias",
    accessor: "alias",
    minWidth: 50,
    width: 100,
    Cell: (column: any) => {
      return (
        column?.row?.original?.type !== "folder" && (
          <AliasDropdown data={column?.row?.original}    />
        )
      );
    },
  },
];
