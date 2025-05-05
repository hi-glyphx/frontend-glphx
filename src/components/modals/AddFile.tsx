"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  ListItem,
} from "@mui/material";
import theme from "@/styles/theme";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import IconService from "@/utils/Icons";
import Add_File from "./Add_a_File";
import { useRouter } from "next/router";
type HeaderProps = {
  addFileModel: boolean;
  setAddFileModel: Dispatch<SetStateAction<boolean>>;
};
const AddFile = ({
  addFileModel,

  setAddFileModel,
}: HeaderProps) => {
  const router = useRouter();
  const [openFileModel, setOpenFileModel] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file, index) => {
      if (file) {
        setOpenFileModel(true);
        setFileName(file);
      }
      const reader = new FileReader();
    });
  }, []);

  // useEffect(() => {
  //   if (openFileModel == true) {
  //     setAddFileModel(false);
  //   }
  // }, [openFileModel]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
        "application/pdf": [".pdf"],
      },
      useFsAccessApi: false,
    });

  const files = acceptedFiles.map((file: any) => (
    <ListItem key={file.path}>
      {file.path} - {Math.round(file.size / 1000)} kB
    </ListItem>
  ));

  return (
    <>
      <Add_File
        addFileModal={openFileModel}
        setOpenFileModel={setOpenFileModel}
        fileName={fileName}
        setAddFileModel={setAddFileModel}
      />
      {!openFileModel && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addFileModel}
          onClose={() => setAddFileModel(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={addFileModel}>
            <Box
              sx={{ maxWidth: "652px" }}
              className="common-modal-bg py-10 px-20 rounded-2xl shadow-[0_0_24px_0_rgba(0,0,0,0.15)]"
            >
              <Box className="flex flex-col justify-center gap-2">
                <Typography
                  id="transition-modal-title"
                  variant="h3"
                  className="color"
                  color={theme.palette.text.secondary}
                >
                  Add a File
                </Typography>
                <Box className="">
                  <section className="container  rounded-2xl	 border-dashed border-2 block text-center text-indigo-900 text-xl font-bold px-32 py-10">
                    <Box className="flex flex-col gap-6">
                      <div
                        {...getRootProps({ className: "dropzone" })}
                        className=" flex justify-center items-center flex-col gap-y-3.5"
                      >
                        <input {...getInputProps()} />
                        <Image
                          src={IconService.iconUpload}
                          height={50}
                          width={50}
                          alt=""
                        />
                        <Typography
                          variant="h5"
                          color="text.secondary"
                          textAlign="center"
                        >
                          Drop Files here
                        </Typography>{" "}
                      </div>
                      <Typography className=" text-xl text-gray-300 font-normal">
                        Or
                      </Typography>
                      <Box className=" flex gap-4 ">
                        <Button
                          className=" text-color btn px-6 py-3  text-base font-bold"
                          variant="outlined"
                          onClick={() => setAddFileModel(false)}
                        >
                          CANCEL
                        </Button>

                        <Button
                          {...getRootProps()}
                          className=" background px-6 py-3 text-base font-bold"
                          variant="text"
                          color="primary"
                        >
                          ADD
                        </Button>
                      </Box>
                    </Box>
                  </section>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default AddFile;
