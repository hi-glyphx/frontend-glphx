"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, Button, Fade, Modal, Backdrop, Typography } from "@mui/material";
import theme from "@/styles/theme";
import IconService from "@/utils/Icons";
import { setDocument_imageURLID } from "@/Store/Reducer/ClassificationSlice";
import { useDispatch } from "react-redux";

type HeaderProps = {
  save: boolean;
  setSave: Dispatch<SetStateAction<boolean>>;
  onSaveChange?: any;
  title: string;
  discribtion: string;
};

const Save_Documents = ({
  save,
  setSave,
  onSaveChange,
  title,
  discribtion,
}: HeaderProps) => {
  // const saveButtonRef = useRef<any>(null);
  const [noButton, setNo] = useState<boolean>(true);
  const [saveDocumet, setSaveDocument] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setNo(true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setSaveDocument(true);
        setNo(false);
      } else if (event.key === "ArrowLeft") {
        setNo(true);
        setSaveDocument(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      setNo(true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (saveDocumet) {
      const handleKeyDown = (event) => {
        // Check if the key combination is Ctrl + S
        if ((event.ctrlKey && event.key === "s") || event.key === "Enter") {
          event.preventDefault();
          onSaveChange();
          setNo(true);
          setSave(false);
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [saveDocumet]); // Empty depe
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the pressed key is "Enter"
      if (event.key === "Enter") {
        event.preventDefault();
        if (noButton) {
          setSave(false);
        } else if (saveDocumet) {
          onSaveChange();
          setSave(false);
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array to run the effect only once during mounting

  useEffect(() => {
    if (!save) {
      setSaveDocument(false);
    }
  }, [save]);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={save}
      onClose={() => setSave(false)}
      closeAfterTransition
      disableEnforceFocus={true}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={save}>
        <Box
          sx={{ maxWidth: "480px !important" }}
          className="common-modal-bg shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
        >
          <Box
            color={theme.palette.text.secondary}
            className=" flex flex-col gap-6 text-center	"
            style={{ padding: "1rem" }}
          >
            <Box className="mx-auto">
              {" "}
              <img src={IconService.save_documents.src} />
            </Box>
            <Box className="flex flex-col gap-10">
              <Box className="flex flex-col gap-2">
                <Typography id="transition-modal-title" variant="h3">
                  {title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={theme.palette.text.primary}
                  style={{
                    fontSize: "14px !important",
                  }}
                >
                  {discribtion}
                </Typography>
              </Box>
              <Box className="inline-flex justify-center	gap-4">
                <Button
                  className="p-0 rounded-lg"
                  variant={noButton ? "text" : "outlined"}
                  onClick={() => {
                    dispatch(setDocument_imageURLID(""));

                    setSave(false);
                  }}
                >
                  <Typography className="gap-2 py-3	px-6" variant="h6">
                    NO{" "}
                  </Typography>
                </Button>
                <Button
                  // ref={saveButtonRef}
                  variant={saveDocumet ? "text" : "outlined"}
                  className="p-0 rounded-lg"
                  onClick={() => onSaveChange()}
                  // focusRipple={save}
                  // autoFocus={save}
                >
                  <Typography className="gap-2 py-3	px-6" variant="h6">
                    SAVE DOCUMENT
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Save_Documents;
