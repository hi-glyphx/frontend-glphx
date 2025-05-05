import theme from "@/styles/theme";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import file_Upload from "../../assets/svg/logos/file_upload.svg";
import React, { Dispatch, SetStateAction } from "react";

type ContinueUploadProps = {
  leaveScreen: boolean;
  setLeaveScreen: Dispatch<SetStateAction<boolean>>;
};

const Continue_upload = ({
  leaveScreen,
  setLeaveScreen,
}: ContinueUploadProps) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={leaveScreen}
        onClose={() => setLeaveScreen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={leaveScreen}>
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
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                  >
                    Your upload is not completed yet. Would you like to cancel
                    the upload or stay on page and keep it continue?
                  </Typography>
                </Box>
                <Box className="mx-auto flex gap-6">
                  <Button
                    variant="outlined"
                    className="rounded-lg border-[#E7E6F0] font-bold text-lg py-3 px-6 uppercase"
                    onClick={() => setLeaveScreen(false)}
                  >
                    cancel upload
                  </Button>
                  <Button
                    variant="text"
                    className="rounded-lg text-lg py-3 px-6 uppercase"
                  >
                    continue upload
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

export default Continue_upload;
