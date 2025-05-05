import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Typography } from "@mui/material";
const Status = dynamic(() => import("@/components/status/Status"), {
  ssr: false,
});
const Flags = dynamic(() => import("@/components/status/Flags"), {
  ssr: false,
});
const JobsOthers = dynamic(
  () => import("@/views/case/case-detail/JobsOthers"),
  {
    ssr: false,
  }
);
const Details = dynamic(() => import("@/views/case/case-detail/Details"), {
  ssr: false,
});
const ViewFlag = dynamic(() => import("@/components/modals/ViewFlag"), {
  ssr: false,
});
const TableHeader = dynamic(() => import("@/views/case/TableHeader"), {
  ssr: false,
});
const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});
import Image from "next/image";
import IconService from "@/utils/Icons";
import CtxProvider from "@/components/Common/Context";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  CaseDetailById,
  MarkAsProcessed,
  caseAbortProcessing,
  caseReprocess,
  deleteCase,
  setCaseFormFlagsDetail,
  setClearCaseDetail,
} from "@/Store/Reducer/CaseSlice";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { setReportVersionDropdown } from "@/Store/Reducer/ReportsSlice";
import { clearSearchParams } from "@/Store/Reducer/CommonSlice";

const CaseDetailPage = () => {
  const [filteredDoc, setFilteredDoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const [addCaseFlagFlags, setAddCaseFlagFlags] =
    React.useState<boolean>(false);
  const { caseFormFlagsDetail } = useSelector(({ CaseSlice }) => CaseSlice);

  const handleDeleteCase = async (caseId) => {
    const result = await dispatch(deleteCase(caseId));
    if (deleteCase.fulfilled.match(result)) {
      // Case deleted successfully, you can navigate or perform other actions here
      router.push("/case");
    } else {
      // Handle the error
      // You can access the error message using result.error.message
    }
  };

  const columns: TableColumn[] = [
    {
      Header: "Alias",
      accessor: "alias",
      sort: true,
    },
    {
      Header: " Document Name",
      accessor: "form_num",
      sort: true,
    },
    {
      Header: "Dynamic", //"Dynamic",
      accessor: "dynamic",
      sort: true,

      Cell: (column) => {
        return (
          <div className="cursor-pointer">
            {column?.row?.original.dynamic == true ? "Yes" : "No"}
          </div>
        );
      },
    },
    {
      Header: "Processed",
      accessor: "processed",
      sort: true,

      Cell: (column) => {
        return (
          <div className="cursor-pointer">
            {column?.row?.original.processed == true ? "Yes" : "No"}
          </div>
        );
      },
    },
    {
      Header: "Form ID",
      accessor: "form_id",
      sort: true,
    },
    {
      Header: " Verification Pending?",
      accessor: "is_processing",
      sort: true,
      Cell: (column) => {
        return (
          <div className="cursor-pointer">
            {column?.row?.original.has_batch}
          </div>
        );
      },
    },
    {
      Header: "Number of Pages",
      accessor: "pages",
    },
    {
      Header: "Created Time",
      accessor: "created",
    },
    {
      Header: "Completed Time",
      accessor: "completed",
    },
    {
      Header: "Status",
      accessor: "status",
      sort: true,
      Cell: (column) => {
        let data = column.value;
        let color = "#7E75A3";
        switch (data) {
          case true:
            color = "#47D8A4";
            break;
          case false:
            color = "#FF5F5F";
            break;

          default:
            break;
        }
        return (
          <Typography style={{ color: color }} variant="body2">
            {data ? "True" : "False"}
          </Typography>
        );
      },
    },
    {
      Header: "Report",
      accessor: "report",
      Cell: (column) => {
        const [images, setImage] = useState(IconService.report);

        const onHovers = () => {
          let ds =
            !column.row?.original.has_extraction_report ||
            !column.row?.original.has_classification_report;

          if (ds) {
            setImage(IconService.report);
          } else {
            setImage(IconService.BackIcon);
          }
        };

        return (
          <div
            className={`cursor-pointer ${
              !column.row?.original.has_extraction_report ||
              !column.row?.original.has_classification_report
                ? "cursor-not-allowed"
                : "hover:bg-stone-700"
            }`}
            onClick={() => {
              
              if (column.row?.original.has_extraction_report) {
                dispatch(setReportVersionDropdown(4));
                dispatch(clearSearchParams());
                router.push({
                  pathname: "/report/report-detail",
                  query: {
                    form_id: column?.row?.original?.form_id,
                    extraction: true,
                  },
                });
              }

              if (column.row?.original.has_classification_report) {
                dispatch(setReportVersionDropdown(0));
                dispatch(clearSearchParams());
                router.push({
                  pathname: "/report/report-detail",
                  query: {
                    form_id: column?.row?.original?.form_id,
                    classify: true,
                  },
                });
              }
            }}
          >
            <div
              className="relative"
              onMouseEnter={onHovers}
              onMouseLeave={() => setImage(IconService.report)}
            >
              <div className="absolute inset-0 flex justify-center items-center hover:bg-stone-700">
                <Image src={images} alt="" height={24} width={24} />
              </div>
            </div>
          </div>
        );
      },
    },

    {
      Header: "Flags",
      accessor: "flags",
      Cell: (column) => {
        return (
          <div>
            {caseFormFlagsDetail?.form_id == column?.row?.original?.form_id ? (
              <Image
                src={IconService.fillflag}
                alt=""
                height={24}
                width={24}
                onClick={() => {
                  setAddCaseFlagFlags(true);
                  dispatch(setCaseFormFlagsDetail(column.row.original));
                }}
              />
            ) : (
              <Image
                src={IconService.flag}
                alt=""
                height={24}
                width={24}
                onClick={() => {
                  setAddCaseFlagFlags(true);
                  dispatch(setCaseFormFlagsDetail(column.row.original));
                }}
              />
            )}
          </div>
        );
      },
    },
  ];

  const router = useRouter();

  const { id } = router.query;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(CaseDetailById(id));
    }

    return () => {
      dispatch(setClearCaseDetail(""));
    };
  }, [id, dispatch]);

  const searchFilterFunction = (searchTerm, columns?: any) => {
    let searchValue = searchTerm.split("=")[1]; // Extract the search value
    let filteredData = caseDetail?.data?.documents.filter((item) => {
      return Object.values(item).some((value) => {
        return value && value.toString().includes(searchValue);
      });
    });
    setSearchTerm(searchTerm);
    setFilteredDoc(filteredData);
  };

  return (
    <>
      <ViewFlag
        viewFlagModal={addCaseFlagFlags}
        setViewFlagModel={setAddCaseFlagFlags}
      />
      <div className="flex flex-col gap-y-10 max-[1400px]:gap-y-6">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row items-center justify-between ">
            <Typography variant="h5" color="text.secondary" className="ml-10">
              Details
            </Typography>

            <div className="common-header-selected-section  h-12 flex flex-row  items-center gap-4 flex-wrap">
              <span
                className="flex flex-row  items-center gap-1 chip-label"
                onClick={() =>
                  dispatch(MarkAsProcessed(caseDetail?.data?.case_id))
                }
              >
                <Image
                  src={IconService.markProcessed}
                  height={24}
                  width={24}
                  alt=""
                />{" "}
                <Typography variant="body1" color="text.secondary">
                  Mark as Processed
                </Typography>
              </span>
              <span
                className="flex flex-row  items-center gap-1 chip-label"
                onClick={() =>
                  dispatch(caseAbortProcessing(caseDetail?.data?.case_id))
                }
              >
                <Image
                  src={IconService.abortProcessing}
                  height={24}
                  width={24}
                  alt=""
                />{" "}
                <Typography variant="body1" color="text.secondary">
                  Abort Processing
                </Typography>
              </span>
              <span
                className="flex flex-row  items-center gap-1 chip-label"
                onClick={() =>
                  dispatch(
                    caseReprocess({ case_id: caseDetail?.data?.case_id })
                  )
                }
              >
                <Image
                  src={IconService.reprocess}
                  height={24}
                  width={24}
                  alt=""
                />{" "}
                <Typography variant="body1" color="text.secondary">
                  Reprocess
                </Typography>
              </span>
              <span
                className="flex flex-row  items-center gap-1 chip-label"
                onClick={() => handleDeleteCase(caseDetail?.data?.case_id)}
              >
                <Image
                  src={IconService.DeleteRedRounded}
                  height={24}
                  width={24}
                  alt=""
                />{" "}
                <Typography variant="body1" color="text.secondary">
                  Delete{" "}
                </Typography>
              </span>
            </div>
          </div>
          <Details />
        </div>
        <div className="flex flex-col gap-y-4">
          <Typography variant="h5" color="text.secondary" className="ml-10">
            Documents
          </Typography>

          <CtxProvider>
            <TableHeader
              isAddButton={true}
              data={caseDetail?.data?.documents}
              serachFunction={(e: string, columns?: any) =>
                searchFilterFunction(e, columns)
              }
              tableHeader={columns}
            />
            <Table
              columns={columns}
              data={searchTerm ? filteredDoc : caseDetail?.data?.documents}
              pagination={false}
              isCheckbox={true}
            />
          </CtxProvider>
        </div>
        {/* )} */}
        <div className="flex flex-col gap-y-4">
          <Typography variant="h5" color="text.secondary" className="ml-10">
            Flags
          </Typography>
          <Flags />
        </div>

        <div className="flex flex-col gap-y-4">
          <Typography variant="h6" color="text.secondary" className="ml-10">
            Jobs and Others
          </Typography>

          {caseDetail && (
            <JobsOthers jobOtherDetail={caseDetail?.data?.others} />
          )}
        </div>
      </div>
    </>
  );
};

export default CaseDetailPage;
