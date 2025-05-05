import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import {
  useSortBy,
  useTable,
  useRowSelect,
  usePagination,
  useExpanded,
  UsePaginationInstanceProps,
  TableInstance,
  UseSortByInstanceProps,
  UsePaginationState,
  UseRowSelectInstanceProps,
} from "react-table";
import Image from "next/image";
import IconService from "@/utils/Icons";
import { Button, Card, Checkbox, Typography } from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SimpleCtx } from "@/components/Common/Context";
import TableRow from "@/components/tables/TableRow";
import { useDispatch } from "react-redux";
import CanvasComponent from "@/components/Common/CanvasComponent";
import { HighlightPosition } from "@/utils/TYPES";
import { BASE_URL, fetchImageURL } from "@/utils/HTTP";
import { TableColumn } from "@/shared/config/types";
import ReportDataTableHeader from "../ReportData/ReportDataTableHeader";
export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UseRowSelectInstanceProps<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

const initialStatee: any = {
  pageSize: 50,
  pageIndex: 0,
};

const ClassificationTable = (props: {
  data: Array<object>;
  columns: TableColumn[];
  pagination?: boolean;
  isCheckbox?: boolean;
  dispatchFunction?: any;
  dataPage?: any;
}) => {
  const data = React.useMemo(() => {
    if (props?.data?.length) {
      return [...props?.data];
    } else {
      return [];
    }
  }, [props?.data]);
  const columns = React.useMemo(() => [...props?.columns], [props?.columns]);
  const initialState = React.useMemo(() => initialStatee, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy,
    useExpanded,
    usePagination, // Add the usePagination hook here
    useRowSelect
  ) as TableInstanceWithHooks<any>;

  // Map over the array of page numbers

  const { selectedData, setSelectedData } = useContext<any>(SimpleCtx);
  const [zoomLevel, setZoomLevel] = useState<number>(
    Math.min(200, Math.max(100, 100))
  );

  const toggleSelection = (row, subrow?: any) => {
    setSelectedData((prevSelectedData) => {
      const { isSelecteAll, tableSelectedData } = prevSelectedData;

      // Check if the row is already selected
      const rowIsSelected = tableSelectedData.some(
        (selectedRow) => selectedRow?.id === row.id
      );

      if (subrow) {
        // Handle subrow selection

        if (rowIsSelected) {
          // If the row is already selected, update the status of the selected row
          const updatedTableSelectedData = tableSelectedData
            .map((selectedRow) => {
              if (selectedRow?.id === row?.id) {
                const updatedStatus = selectedRow.status.includes(subrow)
                  ? selectedRow.status.filter(
                      (subrowItem) => subrowItem.id !== subrow.id
                    )
                  : [...selectedRow?.status, subrow];
                if (updatedStatus.length === 0) {
                  // If updatedStatus is empty, do not return this selectedRow
                  return null;
                }

                return { ...selectedRow, status: updatedStatus };
              }
              return selectedRow;
            })
            .filter(Boolean); // Remove null entries

          return { isSelecteAll, tableSelectedData: updatedTableSelectedData };
        } else {
          // If the row is not selected, add it with the subrow
          const newRow = { ...row, status: [subrow] };
          return {
            isSelecteAll,
            tableSelectedData: [...tableSelectedData, newRow],
          };
        }
      } else {
        // Handle parent row selection

        if (rowIsSelected) {
          const updatedTableSelectedData = tableSelectedData.filter(
            (selectedRow) => {
              if (selectedRow?.id === row.id) {
                if (selectedRow?.status?.length === row?.status?.length) {
                  return false; // Don't include selectedRow in the updated array
                } else {
                  if (selectedRow.status) {
                    // If selectedRow.status already exists, update it
                    selectedRow.status = row.status;
                  } else {
                    // If selectedRow.status does not exist, create it and push data from row.status
                    selectedRow.status = [...row.status];
                  }
                }
              }
              return true; // Include selectedRow in the updated array
            }
          );

          return { isSelecteAll, tableSelectedData: updatedTableSelectedData };
        } else {
          // If the row is not selected, add it to the selected data
          return {
            isSelecteAll,
            tableSelectedData: [...tableSelectedData, row],
          };
        }
      }
    });
  };
  const pageNumbers = Array.from(
    { length: props?.dataPage?.total_pages },
    (_, index) => index + 1
  );

  const pageMap = pageNumbers && pageNumbers?.map((pageNumber) => pageNumber);

  const [pageIndexs, setPageIndexs] = React.useState<number>(1);

  const handlePrevious = () => {
    if (pageIndexs > 0) {
      setPageIndexs(pageIndexs - 1);
      props?.dispatchFunction &&
        dispatch(props?.dispatchFunction(`?page=${pageIndexs - 1}`));
    }
  };

  const handleNext = () => {
    if (pageIndexs < pageMap.length - 1) {
      setPageIndexs(pageIndexs + 1);
      props?.dispatchFunction &&
        dispatch(props?.dispatchFunction(`?page=${pageIndexs + 1}`));
    }
  };

  const handlePageChange = (i) => {
    // if (pageIndexs < pageMap.length - i) {
    setPageIndexs(i);
    dispatch(props?.dispatchFunction(`?page=${i}`));
    // }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    props?.dispatchFunction && dispatch(props?.dispatchFunction(`?page=1`));
  }, [dispatch]);

  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null);
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition>(
    {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  );

  // useEffect(() => {
  //   if (selectedData?.tableSelectedData[0]?.location) {
  //     if (selectedData?.tableSelectedData[0]?.page_id) {
  //       fetchImageURL(
  //         `${BASE_URL}/media/pages/${selectedData?.tableSelectedData[0]?.page_id}.png`
  //       ).then((res) => {
  //         setFetchedImageUrl(res);
  //       });
  //     }
  //     setHighlightPosition(selectedData?.tableSelectedData[0]?.location);
  //   }
  //   console.log(selectedData)
  // }, [selectedData?.tableSelectedData[0]?.location]);

  useEffect(() => {
      setSelectedData((prevSelectedData) => {
        return {
          ...prevSelectedData,
          tableSelectedData: [rows[0]?.original],
        };
      });
    }, [rows]);

  
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

  const [stageScale, setStageScale] = useState(0.53);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);

  return (
    <div>
      <ReportDataTableHeader
        detailPage={true}
        tableHeader={columns}
        stageScale={stageScale}
        setStageScale={setStageScale}
        stageX={stageX}
        setStageX={setStageX}
        stageY={stageY}
        setStageY={setStageY}
      />

      <div className={`grid grid-cols-2 w-full gap-x-5 extraction-report-pdf h-full`}>
        <div className="  flex flex-col overflow-y: auto">
          <div className="consultation_card_box ">
            <div className="table-container overflow-x-auto">
              <table {...getTableProps()} className="table consultation_table">
                <thead>
                  {headerGroups?.map((headerGroup: any, i: any) => (
                    <tr
                      key={i}
                      className="consultation_table_head"
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {props?.isCheckbox && <th className="w-[5%]"></th>}

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
                <tbody className="" {...getTableBodyProps()}>
                  {(page || rows)?.map((row: any, i: any) => {
                    prepareRow(row);

                    return (
                      <React.Fragment key={i}>
                        <tr
                          onClick={() => toggleSelection(row.original)}
                          style={{
                            backgroundColor:
                              selectedData?.tableSelectedData?.some(
                                (selectedRow) => {
                                  const selectedStatus = selectedRow?.status;
                                  const originalStatus = row?.original?.status;

                                  if (
                                    selectedRow?.report_id ===
                                    row?.original?.report_id
                                  ) {
                                    if (
                                      selectedStatus &&
                                      selectedStatus.length ===
                                        originalStatus?.length
                                    ) {
                                      return true;
                                    } else if (!selectedStatus) {
                                      return true;
                                    }
                                  }

                                  return false;
                                }
                              )
                                ? "#F9F6FF"
                                : "",
                          }}
                          className={`consultation_table_body_row ${
                            row.isExpanded ? "view open" : "view"
                          }`}
                          {...row.getRowProps()}
                        >
                          {props?.isCheckbox && (
                            <td>
                              <Checkbox
                                color="primary"
                                className="p-0"
                                name="tableSelectedData"
                                checked={selectedData?.tableSelectedData?.some(
                                  (selectedRow) => {
                                    const selectedStatus = selectedRow?.status;
                                    const originalStatus =
                                      row?.original?.status;

                                    // Check the first condition
                                    if (selectedRow?.id === row?.original?.id) {
                                      if (
                                        selectedStatus &&
                                        selectedStatus.length ===
                                          originalStatus?.length
                                      ) {
                                        // If the first condition is true, check the second condition
                                        return true;
                                      } else if (!selectedStatus) {
                                        return true;
                                      }
                                      // Both conditions are met
                                    } else {
                                      return false;
                                    }

                                    // Either the first condition is false or the second condition is false
                                  }
                                )}
                                onChange={() => toggleSelection(row.original)}
                                checkedIcon={
                                  <img src={IconService.checkedIcon.src} />
                                }
                                icon={<img src={IconService.Uncheck.src} />}
                                indeterminateIcon={
                                  <img
                                    src={IconService.intermidiateminus.src}
                                    alt="Uncheck icon"
                                  />
                                }
                                indeterminate={selectedData?.tableSelectedData?.some(
                                  (selectedRow) => {
                                    const selectedStatus = selectedRow?.status;
                                    const originalStatus =
                                      row?.original?.status;

                                    // Check the first condition
                                    if (selectedRow?.id === row?.original?.id) {
                                      if (
                                        selectedStatus &&
                                        selectedStatus.length <
                                          originalStatus?.length
                                      ) {
                                        // If the first condition is true, check the second condition
                                        return true;
                                      } else if (!selectedStatus) {
                                        return false;
                                      }
                                      // Both conditions are met
                                    } else {
                                      return false;
                                    }

                                    // Either the first condition is false or the second condition is false
                                  }
                                )}
                              />
                            </td>
                          )}

                          {row.cells.map((cell: any, index: number) => {
                            return (
                              <>
                                <td
                                  className={`consultation_table_body_text ${
                                    cell?.column?.id == "selection" &&
                                    "p-0 text-center"
                                  }`}
                                  key={index}
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}{" "}
                                </td>
                              </>
                            );
                          })}
                        </tr>
                        {row?.isExpanded && (
                          <TableRow
                            data={row}
                            toggleSelection={toggleSelection}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {data?.length && props.pagination ? (
              <div>
                <div className="row ">
                  {pageMap.length > 1 ? (
                    <div className="col-md-6">
                      <div>
                        <div className="common-pagination">
                          <Button
                            onClick={handlePrevious}
                            disabled={pageIndexs == 1}
                            variant="outlined"
                            size="small"
                            style={{ border: 0 }}
                            role="button"
                          >
                            <ArrowBackIosIcon
                              fontSize="small"
                              style={{ width: "15px" }}
                            />{" "}
                            <span style={{ textDecoration: "underline" }}>
                              Prev
                            </span>
                          </Button>

                          {pageMap.map((currentPage, i) => {
                            const isActive = pageIndexs === currentPage;
                            const isWithinRange =
                              Math.abs(pageIndexs - currentPage) <= 2;

                            if (isWithinRange) {
                              return (
                                <div
                                  className={`page-item ${
                                    isActive ? "active" : ""
                                  }`}
                                  key={i}
                                  onClick={() => handlePageChange(currentPage)}
                                >
                                  {currentPage}
                                </div>
                              );
                            }

                            if (i === 0) {
                              return (
                                <>
                                  <div
                                    className="page-item"
                                    key="start-ellipsis"
                                  >
                                    ...
                                  </div>
                                  <div
                                    onClick={() =>
                                      handlePageChange(currentPage)
                                    }
                                    className={`page-item ${
                                      isActive ? "active" : ""
                                    }`}
                                    key={i}
                                  >
                                    {currentPage}
                                  </div>
                                </>
                              );
                            }

                            if (i === pageMap.length - 1) {
                              return (
                                <>
                                  <div
                                    onClick={() =>
                                      handlePageChange(currentPage)
                                    }
                                    className={`page-item ${
                                      isActive ? "active" : ""
                                    }`}
                                    key={i}
                                  >
                                    {currentPage}
                                  </div>
                                  <div className="page-item" key="end-ellipsis">
                                    ...
                                  </div>
                                </>
                              );
                            }

                            return null;
                          })}

                          <Button
                            onClick={handleNext}
                            disabled={pageIndexs == pageMap.length}
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{ border: 0 }}
                            role="button"
                            className="underline-offset-2"
                          >
                            <span style={{ textDecoration: "underline" }}>
                              Next
                            </span>
                            <ArrowForwardIosIcon
                              fontSize="small"
                              style={{ width: "15px" }}
                            />{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <Card variant="outlined" className="pdf-reader">
            <CanvasComponent
              dimensions={highlightPosition}
              imageUrls={fetchedImageUrl}
              stageScale={stageScale}
              setStageScale={setStageScale}
              stageX={stageX}
              setStageX={setStageX}
              stageY={stageY}
              setStageY={setStageY}
              // Use an empty array if extrationIMG is undefined
            />
            {/* <CanvasComponent
          dimensions={highlightPosition}
          imageUrls={fetchedImageUrl ? [fetchedImageUrl] : []} // Use an empty array if extrationIMG is undefined
          zoomLevel={zoomLevel}
          handleWheel={handleWheel}
        /> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default memo(ClassificationTable);
