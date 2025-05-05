import { useRouter } from "next/router";
import { Button, Menu, Typography, MenuItem } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Image from "next/image";
import IconService from "@/utils/Icons";
import { useEffect, useRef, useState } from "react";

interface CommonHeaderProps {
  handleDownload?: () => void;
  handleReject?: () => void;
  handleSave?: any;
  handleRaiseTicket?: () => void;
  handleCancel?: () => void;
  title?: string;
  saveToChage?: string;
  nobatchavailable?: boolean;
  buttonRef?: any;
}

export default function CommonHeader({
  handleDownload,
  handleReject,
  handleSave,
  handleRaiseTicket,
  handleCancel,
  title,
  saveToChage,
  nobatchavailable,
  buttonRef,
}: CommonHeaderProps) {
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open: boolean = Boolean(anchorEl);
  const router = useRouter();
  const linkPath = router.asPath.split("/");
  linkPath.shift();

  const pathArray = linkPath.map((path, i) => {
    return { breadcrumb: path, href: "/" + linkPath.slice(0, i + 1).join("/") };
  });

  let Capital_letter = pathArray?.at(-1)?.breadcrumb?.charAt(0)?.toUpperCase();
  let Capital_string =
    (Capital_letter || "") + pathArray?.at(-1)?.breadcrumb?.slice(1);

  let endPath: any = "";

  if (typeof window !== "undefined") {
    // Client-side rendering
    const url = new URL(window.location.href);
    endPath = url.pathname.split("/") || "";
  } else {
    // Server-side rendering
    const { asPath } = router;
    endPath = asPath.split("/") || "";
  }

  endPath = endPath[endPath.length - 2];

  const isCheckboxesOrSignature =
    endPath === "checkboxes" || endPath === "signature";

  const showDownload =
    endPath === "production" || endPath === "v2" || endPath === "accuracy";

  const showRejectTicket = endPath === "verify_edit";

  const showRaiseTicket = endPath === "tickets";

  const showDownloadDropdown = endPath === "reportdata";

  const handleClick = (event: React.MouseEvent<HTMLElement> | any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="main-header flex justify-between items-center common-header">
  <div className="flex items-center">
    <span
      onClick={() => router.back()}
      className="mr-4 ml-[30px] cursor-pointer"
    >
      {title ? "" : (
        <Image
          src={IconService.LeftArrow}
          alt="back-btn"
          className="w-[1.25rem] h-[1.25rem]" /* Slightly larger icon size */
        />
      )}
    </span>
    <Typography variant="h2" color="text.secondary" className="text-sm">
      {title ? title : Capital_string}
    </Typography>
  </div>

  <div className="flex justify-end">
    {isCheckboxesOrSignature ? (
      <>
        <Button
          variant="outlined"
          color="primary"
          className="btn px-3 py-2 text-sm font-semibold gap-2 mr-3 uppercase"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="text"
          color="primary"
          className="background px-3 py-2 text-sm font-semibold gap-2 uppercase"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </>
    ) : showDownload ? (
      <>
        <Button
          variant="text"
          color="primary"
          className="background px-3 py-2 text-sm font-semibold gap-2 uppercase"
          onClick={handleDownload}
        >
          <img src={IconService.Download.src} className="w-5 h-5" /> Download
        </Button>
      </>
    ) : showRaiseTicket ? (
      <div className="flex flex-row gap-x-3">
        <Button
          variant="outlined"
          color="primary"
          className="raise_ticket px-3 py-2 rounded-md font-semibold text-sm uppercase"
          onClick={handleRaiseTicket}
        >
          RAISE A TICKET
        </Button>
        <Button
          variant="text"
          color="primary"
          className="background px-3 py-2 text-sm font-semibold gap-2 uppercase"
          onClick={handleDownload}
        >
          <img src={IconService.Download.src} className="w-5 h-5" /> Download
        </Button>
      </div>
    ) : showDownloadDropdown ? (
      <div className="flex justify-end">
        <Button
          variant="text"
          color="primary"
          className="w-36 h-10 mr-2 flex items-center px-3 rounded-md font-semibold text-sm leading-5 uppercase"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <FileDownloadOutlinedIcon className="mr-1 w-5 h-5" />
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
          className="mt-2"
        >
          <MenuItem onClick={handleClose}>
            <FileDownloadOutlinedIcon className="w-5 h-5" />
            Document
          </MenuItem>
          <MenuItem>
            <FileDownloadOutlinedIcon className="w-5 h-5" />
            Extraction Report
          </MenuItem>
        </Menu>
      </div>
    ) : showRejectTicket ? (
      <div className="flex flex-row gap-x-3">
        <Button
          variant="outlined"
          color="primary"
          className="raise_ticket px-3 py-2 rounded-md font-semibold text-sm uppercase"
          onClick={handleRaiseTicket}
          disabled={nobatchavailable}
        >
          RAISE A TICKET
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="px-3 py-2 rounded-md font-semibold text-sm mr-4 uppercase"
          onClick={handleReject}
          disabled={nobatchavailable}
        >
          REJECT
        </Button>
      </div>
    ) : (
      <>
        <Button
          variant="outlined"
          color="primary"
          className="px-3 py-2 mr-4 rounded-md font-semibold text-sm uppercase"
          onClick={handleDownload}
          disabled={nobatchavailable}
          ref={buttonRef}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="mr-4 px-3 py-2 rounded-md font-semibold text-sm uppercase"
          onClick={handleRaiseTicket}
          disabled={nobatchavailable}
        >
          RAISE A TICKET
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className="px-3 py-2 rounded-md font-semibold text-sm mr-4 uppercase"
          onClick={handleReject}
          disabled={nobatchavailable}
        >
          Pass
        </Button>
        <Button
          variant={saveToChage ? "text" : "outlined"}
          color="primary"
          className="w-36 h-10 mr-2 px-3 py-2 rounded-md font-semibold text-sm leading-5 uppercase"
          onClick={handleSave}
          disabled={nobatchavailable}
        >
          Save Changes
        </Button>
      </>
    )}
  </div>
</div>
  );
}
