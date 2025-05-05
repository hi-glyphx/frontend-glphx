import { Box, Modal, Typography, Fade, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Dispatch, SetStateAction } from "react";
import theme from "@/styles/theme";
import TableTwo from "../tables/TableTwo";
import { useDispatch, useSelector } from "react-redux";
import { clearCaseFormFlagsDetail } from "@/Store/Reducer/CaseSlice";
import { AppDispatch } from "@/Store/Store";

type MenuItemsListProps = {
  key: string;
  value: string;
};
type HeaderProps = {
  viewFlagModal: boolean;
  setViewFlagModel: Dispatch<SetStateAction<boolean>>;
};


const ViewFlag = ({
  viewFlagModal,

  setViewFlagModel,
}: HeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { caseFormFlagsDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const matchingKeyAndValue =
    caseFormFlagsDetail?.flags &&
    Object?.entries(caseFormFlagsDetail?.flags).map(([key, value]) => ({
      key,
      value,
    }));



  return (
    <Modal
      className="border-0"
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={viewFlagModal}
      onClose={(event, reason) => {
        if (reason && reason == "backdropClick") return;
        setViewFlagModel(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={viewFlagModal}>
        <Box
          sx={{ maxWidth: "842px" }}
          className="common-modal-bg lg:px-20 lg:py-10 md:px-[40px] md:py-[20px] px-[20px] py-[10px] shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl border-0"
        >
          <Box className="flex flex-col gap-4">
            <Box className="flex justify-between ">
              <Typography
                className=""
                id="transition-modal-title"
                variant="h3"
                color={theme.palette.text.secondary}
              >
                View Flags
              </Typography>
              <CloseIcon
                onClick={() => {
                  setViewFlagModel(false);
                  dispatch(clearCaseFormFlagsDetail());
                }}
              />
            </Box>

            <Box className="  ">
              <Box className="flex flex-col gap-2">
                <Box className="flex gap-24">
                  <Typography
                    className="text-sm font-normal not-italic"
                    id="transition-modal-description"
                  >
                    Alias:
                  </Typography>
                  <Typography
                    className=" text-sm font-bold not-italic "
                    id="transition-modal-description"
                    color={theme.palette.text.secondary}
                  >
                    {caseFormFlagsDetail?.alias}
                  </Typography>
                </Box>

                <Box className="flex gap-5">
                  <Typography
                    className="text-sm font-normal not-italic"
                    id="transition-modal-description"
                  >
                    Document Name:
                  </Typography>
                  <Typography
                    className="text-sm font-bold not-italic"
                    id="transition-modal-description"
                    color={theme.palette.text.secondary}
                  >
                    {caseFormFlagsDetail?.form_num}
                  </Typography>
                </Box>
                <Box className="flex gap-[76px]">
                  <Typography
                    className=" text-sm font-normal not-italic"
                    id="transition-modal-description"
                  >
                    Form ID:{" "}
                  </Typography>
                  <Typography
                    className=" text-sm font-bold not-italic"
                    id="transition-modal-description"
                    color={theme.palette.text.secondary}
                  >
                    {caseFormFlagsDetail?.form_id}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <TableTwo data={matchingKeyAndValue} caseFlagFuild={undefined} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewFlag;
