import React, { Dispatch, SetStateAction } from "react";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import Success from "../../assets/svg/logos/Success.svg";
import theme from "@/styles/theme";

type HeaderProps = {
  successAlise: boolean;
  setSuccessAlise: Dispatch<SetStateAction<boolean>>;
};

const Alias_Success = ({ successAlise, setSuccessAlise }: HeaderProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={successAlise}
      onClose={() => setSuccessAlise(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={successAlise}>
        <Box
          sx={{ maxWidth: "651px" }}
          className="common-modal-bg lg:p-20 p-10 flex flex-col gap-2 justify-center text-center shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Box>
            <Box color={theme.palette.text.secondary} className=" ">
              <Box className="mx-auto">
                {" "}
                <img src={Success.src} />
              </Box>
              <Box className="flex flex-col gap-10">
                <Box className="flex flex-col gap-4">
                  <Typography
                    id="transition-modal-title"
                    color={theme.palette.text.secondary}
                    variant="h3"
                  >
                    Alias Added Successfully
                  </Typography>
                  <Typography
                    className="font-semibold	text-base	"
                    color={theme.palette.text.primary}
                  >
                    {`All 'Health Master' projects have been given the alias
                    ‘Invoice 3’.`}
                  </Typography>
                </Box>
                <Box className="mx-auto ">
                  <Button
                    variant="text"
                    color="primary"
                    className="rounded-lg"
                    onClick={() => {
                      setSuccessAlise(false);
                    }}
                  >
                    GO TO UPLOAD CASES VIEW
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Alias_Success;
