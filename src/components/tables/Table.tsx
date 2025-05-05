import React, { useContext, useEffect } from "react";
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
import { Button, Checkbox, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { SimpleCtx } from "../Common/Context";
import { useDispatch, useSelector } from "react-redux";
import { TableColumn } from "@/shared/config/types";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UseRowSelectInstanceProps<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };
const initialStatee = {
  pageSize: 50,
  pageIndex: 0,
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
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
  handleCheckboxSelection?: any;
  isStatus?: boolean;
  paramsData?: string;
}) {
  const Collapse = (row: any) =>
    props?.collapseComponent && props?.collapseComponent(row);
  const data = React.useMemo(() => {
    if (props?.data?.length) {
      return [...props?.data];
    } else {
      return [];
    }
  }, [props?.data]);
  const columns = React.useMemo(() => [...props?.columns], [props?.columns]);
  const initialState = React.useMemo(
    () => ({
      pageSize: 1000,
      pageIndex: 0,
    }),
    [data]
  );
  const { paramsData, searchParams } = useSelector(
    ({ CommonSlice }) => CommonSlice
  );

  const RowSubComponent = React.useCallback(({ row }) => {
    return <Collapse row={row} />;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    selectedFlatRows,
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (props?.isCheckbox) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            className: "w-[5%] text-center",

            Cell: ({ row }) => (
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
  const { selectedData, setSelectedData } = useContext<any>(SimpleCtx);

  useEffect(() => {
    if (selectedFlatRows?.length > 0) {
      // setSelectedData((prevState) => {
      //   // Create a mapping of IDs in the tableSelectedData array for faster look-up
      //   const tableSelectedDataIds = prevState.tableSelectedData.map(
      //     (item) => item.id
      //   );
      //   // Filter out selectedFlatRows that are already in tableSelectedData
      //   const newSelectedFlatRows = selectedFlatRows?.filter((row) => {
      //     return !tableSelectedDataIds.includes(row.id);
      //   });
      //   // Update tableSelectedData by adding newSelectedFlatRows
      //   const updatedTableSelectedData = [
      //     ...prevState.tableSelectedData,
      //     ...newSelectedFlatRows,
      //   ];
      //   return {
      //     ...prevState,
      //     isSelecteAll: updatedTableSelectedData.length === data.length,
      //     tableSelectedData: updatedTableSelectedData,
      //   };
      // });

      setSelectedData({
        ...selectedData,
        isSelecteAll: selectedFlatRows?.length == data?.length,
        tableSelectedData: selectedFlatRows,
      });
    } else {
      setSelectedData({
        ...selectedData,
        isSelecteAll: false,
        tableSelectedData: [],
      });
    }
  }, [selectedFlatRows?.length]);

  useEffect(() => {
    if (selectedData?.isSelecteAll) {
      toggleAllRowsSelected(selectedData?.isSelecteAll);
    } else if (
      selectedFlatRows?.length == data?.length &&
      selectedData?.isSelecteAll == false
    ) {
      toggleAllRowsSelected(selectedData?.isSelecteAll);
    }
  }, [selectedData?.isSelecteAll]);

  const dispatch = useDispatch();

  useEffect(() => {
    props?.dispatchFunction && dispatch(props?.dispatchFunction(`?page=1`));
  }, [dispatch]);

  const pageNumbers = Array.from(
    { length: props?.dataPage?.total_pages },
    (_, index) => index + 1
  );

  const pageMap = pageNumbers && pageNumbers?.map((pageNumber) => pageNumber);

  const [pageIndexs, setPageIndexs] = React.useState<number>(1);

  const handlePrevious = () => {
    if (pageIndexs > 0) {
      setPageIndexs(pageIndexs - 1);

      dispatch(
        setSearchParams({
          name: "pagination",
          value: `?page=${pageIndexs - 1}`,
        })
      );
      // props?.dispatchFunction &&
      //   dispatch(
      //     props?.dispatchFunction(`${paramsData}page=${pageIndexs - 1}`)
      //   );
    }
  };

  useEffect(() => {
    if (searchParams?.pagination) {
      setPageIndexs(Number(searchParams?.pagination.split("=")[1]));
    } else {
      setPageIndexs(1);
    }
  }, [searchParams]);

  const handleNext = () => {
    // if (pageIndexs < pageMap.length - 1) {
    setPageIndexs(pageIndexs + 1);

    dispatch(
      setSearchParams({
        name: "pagination",
        value: `?page=${pageIndexs + 1}`,
      })
    );
    // props?.dispatchFunction &&
    //   dispatch(props?.dispatchFunction(`${paramsData}page=${pageIndexs + 1}`));
    // }
  };

  const handlePageChange = (i) => {
    // if (pageIndexs < pageMap.length - i) {
    setPageIndexs(i);
    // dispatch(props?.dispatchFunction(`${paramsData}page=${i}`));

    dispatch(
      setSearchParams({
        name: "pagination",
        value: `?page=${i}`,
      })
    );
    // }
  };

  return (
    <div className="  flex flex-col ">
      <div className="consultation_card_box ">
      <div className="table-container" style={{ overflowX: "auto", scrollbarWidth: "auto" }}>
          <table {...getTableProps()} className="table consultation_table">
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
            <tbody className="" {...getTableBodyProps()}>
              {(page || rows)?.map((row, i) => {
                prepareRow(row);
                return (
                  <React.Fragment key={i}>
                    <tr
                      className={`consultation_table_body_row ${
                        row.isExpanded ? "view open" : "view"
                      }`}
                      style={{
                        backgroundColor:
                          selectedData?.tableSelectedData &&
                          selectedData?.tableSelectedData?.find(
                            (select: { id: string }) => select.id == row.id
                          ) &&
                          "#F9F6FF",
                      }}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell: any, index: number) => {
                        return (
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
                        );
                      })}
                    </tr>
                    {row.isExpanded ? <RowSubComponent row={row} /> : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        {data?.length && props.pagination ? (
          <div
            className={`${
              !props.isStatus ? "isStatus my-3.5" : "pagination_card my-3.5"
            }`}
          >
            <div className="row ">
              {props.isStatus && (
                <div className="status-color">
                  <div className="completed flex flex-row items-center justify-between space-between mr-[1rem]">
                    <span className="mr-2 flex">
                      <Image src={IconService.completed} alt="completed" />
                    </span>
                    <Typography variant="subtitle2">Completed</Typography>
                  </div>
                  <div className="partially-completed flex flex-row items-center justify-between mr-[1rem]">
                    <span className="mr-2 flex">
                      <Image src={IconService.partially} alt="partially" />
                    </span>
                    <Typography variant="subtitle2">
                      Partially Completed
                    </Typography>
                  </div>
                  <div className="error flex flex-row items-center justify-between mr-[1rem]">
                    <span className="mr-2 flex">
                      <Image src={IconService.error} alt="error" />
                    </span>
                    <Typography variant="subtitle2">Error</Typography>
                  </div>
                </div>
              )}

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
                                onClick={() => handlePageChange(currentPage)}
                                className={`page-item ${
                                  isActive ? "active" : ""
                                }`}
                                key={i}
                              >
                                {currentPage}
                              </div>
                              <div className="page-item" key="start-ellipsis">
                                ...
                              </div>
                            </>
                          );
                        }

                        if (i === pageMap.length - 1) {
                          return (
                            <>
                              <div className="page-item" key="end-ellipsis">
                                ...
                              </div>
                              <div
                                onClick={() => handlePageChange(currentPage)}
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
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
