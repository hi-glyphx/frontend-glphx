import { Typography, Card } from "@mui/material";
import React from "react";

type PageData = {
  name: string;
  value: string;
};

type CardTitle = {
  page: string;
  name: string;
};

const ReportCaseDetail = () => {
  const page1Data: PageData[] = [
    {
      name: "Policy Number",
      value: "3XX7/6XXXXX79/XXX/XX",
    },
    {
      name: "Issuance Date",
      value: "10/09/2022",
    },
    {
      name: "Plan Type",
      value: "od",
    },
    {
      name: "Vehicle Type",
      value: "Car",
    },
    {
      name: "Vehicle Subtype",
      value: "H!2T89HX6!289K",
    },
    {
      name: "Carrier Type",
      value: "Priv!2te",
    },
    {
      name: "Insurer",
      value: "89HOL!2",
    },
    {
      name: "FName_LName_CHK",
      value: "O89E!2N NON WOVEN PVT LTD",
    },
  ];
  const page2Data: PageData[] = [
    {
      name: "FNameLName",
      value: "O89E!2N NON WOVEN PVT LTD",
    },
    {
      name: "Title",
      value: "M/S",
    },
    {
      name: "First Name",
      value: "-",
    },
    {
      name: "Last Name",
      value: "-",
    },
    {
      name: "Primary Mobile",
      value: "965O6X623O",
    },
    {
      name: "Alternate Mobile",
      value: "-",
    },
    {
      name: "Email",
      value: "!2RY!2NR!2VI8! 86@GM!2IL.89OM",
    },
    {
      name: "Address",
      value:
        "89HOX6H!2GY!2 VIH!2R R!2NI KHER!2 RO!2D NE!2R MUNDK!2 METRO ST!2TION NORTH WEST DELHIL2",
    },
    {
      name: "Communication City",
      value: "-",
    },
  ];

  const CardTitle = ({ page, name }: CardTitle) => {
    return (
      <div className="flex gap-x-1 ms-10">
        <Typography variant="subtitle1" className="font-bold">
          {page}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          className="font-bold"
        >
          {name}
        </Typography>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-4">
        <CardTitle page="Page 1:" name="Note" />
        <Card
          variant="outlined"
          className="py-6 px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {page1Data.map((data, i) => (
            <div className="flex flex-col gap-y-2" key={i}>
              <Typography variant="subtitle2" className="font-bold">
                {data.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {data.value}
              </Typography>
            </div>
          ))}
        </Card>
      </div>
      <div className="flex flex-col gap-y-4">
        <CardTitle page="Page 2:" name="1003" />
        <Card
          variant="outlined"
          className="py-6 px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {page2Data.map((data, i) => (
            <div className="flex flex-col gap-y-2" key={i}>
              <Typography variant="subtitle2" className="font-bold">
                {data.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {data.value}
              </Typography>
            </div>
          ))}
        </Card>
      </div>
      <div className="flex flex-col gap-y-4">
        <CardTitle page="Page 3:" name="HUD" />
        <Card variant="outlined" className="py-6 px-10 grid grid-cols-6 gap-6">
          {page1Data.map((data, i) => (
            <div className="flex flex-col gap-y-2" key={i}>
              <Typography variant="subtitle2" className="font-bold">
                {data.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {data.value}
              </Typography>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default ReportCaseDetail;
