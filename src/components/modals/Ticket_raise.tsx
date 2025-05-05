import React from "react";
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
  Card,
  Grid,
} from "@mui/material";
import theme from "@/styles/theme";
import { currencies } from "@/shared/config/types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createTicket, ticketList } from "@/Store/Reducer/TicketSlice";
import { AppDispatch } from "@/Store/Store";
import Toaster from "../Common/Toaster";

const Ticket_raise = ({ open = false, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const existUserData =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("USER") as any);

  const initialValues = {
    reported_by: existUserData?.user_id,
    priority_level: "",
    summary: "",
    ticket_type: "",
    status: "pending",
  };

  const Schema = Yup.object().shape({
    priority_level: Yup.string().required("Select priority_level"),
    ticket_type: Yup.string().required("Select ticket_type"),
    summary: Yup.string().required("Summary is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Schema,
    onSubmit: (values) => {
      let request = {
        ...values,
        // form: isExtraction
        //   ? extractionVerifyList?.field_order[0]?.[1]
        //   : classify?.items[0]?.id,
      };
      dispatch(createTicket(request)).then((res) => {
        if (res?.payload) {
          //   router.push("/glyphx/tickets");
          Toaster({ customMessage: "Ticket has been created successfully" });
          handleClose();
          formik.resetForm();
          // dispatch(ticketList())
        } else {
          Toaster({ error: true, customMessage: "An error occurred" });
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
          color={theme.palette.text.secondary}
          sx={{ maxWidth: "946px" }}
          className="common-modal-bg color lg:py-10 lg:px-20 md:px-[20px] md:py-[10px] px-[20px] py-[10px]  flex flex-col justify-center gap-10 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Typography className="" id="transition-modal-title" variant="h3">
            Raise a Ticket{" "}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl className="flex flex-col  gap-9 w-full">
                  <TextField
                    id="outlined-required"
                    label="User Name"
                    defaultValue="User Name"
                    variant="outlined"
                    name="username"
                    value={existUserData?.username}
                  />
                </FormControl>
              </Grid>
             
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              {/*Text field changed to Text Area*/}
              <Grid item xs={12} sm={6}>
              <FormControl className="flex flex-col gap-9 w-full">
                <label htmlFor="summary" className="mb-2">
                  Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                className="border border-solid border-[#E7E6F0] rounded-2xl px-4 py-2 w-full"
                rows={8} 
                value={formik.values?.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ minHeight: "150px" }}
              />
              {formik.errors?.summary && formik.touched.summary && (
                <Typography variant="body2" color="error">
                  {formik.errors.summary}
                </Typography>
              )}
            </FormControl>
            </Grid>
            </Grid>
            <Box className="flex lg:flex-row flex-col justify-end gap-4">
              <Button
                className="text-color btn px-6 py-3  text-base font-bold "
                variant="outlined"
                onClick={handleClose}
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
            {/* </Box> */}
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Ticket_raise;
