"use Client";
import { Box, Button, Modal, Backdrop, Fade, Typography } from "@mui/material";
import React, { useState } from "react";
import theme from "@/styles/theme";
import IconService from "@/utils/Icons";
import Image from "next/image";

interface TYPE {
  open?: any;
  handleClose?: any;
  dispatchFunction?: any;
  csv?: boolean;
}

const Download_File = ({ open, handleClose, dispatchFunction, csv }: TYPE) => {
  const [pdfexcel, setPdfExcel] = useState<{
    id: number;
  }>({
    id: 1,
  });

  return (
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
          sx={{ maxWidth: "652px" }}
          className="common-modal-bg lg:py-10 lg:px-20 px-[20px] py-[10px]  flex flex-col justify-center gap-10 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Typography
            id="transition-modal-title"
            variant="h3"
            color={theme.palette.text.secondary}
          >
            Download File As{" "}
          </Typography>

          <div className="flex justify-center items-center">
            {csv ? (
              <Box
                onClick={() => setPdfExcel({ id: 1 })}
                className={`excel-file  border border-solid  ${
                  pdfexcel?.id == 1 ? "border-[#7260ED]" : "border-[#E7E6F0]"
                }  rounded-lg w-full p-[10px] flex justify-center items-center flex-col `}
              >
                <div className="flex justify-end items-end w-full">
                  <Image
                    className={`${
                      pdfexcel?.id == 1
                        ? IconService.checkedRounded
                        : "invisible"
                    }`}
                    src={pdfexcel?.id == 1 ? IconService.checkedRounded : ""}
                    height={18}
                    width={18}
                    alt=""
                  />
                </div>
                <Box className="w-full flex flex-col gap-4 p-3">
                  <div className=" text-center ">
                    <img src={IconService.Excel.src} />
                  </div>
                  <Typography
                    variant="h6"
                    color={theme.palette.primary.main}
                    className="text-center	 "
                  >
                    EXCEL
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                onClick={() => setPdfExcel({ id: 2 })}
                className={`excel-file  border border-solid  ${
                  pdfexcel?.id == 2 ? "border-[#7260ED]" : "border-[#E7E6F0]"
                }  rounded-lg w-full p-[10px]  flex-col  w-2/4 `}
              >
                <div className="flex justify-end items-end w-full">
                  <Image
                    className={`${
                      pdfexcel?.id == 2
                        ? IconService.checkedRounded
                        : "invisible"
                    }`}
                    src={pdfexcel?.id == 2 ? IconService.checkedRounded : ""}
                    height={18}
                    width={18}
                    alt=""
                  />
                </div>
                <Box className="w-full flex flex-col gap-4 p-3">
                  <div className=" text-center ">
                    <img src={IconService.PDF.src} />
                  </div>
                  <Typography
                    variant="h6"
                    color={theme.palette.primary.main}
                    className="text-center	 "
                  >
                    PDF
                  </Typography>
                </Box>
              </Box>
            )}
          </div>
          <Box className="flex gap-4 float-right ml-auto ">
            <Button
              className="text-color btn px-6 py-3 text-base font-bold"
              variant="outlined"
              onClick={handleClose}
            >
              CANCEL
            </Button>
            <Button
              className=" background px-6 py-3 text-base font-bold"
              color="primary"
              onClick={() => dispatchFunction()}

              // href={`http://18.189.133.125/media/forms/${id}/content`}
            >
              CONFIRM
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Download_File;
