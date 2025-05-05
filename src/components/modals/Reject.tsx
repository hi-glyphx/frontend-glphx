import React from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Backdrop,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import theme from "@/styles/theme";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Store/Store";
import { createTicket } from "@/Store/Reducer/TicketSlice";
import {
  DeleteExtractionBatch,
  ExpireVerificationBatch,
  Verify,
} from "@/Store/Reducer/ExtractionSlice";
import {
  ClassificationBatch,
  Classify,
  DeleteClassificationBatch,
  setRemoveZeroIndex,
} from "@/Store/Reducer/ClassificationSlice";
import Toaster from "../Common/Toaster";
import { findValueInObject } from "@/utils/Functions";

interface  TYEPS  {
  open?:any,
  handleClose?:any,
  isExtraction?:any,
  setintigateApi?:any,
  setIndexSelected?:any,
  setActiveTab?:any
}

const Reject = ({
  open,
  handleClose,
  isExtraction,
  setintigateApi,
  setIndexSelected,
  setActiveTab,
}:TYEPS) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const existUserData =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("USER") as any);

  const { extractionVerifyList } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );

  const { classify } = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );

  const initialValues = {
    reported_by: existUserData?.account,
    priority_level: "p1",
    summary: "Invalid document type",
    ticket_type: "document",
    form: "",
    status: "pending",
    other: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (values.other) {
        values.summary = values.other;
      }

      let request = {
        reported_by: existUserData?.account,
        priority_level: "p1",
        summary: values?.summary,
        status: "pending",
        form: isExtraction
          ? extractionVerifyList?.field_order[0]?.[1]
          : classify?.items[0]?.id,
        ticket_type: "document",
      };

      dispatch(createTicket(request)).then((res) => {
        if (res?.payload) {
          if (isExtraction) {
            dispatch(
              DeleteExtractionBatch({
                batch_id: [`${extractionVerifyList?.meta?.batch_id}`],
              })
            ).then((res) => {
              if (res?.payload) {
                Toaster({ customMessage: "Batch rejected successfully." });
                dispatch(Verify(`?format=json`)).then((res) => {
                  if (!res?.payload?.meta?.batch_id) {
                    setintigateApi(true);
                  } else {
                    setintigateApi(false);
          
                    const verifyValue = findValueInObject(
                      res?.payload?.data,
                      "do_verification",
                      false
                    );
                    if (!verifyValue) {
                      setActiveTab("valid-fields");
                    }
                  }
                });
                handleClose();

                formik.resetForm();
              } else {
                Toaster({ error: true, customMessage: "An error occurred" });
              }
            });
          } else {
            dispatch(
              DeleteClassificationBatch({ batch_id: [classify?.items[0]?.id] })
            ).then((res) => {
              if (res?.payload) {
                Toaster({ customMessage: "Batch rejected successfully" });

                if (classify?.items?.length > 1) {
                  dispatch(setRemoveZeroIndex());
                  setIndexSelected(0);
                } else {
                  dispatch(Classify()).then((res) => {
                    if (!res?.payload?.items?.length) {
                      setintigateApi && setintigateApi(true);
                      setIndexSelected(0);
                    } else {
                      setintigateApi && setintigateApi(false);
                      setIndexSelected(0);
                    }
                  });
                }

                handleClose();
                formik.resetForm();
              } else {
                Toaster({ error: true, customMessage: "An error occurred" });
              }
            });
          }
        }
      });
    },
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
          className="common-modal-bg color lg:py-10 lg:px-20 md:px-[20px] md:py-[10px] px-[20px] py-[10px]  flex flex-col justify-center gap-6 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <form onSubmit={formik.handleSubmit}>
            <Typography
              id="transition-modal-title"
              variant="h3"
              color={theme.palette.text.secondary}
            >
              Reject{" "}
            </Typography>
            <Box className="flex flex-col gap-8">
              <Box className="flex flex-col gap-4">
                <Box>
                  <Typography variant="h6" color={theme.palette.text.secondary}>
                    Select/Write reasons for rejection{" "}
                  </Typography>
                </Box>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="summary"
                    value={formik.values.summary}
                    onChange={formik.handleChange}
                  >
                    {[
                      "Invalid document type",
                      "Incomplete document",
                      "Incorrect document orientation",
                      "The document in incorrect language",
                      "The document has incorrect formatting",
                      "The document is suspected to be fraudulent",
                      "Incorrect Classification",
                      "Incorrect Extraction",
                      "Not in scope",
                      "Page not loading",
                      "Other",
                    ].map((reason) => (
                      <FormControlLabel
                        key={reason}
                        value={reason}
                        control={<Radio />}
                        label={reason}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              {formik.values.summary === "Other" && (
                <Box className="rounded-2xl shadow-[0_0px_10px_1px] shadow-[#DFDFFF]">
                  <TextField
                    name="other"
                    className="reject-textfield w-full"
                    id="outlined-textarea"
                    label="Write your reason"
                    multiline
                    onChange={(e) => {
                      formik.handleChange(e);
                    }}
                    value={formik.values.other}
                  />
                </Box>
              )}
            </Box>

            <Box className="flex md:flex-row flex-col justify-end gap-4">
              <Button
                className="text-color btn px-6 py-3  text-base font-bold gap-2"
                variant="outlined"
                onClick={handleClose}
              >
                CANCEL
              </Button>
              <Button
                className="background px-6 py-3 text-base font-bold gap-2"
                variant="text"
                color="primary"
                type="submit"
              >
                SAVE
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Reject;
