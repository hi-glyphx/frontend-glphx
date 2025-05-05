import React from "react";

import theme from "@/styles/theme";
import { Box, Button, Fade, Modal, Backdrop, Typography } from "@mui/material";
import Status from "../status/Status";

type Props = {
  open?: boolean;
  handleClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
    rowData?: any;
};

const Raised_Ticket_Details = ({ open = false, handleClose, rowData  }: Props) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
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
            sx={{ maxWidth: "946px" }}
            className="common-modal-bg outline-none color lg:pt-10 lg:pb-20 lg:px-20 md:pt-[10px] md:pb-[20px] md:px[10] px-[20px] pt-[20px] pb-[20px] flex flex-col justify-center gap-10 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
          >
            <Box className="flex justify-between sm:flex-row flex-col">
              <Typography
                id="transition-modal-title"
                variant="h3"
                color={theme.palette.text.secondary}
              >
                Raised Ticket Details
              </Typography>
            </Box>

            <Box
              className="flex flex-col gap-10"
              color={theme.palette.text.secondary}
            >
              {" "}
              <Box className="absolute lg:top-[119px]	lg:left-[95px] md:top-[90px] md:left-[40px]  sm:top-[99px] sm:left-[40px] top-[136px] left-[40px] ">
                <Typography variant="body2" className="px-1 bg-white">
                  Details
                </Typography>
              </Box>
              <Box className="flex flex-col justify-center gap-8 ">
                <Box className="border border-solid border-[#E7E6F0] rounded-2xl px-6 pb-6 pt-9 ">
                  <Box className="grid  grid-cols-3 grid-rows-3  flex-col gap-6">
                    <Box>
                      <Typography variant="subtitle2">Reported By</Typography>
                      <Typography variant="body2">{rowData ? rowData?.reported_by : ""}</Typography>
                    </Box>
                    {/* <Box>
                      <Typography variant="subtitle2">Age</Typography>
                      <Typography variant="body2">32</Typography>
                    </Box> */}
                    <Box>
                      <Typography variant="subtitle2">Status</Typography>
                      {/* <Status text={"in_progress"} /> */}
                      <Typography variant="body2">{rowData ? rowData?.status : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Case Number</Typography>
                      <Typography variant="body2">{rowData ? rowData?.case_num : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Document Name</Typography>
                      <Typography variant="body2">{rowData ? rowData?.document_name : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Ticket Type</Typography>
                      <Typography variant="body2">{rowData ? rowData?.ticket_type : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">
                        Issue Priority
                      </Typography>
                      <Typography variant="body2">{rowData ? rowData?.priority_level : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Start Date</Typography>
                      <Typography variant="body2">{rowData ? rowData?.created_at : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">End Date</Typography>
                      <Typography variant="body2">{rowData ? rowData?.completed_at : ""}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Ticket Id</Typography>
                      <Typography variant="body2">{rowData ? rowData?.ticket_id : ""}</Typography>
                    </Box>
                    <Box className="col-span-3">
                      <Typography variant="subtitle2">Summary</Typography>
                      <Typography variant="body2" className="break-words">{rowData ? rowData?.summary : ""}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Raised_Ticket_Details;
