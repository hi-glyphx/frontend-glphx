import React, { Dispatch, SetStateAction } from "react";
import { Box, Button, Modal, Fade, Typography, Backdrop } from "@mui/material";
import Success from "../../assets/svg/logos/Success.svg";
import theme from "@/styles/theme";
import { useRouter } from "next/router";
import { clearSelectFile } from "@/Store/Reducer/CaseSlice";
import { useDispatch } from "react-redux";

type SuccessProcessProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setLeaveScreen?: Dispatch<SetStateAction<boolean>>;
};
const Success_process = ({
  open,
  setOpen,
  setLeaveScreen,
}: SuccessProcessProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{ maxWidth: "622px" }}
            className="common-modal-bg lg:p-20 p-10 flex flex-col gap-2 justify-center text-center shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-3xl	"
          >
            <Box
              color={theme.palette.text.secondary}
              className=" flex flex-col gap-2"
            >
              <Box className="mx-auto">
                <img src={Success.src} />
              </Box>
              <Box className="flex flex-col gap-10">
                <Box className="flex flex-col gap-4">
                  <Typography
                    id="transition-modal-title"
                    color={theme.palette.text.secondary}
                    variant="h3"
                  >
                    Success - Processing Now
                  </Typography>
                  <Typography
                    variant="body1"
                    color={theme.palette.text.primary}
                  >
                    Congratulation&rsquo;s! case/cases uploaded successfully
                  </Typography>
                </Box>
                <Box className=" flex gap-6">
                  <Button
                    variant="outlined"
                    className="W-[210px] rounded-lg border-[#E7E6F0] font-bold text-sm py-3 px-6 uppercase"
                    onClick={() => {
                      dispatch(clearSelectFile())
                      setOpen(false)
                    }}
                  >
                    upload more files
                  </Button>
                  <Button
                    variant="text"
                    className=" w-[228px] rounded-lg text-sm py-3 px-6 uppercase"
                    onClick={() => {
                      // setLeaveScreen(true);
                      dispatch(clearSelectFile());
                      router.push("/case");
                    }}
                  >
                    go to case list view
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

export default Success_process;
