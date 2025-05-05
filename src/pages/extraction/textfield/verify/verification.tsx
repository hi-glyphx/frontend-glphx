import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  TooltipProps,
  Typography,
  tooltipClasses,
} from "@mui/material";
import GridLayout from "@/views/Extraction/Layout/GridLayout";
import ListLayout from "@/views/Extraction/Layout/ListLayout";
import Raise_Ticket from "@/components/modals/Raise_Ticket";
import Image from "next/image";
import IconService from "@/utils/Icons";
import CommonHeader from "@/components/Common/Header";
import { useRouter } from "next/router";
import "@/views/Extraction/Extraction.module.css";
import "@/views/Extraction/Extraction.module.css";
import Download_File from "@/components/modals/Download_File";
import Reject from "@/components/modals/Reject";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearVerifyData,
  Verify,
  dynamicFieldValidation,
  expiresVerification,
  verificationSaveChanges,
} from "@/Store/Reducer/ExtractionSlice";
import CanvasComponent from "@/components/Common/CanvasComponent";
import { FieldValue, HighlightPosition } from "@/utils/TYPES";
import Warning from "@/components/modals/Warning";
import CancelIcon from "@mui/icons-material/Cancel";
import { downloadURI, findValueInObject } from "@/utils/Functions";
import { BASE_URL, fetchImageURL } from "@/utils/HTTP";
import { TextFieldsResultItem } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Save_Documents from "@/components/modals/Save_Documents";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
const layoutOptions = [
  {
    name: "Default",
    svg: IconService.DefaultIcon,
  },
  {
    name: "List",
    svg: IconService.ListIcon,
  },
  // {
  //   name: "Grid",
  //   svg: IconService.GridIcon,
  // },
  // {
  //   name: "TableList",
  //   svg: IconService.TableList,
  // },
];
interface Dimensions {
  width: string;
  height: string;
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const Verification = () => {
  const [activeTab, setActiveTab] = useState<string>("verify-fields");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [initialPos, setInitialPos] = useState<number>(0);
  const [initialSize, setInitialSize] = useState<number | string | null>(null);
  const [avtiveRef, setAvtiveRef] = useState<any>(false);
  const [lineShow, setLineShow] = useState(false);
  const [highlightText, setHighlightText] = useState<any>("");
  // const [zoomLevel, setZoomLevel] = useState(1);

  const [zoomLevel, setZoomLevel] = useState<number>(
    Math.min(200, Math.max(100, 100))
  );
  const textFieldRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const [dimensions, setDimensions] = useState<Dimensions>({
    width: "100",
    height: "100",
  });
  const [searchText, setSearchText] = useState("");
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition>(
    {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  );
  const [fieldValues, setFieldValues] = useState<Record<string, FieldValue>>(
    {}
  );

  // useEffect(() => {
  //   if (Object.entries(fieldValues).length < 2) {
  //     setTimeout(() => {

  //     }, timeout);
  //     setStageY(0);
  //   }
  // }, [fieldValues]);

  const onFocusTimeRef = useRef({});
  const [warningOpen, setWarning] = useState<boolean>(false);
  const [reloadWarning, setReloadWarning] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>("");
  const [save, setSave] = useState<boolean>(false);
  const [isZoom, setIsZoom] = useState<boolean>(false);

  const [errorVelidaton, setErrorVelidation] = useState({});
  const dispatch = useDispatch<AppDispatch>();
  const [extrationIMG, setExtrationIMG] = useState<string | undefined>();
  const { extractionVerifyList } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );
  const [inputCoordinates, setinputCoordinates] = useState<DOMRect>();
  const [activePageNumber, setActivePageNumber] = useState<number>();
  function getPageNumberByIndex(pageId) {
    const index = extractionVerifyList?.meta?.page_ids?.indexOf(pageId);
    if (index !== -1) {
      // Adding 1 to the index to get the page number
      const pageNumber = index + 1;
      return pageNumber;
    } else {
      return 1; // Page ID not found
    }
  }

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleDaynamicVelidation = (
    value: any,
    index: number,
    field_name: string,
    form_id: string
  ) => {
    let request = {
      meta: {
        batch_id: extractionVerifyList?.meta?.batch_id,
        post_retry_count: !errorVelidaton[index]
          ? 1
          : errorVelidaton[index]?.post_retry_count + 1,
        time_to_verify: 143,
      },
      form_id: form_id,
      field_name: field_name,
      field_value: value,
      dependencies: {},
    };
    if (request && !errorVelidaton[index]?.status) {
      dispatch(dynamicFieldValidation(request)).then((res) => {
        if (res.payload) {
          setErrorVelidation((prevValues) => {
            // const currentField = prevValues[`${index}`];
            return {
              ...prevValues,
              [`${index}`]: {
                ...res.payload,
                post_retry_count:
                  (prevValues[index]?.post_retry_count || 0) + 1,
              },
            };
          });
        }
      });
    }
  };

  const handleChange = (
    value: string,
    index: number,
    field_name: string,
    form_id: string
  ) => {
    setFieldValues((prevValues) => {
      const currentField = prevValues[`${index}`];

      return {
        ...prevValues,
        [`${index}`]: {
          ...currentField,
          value,
          form_id: form_id, // Replace with actual form ID
          name: field_name,
          retry_validation_count: 0,
          validated: null,
          user_behaviour: {
            ...currentField?.user_behaviour,
            any_edit: true, // Set to true since the value changed
          },
        },
      };
    });
  };

  const handleBlur = (event, index) => {
    const startTime = onFocusTimeRef.current[index];
    if (startTime) {
      const endTime: Date | any = new Date();
      const timeInFieldMs = endTime - startTime; // Calculate time in milliseconds
      const timeInFieldSec = timeInFieldMs / 1000; // Convert to seconds

      setFieldValues((prevValues) => ({
        ...prevValues,
        [`${index}`]: {
          ...prevValues[index],
          user_behaviour: {
            ...prevValues[index]?.user_behaviour,
            time_in_field: timeInFieldSec,
          },
        },
      }));

      onFocusTimeRef.current[index] = null; // Clear the start time
    }

    // handle blur logic
  };

  const resultArray =
    extractionVerifyList?.data && Object.values(extractionVerifyList.data);

  const [currentTargetRef, setCurrentTargetRef] = useState<any>(null);

  useEffect(() => {
    if (currentTargetRef) {
      currentTargetRef.focus();

      setTimeout(() => {
        const rect = currentTargetRef.getBoundingClientRect();
        setinputCoordinates(rect);
      }, 200);
    } else {
      setinputCoordinates(undefined);
    }
  }, [currentTargetRef]);

  const textFields = (extractionVerifyList?.field_order || [])
    .filter((item: string) => {
      const matchingResultItem = resultArray.find(
        (resultItem: TextFieldsResultItem) => resultItem.field === item[0]
      );

      if (!matchingResultItem) {
        return false; // Skip items without matching result
      }
      const verifyValue = findValueInObject(
        matchingResultItem,
        "do_verification",
        false
      );

      const isActive =
        (activeTab === "verify-fields" && verifyValue) ||
        (activeTab === "valid-fields" && !verifyValue) ||
        (activeTab !== "verify-fields" && activeTab !== "valid-fields");

      return isActive;
    })
    .map((item: string, index: number) => {
      const matchingResultItem = resultArray.find(
        (resultItem: TextFieldsResultItem) => resultItem.field === item[0]
      );
      const obj = matchingResultItem || {}; // Use an empty object if no matching result found
      const textValue = findValueInObject(obj, "textline", false);
      const inputType = findValueInObject(obj, "type", null);
      const number_of_textline = findValueInObject(
        obj,
        "number_of_textline",
        false
      );

      const foundItem: any = Object.values(obj.options).find(
        (item: any) => item.selected
      );
      const textLines = Array.isArray(textValue)
        ? textValue?.map((line: any) => line.Text).join("\n")
        : textValue[0]?.Text;

      const defaultValue =
        inputType == "select"
          ? foundItem?.Text
          : fieldValues[item[0]] || textLines || "";

      const page_id = findValueInObject(obj, "page_id", null);
      const doValidation = findValueInObject(obj, "do_validation", null);
      const validateOnChange = findValueInObject(
        obj,
        "validate_on_change",
        null
      );

      // Check if inputType exists and is a string before using toLowerCase()
      const selecteOptions = findValueInObject(obj, "options", null);
      const optionsArray = Object.entries(selecteOptions).map(
        ([key, value]) => ({
          label: key,
          value: value, // or any specific property of the value object you want to assign
        })
      );
      const verified_value = findValueInObject(
        matchingResultItem,
        "verified_value",
        false
      );

      // useEffect(() => {
      // if (index == 0) {
      //   let focused = document.getElementById(`input-${index}`);
      //   if (focused) {
      //     const rect = focused.getBoundingClientRect();
      //     setinputCoordinates(rect);
      //   }
      // }
      // }, []);

      return (
        <div key={index} className="input-verify-extraction">
          {inputType == "select" ? (
            <FormControl
              fullWidth
              key={index}
              onKeyDown={(e: any) => {
                handleKeyDown(e, index);
              }}
              className="custom-form-select"
            >
              <InputLabel
                id="demo-simple-select-label"
                className="custom-select-label"
              >
                {item[0]}
              </InputLabel>

              <Select
                labelId={`demo-simple-select-label-${index}`}
                id={`input-${index}`}
                // value={fieldValues[index]?.value}
                value={
                  fieldValues[index]?.user_behaviour.total_visits > 0 &&
                  fieldValues[index]?.value
                    ? fieldValues[index]?.value
                    : defaultValue
                }
                autoFocus={index === 0}
                onFocusCapture={(event) => {
                  const selectFieldElement = event.target;
                  if (selectFieldElement) {
                    setCurrentTargetRef(selectFieldElement);
                  }
                }}
                onChange={(event) => {
                  const selectedValue: any = event.target.value;

                  handleChange(selectedValue, index, item[0], item[1]);

                  if (validateOnChange) {
                    handleDaynamicVelidation(
                      event.target.value,
                      index,
                      item[0],
                      item[1]
                    );
                  }
                  // Any other logic you want to perform on value change
                }}
                onFocus={(event) => {
                  const selectFieldElement = event.target;

                  if (selectFieldElement) {
                    setCurrentTargetRef(selectFieldElement);
                  }
                  setHighlightText(defaultValue);
                  onFocusTimeRef.current[index] = new Date();
                  setExtrationIMG(`${BASE_URL}/media/pages/${page_id}.png`);
                  const pageNumber = getPageNumberByIndex(page_id);
                  setActivePageNumber(pageNumber);
                  setFieldValues((prevValues: any) => ({
                    ...prevValues,
                    [`${index}`]: {
                      value: prevValues[`${index}`]?.value,
                      form_id: item[1],
                      name: item[0],
                      retry_validation_count: 0,
                      validated: null,
                      user_behaviour: {
                        time_in_field: 0,
                        total_visits:
                          (prevValues[index]?.user_behaviour.total_visits ||
                            0) + 1,
                        retried_words: false,
                        last_exit_method: "TAB",
                        any_edit:
                          textValue[0]?.Text !== event.target.value
                            ? true
                            : false, // Set to true since the value changed
                        selected_from_dropdown: false,
                        selected_first_dropdown: false,
                      },
                    },
                  }));

                  const locationValue = findValueInObject(
                    obj,
                    "resized_location",
                    null
                  );
                  if (locationValue) {
                    setHighlightPosition(locationValue);
                  }
                }}
                // label="Select"
                label={item[0]}
                name={item[0]}
                className="verigication-textfild-height"
                classes={{
                  icon: "custom-select-icon",
                }}
                variant="outlined"
              >
                {optionsArray?.map((item: any, idx: number) => (
                  <MenuItem key={idx} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              fullWidth
              multiline={number_of_textline > 1 ? true : false}
              key={index}
              // rows={number_of_textline}
              label={item[0]}
              name={item[0]}
              id={`input-${index}`}
              className={
                number_of_textline > 1
                  ? "verification-textarea-height"
                  : "verigication-textfild-height"
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                handleKeyDown(e, index)
              }
              value={
                fieldValues[index]?.user_behaviour.total_visits > 0
                  ? fieldValues[index]?.value
                  : defaultValue
              }
              variant="outlined"
              onChange={(event) => {
                const newValue = event.target.value;
                handleChange(newValue, index, item[0], item[1]);

                if (validateOnChange) {
                  handleDaynamicVelidation(
                    event.target.value,
                    index,
                    item[0],
                    item[1]
                  );
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {errorVelidaton &&
                    errorVelidaton[index]?.status === true ? (
                      <CheckCircleIcon
                        style={{
                          cursor: "pointer",
                          color: "green",
                          width: "22px",
                        }}
                      />
                    ) : errorVelidaton &&
                      errorVelidaton[index]?.status === false ? (
                      <CancelIcon
                        style={{
                          cursor: "pointer",
                          color: "red",
                          width: "22px",
                        }}
                      />
                    ) : (
                      doValidation && (
                        <HelpIcon
                          color="success"
                          style={{ color: "black", width: "22px" }}
                        />
                      )
                    )}

                    {/* {verified_value.field_values[0]?.value !==
                      (fieldValues[index]?.value
                        ? fieldValues[index]?.value
                        : defaultValue) && (
                      <BootstrapTooltip
                        title={textValue[0]?.Text}
                        placement="top-end"
                        style={{ cursor: "pointer" }}
                        // componentsProps={{
                        //   tooltip: {
                        //     sx: {
                        //       bgcolor: "#ffffff",
                        //       border: 1,
                        //       borderColor: "#ffffff",
                        //       fontSize: "14px",
                        //       fontWeight: 400,
                        //       fontFamily: "Satoshi-Regular",
                        //       color: "#7260ED",
                        //       boxShadow: " 0px 0px 4px 1px #DFDFFF",
                        //       minWidth: "max-content",
                        //       "& .MuiTooltip-arrow": {
                        //         color: "#ffffff",
                        //         height:"20px",
                        //         width:"20px",
                        //         borderRight:'1px solid red',
                        //         borderBottom:'1px solid red',
                        //         transform:"rotate(45deg)"
                        //       },
                        //     },
                        //   },
                        // }}
                      >
                        <InfoIcon color="success"  style={{ width:"22px",cursor: "pointer"}}/>
                      </BootstrapTooltip>
                    )} */}
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: {
                  maxWidth: "calc(100% - 87px) !important",
                  // overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",

                  // position: "relative",
                },
              }}
              // helperText={errorVelidaton && errorVelidaton[index]?.error_message}
              onBlur={(event) => {
                handleBlur(event, index);
                if (doValidation) {
                  handleDaynamicVelidation(
                    event.target.value,
                    index,
                    item[0],
                    item[1]
                  );
                }
              }}
              onFocus={(event) => {
                onFocusTimeRef.current[index] = new Date();
                const textFieldElement = event.target;

                if (textFieldElement) {
                  setCurrentTargetRef(textFieldElement);
                }
                setExtrationIMG(`${BASE_URL}/media/pages/${page_id}.png`);
                const pageNumber = getPageNumberByIndex(page_id);
                setActivePageNumber(pageNumber);
                setHighlightText(defaultValue);
                setFieldValues((prevValues) => ({
                  ...prevValues,
                  [`${index}`]: {
                    value: event.target.value,
                    form_id: item[1],
                    name: item[0],
                    retry_validation_count: 0,
                    validated: null,
                    user_behaviour: {
                      time_in_field: 0,
                      total_visits:
                        (prevValues[index]?.user_behaviour.total_visits || 0) +
                        1,
                      retried_words: false,
                      last_exit_method: "TAB",
                      any_edit:
                        textValue[0]?.Text !== event.target.value
                          ? true
                          : false, // Set to true since the value changed
                      selected_from_dropdown: false,
                      selected_first_dropdown: false,
                    },
                  },
                }));

                const locationValue = findValueInObject(
                  obj,
                  "resized_location",
                  null
                );
                if (locationValue) {
                  setHighlightPosition(locationValue);
                }
              }}
              autoFocus={index === 0}
              ref={textFieldRef}
              onFocusCapture={(event) => {
                const selectFieldElement = event.target;
                if (selectFieldElement) {
                  setCurrentTargetRef(selectFieldElement);
                }
              }}
              sx={{
                ".MuiOutlinedInput-root ": {
                  padding: number_of_textline > 1 ? "0px !important" : "",
                },
                ".MuiOutlinedInput-input": {
                  padding: number_of_textline > 1 ? "15px 24px !important" : "",
                },
              }}
              // onFocusCapture={(event) => {
              //   const selectFieldElement = event.target;
              //   if (selectFieldElement) {
              //     const rect = selectFieldElement.getBoundingClientRect();
              //     setinputCoordinates(rect);
              //   }
              // }}
            />
          )}
        </div>
      );
    });

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === "Tab") {
      document
        .getElementById("auto-focus-extraction-section")
        ?.scrollIntoView();
      if (
        index === textFields.length - 1 &&
        Object.keys(fieldValues)?.length >= textFields.length &&
        !event.shiftKey
      ) {
        setSave(true);
        buttonRef?.current && buttonRef?.current?.focus();
      } else if (
        index == textFields.length - 1 &&
        textFields?.length !== Object.keys(fieldValues).length &&
        !event.shiftKey
      ) {
        setWarningText("Make sure you verified all the fields.");
        setWarning(true);
      }
      event.preventDefault();
      if (event.shiftKey) {
        // Shift+Tab: Go to previous field
        const prevIndex =
          (index - 1 + extractionVerifyList?.field_order?.length) %
          extractionVerifyList?.field_order?.length;
        const prevInput = document.querySelector(
          `#input-${prevIndex}`
        ) as HTMLDivElement;
        if (prevInput) {
          prevInput?.focus();
          setCurrentTargetRef(prevInput);
          // const rect = prevInput.getBoundingClientRect();
          // setinputCoordinates(rect);
        }
      } else {
        // Tab: Go to next field
        const nextIndex = index + 1;
        const nextInput = document.querySelector(`#input-${nextIndex}`) as any;
        if (nextInput) {
          nextInput?.focus();
          setCurrentTargetRef(nextInput);

          // const rect = nextInput.getBoundingClientRect();
          // setinputCoordinates(rect);
        }
      }
    }
  };
  // const filteredTextFields =
  //   textFields?.length > 0 &&
  //   textFields.filter((textField) =>
  //     textField.props.label.toLowerCase().includes(searchText.toLowerCase())
  //   );

  const filteredTextFields =
    textFields?.length > 0 &&
    textFields.filter((textField) =>
      textField.props.label && typeof textField.props.label === "string"
        ? textField.props.label.toLowerCase().includes(searchText.toLowerCase())
        : false
    );

  const initial: React.DragEventHandler<HTMLDivElement> = (e) => {
    let resizable = document.getElementById("Resizable");

    if (resizable !== null) {
      setInitialPos(e.clientX);
      setInitialSize(resizable.offsetWidth);
    }
  };

  const [size, setSize] = useState<string>("400");

  const resize: React.DragEventHandler<HTMLDivElement> = (e) => {
    let resizable = document.getElementById("Resizable");
    let viewPortWidth = (window.innerWidth / 100) * 60;

    if (resizable !== null) {
      if (activeIndex === 1 || activeIndex === 3) {
        resizable.style.height = `${
          parseInt(initialSize as string) + (e.clientY - initialPos)
        }px`;
      } else {
        resizable.style.width = `${
          parseInt(initialSize as string) + (e.clientX - initialPos)
        }px`;
        if (parseInt(initialSize as string) + (e.clientX - initialPos) > 0) {
          setSize(
            size > viewPortWidth.toString()
              ? viewPortWidth.toString()
              : (
                  parseInt(initialSize as string) +
                  (e.clientX - initialPos)
                ).toString()
          );
        }
      }
    }
  };

  const router = useRouter();
  let endPath: string = "";

  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    endPath = url.pathname.split("/").pop() || "";
  } else {
    const { asPath } = router;
    endPath = asPath.split("/").pop() || "";
  }

  //handle Save wie key
  const handleSave = useCallback(
    (event: KeyboardEvent) => {
      const request = {
        meta: {
          batch_id: extractionVerifyList?.meta?.batch_id,
          post_retry_count: 0,
          time_to_verify: 8,
        },
        data: fieldValues,
      };

      if (
        (event.ctrlKey && event.shiftKey && event.key === "R") ||
        (event.ctrlKey && event.key === "r") ||
        (event.metaKey && event.shiftKey && event.key === "R") ||
        (event.metaKey && event.key === "r")
      ) {
        event.preventDefault();

        // setWarningText(
        //   "If you reload this page all changed data will be lost."
        // );
        // setWarning(true);
        // setReloadWarning(true);
      } else if (
        (event.ctrlKey && event.key === "s") ||
        (event.metaKey && event.key === "s")
      ) {
        event.preventDefault();
        if (textFields?.length === Object.keys(fieldValues).length) {
          dispatch(verificationSaveChanges(request)).then((res) => {
            if (res.payload) {
              setErrorVelidation({});
              dispatch(Verify(`?format=json`)).then((res) => {
                if (!res?.payload?.meta?.batch_id) {
                  setintigateApi(true);
                  setFieldValues({});
                  setExtrationIMG("");
                } else {
                  setintigateApi(false);
                  setExtrationIMG("");
                  const verifyValue = findValueInObject(
                    res?.payload?.data,
                    "do_verification",
                    false
                  );
                  setFieldValues({});
                  if (!verifyValue) {
                    setActiveTab("valid-fields");
                  }
                  let firstIndexName = res.payload.field_order[0][0];
                  let tempObj = Object.values(res.payload.data).find(
                    (item: any) => item.field == firstIndexName
                  );

                  const locationValue = findValueInObject(
                    tempObj,
                    "resized_location",
                    null
                  );
                  if (locationValue) {
                    setHighlightPosition(locationValue);
                  }
                }
              });
              // buttonRef.current = null;
              // setTimeout(() => {
              const selectFieldElement = document.getElementById(`input-0`);
              if (selectFieldElement) {
                setCurrentTargetRef(selectFieldElement);
                // Get the position of the input element
                // const rect = selectFieldElement.getBoundingClientRect();
                // setinputCoordinates(rect);
              }
              // selectFieldElement?.focus();
              // }, 500);
            }
          });
        } else {
          setWarningText("Make sure you verified all the fields.");
          setWarning(true);
        }
      }
    },
    [
      dispatch,
      extractionVerifyList,
      fieldValues,
      textFields,
      warningOpen,
      reloadWarning,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleSave);

    return () => {
      window.removeEventListener("keydown", handleSave);
    };
  }, [handleSave]);

  const handleCancel = () => {
    setWarning(false);
    setWarningText("");
  };

  const handleSubmit = () => {
    window.location.reload();
  };

  useEffect(() => {
    const showBackAlert = () => {
      setWarningText("If you reload this page all changed data will be lost.");
      setWarning(true);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", showBackAlert);

    return () => {
      window.removeEventListener("popstate", showBackAlert);
    };
  }, []);

  useEffect(() => {
    if (extractionVerifyList?.meta?.page_ids) {
      const imgurls = extractionVerifyList?.meta?.page_ids?.map(
        (item: string | number) => {
          return `${BASE_URL}/media/pages/${item}.png`;
        }
      );
      Promise.allSettled(
        imgurls.map((item: string) => fetchImageURL(item))
      ).then((res: any) => {
        if (res && res[0]?.value) {
          setExtrationIMG(
            `${BASE_URL}/media/pages/${extractionVerifyList?.meta?.page_ids[0]}.png`
          );
        }
      });
    }
  }, [extractionVerifyList?.meta?.page_ids, dispatch]);

  const dispatchFunction = () => {
    // window.location.href = `${BASE_URL}/media/forms/${resultArray[0]?.form_id}/content`;
    downloadURI(
      `${BASE_URL}/media/forms/${resultArray[0]?.form_id}/content`,
      resultArray[0]?.form_id
    );
  };

  // const handleZoomIn = () => {
  //   setZoomLevel((prevZoom) => Math.min(200, prevZoom + 10)); // Increase by 10%
  // };

  // const handleZoomOut = () => {
  //   setZoomLevel((prevZoom) => Math.max(100, prevZoom - 10)); // Decrease by 10%
  // };
  // const handleWheel = (e) => {
  //   e.preventDefault();
  //   if (e.deltaY < 0) {
  //     handleZoomIn();
  //   } else {
  //     handleZoomOut();
  //   }
  // };
  // useEffect(() => {
  //   let resizable = document.getElementById("Resizable");

  //   if (resizable !== null) {
  //     if (activeIndex === 1) {
  //       resizable.style.height = "400px";
  //     } else if (activeIndex === 0) {
  //       resizable.style.height = "80vh";
  //     } else if (activeIndex === 2) resizable.style.height = "80vh";
  //     {
  //     }
  //   }
  // }, [activeIndex]);

  const [stageScale, setStageScale] = useState(0.40);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const handleZoomIn = () => {
    const scaleBy = 1.2;
    const newScale = stageScale * scaleBy;

    if (newScale <= 2) {
      setStageScale(newScale);
    } else {
      setStageScale(2);
    }
  };

  const handleZoomOut = () => {
    const scaleBy = 1.2;
    const newScale = stageScale / scaleBy;

    if (newScale >= 0.2) {
      setStageScale(newScale);
    } else {
      setStageScale(0.2);
    }
  };

  const handleReset = () => {
    setStageScale(0.40);
    setStageX(0);
    setStageY(0);
  };
  const calculatePercentage = useMemo(() => {
    let percentage: any = (stageScale * 100).toFixed(2);
    // percentage = Math.max(100, Math.min(200, percentage)); // Clamp the value between 100 and 200
    return `${percentage}%`;
  }, [stageScale]);
  const buttonRef: any = useRef(null);

  const [seconds, setSeconds] = useState<any>();

  const [intigateApi, setintigateApi] = useState(false);
  useEffect(() => {
    if (intigateApi) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          dispatch(Verify(`?format=json`)).then((res) => {
            if (!res?.payload?.meta?.batch_id) {
              setSeconds(20);
              setintigateApi(true);
            } else {
              setintigateApi(false);
              document
                .getElementById("auto-focus-extraction-section")
                ?.scrollIntoView();
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
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
    return () => dispatch(ClearVerifyData());
  }, [dispatch, seconds, intigateApi]);

  useEffect(() => {
    if (!intigateApi) {
      dispatch(Verify(`?format=json`)).then((res) => {
        if (!res?.payload?.meta?.batch_id) {
          setintigateApi(true);
        } else {
          setintigateApi(false);
          document
            .getElementById("auto-focus-extraction-section")
            ?.scrollIntoView();

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
    }
  }, [dispatch, intigateApi]);

  // return () => {
  //   if (extractionVerifyList?.meta?.batch_id) {
  //     dispatch(expiresVerification({ batch_id: extractionVerifyList.meta.batch_id }));
  //   }
  // };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        dispatchFunction();
      } else if (event.ctrlKey && event.key === "p") {
        event.preventDefault();

        setRejectOpen(true);
      } else if (event.ctrlKey && event.key === "r") {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
  }, []);

  const [initialLoad, setInitialLoad] = useState(true);

  const onHandleSaveChange = () => {
    const request = {
      meta: {
        batch_id: extractionVerifyList?.meta?.batch_id,
        post_retry_count: 0,
        time_to_verify: 8,
      },
      data: fieldValues,
    };
    if (
      textFields?.length &&
      Object.keys(fieldValues)?.length >= textFields?.length
    ) {
      dispatch(verificationSaveChanges(request)).then((res) => {
        if (res.payload) {
          setErrorVelidation({});
          setSave(false);

          dispatch(Verify(`?format=json`)).then((res) => {
            if (!res?.payload?.meta?.batch_id) {
              setintigateApi(true);
              setFieldValues({});
              setExtrationIMG("");
            } else {
              setintigateApi(false);
              setExtrationIMG("");
              const verifyValue = findValueInObject(
                res?.payload?.data,
                "do_verification",
                false
              );
              setFieldValues({});
              if (!verifyValue) {
                setActiveTab("valid-fields");
              }
              let firstIndexName = res.payload.field_order[0][0];
              let tempObj = Object.values(res.payload.data).find(
                (item: any) => item.field == firstIndexName
              );

              const locationValue = findValueInObject(
                tempObj,
                "resized_location",
                null
              );
              if (locationValue) {
                setHighlightPosition(locationValue);
              }
            }

            if (res.payload.data) {
              let foundValue = findValueInObject(
                Object.values(res.payload.data).find(
                  (item: any) => item.field == res.payload.field_order[0][0]
                ),
                "textline",
                false
              );
              setFieldValues((prevValues) => ({
                [`0`]: {
                  value: foundValue[0]?.Text ?? "",
                  form_id: res.payload.field_order[0][1],
                  name: res.payload.field_order[0][0],
                  retry_validation_count: 0,
                  validated: null,
                  user_behaviour: {
                    time_in_field: 0,
                    total_visits: 1,
                    retried_words: false,
                    last_exit_method: "",
                    any_edit: false,
                    selected_from_dropdown: false,
                    selected_first_dropdown: false,
                  },
                },
              }));

              const selectFieldElement = document.getElementById(`input-0`);
              if (selectFieldElement) {
                // selectFieldElement.focus();
                setCurrentTargetRef(selectFieldElement);
                // Get the position of the input element
                // const rect = selectFieldElement.getBoundingClientRect();
                // setinputCoordinates(rect);
              }
              setInitialLoad(true);
              setLineShow(false);
            }
          });
        }
      });
    } else {
      setWarningText("Make sure you verified all the fields.");
      setWarning(true);
    }
  };

  const bottomRef = useRef<null | HTMLDivElement>(null);

  var browserZoomLevel: any =
    typeof window !== "undefined" && Math.round(window.devicePixelRatio * 100);

  useEffect(() => {
    if (browserZoomLevel > 100) {
      // alert("Desired view will be at 100%");
      setIsZoom(true);
    } else {
      setIsZoom(false);
    }
  }, [browserZoomLevel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extractionVerifyList]);

  const focusFirstField = () => {
    setTimeout(() => {
      const selectFieldElement = document.getElementById(`input-0`);
      if (selectFieldElement) {
        selectFieldElement.focus();
        setCurrentTargetRef(selectFieldElement);
      } else {
        setCurrentTargetRef(null);
      }
    }, 200);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "m") {
        setLineShow((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <Save_Documents
        save={save}
        setSave={(e) => {
          setSave(e);
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });

          setTimeout(() => {
            if (currentTargetRef) {
              currentTargetRef.focus();
              const rect = currentTargetRef.getBoundingClientRect();
              setinputCoordinates(rect);
            }
          }, 300);
        }}
        onSaveChange={() => onHandleSaveChange()}
        title="Verification Complete"
        discribtion="Verification of all necessary fields is complete."
      />
      <CommonHeader
        handleDownload={() => dispatchFunction()}
        handleRaiseTicket={() => setOpen(true)}
        handleReject={() => setRejectOpen(true)}
        nobatchavailable={extractionVerifyList?.info ? true : false}
        buttonRef={buttonRef}
        handleSave={() => onHandleSaveChange()}
      />
      {isZoom && (
        <div className="zoom-div">
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <VerifiedOutlinedIcon style={{ fontSize: "1rem" }} />
            <p className="text-[10px]">
              For the best GlyphX experience, set your display to 100%
              resolution{" "}
            </p>{" "}
            <a
              href="https://support.microsoft.com/en-us/windows/view-display-settings-in-windows-37f0e05e-98a9-474c-317a-e85422daa8bb#WindowsVersion=Windows_11"
              target="_blank"
              style={{ color: "#ffffff" }}
            >
              <Typography
                textAlign="center"
                style={{
                  fontSize: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Configure Display
              </Typography>
            </a>
          </div>
          <div onClick={() => setIsZoom(false)}>
            <CloseIcon style={{ fontSize: "1rem", marginTop: "5px" }} />
          </div>
        </div>
      )}
      {extractionVerifyList?.info ? (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col gap-y-4">
              <Typography
                variant="h4"
                color="text.secondary"
                textAlign="center"
              >
                Reloading Page in {!seconds ? "20" : seconds} Seconds . . .
              </Typography>
              <Typography
                variant="h1"
                color="text.secondary"
                textAlign="center"
              >
                No more batches to verify. Try after some time.
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="verification-header main-layout-section">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={4} className="items-baseline">
                <Grid item xs={8}>
                  <div className="verification-pdf-header ">
                    <div className="flex items-center gap-x-2">
                      <Typography
                        variant="h5"
                        color="text.primary"
                        className="pdf-heading"
                      >
                        Document Name:
                      </Typography>
                      <Typography
                        className="pdf-heading"
                        variant="h5"
                        color="text.secondary"
                      >
                        {extractionVerifyList?.meta?.case_num}
                      </Typography>
                    </div>
                    <div className="pdf-controls">
                      <Typography variant="subtitle1" className="zoom">
                        Zoom {calculatePercentage}
                      </Typography>

                      <button
                        className="zoom-btns cursor-pointer disabled:cursor-not-allowed"
                        disabled={dimensions?.width === "100%" || lineShow}
                        onClick={() => handleZoomOut()}
                      >
                        <Image src={IconService.ZoomOutIcon} alt="zoomout" />
                      </button>
                      <button
                        className="zoom-btns cursor-pointer disabled:cursor-not-allowed"
                        disabled={dimensions?.width == "200%" || lineShow}
                        onClick={() => handleZoomIn()}
                      >
                        <Image src={IconService.ZoomInIcon} alt="zoomin" />
                      </button>
                      <button
                        className="reset-btn cursor-pointer disabled:cursor-not-allowed"
                        onClick={() => handleReset()}
                        disabled={lineShow}
                      >
                        <Image src={IconService.ResetIcon} alt="reset" />
                      </button>
                      {extractionVerifyList?.meta?.page_ids?.length && (
                        <div className="flex align-center gap-x-2">
                          <Typography
                            variant="h5"
                            color="text.primary"
                            className="pdf-heading"
                          >
                            Total Pages:
                          </Typography>
                          <Typography
                            variant="h5"
                            color="text.secondary"
                            className="pdf-heading"
                          >
                            {activePageNumber}/
                            {extractionVerifyList?.meta?.page_ids?.length}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        // handleReset();
                        setLineShow(!lineShow);
                        if (currentTargetRef) {
                          currentTargetRef.focus();
                          setTimeout(() => {
                            bottomRef.current?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }, 200);
                        }
                      }}
                    >
                      {!lineShow ? "Line" : "Zoom"} View
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="verification-data-header gap-2">
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search Field"
                      className="search-field"
                      value={searchText}
                      onChange={handleSearchTextChange}
                      InputProps={{
                        startAdornment: (
                          <Image src={IconService.SearchIcon} alt="search" />
                        ),
                      }}
                    />
                    <div className="grid-switch">
                      {layoutOptions.map((option, index) => (
                        <div
                          key={option.name}
                          onClick={() => {
                            setActiveIndex(
                              (prevIndex) =>
                                (prevIndex + 1) % layoutOptions.length
                            );
                          }}
                        >
                          {index === activeIndex && (
                            <Image src={option.svg} alt="layout" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>

          <div className="verification-main main-layout-section  ">
            <div className="verification-sub overflow-scroll ">
              <Box sx={{ flexGrow: 1 }}>
                <div
                  className={`flex gap-x-4 ${
                    (activeIndex == 1 || activeIndex == 3) && "flex-col"
                  }`}
                >
                  <div
                    className={`verification-pdf ${
                      (activeIndex == 1 || activeIndex == 3) &&
                      "verification-full"
                    }`}
                    id="Resizable"
                  >
                    <div className="verification-pdf-sub" id="scrollArea">
                      <div
                        className="pdf-wrapper"
                        style={{ maxHeight: "80vh" }}
                      >
                        <CanvasComponent
                          dimensions={highlightPosition}
                          imageUrls={extrationIMG}
                          stageScale={stageScale}
                          setStageScale={setStageScale}
                          stageX={stageX}
                          setStageX={setStageX}
                          stageY={stageY}
                          setStageY={setStageY}
                          inputCoordinates={inputCoordinates}
                          lineShow={lineShow}
                          initialLoad={initialLoad}
                          setInitialLoad={setInitialLoad}
                          fieldLength={Object.entries(fieldValues).length}
                          highlightText={highlightText}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        activeIndex === 1 || activeIndex == 3
                          ? "drag-icon-container-layout"
                          : "drag-icon-container"
                      }
                    >
                      <div
                        id="Draggable"
                        draggable="true"
                        onDragStart={initial}
                        onDrag={resize}
                      >
                        <Image src={IconService.ResizeIcon} alt="resize" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="verification-right z-10"
                    style={{ height: activeIndex === 1 ? "400px" : undefined }}
                  >
                    <div className="data-tabs">
                      <div className="tabs-collection">
                        <div
                          className={`verify-fields ${
                            activeTab === "verify-fields" ? "active" : ""
                          }`}
                          onClick={() => {
                            setActiveTab("verify-fields");
                            // setLineShow(false);
                            focusFirstField();
                          }}
                        >
                          <Typography variant="subtitle1">
                            Verify Fields
                          </Typography>
                        </div>
                        <div
                          className={`valid-fields ${
                            activeTab === "valid-fields" ? "active" : ""
                          }`}
                          onClick={() => {
                            setActiveTab("valid-fields");
                            // setLineShow(false);
                            focusFirstField();
                            // setinputCoordinates(undefined);
                          }}
                        >
                          <Typography variant="subtitle1">
                            Valid Fields
                          </Typography>
                        </div>
                        <div
                          className={`show-all ${
                            activeTab === "show-all" ? "active" : ""
                          }`}
                          onClick={() => {
                            setActiveTab("show-all");
                            // setLineShow(false);
                            focusFirstField();
                            // setinputCoordinates(undefined);
                          }}
                        >
                          <Typography variant="subtitle1">Show All</Typography>
                        </div>
                      </div>
                    </div>
                    <div className="verification-data">
                      {
                        // activeIndex === 2 ||

                        activeIndex == 3 ? (
                          <GridLayout />
                        ) : (
                          <>
                            {filteredTextFields && (
                              <ListLayout
                                searchText={searchText}
                                filteredTextFields={filteredTextFields}
                                textFields={textFields}
                              />
                            )}
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </Box>
            </div>
            <Raise_Ticket
              isExtraction={true}
              open={open}
              handleClose={() => setOpen(false)}
              onSubmitToClose={() => setOpen(false)}
              activeExtractionpage={activePageNumber}
            />
            {/* <Download_File
            open={downlaodOpen}
            handleClose={() => setDownloadOpen(false)}
            dispatchFunction={dispatchFunction}
            // id={resultArray?.length > 0 && resultArray[0]?.form_id}
          /> */}
            <Reject
              isExtraction={true}
              open={rejectOpen}
              handleClose={() => setRejectOpen(false)}
              setintigateApi={setintigateApi}
              setActiveTab={setActiveTab}
            />
            <Warning
              warningOpen={warningOpen}
              setWarning={() => setWarning(false)}
              text={warningText}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              reloadWarning={reloadWarning}
              setReloadWarning={setReloadWarning}
            />
            <div id="auto-focus-extraction-section" />
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default Verification;
