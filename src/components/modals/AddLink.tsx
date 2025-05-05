"use client";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  ListItemText,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAlias,
  getAllProjects,
  selectFile,
} from "@/Store/Reducer/CaseSlice";
import { SimpleCtx } from "../Common/Context";
import { AppDispatch } from "@/Store/Store";
import { BASE_URL } from "@/utils/HTTP";
import { SESSION } from "@/utils/Enums";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type HeaderProps = {
  uploadLinkModel: boolean;
  setUploadLinkModel: Dispatch<SetStateAction<boolean>>;
  linkDetail?: boolean;
  setShowTable?: any;
};

interface LinkFlags {
  // _meta?: {
  //   callback_url: string;
  // };
  download_url: string;
  fetch_files: boolean;
}

const AddLink = ({
  uploadLinkModel,
  setUploadLinkModel,
  linkDetail,
  setShowTable,
}: HeaderProps) => {
  const { caseDetail, allAliases } = useSelector(({ CaseSlice }) => CaseSlice);
  // const [selectedProject, setSelectedProject] = useState<any>();
  const [selectedAlias, setSelectedAlias] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (caseDetail?.data?.template_id) {
      dispatch(getAllAlias({ id: caseDetail?.data?.template_id }));
    }
  }, [caseDetail?.data?.template_id]);

  // const handleProjectChange = (
  //   event: SelectChangeEvent<typeof selectedProject>
  // ) => {
  //   setSelectedProject(event.target.value);
  //   setSelectedAlias({});

  // };
  const handleAliasChange = (
    event: SelectChangeEvent<typeof selectedAlias>
  ) => {
    setSelectedAlias(event.target.value);
  };

  const linkSchema = Yup.object({
    form_name: Yup.string().required("please enter form name"),
    link: Yup.string().required(" please enter link"),
    selecte_project: Yup.string().required(" please enter selecte project"),
    selecte_alias: Yup.string().required(" please enter selecte alias"),
    flags: Yup.array().of(
      Yup.object().shape({
        add_key: Yup.string().required("key is required"),
        add_value: Yup.string().required("value is required"),
      })
    ),
  });

  const caseDetailAddFormLink = async (values) => {
    const SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");

    let result = {};

    for (let i = 0; i < values?.flags?.length; i++) {
      const item = values?.flags[i];
      result[item.key] = item.value;
    }

    const linkFlags: any = {
      // _meta: { callback_url: "https://callback.mquotient.net/api/callback/" },
      download_url: `${values?.link}`,
      fetch_files: true,
    };
    // const mainFile = new File(values?.link, {
    //   type: "image/png",
    // });
    const formdata = new FormData();
    formdata.append("form_num", values?.form_name);
    formdata.append("file_type", "application/pdf");
    formdata.append("filename", values?.form_name);
    formdata.append("form_template_id", selectedAlias?.id);
    formdata.append("case_template_id", caseDetail?.data?.template_id);
    formdata.append("page_type", "form");
    formdata.append("flags", JSON.stringify({ ...linkFlags, ...result }));
    formdata.append("force_template", "false");
    formdata.append("image", values.link);

    const requestOptions: any = {
      method: "POST",
      body: formdata,
      headers: {
        Accept: "*/*",
        Authorization: `Basic ${btoa(
          `${SessionData.username}:${SessionData.password}`
        )}`,
      },
    };

    try {
      const response = await fetch(
        `${BASE_URL}/case/${caseDetail?.data?.case_id}/forms/`,
        requestOptions
      );
      if (response.ok) {
        setUploadLinkModel(false);
        const result = await response.text();
      } else {
        console.error(
          `HTTP Error: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const formik: any = useFormik({
    initialValues: {
      form_num: "",
      link: "",
      selecte_project: "",
      selecte_alias: "",
      type: "link",
      flags: [],
    },
    // validationSchema: linkSchema,
    onSubmit: (values) => {
      if (caseDetail?.data?.case_id) {
        caseDetailAddFormLink(values);
      } else {
        const id = uuid();
        // values.id = id;
        dispatch(selectFile({ ...values, id }));
        setUploadLinkModel(false);
        setShowTable(true);
      }
    },
  });

  const handleRemove = (index) => {
    const updatedFlags = [...formik.values.flags];
    updatedFlags.splice(index, 1);
    formik.setFieldValue("flags", updatedFlags);
  };

  useEffect(() => {
    if (uploadLinkModel) {
      dispatch(getAllProjects());
    }
  }, [uploadLinkModel, dispatch]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={uploadLinkModel}
      onClose={() => setUploadLinkModel(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={uploadLinkModel}>
        <Box
          sx={{ maxWidth: "652px" }}
          className="common-modal-bg lg:py-10 lg:px-20 md:px-[40px] md:py-[20px] px-[20px] py-[10px] shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Box className="flex flex-col justify-center gap-12">
            <Typography
              className=""
              color={theme.palette.text.secondary}
              id="transition-modal-title"
              variant="h3"
            >
              Add a link
            </Typography>
            <Box className="modal-body  pt-2">
              <Box className="flex flex-col  gap-10">
                <Box className="flex flex-col gap-4">
                  <Box className="flex flex-col gap-6">
                    <Box className="flex justify-center flex-col gap-8">
                      <Box className="">
                        <TextField
                          className="modal-textfield"
                          fullWidth
                          id="outlined-required"
                          label="Form Name"
                          name="form_name"
                          value={formik.values?.form_name}
                          onChange={formik.handleChange}
                          helperText={
                            formik.errors?.form_name &&
                            formik.touched.form_name &&
                            formik.errors?.form_name
                          }
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                      <Box>
                        <TextField
                          className="modal-textfield"
                          fullWidth
                          id="outlined-required"
                          label="Link"
                          name="link"
                          value={formik.values?.link}
                          onChange={formik.handleChange}
                          helperText={
                            formik.errors?.link &&
                            formik.touched.link &&
                            formik.errors?.link
                          }
                          onBlur={formik.handleBlur}
                        />
                      </Box>
                      {caseDetail?.data?.case_id && (
                        <>
                          {/* <Box>
                            <FormControl fullWidth className="h-15">
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={selectedProject}
                                name="selecte_project"
                                onChange={handleProjectChange}
                                displayEmpty
                                renderValue={(selected) => {
                                  if (!selected) {
                                    return (
                                      <Typography
                                        variant="subtitle2"
                                        color="secondary.light"
                                        className="p-0"
                                      >
                                        Select Project
                                      </Typography>
                                    );
                                  }
                                  return selected.name;
                                }}
                                MenuProps={MenuProps}
                                variant="outlined"
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                {allProjects &&
                                  allProjects?.map(
                                    (item: any, index: number) => (
                                      <MenuItem value={item} key={index}>
                                        {item.name}
                                      </MenuItem>
                                    )
                                  )}
                              </Select>
                            </FormControl>
                          </Box> */}

                          <Box>
                            <FormControl fullWidth className="h-15">
                              <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={selectedAlias}
                                name="selecte_alias"
                                onChange={handleAliasChange}
                                displayEmpty
                                renderValue={(selected) => {
                                  if (!selected) {
                                    return (
                                      <Typography
                                        variant="subtitle2"
                                        color="secondary.light"
                                        className="p-0"
                                      >
                                        Select Alias
                                      </Typography>
                                    );
                                  }
                                  return selected.alias;
                                }}
                                MenuProps={MenuProps}
                                variant="outlined"
                                inputProps={{ "aria-label": "Without label" }}
                              >
                                {allAliases &&
                                  allAliases?.map((name, index) => (
                                    <MenuItem
                                      key={index}
                                      value={name}
                                      disabled={caseDetail?.data?.documents?.some(
                                        (item) => {
                                          if (item?.alias == name?.alias) {
                                            return true;
                                          } else if (item?.alias == name?.id) {
                                            return true;
                                          } else {
                                            return false;
                                          }
                                        }
                                      )}
                                    >
                                      <ListItemText primary={name.alias} />
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </>
                      )}
                    </Box>

                    {/* <Box className="flex justify-between lg:flex-row flex-row">
                      <Typography
                        variant="h6"
                        color={theme.palette.text.secondary}
                        className="color "
                      >
                        Flags
                      </Typography>
                      <Button
                        variant="outlined"
                        className="color max-w-[69px] px-2 py-0 border border-solid border-gray-300 rounded-md"
                        onClick={handleNewField}
                      >
                        <AddIcon />
                        Add
                      </Button>
                    </Box> */}
                    <Box className="flex justify-between ">
                      <Typography
                        variant="h6"
                        color={theme.palette.text.secondary}
                        className="color "
                      >
                        Flags
                      </Typography>
                      <Button
                        variant="outlined"
                        className="color px-2 py-0 border border-solid border-gray-300 rounded-md"
                        onClick={() =>
                          formik.setFieldValue("flags", [
                            ...formik.values.flags,
                            { key: "", value: "" },
                          ])
                        }
                      >
                        <AddIcon />
                        Add
                      </Button>
                    </Box>
                  </Box>

                  <Box className="flex gap-4 flex-col  lg:flex-col ">
                    {formik.values.flags.map((pair, index) => (
                      <>
                        <Box className="flex flex-row gap-4">
                          <TextField
                            name={`flags.${index}.key`}
                            className="modal-textfield "
                            id="outlined-required"
                            fullWidth
                            value={pair.key}
                            label="Add Key"
                            onChange={formik.handleChange}
                          />
                          <TextField
                            name={`flags.${index}.value`}
                            className="modal-textfield w-full"
                            id="outlined-required"
                            label="Add Value"
                            fullWidth
                            value={pair.value}
                            onChange={formik.handleChange}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => handleRemove(index)}
                          >
                            -
                          </Button>
                        </Box>
                      </>
                    ))}
                  </Box>

                  {/* {formik.values.flags.map((contact, index) => (
                    <Box
                      className="flex gap-4 flex-col  lg:flex-row  "
                      key={contact.id}
                    >
                      <TextField
                        className="modal-textfield "
                        fullWidth
                        id="outlined-required"
                        label="Add Key"
                        defaultValue="H1"
                        {...formik.getFieldProps(`flags[${index}].add_key`)}
                        helperText={
                          formik.errors.flags?.[index]?.add_key &&
                          formik.errors.flags?.[index]?.add_key &&
                          formik.errors.flags?.[index]?.add_key
                        }
                      />

                      <TextField
                        className="modal-textfield w-full"
                        fullWidth
                        id="outlined-required"
                        label="Add Value"
                        defaultValue="ABC"
                        {...formik.getFieldProps(`flags[${index}].add_value`)}
                        helperText={
                          formik.errors.flags?.[index]?.add_value &&
                          formik.errors.flags?.[index]?.add_value &&
                          formik.errors.flags?.[index]?.add_value
                        }
                      />
                    </Box>
                  ))} */}
                </Box>
                <Box className="flex gap-4 lg:ml-auto lg:float-right flex-col  lg:flex-row ">
                  <Button
                    className="btn-text-color btn px-6 py-3 text-base font-bold"
                    variant="outlined"
                    onClick={() => setUploadLinkModel(false)}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className=" background px-6 py-3 text-base font-bold"
                    // variant="gradient"
                    color="primary"
                    onClick={formik.handleSubmit}
                  >
                    ADD
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

export default AddLink;
