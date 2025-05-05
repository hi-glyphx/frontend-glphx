import React, { Dispatch, SetStateAction } from "react";
import { Box, Modal, Fade, Backdrop, Button, Typography } from "@mui/material";
import theme from "@/styles/theme";
import file_Upload from "../../assets/svg/logos/file_upload.svg";

type SuccessProcessProps = {
  warningOpen: boolean;
  reloadWarning?: boolean;
  setReloadWarning?: Dispatch<SetStateAction<boolean>>;
  setWarning: Dispatch<SetStateAction<boolean>>;
  text?: string;
  isUploadScreen?: boolean;

  handleSubmit?: any;
  handleCancel?: any;
};
const Warning = ({
  warningOpen,
  setWarning,
  text,
  isUploadScreen,
  handleSubmit,
  handleCancel,
  reloadWarning,
  setReloadWarning,
}: SuccessProcessProps) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={warningOpen}
        onClose={() => setWarning(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={warningOpen}>
          <Box
            sx={{ maxWidth: "621px" }}
            className="common-modal-bg  lg:p-20 p-10 flex flex-col gap-2 justify-center text-center rounded-3xl"
          >
            <Box
              color={theme.palette.text.secondary}
              className="flex flex-col gap-2"
            >
              <Box className="mx-auto">
                {" "}
                <img src={file_Upload.src} />
              </Box>
              <Box className="flex flex-col gap-5">
                <Box className="flex flex-col gap-4">
                  <Typography
                    id="transition-modal-title"
                    color={theme.palette.text.secondary}
                    variant="h3"
                  >
                    Stay On The Page
                  </Typography>
                  <Typography variant="body1" color={theme.palette.error.light}>
                    {text}
                  </Typography>
                </Box>
                <Box className="mx-auto flex gap-6">
                  {isUploadScreen && (
                    <Button
                      variant="outlined"
                      className="rounded-lg border-[#E7E6F0] font-bold text-md py-3 px-6 uppercase"
                      onClick={() => handleSubmit()}
                    >
                      Cancel Upload
                    </Button>
                  )}
                  {
                    reloadWarning &&
                    <Button
                    variant="outlined"
                    className="rounded-lg border-[#E7E6F0] font-bold text-md py-3 px-6 uppercase"
                    onClick={() => handleSubmit()}
                  >
                    Cancel 
                  </Button>
                  }

                  <Button
                    variant="text"
                    className="rounded-lg text-md py-3 px-6 uppercase"
                    onClick={() => handleCancel()}
                  >
                    {isUploadScreen ? "Continue Upload" : "Continue"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Warning;
