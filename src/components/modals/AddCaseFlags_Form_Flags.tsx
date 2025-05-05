import theme from "@/styles/theme";
import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useContext, useEffect } from "react";
import IconService from "@/utils/Icons";
import Image from "next/image";
import AddCaseTable from "@/views/upload/AddCaseTable";
import { useFormik } from "formik";
import { setCaseFlags, setFormFlags } from "@/Store/Reducer/CaseSlice";
import { useDispatch, useSelector } from "react-redux";
import { SimpleCtx } from "../Common/Context";

type HeaderProps = {
  addCaseFlagFlags: boolean;
  setAddCaseFlagFlags: Dispatch<SetStateAction<boolean>>;
  isCase?: boolean;
};
const AddCaseFlags_Form_Flags = ({
  addCaseFlagFlags,
  isCase,
  setAddCaseFlagFlags,
}: HeaderProps) => {
  const dispatch = useDispatch();
  const { selectedData } = useContext<any>(SimpleCtx);

  const initialValues = {
    keyValuePairs: [],
  };
  const { caseFlags,formFlags } = useSelector(({ CaseSlice }) => CaseSlice);
  const onSubmit = (values) => {
    const data = selectedData.tableSelectedData;
    if (data) {
      data.forEach((item) => {
        const itemId = item?.id;
        const itemStatus = item?.status;

        if (isCase) {

          const matchingKey = Object.keys(caseFlags).find(
            (key) => key == itemId
          );

          if (matchingKey) {
            const { keyValuePairs } = caseFlags[matchingKey];
            
            dispatch(
              setCaseFlags({
                id:itemId,
                value: {
                  keyValuePairs:
                    values?.keyValuePairs.concat(keyValuePairs),
                },
              })
            );
          }else{
            dispatch(setCaseFlags({ id: itemId, value: values }));

          }
          setAddCaseFlagFlags(false);
        } else {
          if (itemStatus?.length > 0) {
            itemStatus.forEach((statusItem) => {
              const matchingKey = Object.keys(formFlags).find(
                (key) => key == statusItem.id
              );

              if (matchingKey) {
                const { keyValuePairs } = formFlags[matchingKey];
                
                dispatch(
                  setFormFlags({
                    id: statusItem.id,
                    value: {
                      keyValuePairs:
                        values?.keyValuePairs.concat(keyValuePairs),
                    },
                  })
                );
              } else {
                
                dispatch(setFormFlags({ id: statusItem.id, value: values }));
              }
              setAddCaseFlagFlags(false);
            });
          } else {

            const matchingKey = Object.keys(formFlags).find(
              (key) => key == itemId
            );
            if (matchingKey) {
              const { keyValuePairs } = formFlags[matchingKey];
              
              dispatch(
                setFormFlags({
                  id: item?.id,
                  value: {
                    keyValuePairs:
                      values?.keyValuePairs.concat(keyValuePairs),
                  },
                })
              );
            } else {
              
              dispatch(setFormFlags({ id: itemId, value: values }));
            }
            setAddCaseFlagFlags(false);
          }

          setAddCaseFlagFlags(false);
        }
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const { values, handleSubmit, handleChange } = formik;

  const caseNumber = selectedData.tableSelectedData.map((item) => item?.item);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={addCaseFlagFlags}
      onClose={() => setAddCaseFlagFlags(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={addCaseFlagFlags}>
        <Box
          sx={{
            maxWidth: "980px",
            maxHeight: "80vh", // Set maximum height after scroll
            minHeight: "40vh", // Set minimum height after scroll
            overflowY: "auto", // Add a scroll bar when content overflows
            // Add other custom styles here
            color: "black",
            backgroundColor: "white",
            // Add more styles as needed
          }}
          className="common-modal-bg  add-case-flag-modal-max-height  px-20 py-10 flex flex-col gap-4 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Typography
            id="transition-modal-title "
            variant="h4"
            color={theme.palette.text.secondary}
          >
            {isCase ? "   Add Case Flags" : "   Add Form Flags"}
          </Typography>

          <div className="flex flex-row ... items-center justify-between ">
            <Box className=" flex flex-col gap-2">
              <Box className="flex gap-4">
                <Typography
                  variant="subtitle2"
                  className=" text-sm font-normal not-italic"
                  id="transition-modal-description"
                >
                  {isCase ? " Case Number:" : " Form Number:"}
                </Typography>
                <Typography
                  color={theme.palette.text.secondary}
                  className=" text-sm font-bold not-italic "
                  id="transition-modal-description"
                  variant="body2"
                >
                  {caseNumber.join(",")}
                </Typography>
              </Box>

              {/* <Box className="flex gap-4">
                <Typography
                  className=" text-sm font-normal not-italic"
                  id="transition-modal-description"
                  variant="subtitle2"
                >
                  Form Number:
                </Typography>
                <Typography
                  color={theme.palette.text.secondary}
                  className=" text-sm font-bold not-italic"
                  id="transition-modal-description"
                  variant="body2"
                >
                  Health_Form_4002
                </Typography>
              </Box> */}
            </Box>
            <Box>
              <Button
                variant="text"
                color="primary"
                className="common-button-padding"
                onClick={() =>
                  formik.setFieldValue("keyValuePairs", [
                    ...values.keyValuePairs,
                    { key: "", value: "" },
                  ])
                }
              >
                <Image
                  src={IconService.AddIcon}
                  height={20}
                  width={20}
                  alt=""
                />{" "}
                ADD
              </Button>
            </Box>
          </div>

          <Box className="flex flex-col gap-10">
            <AddCaseTable
              values={values}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
            <Box className="flex flex-row justify-end gap-4">
              <Button
                className="text-color btn px-6 py-3  text-base font-bold"
                variant="outlined"
                onClick={() => setAddCaseFlagFlags(false)}
              >
                CANCEL
              </Button>
              <Button
                className=" background px-6 py-3 text-base font-bold"
                variant="text"
                color="primary"
                onClick={() => handleSubmit()}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddCaseFlags_Form_Flags;
