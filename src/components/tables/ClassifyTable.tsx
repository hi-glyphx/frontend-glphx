import React, { useEffect, useRef, useState } from "react";
import {
  useSortBy,
  useTable,
  useRowSelect,
  useExpanded,
  TableInstance,
  UseSortByInstanceProps,
  UseRowSelectInstanceProps,
  TableState,
} from "react-table";
import Image from "next/image";
import IconService from "@/utils/Icons";
import {
  Autocomplete,
  Button,
  Checkbox,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  Classify,
  SaveClassify,
  setCreatedDate,
  setDocument_imageURLID,
  setIndex,
  setRemoveZeroIndex,
  setSelctedPage,
  setSelectedRowName,
  verifyUrl,
} from "@/Store/Reducer/ClassificationSlice";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import Reject from "../modals/Reject";
import Save_Documents from "../modals/Save_Documents";

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UseRowSelectInstanceProps<T> &
  UseSortByInstanceProps<T>;

interface InitialStateType {
  pageSize: number;
  pageIndex: number;
}
const initialStatee: InitialStateType = {
  pageSize: 20,
  pageIndex: 0,
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: { indeterminate: boolean }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef: any = ref || defaultRef;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox
          color="primary"
          checkedIcon={<img src={IconService.checkedIcon.src} />}
          icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
          ref={resolvedRef}
          {...rest}
        />
      </>
    );
  }
);
IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

