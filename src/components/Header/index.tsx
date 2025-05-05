import { useRouter } from "next/router";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { MENU_OPTIONS } from "@/shared/config/menu-items";
import { useDispatch, useSelector } from "react-redux";
import IconService from "@/utils/Icons";
import Image from "next/image";
import React, { useEffect } from "react";
import { setReportVersionDropdown } from "@/Store/Reducer/ReportsSlice";
import { AppDispatch } from "@/Store/Store";
import {
  CaseDownload,
  CaseDownloadReqest,
  setClearCaseDetail,
} from "@/Store/Reducer/CaseSlice";
import { downloadURI } from "@/utils/Functions";
import { BASE_URL } from "@/utils/HTTP";

interface MenuItem {
  name: string;
  url: string;
  subItems?: MenuItem[];
  parent?: MenuItem;
}

interface BreadcrumbItem {
  name: string;
  url: string | null;
  parent?: BreadcrumbItem;
}

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const linkPath = router.asPath.split("/");
  linkPath.splice(-1);
  const { pathname, query } = router;
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);

  const findMenuItemByUrl = (
    options: MenuItem[],
    url: string
  ): MenuItem | null => {
    for (const option of options) {
      if (option.url === url) {
        return option;
      } else if (option.subItems) {
        const foundSubItem = findMenuItemByUrl(option.subItems, url);
        if (foundSubItem) {
          return foundSubItem;
        }
      }
    }
    return null;
  };

  const getMenuTrail = (menuItem: MenuItem): BreadcrumbItem[] => {
    const trail: BreadcrumbItem[] = [];

    const addToTrail = (item: BreadcrumbItem) => {
      trail.unshift(item);
      if (item.parent) {
        addToTrail(item.parent);
      }
    };

    addToTrail(menuItem);
    return trail;
  };

  const currentMenuItem = findMenuItemByUrl(MENU_OPTIONS, pathname);
  const breadcrumbTrail: BreadcrumbItem[] = currentMenuItem
    ? getMenuTrail(currentMenuItem)
    : [];
  const { editList } = useSelector(({ GroupsSlice }) => GroupsSlice);

  if (query.id) {
    if (linkPath[2] == "edit-group" && editList?.name) {
      breadcrumbTrail.push({
        name: `${editList?.name}`,
        url: null,
      });
    } else {
      breadcrumbTrail.push({
        name: `Case - ${
          caseDetail?.data?.case_num ? caseDetail?.data?.case_num : ""
        }`,
        url: router.asPath,
      });
    }
  }

  const dispatch = useDispatch<AppDispatch>();

  const [newFileLinkDorpdown, setNewFileLinkDorpdown] = React.useState(null);
  const handleNewFileLinkDorpdown = (event: any) => {
    setNewFileLinkDorpdown(event.currentTarget);
  };

  useEffect(() => {
    return () => {
      dispatch(setClearCaseDetail(""));
    };
  }, [dispatch]);

  return (
    <div className="main-header flex justify-between items-center">
      {(router.pathname == "/report/report-detail" && query?.extraction) ||
      query?.classify ? (

        null
        // <Typography variant="h2" color="text.secondary" className="ml-[30px]">
        //   Form Num - {query?.id}
        // </Typography>
      ) : (
        <>
          {breadcrumbTrail?.map((item, index) => (
            <span key={item.url}>
              {index > 0 && " / "}
              <Typography
                variant="h2"
                color="text.secondary"
                className="ml-[30px]"
              >
                {item.name}
              </Typography>
            </span>
          ))}
        </>
      )}
      {router.asPath == "/report/report-detail/" && (
        <Typography variant="h2" color="text.secondary" className="ml-[30px]">
          Report {caseDetail?.data?.case_id && `- ${caseDetail?.data?.case_id}`}
        </Typography>
      )}
      {caseDetail?.data?.case_id && (
        <div className=" flex gap-4">
          <Button
            variant="outlined"
            color="primary"
            className="w-1/7 h-12"
            onClick={handleNewFileLinkDorpdown}
          >
            Result
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={newFileLinkDorpdown}
            keepMounted
            open={Boolean(newFileLinkDorpdown)}
            onClose={() => setNewFileLinkDorpdown(null)}
          >
            <MenuItem
              disabled={!caseDetail?.data?.results.has_classification_result}
              onClick={() => {
                router.push({
                  pathname: "/report/report-detail",
                  query: { id: caseDetail?.data?.case_id, classify: true },
                });
                dispatch(setReportVersionDropdown(0));
              }}
            >
              <Image
                src={IconService.AClassification}
                height={20}
                width={20}
                alt=""
                className="mr-2 "
              />{" "}
              Classificaiton
            </MenuItem>
            <MenuItem
              disabled={!caseDetail?.data?.results.has_extraction_result}
              onClick={() => {
                router.push({
                  pathname: "/report/report-detail",
                  query: { id: caseDetail?.data?.case_id, extraction: true },
                });

                dispatch(setReportVersionDropdown(4));
              }}
            >
              {" "}
              <Image
                src={IconService.AExtraction}
                height={20}
                width={20}
                alt=""
                className="mr-2"
              />{" "}
              Extraction
            </MenuItem>
            <MenuItem
              disabled={!caseDetail?.data?.results.has_validation_result}
              onClick={() => {
                router.push({
                  pathname: "/report/report-detail",
                  query: { id: caseDetail?.data?.case_id, analysis: true },
                });

                dispatch(setReportVersionDropdown(5));
              }}
            >
              <Image
                src={IconService.AAnalysisIcon}
                height={20}
                width={20}
                alt=""
                className="mr-2 "
              />{" "}
              Analysis
            </MenuItem>
          </Menu>

          <Button
            variant="text"
            color="primary"
            className="background px-6 py-3 text-base font-bold gap-2 uppercase"
            onClick={() => {
              dispatch(
                CaseDownloadReqest({ case_id: caseDetail?.data?.case_id })
              ).then((res) => {
                if (res?.payload?.item?.success) {
                  dispatch(
                    CaseDownload({ case_id: caseDetail?.data?.case_id })
                  ).then((res) => {
                    if (res) {
                      downloadURI(
                        `${BASE_URL}/media/cases/${caseDetail?.data?.case_id}/content/`,
                        "v1"
                      );
                    }
                  });
                }
              });
            }}
          >
            <img src={IconService.Download.src} /> Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
