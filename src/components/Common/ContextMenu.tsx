import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconService from "@/utils/Icons";
import Image from "next/image";
import { Button } from "@mui/material";
import AddLink from "../modals/AddLink";
import { useDispatch } from "react-redux";
import { selectFile } from "@/Store/Reducer/CaseSlice";
import { useDropzone } from "react-dropzone";
import { ContextMenuType } from "@/shared/config/types";
import { v4 as uuid } from "uuid";

interface ContextType {
  contextMenu?: ContextMenuType | null;
  handleContextMenu?: (event: React.MouseEvent<any>) => void;
  setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuType | null>>;
  style?: object;
  setShowTable?: any;
}

export default function ContextMenu({
  contextMenu,
  setContextMenu,
  handleContextMenu,
  style,
  setShowTable,
}: ContextType) {
  const [uploadLinkModel, setUploadLinkModel] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setContextMenu && setContextMenu(null);
  };

  const textRef: any = React.useRef(null);

  const handleFileUploadClick = () => {
    document.getElementById("folder")?.click();
  };

  const onDrop = React.useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const id = uuid();
      file.id = id;
      dispatch(selectFile(file));
      const reader = new FileReader();
    });
    setShowTable(true);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
        "application/pdf": [".pdf"],
      },
      useFsAccessApi: false,
    });

  return (
    <>
      <AddLink
        uploadLinkModel={uploadLinkModel}
        setUploadLinkModel={setUploadLinkModel}
        setShowTable={setShowTable}
      />

      <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
        <Button
          variant="outlined"
          color="primary"
          className="h-12 "
          style={style}
          ref={textRef}
          onClick={(e) =>
            setContextMenu &&
            setContextMenu(
              contextMenu === null
                ? {
                    mouseX: textRef.current.offsetLeft,
                    mouseY:
                      textRef.current.offsetTop +
                      textRef.current.clientHeight +
                      5,
                  }
                : null
            )
          }
        >
          <Image
            src={IconService.UploadIconPrimary}
            width={22}
            height={22}
            alt=""
            className="mr-1"
          />
          NEW
        </Button>

        {contextMenu && (
          <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu?.mouseY, left: contextMenu?.mouseX }
                : undefined
            }
          >
            <MenuItem className="py-2" onClick={handleFileUploadClick}>
              {" "}
              <Image
                src={IconService.NewCaseFolderUpload}
                height={20}
                width={20}
                alt=""
                className="mr-2"
              />{" "}
              <input
                {...getInputProps()}
                type="file"
                accept="image/png, image/gif, image/jpeg"
                webkitdirectory=""
                {...({ webkitdirectory: "" } as any)}
                id="folder"
                style={{ display: "none" }}
                {...({ webkitdirectory: "" } as any)}
              />
              New Case Folder
            </MenuItem>
            <MenuItem className="py-2">
              <div
                {...getRootProps()}
                className="cursor-pointer flex items-center"
              >
                <Image
                  src={IconService.FileUploadPrimary}
                  height={20}
                  width={20}
                  alt=""
                  className="mr-2"
                />
                Single File Upload
              </div>
              <input
                {...getInputProps()}
                id="folder"
                style={{ display: "none" }}
              />
            </MenuItem>
            {/* <MenuItem className="py-2">
              <Image
                src={IconService.FolderUploadPrimary}
                height={20}
                width={20}
                alt=""
                className="mr-2"
              />{" "}
              Folder upload
            </MenuItem> */}
            <MenuItem onClick={() => setUploadLinkModel(true)} className="py-2">
              <Image
                src={IconService.LinkUploadPrimary}
                height={20}
                width={20}
                alt=""
                className="mr-2 "
              />
              Link upload
            </MenuItem>
          </Menu>
        )}
      </div>
    </>
  );
}
