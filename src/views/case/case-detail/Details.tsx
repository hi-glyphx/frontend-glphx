import { getAllAlias } from "@/Store/Reducer/CaseSlice";
import { AppDispatch } from "@/Store/Store";
import { Card, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Details = () => {
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const template_id = caseDetail?.data?.template_id;
  const dispatch = useDispatch<AppDispatch>();
  {
    caseDetail.data;
  }
  useEffect(() => {
    if (template_id) {
      dispatch(getAllAlias({ id: template_id }));
    }
  }, [template_id]);

  return (
    <Card variant="outlined" className="case-detail-card-sec">
      <div
        className="flex flex-row gap-x-10  "
        style={{
          overflowX: "scroll",
          paddingBottom: "10px",
        }}
      >
        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Created Date and Time
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.created}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Completed Date and Time
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.completed
                ? caseDetail?.data?.completed
                : "N/A"}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Case Number
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.case_num}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Case ID
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.case_id}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Case Template Id
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.template_id}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Team
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.team}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 ">
          <Typography
            variant="subtitle2"
            color="text.secondary"
            style={{ width: " max-content" }}
          >
            Status
          </Typography>
          <div className="flex flex-row gap-2">
            <Typography variant="body1" color="text.secondary">
              {caseDetail?.data?.status === false ? "false" : "true"}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Details;
