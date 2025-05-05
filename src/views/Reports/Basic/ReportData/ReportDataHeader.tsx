import React, { useState } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Typography, MenuItem, Button, Menu } from "@mui/material";
import IconService from "@/utils/Icons";
import Image from "next/image";

type HeaderTitles = {
  id: number;
  name: string;
  hidden: boolean;
  active: boolean;
  color: string;
  icon: any;
};

type PageProps = {
  toggleDetailPage: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const ReportDataHeader = ({ toggleDetailPage, children }: PageProps) => {
  const ISSERVER = typeof window === "undefined";

  //   const reportDetail =
  //     !ISSERVER && JSON.parse(window.localStorage.getItem("reportData") as any);

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open: boolean = Boolean(anchorEl);

  const [headerTitles, setHeaderTitles] = useState<HeaderTitles[]>([
    {
      id: 1,
      name: "Classification",
      hidden: false,
      active: true,
      color: "#47D8A4",
      icon: IconService.AClassification,
    },
    {
      id: 2,
      name: "Extraction",
      hidden: false,
      active: true,
      color: "#459BFF",
      icon: IconService.AExtraction,
    },
    {
      id: 3,
      name: "Analysis",
      hidden: true,
      active: true,
      color: "#F0C965",
      icon: IconService.AAnalysisIcon,
    },
  ]);

  //   useEffect(() => {
  //     if (reportDetail.classification == "Completed") {
  //     }
  //   }, [reportDetail]);

  const handleClick = (event: React.MouseEvent<HTMLElement> | any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* <div className="flex justify-end">
        <Button
          variant="text"
          color="primary"
          className="w-44 h-12  mr-2 flex items-center  px-4  rounded-lg font-bold leading-6 uppercase"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FileDownloadOutlinedIcon className="mr-2 w-6 h-6 " />
          Download
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          className="mt-2 "
        >
          <MenuItem onClick={handleClose}>
            <FileDownloadOutlinedIcon />
            Document
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleDetailPage(true);
              handleClose();
            }}
          >
            <FileDownloadOutlinedIcon />
            Extraction Report
          </MenuItem>
        </Menu>
      </div> */}
      <div className="ms-10 flex justify-between items-center">
        <div className="flex gap-x-3.5">
          {headerTitles.map((item, i: number) => (
            <div
            key={i}
              className={`flex gap-x-1 items-center ${
                item.active && "activereport"
              }`}
              hidden={item.hidden}
            >
              <Typography variant="h5" key={i} style={{ color: item.color }}>
                {item.name}
              </Typography>
              <Image src={item.icon} className="p-1" alt="icon" />
            </div>
          ))}
        </div>
        {children}
      </div>
    </>
  );
};

export default ReportDataHeader;
