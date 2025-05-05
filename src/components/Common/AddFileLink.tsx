import IconService from "@/utils/Icons";
import { Button, Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import AddFile from "../modals/AddFile";
import AddLink from "../modals/AddLink";

const AddFileLink = () => {
  const [uploadLinkModel, setUploadLinkModel] = React.useState<boolean>(false);
  const [addFileModel, setAddFileModel] = React.useState<boolean>(false);
  const [newFileLinkDorpdown, setNewFileLinkDorpdown] = React.useState(null);
  const handleNewFileLinkDorpdown = (event: any) => {
    setNewFileLinkDorpdown(event.currentTarget);
  };

  const handleNewFileLinkDorpdownClose = () => {
    setNewFileLinkDorpdown(null);
  };

  return (
    <div>
      {uploadLinkModel && (
        <AddLink
          uploadLinkModel={uploadLinkModel}
          setUploadLinkModel={setUploadLinkModel}
          linkDetail={true}
        />
      )}
      {addFileModel && (
        <AddFile
          addFileModel={addFileModel}
          setAddFileModel={setAddFileModel}
        />
      )}

      <Button
        variant="outlined"
        color="primary"
        className="w-full h-10"
        onClick={handleNewFileLinkDorpdown}
      >
        <Image
          src={IconService.addPrimary}
          width={15}
          height={15}
          alt=""
          className="mr-1"
        />
        ADD
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={newFileLinkDorpdown}
        keepMounted
        open={Boolean(newFileLinkDorpdown)}
        onClose={handleNewFileLinkDorpdownClose}
      >
        <MenuItem onClick={() => setAddFileModel(true)}>
          {" "}
          <Image
            src={IconService.FileUploadPrimary}
            height={20}
            width={20}
            alt=""
            className="mr-2"
          />{" "}
          File upload
        </MenuItem>

        <MenuItem onClick={() => setUploadLinkModel(true)}>
          <Image
            src={IconService.LinkUploadPrimary}
            height={20}
            width={20}
            alt=""
            className="mr-2 "
          />{" "}
          Link upload
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AddFileLink;
