import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Modal,
  Backdrop,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import theme from "@/styles/theme";
import { currencies } from "@/shared/config/types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTicket } from "@/Store/Reducer/TicketSlice";
import { AppDispatch } from "@/Store/Store";
import Toaster from "../Common/Toaster";
import { Verify } from "@/Store/Reducer/ExtractionSlice";
import { Classify } from "@/Store/Reducer/ClassificationSlice";

type Props = {
  open?: boolean;
  handleClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  isExtraction?: boolean;
  activeExtractionpage?: number;
  onSubmitToClose?: any;
};
const Raise_Ticket = ({
  open = false,
  handleClose,
  isExtraction,
  activeExtractionpage,
  onSubmitToClose,
}: Props) => {
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
    reported_by: existUserData?.user_id,
    priority_level: "",
    summary: "",
    ticket_type: "",
    form: "",
    status: "pending",
  };

  const Schema = Yup.object().shape({
    priority_level: Yup.string().required("Select priority_level"),
    ticket_type: Yup.string().required("Select ticket_type"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    onSubmit: (values) => {
      let request = {
        ...values,
        form: isExtraction
          ? extractionVerifyList?.field_order[0]?.[1]
          : classify?.items[0]?.id,
      };
      dispatch(createTicket(request)).then((res) => {
        if (res?.payload) {
          if (extractionVerifyList?.meta?.batch_id) {
            onSubmitToClose();
            // dispatch(Verify(`?format=json`));
          } else {
            // dispatch(Classify());
            onSubmitToClose();
          }
          Toaster({ customMessage: "Ticket has been created successfully" });
        } else {
          Toaster({ error: true, customMessage: "An error occurred" });
        }
      });
    },
  });
  const { active_page_num } = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );

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
          color={theme.palette.text.secondary}
          sx={{ maxWidth: "946px" }}
          className="common-modal-bg color lg:py-10 lg:px-20 md:px-[20px] md:py-[10px] px-[20px] py-[10px]  flex flex-col justify-center gap-10 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Typography className="" id="transition-modal-title" variant="h3">
            Raise a Ticket{" "}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box className="flex flex-col gap-10">
              {" "}
              <Box className="flex flex-col justify-center gap-8 ">
                <Box className="border border-solid border-[#E7E6F0] rounded-2xl px-6 pb-6 pt-9">
                  <Box className="grid  grid-cols-3 grid-rows-2  flex-col gap-6">
                    <Box>
                      <Typography variant="subtitle2">Reported By</Typography>
                      <Typography variant="body2" className="mt-2">
                        {existUserData?.username}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Case Number</Typography>
                      <Typography variant="body2" className="mt-2">
                        {isExtraction
                          ? extractionVerifyList?.meta?.case_num
                          : classify?.items[0]?.form_num}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Document Name</Typography>
                      <Typography variant="body2" className="mt-2">
                        {isExtraction
                          ? extractionVerifyList?.meta?.case_num
                          : active_page_num?.document_name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Page Number</Typography>
                      <Typography variant="body2" className="mt-2">
                        {activeExtractionpage
                          ? activeExtractionpage
                          : active_page_num?.page_name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Status</Typography>
                      <Typography variant="body2" className="mt-2">
                        pending
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="flex  gap-6 lg:flex-row flex-col">
                  <FormControl className="flex flex-col  gap-1 w-full">
                    <InputLabel id="demo-simple-select-label">
                      ticket_type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="ticket_type"
                      value={formik.values?.ticket_type}
                      onChange={formik.handleChange}
                      defaultValue="document"
                      label="ticket_type"
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="document">document</MenuItem>
                      <MenuItem value="workflow">workflow</MenuItem>
                      <MenuItem value="system">system</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.errors?.ticket_type &&
                        formik.touched.ticket_type &&
                        formik.errors?.ticket_type}
                    </FormHelperText>
                  </FormControl>

                  <FormControl className="flex flex-col  gap-1 w-full">
                    <InputLabel id="demo-simple-select-label">
                      priority_level
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="priority_level"
                      value={formik.values?.priority_level}
                      onChange={formik.handleChange}
                      label="priority_level"
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="p1">p1</MenuItem>
                      <MenuItem value="p2">p2</MenuItem>
                      <MenuItem value="p3">p3</MenuItem>
                      <MenuItem value="p4">p4</MenuItem>
                      <MenuItem value="p5">p5</MenuItem>
                    </Select>
                    <FormHelperText>
                      {formik.errors?.priority_level &&
                        formik.touched.priority_level &&
                        formik.errors?.priority_level}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Box>
              {/* <FormControl className="flex flex-col  gap-1 w-full">
                   
                   <TextField id="outlined-basic" label="Comment" variant="outlined"  name="summary" onChange={formik.handleChange}/>
      </FormControl> */}
              <Box className="absolute top-[106px]	left-[93px]">
                <Typography variant="body2" className="px-1 bg-white">
                  Details
                </Typography>
              </Box>
              <Box className="flex lg:flex-row flex-col justify-end gap-4">
                <Button
                  className="text-color btn px-6 py-3  text-base font-bold "
                  variant="outlined"
                  onClick={(e) =>
                    handleClose && handleClose(e, "escapeKeyDown")
                  }
                >
                  CANCEL
                </Button>
                <Button
                  className=" background px-6 py-3 text-base font-bold"
                  variant="text"
                  color="primary"
                  type="submit"
                >
                  RAISE TICKET
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Raise_Ticket;
