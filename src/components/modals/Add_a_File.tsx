import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import theme from "@/styles/theme";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils/HTTP";
import { SESSION } from "@/utils/Enums";
import { CaseDetailById, setClearCaseDetail } from "@/Store/Reducer/CaseSlice";
import { AppDispatch } from "@/Store/Store";

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

type AddFileProps = {
  addFileModal: boolean;
  setOpenFileModel: Dispatch<SetStateAction<boolean>>;
  setAddFileModel: Dispatch<SetStateAction<boolean>>;
  fileName: string;
};
const Add_File = ({
  addFileModal,
  setOpenFileModel,
  fileName,
  setAddFileModel,
}: AddFileProps) => {
  const router = useRouter();
  const { allAliases } = useSelector(({ CaseSlice }) => CaseSlice);
  const caseId = router.query;

  type InitialValues = {
    fileName: string;
    alias: string;
    flags: { key: string; value: string }[];
  };

  const initialValues: InitialValues = {
    fileName: "",
    alias: "",
    flags: [],
  };

  const { id } = router.query;

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values) => {
    const SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");

    const formFlags = values.flags.reduce((acc, flag) => {
      acc[flag.key] = flag.value;
      return acc;
    }, {});

    const formdata = new FormData();
    formdata.append("form_num", values.fileName.split(".")[0]);
    const fileNameType = values.fileName?.type || "";
    formdata.append("file_type", fileNameType);
    formdata.append("filename", values.fileName.split(".")[0]);
    formdata.append("form_template_id", values.alias);
    formdata.append("case_template_id", caseId?.id as string);
    formdata.append("page_type", "form");
    formdata.append("flags", JSON.stringify(formFlags));
    formdata.append("force_template", "false");
    formdata.append("image", fileName);

    const requestOptions = {
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
        `${BASE_URL}/case/${caseId.id}/forms/`,
        requestOptions
      );
      if (response.ok) {
        setOpenFileModel(false);
        setAddFileModel(false);
        dispatch(CaseDetailById(id));
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

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (fileName) {
      formik.setFieldValue("fileName", (fileName as any)?.path);
    }
  }, [fileName]);

  const handleRemove = (index) => {
    const updatedFlags = [...formik.values.flags];
    updatedFlags.splice(index, 1);
    formik.setFieldValue("flags", updatedFlags);
  };

  const [selectedAlias, setSelectedAlias] = useState<any>();

  const handleAliasChange = (
    event: SelectChangeEvent<typeof selectedAlias>
  ) => {
    setSelectedAlias(event.target.value);
    const value = (event?.target?.value as any)?.id;
    formik.setFieldValue("alias", value);
  };

  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addFileModal}
        onClose={() => setOpenFileModel(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={addFileModal}>
          <Box
            sx={{ maxWidth: "652px" }}
            className="common-modal-bg   lg:py-10 lg:px-20 md:px-[20px] md:py-[10px] px-[20px] py-[10px] shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xlb overflow-y-scroll"
          >
            <Box className="flex flex-col gap-11">
              <Typography
                className="color"
                id="transition-modal-title"
                variant="h3"
                color={theme.palette.text.secondary}
              >
                Add a File
              </Typography>
              <Box className="modal-body overflow-y-auto pt-2">
                <Box className="flex flex-col  gap-10">
                  <Box className="flex flex-col gap-4">
                    <Box className="flex flex-col gap-6">
                      <Box className="flex justify-center flex-col gap-8">
                        <Box className="">
                          <TextField
                            className="modal-textfield"
                            fullWidth
                            id="outlined-required"
                            label="File Name"
                            // defaultValue="Lorem ipsu"
                            value={formik.values.fileName}
                            onChange={formik.handleChange}
                          />
                        </Box>

                        <Box>
                          {/* <TextField
                            className="dropdown-color"
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Select Alias"
                            defaultValue="Invoice 3"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(event)}
                          >
                            {allAliases.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField> */}

                          <FormControl fullWidth className="h-15">
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              value={selectedAlias}
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
                                allAliases?.map((option, index) => (
                                  <MenuItem
                                    key={index}
                                    value={option}
                                    disabled={caseDetail?.data?.documents?.some(
                                      (item) => {
                                        if (item?.alias == option?.alias) {
                                          return true;
                                        } else if (item?.alias == option?.id) {
                                          return true;
                                        } else {
                                          return false;
                                        }
                                      }
                                    )}
                                  >
                                    {option.alias}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>

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
                  </Box>
                  <Box className="flex gap-4 lg:ml-auto lg:float-right flex-col  lg:flex-row ">
                    <Button
                      className="btn-text-color btn px-6 py-3 text-base font-bold"
                      variant="outlined"
                      onClick={() => setOpenFileModel(false)}
                    >
                      CANCEL
                    </Button>
                    <Button
                      className=" background px-6 py-3 text-base font-bold"
                      color="primary"
                      onClick={() => formik.handleSubmit()}
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
    </>
  );
};

export default Add_File;
