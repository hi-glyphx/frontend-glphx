import theme from "@/styles/theme";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAlias,
  getAllProjects,
  setAlises,
  setSelected,
  setSelectedAliasKey,
} from "@/Store/Reducer/CaseSlice";

import { SimpleCtx } from "../Common/Context";
import { AppDispatch } from "@/Store/Store";

type HeaderProps = {
  addAliasModel: boolean;
  setAliasModel: Dispatch<SetStateAction<boolean>>;
  setSuccessAlise: Dispatch<SetStateAction<boolean>>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 298,
    },
  },
};

const Alias = ({ addAliasModel, setAliasModel }: HeaderProps) => {
  const { allProjects, allAliases } = useSelector(({ CaseSlice }) => CaseSlice);

  type selectedProject = {
    name: string;
    id: string;
  };

  const [selectedProject, setSelectedProject] = useState<any>();
  const [selectedAlias, setSelectedAlias] = useState<any>();
  const { selectedData } = useContext<any>(SimpleCtx);

  // const assignAlias = () => {
  //   const data = selectedData.tableSelectedData;

  //   if (data) {
  //     const selectedProjectId = selectedProject?.id;
  //     const selectedAliasId = selectedAlias?.id;

  //     data.forEach((item) => {
  //       const itemId = item.original?.id;
  //       const itemStatus = item.original?.status;

  //       if (itemStatus) {
  //         itemStatus.forEach((statusItem) => {
  //           dispatch(
  //             setSelected({ id: statusItem.id, value: selectedProjectId })
  //           );
  //           dispatch(
  //             setSelectedAliasKey({ id: statusItem.id, value: selectedAliasId })
  //           );
  //         });
  //       } else if (itemId) {
  //         dispatch(setSelected({ id: itemId, value: selectedProjectId }));
  //         dispatch(setSelectedAliasKey({ id: itemId, value: selectedAliasId }));
  //       }
  //     });
  //   }
  // };

  const assignAlias = () => {
    const data = selectedData.tableSelectedData;

    if (data) {
      const selectedProjectId = selectedProject?.id;
      const selectedAliasId = selectedAlias?.id;

      data.forEach((item) => {
        const itemId = item?.id;

        if (itemId) {
          dispatch(setSelected({ id: itemId, value: selectedProjectId }));
          dispatch(setSelectedAliasKey({ id: itemId, value: selectedAliasId }));
        }
      });
      setAliasModel(false);
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getAllProjects());
  // }, []);
  const handleProjectChange = (
    event: SelectChangeEvent<typeof selectedProject>
  ) => {
    const selectedProjectId = event.target.value.id;
    setSelectedProject(event.target.value);
    setSelectedAlias({});
    dispatch(getAllAlias({ id: selectedProjectId }));
    // dispatch(
    //   getAllAlias({ id: event.target.value, project: selectedProjectId })
    // );

    // });
  };

  const handleAliasChange = (
    event: SelectChangeEvent<typeof selectedAlias>
  ) => {
    // dispatch(setAlises(event.target.value));
    setSelectedAlias(event.target.value);
  };

  useEffect(() => {
    const data = selectedData.tableSelectedData;
    // setTimeout(() => {
    data.forEach((item) => {
      const itemId = item?.id;

      if (itemId) {
        dispatch(
          setAlises({
            id: itemId,
            value: allAliases,
          })
        );
      }
    });
  }, [allAliases.length]);

  const handleSubmit = () => {
    let submitObj = {
      project: selectedProject,
      alias: selectedAlias,
    };
    assignAlias();
    // dispatch(setAliasModal(submitObj));
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addAliasModel}
        onClose={() => setAliasModel(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={addAliasModel}>
          <Box
            sx={{ maxWidth: "652px" }}
            className="common-modal-bg lg:py-10 lg:px-20 md:px-[40px] md:py-[40px] py-5 px-5 flex flex-col justify-center gap-12 shadow-[0_0_24px_0_rgba(0,0,0,0.15)] rounded-2xl"
          >
            <Typography
              className=""
              id="transition-modal-title"
              color={theme.palette.text.secondary}
              variant="h3"
            >
              Add a Alias
            </Typography>

            <Box className="flex flex-col gap-10">
              <Box className="flex flex-col justify-center gap-8">
                <FormControl fullWidth className="h-15">
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={selectedProject}
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
                      allProjects?.map((item: any, index: number) => (
                        <MenuItem value={item} key={index}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
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
                      allAliases?.map((name, index) => (
                        <MenuItem key={index} value={name}>
                          <ListItemText primary={name?.alias} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
              <Box className="flex sm:flex-row  flex-col justify-end gap-4">
                <Button
                  className="text-color btn px-6 py-3  text-base font-bold"
                  variant="outlined"
                  onClick={() => setAliasModel(false)}
                >
                  CANCEL
                </Button>
                <Button
                  className=" background px-6 py-3 text-base font-bold"
                  variant="text"
                  color="primary"
                  onClick={() => {
                    // if (setSuccessAlise) {
                    //   setAliasModel(false);
                    //   setSuccessAlise(true);
                    // }
                    handleSubmit();
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Alias;
