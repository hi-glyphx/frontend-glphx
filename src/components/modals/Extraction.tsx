import IconService from "@/utils/Icons";
import {
  Backdrop,
  Box,
  Checkbox,
  Fade,
  FormControlLabel,
  Modal,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type ExtractionProps = {
  extractionModal: boolean;
  setExtractionModel: Dispatch<SetStateAction<boolean>>;
};
const Extraction = ({
  extractionModal,
  setExtractionModel,
}: ExtractionProps) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={extractionModal}
        onClose={() => setExtractionModel(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={extractionModal}>
          <Box
            sx={{ maxWidth: "650px" }}
            className="common-modal-bg text-black rounded-2xl py-5 px-3"
          >
            <Box className="flex gap-7">
              <Typography
                className=" p-1 font-bold"
                id="transition-modal-title"
                variant="h2"
              >
                Mortgage
              </Typography>
              <Box className="flex gap-12">
                <Box className="flex gap-6 ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        icon={
                          <img
                            src={IconService.Uncheck.src}
                            alt="Uncheck icon"
                          ></img>
                        }
                        checkedIcon={
                          <img
                            src={IconService.CheckedIcon.src}
                            alt="Checked icon"
                          ></img>
                        }
                      />
                    }
                    label={
                      <Typography className="text-xl font-extrabold">
                        V.A.
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                        icon={
                          <img
                            src={IconService.Uncheck.src}
                            alt="Uncheck icon"
                          ></img>
                        }
                        checkedIcon={
                          <img
                            src={IconService.CheckedIcon.src}
                            alt="Checked icon"
                          ></img>
                        }
                      />
                    }
                    label={
                      <Typography className="text-xl font-extrabold">
                        Conventional
                      </Typography>
                    }
                  />
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      icon={
                        <img
                          src={IconService.Uncheck.src}
                          alt="Uncheck icon"
                        ></img>
                      }
                      checkedIcon={
                        <img
                          src={IconService.CheckedIcon.src}
                          alt="Checked icon"
                        ></img>
                      }
                    />
                  }
                  label={
                    <Typography className="text-xl font-extrabold">
                      Other.
                    </Typography>
                  }
                />
              </Box>
            </Box>
            <Box className="flex gap-4">
              <Typography id="transition-modal-title" variant="h2">
                Applied for:
              </Typography>
              <Box className="p-0 flex gap-5">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      icon={
                        <img
                          src={IconService.Uncheck.src}
                          alt="Uncheck icon"
                        ></img>
                      }
                      checkedIcon={
                        <img
                          src={IconService.CheckedIcon.src}
                          alt="Checked icon"
                        ></img>
                      }
                    />
                  }
                  label={
                    <Typography className="text-xl font-extrabold">
                      FHA
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                      icon={
                        <img
                          src={IconService.Uncheck.src}
                          alt="Uncheck icon"
                        ></img>
                      }
                      checkedIcon={
                        <img
                          src={IconService.CheckedIcon.src}
                          alt="Checked icon"
                        ></img>
                      }
                    />
                  }
                  label={
                    <Typography className=" text-xl font-extrabold">
                      USDA/Rural <br /> Housing Service
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Extraction;
