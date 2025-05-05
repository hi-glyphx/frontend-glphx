import { List, ListItem, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import IconService from "@/utils/Icons";
import { useDispatch } from "react-redux";
import { selectFile } from "@/Store/Reducer/CaseSlice";

export const Uploader = ({ setShowTable }) => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file, index) => {
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

  const files = acceptedFiles.map((file: any) => (
    <ListItem key={file.path}>
      {file.path} - {Math.round(file.size / 1000)} kB
    </ListItem>
  ));

  return (
    <section className=" flex justify-center items-center flex-col ">
      <div
        // {...getRootProps({ isDragActive, className: "dropzone" })}
        className=" flex justify-center items-center flex-col gap-y-3.5"
      >
        <input
          {...getInputProps()}
          type="file"
          webkitdirectory=""
          className="invisible"
          {...({ webkitdirectory: "" } as any)}
        />
        <Image src={IconService.iconUpload} height={50} width={50} alt="" />
        <Typography variant="h5" color="text.secondary" textAlign="center">
          Drop Files / Folder here
        </Typography>{" "}
      </div>
    </section>
  );
};