export default function Table(props: {
  collapseComponent?: (arg0: any) => any;
  data: Array<object>;
  columns: TableColumn[];
  pagination?: boolean;
  isCheckbox?: boolean;
  dispatchFunction?: any;
  dataPage?: any;
  isStatus?: boolean;
  rejectOpen?: boolean;
  setRejectOpen?: any;
  setintigateApi?: any;
  setDocument_imageURLID?: any;
  handleReset?: any;
}) {
  const data = React.useMemo(() => [...props?.data], [props?.data]);
  const columns = React.useMemo(() => [...props?.columns], [props?.columns]);
  const initialState = React.useMemo(() => initialStatee, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
    toggleRowSelected,
  } = useTable(
    {
      columns,
      data,
      initialState,
      stateReducer: (newState: TableState<object>, action) => {
        if (action.type === "toggleRowSelected") {
          newState.selectedRowIds = {
            [action.id]: true,
          };
        }
        return newState;
      },
    },
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      if (props?.isCheckbox) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            className: "w-[5%] text-center",
            Cell: ({ row }: any) => (
              <div className="p-0  ">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  ) as TableInstanceWithHooks<any>;

  interface ClassificationState {
    classify: any;
    selectedRowName: any;
    active_page_num: any;
    document_imageURLID?: any;
  }

  const {
    classify,
    selectedRowName,
    active_page_num,
    document_imageURLID,
  }: ClassificationState = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const [selectedAuto, setSelectedAuto] = useState<string>("");
  const [isAutocompleteOpen, setAutocompleteOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const autocompleteRef = useRef<any>(null);
  const [save, setSave] = useState<boolean>(false);

  const [initialSelected, setInitialSelected] = useState(false);
  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.focus();
    }
  }, []);

  const updateSelecte = rows?.filter((item) => {
    if (item?.original?.flags?.do_classify) {
      return item;
    }
  });

  useEffect(() => {
    dispatch(setIndex(indexSelected));
  }, [indexSelected]);

  useEffect(() => {
    dispatch(verifyUrl(updateSelecte[indexSelected]?.original?.image_url));
  }, [updateSelecte[indexSelected]?.original]);

  useEffect(() => {
    if (updateSelecte[indexSelected]?.original) {
      let temp: any = rows.find(
        (res) =>
          res.original.page_name ==
          updateSelecte[indexSelected]?.original?.page_name
      );
      if (temp) {
        temp?.toggleRowSelected(true);
        handleClickScroll(updateSelecte[indexSelected]?.id);
        setInitialSelected(false);
      }
      // setSelectedAuto(updateSelecte[indexSelected]?.original?.document_name);
    }
  }, [updateSelecte[indexSelected]?.original, initialSelected]);

  const commonSaveFunction = () => {
    if (autocompleteRef.current) {
      autocompleteRef.current.querySelector("input").focus();
    }

    if (selectedAuto && !Object.values(document_imageURLID)[0]) {
      dispatch(
        setSelectedRowName<any>({
          value: selectedAuto,
          selected: updateSelecte[indexSelected]?.original?.page_name,
          oldArray: classify?.items[0]?.results,
        })
      );

      if (indexSelected !== updateSelecte.length) {
        setIndexSelected((prev) => prev + 1);
      }
    } else {
      dispatch(setDocument_imageURLID(""));
      toggleRowSelected(updateSelecte[indexSelected]?.id, true);
      dispatch(
        setSelectedRowName<any>({
          value: selectedAuto,
          selected: active_page_num?.page_name,
          oldArray: classify?.items[0]?.results,
        })
      );
      setInitialSelected(true);
    }
    if (updateSelecte?.length == indexSelected) {
      setSave(true);
    }
  };

  useEffect(() => {
    function handleKeyDown(e: {
      ctrlKey: any;
      keyCode: number;
      preventDefault: () => void;
    }) {
      if (e.ctrlKey) {
        if (e.keyCode === 83) {
          // Ctrl + S

          e.preventDefault();
          commonSaveFunction();
          props?.handleReset();
        } else if (e.keyCode === 85) {
          // Ctrl + u
          e.preventDefault();
          props?.handleReset();
          setIndexSelected((prev) => prev - 1);

          // dispatch(
          //   verifyUrl(updateSelecte[indexSelected]?.original?.image_url)
          // );
        } else if (e.keyCode === 80) {
          // ctrl + p

          e.preventDefault();

          dispatch<any>(
            setSelctedPage({
              ...active_page_num,
              document_name: selectedRowName,
            })
          );
          // dispatch(
          //   setSelectedRowName<any>({
          //     value: selectedRowName,
          //     selected: updateSelecte[indexSelected]?.original?.page_name,
          //     oldArray: classify?.items[0]?.results,
          //   })
          // );
          setSelectedAuto(selectedRowName);

          // setIndexSelected((prev) => prev + 1);
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [indexSelected, selectedAuto]);

  // const handleClickScroll = (id: string) => {
  //   const element = document.getElementById(`section-${id}`);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(`section-${id}`);
    const bottomelement = document.getElementById(`full-section-1`);

    if (element) {
      element.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "center",
      });
    }

    if (bottomelement) {
      bottomelement.scrollIntoView({
        behavior: "auto",
        inline: "center",
        block: "center",
      });
    }
  };
  const onSave = () => {
    // dispatch(
    //   setSelectedRowName<any>({
    //     value: selectedAuto,
    //     selected: updateSelecte[indexSelected]?.original?.page_name,
    //     oldArray: classify?.items[0]?.results,
    //   })
    // );
    // if (autocompleteRef.current) {
    //   autocompleteRef.current.querySelector("input").focus();
    // }
    // if (updateSelecte?.length == indexSelected) {
    //   setSave(true);
    //   // router.push("/classification/batchList/")
    // }
    // if (indexSelected !== updateSelecte.length) {
    //   setIndexSelected((prev) => prev + 1);
    // }
    commonSaveFunction();
  };

  const onSaveChange = () => {
    const currentDate = new Date().toISOString();

    let request = {
      CriticalClassify: classify?.items[0]?.results
        ?.filter((item) => {
          return item?.flags?.do_classify || item?.isEdit;
        })
        .map((item) => {
          return { ...item, flags: { ...item.flags, do_classify: false } };
        }),
      NonCriticalClassify: [],
      results: classify?.items[0]?.results && classify?.items[0]?.results,
      doc_types: classify?.items[0]?.doc_types,
      job_class: classify?.items[0]?.job_class,
      form_num: classify?.items[0]?.form_num,
      meta: {},
      verification_information: {},
      HasComponents: false,
      id: classify?.items[0]?.id,
      resource_uri: classify?.items[0]?.resource_uri,
      account: null,
      team: null,
      Created: classify?.Created,
      Modified: currentDate,
    };
    dispatch(SaveClassify(request)).then((res) => {
      if (res) {
        setSave(false);
        if (classify?.items?.length > 1) {
          dispatch(setRemoveZeroIndex());
          setIndexSelected(0);
        } else {
          dispatch(Classify()).then((res) => {
            if (!res?.payload?.items?.length) {
              props?.setintigateApi(true);
              setIndexSelected(0);
            } else {
              props?.setintigateApi(false);
              setIndexSelected(0);
              dispatch(setSelctedPage<any>({}));
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString();
    dispatch(setCreatedDate(currentDate));
  }, [dispatch]);

  useEffect(() => {
    if (selectedFlatRows[0]?.original?.page_name) {
      setSelectedAuto(selectedFlatRows[0]?.original?.document_name);
      dispatch(
        setSelctedPage<any>({
          page_name: selectedFlatRows[0]?.original?.page_name,
          document_name: selectedFlatRows[0]?.original?.document_name,
          confidence: selectedFlatRows[0]?.original?.confidence,
        })
      );
    }
  }, [selectedFlatRows[0]?.original?.page_name]);

  return (
    <>
      <div
        id="full-section-1"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "75vh",
        }}
      >
        <div className="classification-table ">
          <div className="consultation_card_box">
            <div className="table-container overflow-y-auto overflow-x-hidden">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups?.map((headerGroup: any, i: any) => (
                    <tr
                      key={i}
                      className="consultation_table_head"
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column: any, i: any) => (
                        <th
                          key={i}
                          className="consultation_table_head_text "
                          {...column.getHeaderProps([
                            {
                              className: column.className,
                              style: column.style,
                            },
                            column.sort ? column.getSortByToggleProps() : "",
                          ])}
                        >
                          <div className="flex items-center">
                            <div className="whitespace-nowrap">
                              {column.render("Header")}
                            </div>
                            {column?.sort && (
                              <span className="sort-sec mb-1">
                                {column?.isSorted ? (
                                  column.isSortedDesc ? (
                                    <Image
                                      src={IconService.SortIcon}
                                      alt="up"
                                      height={20}
                                      width={20}
                                    />
                                  ) : (
                                    <Image
                                      src={IconService.SortIcon}
                                      alt="down"
                                      height={20}
                                      width={20}
                                    />
                                  )
                                ) : (
                                  <Image
                                    src={IconService.SortIcon}
                                    alt="updown"
                                    height={20}
                                    width={20}
                                  />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="table" {...getTableBodyProps()}>
                  {rows?.map((row: any, i: any) => {
                    prepareRow(row);

                    return (
                      <React.Fragment key={i}>
                        <tr
                          onClick={() => {
                            if (!row?.original?.flags?.do_classify) {
                              toggleRowSelected(row.id, true);

                              // setAutocompleteOpen(true);
                              dispatch(
                                setDocument_imageURLID({
                                  id: row?.original?.ID,
                                  url: row?.original?.image_url,
                                })
                              );
                              dispatch<any>(
                                setSelctedPage({
                                  ...active_page_num,
                                  page_name: row?.original?.page_name,
                                })
                              );
                              document
                                .getElementById("combo-box-demo")
                                ?.focus();
                            }
                          }}
                          id={`section-${row?.id}`}
                          style={{
                            backgroundColor:
                              selectedFlatRows &&
                              selectedFlatRows?.find(
                                (select: any) => select.id == row.id
                              ) &&
                              "#F9F6FF",
                            cursor: "pointer",
                          }}
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell: any, index: number) => {
                            return (
                              <td
                                className={` consultation_table_body_text  ${
                                  cell?.column?.id == "selection" && "p-0"
                                }`}
                                key={index}
                                {...cell.getCellProps()}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-3  autocomplete-clasify">
          <Autocomplete
            className="col-span-3 h-12"
            options={classify?.items[0]?.doc_types}
            id="combo-box-demo"
            clearIcon={true}
            autoFocus={true}
            popupIcon={<img src={IconService.DownArrow.src} />}
            value={
              selectedAuto //updateSelecte[indexSelected]?.original?.alternate_document_types[0]
            }
            open={isAutocompleteOpen}
            onOpen={() => setAutocompleteOpen(true)}
            onClose={() => setAutocompleteOpen(false)}
            PaperComponent={({ children }) => (
              <Paper
                sx={{
                  backgroundColor: "#f8f9fa", // Set your desired background color for the Autocomplete dropdown
                  color: "#000", // Set your desired text color for the Autocomplete dropdown
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Set your desired box shadow
                }}
              >
                {children}
              </Paper>
            )}
            ref={autocompleteRef}
            onChange={(event, value: any) => {
              if (!selectedFlatRows[0]?.original?.flags?.do_classify) {
                if (value !== null) {
                  setSelectedAuto(value);
                  dispatch<any>(
                    setSelctedPage({
                      ...active_page_num,
                      document_name: value,
                    })
                  );
                  // dispatch(
                  //   setSelectedRowName<any>({
                  //     value: value,
                  //     selected: active_page_num?.page_name,
                  //     oldArray: classify?.items[0]?.results,
                  //   })
                  // );
                  // dispatch(setDocument_imageURLID(""));
                  // setInitialSelected(true);
                }
              } else {
                if (value !== null) {
                  setSelectedAuto(value);

                  dispatch<any>(
                    setSelctedPage({
                      ...active_page_num,
                      document_name: value,
                    })
                  );
                }
              }
              setAutocompleteOpen(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                // label="Combo box"
                placeholder="Find Form"
                variant="outlined"
                autoFocus={true}
                // value={selectedAuto}
                // ref={autocompleteRef}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={IconService.SearchIcon.src} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            variant="text"
            color="primary"
            size="small"
            className="h-12"
            onClick={() => onSave()}
          >
            SAVE
          </Button>
        </div>
      </div>
      <Save_Documents
        save={save}
        setSave={setSave}
        onSaveChange={onSaveChange}
        title="Save Updated Class Names"
        discribtion=" All the pages are done. Are you sure that you want to submit?"
      />
      <Reject
        isExtraction={false}
        open={props?.rejectOpen}
        handleClose={() => props?.setRejectOpen(false)}
        setintigateApi={props?.setintigateApi}
        setIndexSelected={setIndexSelected}
      />
    </>
  );
}
