import { selectFile } from "@/Store/Reducer/CaseSlice";
import ContextMenu from "@/components/Common/ContextMenu";
import { Uploader } from "@/components/dropzone/Dropzone";
import { ContextMenuType } from "@/shared/config/types";
import { formatBytes } from "@/utils/Functions";
import IconService from "@/utils/Icons";
import { Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

type SidebarProps = {
  setShowTable: Dispatch<SetStateAction<boolean>>;
  contextMenu?: ContextMenuType | null;
  handleContextMenu?: (event: React.MouseEvent<any>) => void;
  setContextMenu?: React.Dispatch<React.SetStateAction<ContextMenuType | null>>;
};

const AddYourCase = ({
  setShowTable,
  contextMenu,
  setContextMenu,
  handleContextMenu,
}: SidebarProps) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [totalSize, setTotalSize] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const id = uuid();
      file.id = id;
      dispatch(selectFile(file));
      const reader = new FileReader();
      reader.onload = () => {
        setTotalSize((prevTotalSize) => prevTotalSize + file.size);
      };
      reader.readAsDataURL(file);
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

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleIndividualFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        dispatch(selectFile(file));
        const reader = new FileReader();
        reader.onload = () => {
          setTotalSize((prevTotalSize) => prevTotalSize + file.size);
        };
        reader.readAsDataURL(file);
      });
      setShowTable(true);
    }
  };

  return (
    <Card variant="outlined" className="h-full">
      <div className="flex justify-center h-full items-center flex-col gap-y-10	">
        <div>
          <Typography variant="h1" color="text.secondary" textAlign="center">
          {/* Upload a document  */}
          Add Your Case
          </Typography>
          <div className="flex flex-row ... items-center gap-1">
            <Typography
              variant="subtitle1"
              color="secondary.primary"
              textAlign="center"
            >
              Now, Upload Your Case - you can upload single file per case and
              multiple file per case in a folder.{" "}
            </Typography>
            <Image
              src={IconService.SymbolsHelp}
              height={15}
              width={15}
              alt=""
            />
          </div>
        </div>
        <div className="w-4/5 flex flex-col gap-4" style={{ width: "80%" }}>
          <Card
            sx={{
              transitionDuration: "0.3s",
              height: "150.194px",
              border: "1px dashed #DADADA",
              width: "100%",
              position: "relative",
            }}
            {...getRootProps({
              isDragActive,
              className:
                "dropzone flex flex-col justify-center items-center gap-y-3.5 ",
            })}
            variant="outlined"
          >
            <input
              {...getInputProps()}
              type="file"
              webkitdirectory=""
              id="folder"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                opacity: 0,
                zIndex: 2,
              }}
              {...({ webkitdirectory: "" } as any)}
            />
            <Uploader setShowTable={setShowTable} />

            {/* <Button
              className="background px-6 py-3 text-base font-bold h-12"
              variant="text"
              color="primary"
              onClick={() => handleFileUploadClick()}
            >
              New
            </Button>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleIndividualFileUpload}
            /> */}
          </Card>
          <div className=" justify-center">
            <div className="flex flex-col gap-4 text-center">
              <span className="text-center">or</span>
              <ContextMenu
                style={{ width: "200px" }}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                handleContextMenu={handleContextMenu}
                setShowTable={setShowTable}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddYourCase;
