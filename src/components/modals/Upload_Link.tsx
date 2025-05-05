import {
  Box,
  Button,
  Fade,
  Modal,
  Backdrop,
  Typography,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type HeaderProps = {
  uploadLink: boolean;
  setUploadLink: Dispatch<SetStateAction<boolean>>;
  setUploadSuccess?: Dispatch<SetStateAction<boolean>>;
};

const Upload_Link = ({
  uploadLink,
  setUploadLink,
  setUploadSuccess,
}: HeaderProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={uploadLink}
      onClose={() => setUploadLink(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={uploadLink}>
        <Box
          sx={{ maxWidth: "652px" }}
          className=" common-modal-bg color lg:py-10 lg:px-20 md:px-[20px] md:py-[10px] px-[20px] py-[10px]  flex flex-col justify-center gap-12 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Typography
            className=""
            id="transition-modal-title"
            color="text.secondary"
            variant="h3"
          >
            Upload a link
          </Typography>

          <Box className="w-full flex flex-col gap-10">
            {" "}
            <Box className="flex flex-col justify-center gap-8">
              <Box className="">
                <TextField
                  className="modal-textfield"
                  fullWidth
                  id="outlined-required"
                  label="Case Name"
                  defaultValue="Lorem ipsu"
                />{" "}
              </Box>
              <Box className="">
                <TextField
                  className="modal-textfield"
                  fullWidth
                  id="outlined-required"
                  label="Link"
                  defaultValue="http://Lorem ipsu"
                />
              </Box>
            </Box>
            <Box className="flex sm:flex-row flex-col gap-4 justify-end">
              <Button
                className="text-color btn px-6 py-3  text-base font-bold"
                variant="outlined"
                onClick={() => setUploadLink(false)}
              >
                CANCEL
              </Button>
              <Button
                className=" background px-6 py-3 text-base font-bold"
                variant="text"
                color="primary"
                onClick={() => {
                  if (setUploadSuccess) {
                    setUploadLink(false);
                    setUploadSuccess(true);
                  }
                }}
              >
                ADD
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Upload_Link;
