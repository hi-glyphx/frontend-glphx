import { Button, Card, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteVerifyExtractionBatch,
  DeleteclassificationBatch,
} from "@/Store/Reducer/ExtractionSlice";
import { AppDispatch } from "@/Store/Store";
import { CaseDetailById } from "@/Store/Reducer/CaseSlice";
import { useRouter } from "next/router";

interface JobOtherDetail {
  jobs?: any[]; // You can replace 'any[]' with the actual type for 'jobs'
  verification_batches: {
    Ready?: any[]; // Replace 'any[]' with the actual type for 'Ready'
    Sent?: any[]; // Replace 'any[]' with the actual type for 'Sent'
    Received?: any[]; // Replace 'any[]' with the actual type for 'Received'
  };
  classification_batches: {
    Ready?: any[]; // Replace 'any[]' with the actual type for 'Ready'
    Sent?: any[]; // Replace 'any[]' with the actual type for 'Sent'
    Received?: any[]; // Replace 'any[]' with the actual type for 'Received'
  };
}

interface TYPE {
  jobOtherDetail?: JobOtherDetail;
}
const JobsOthers = ({ jobOtherDetail }: TYPE) => {
  const dispatch = useDispatch<AppDispatch>();
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className=" flex flex-col gap-6  px-6 py-6 border border-solid  rounded-2xl border-slate-300 ">
      <div className="flex flex-col gap-2">
        <Typography variant="h6" color="text.secondary" className="ml-10">
          Others
        </Typography>

        <Card variant="outlined" className="other-card-section">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} className="vertical-divider ">
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-row ... items-center  justify-between ">
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    className=" whitespace-nowrap "
                  >
                    Classification Batch
                  </Typography>
                  <Button
                    color="primary"
                    className="h-10"
                    onClick={() => {
                      if (
                        caseDetail?.data?.others?.classification_batches?.Sent
                      ) {
                        const sentIds =
                          caseDetail?.data?.others?.classification_batches
                            ?.Sent;
                        const ids = [...sentIds];

                        if (ids.length) {
                          ids.forEach((idaa) => {
                            dispatch(
                              DeleteclassificationBatch(`${idaa}/expire/`)
                            ).then((res) => {
                              if (res.payload) {
                                dispatch(CaseDetailById(id));
                              }
                            });
                          });
                        }
                      }

                      if (
                        caseDetail?.data?.others?.classification_batches?.Ready
                      ) {
                        const sentIds =
                          caseDetail?.data?.others?.classification_batches
                            ?.Ready;
                        const ids = [...sentIds];

                        if (ids.length) {
                          ids.forEach((idaa) => {
                            dispatch(
                              DeleteclassificationBatch(`${idaa}/expire/`)
                            ).then((res) => {
                              if (res.payload) {
                                dispatch(CaseDetailById(id));
                              }
                            });
                          });
                        }
                      }
                    }}
                  >
                    Expire Classification Batch{" "}
                  </Button>
                </div>
                <div className="flex flex-row ... items-center  ">
                  <div style={{ minWidth: "230px" }}>
                    <Typography variant="subtitle2" color="text.primary">
                      Ready
                    </Typography>

                    {/* {jobOtherDetail?.classification_batches?.Ready &&
                      jobOtherDetail?.classification_batches?.Ready?.map(
                        (item,index) => ( */}
                    <Typography variant="body2" color="text.secondary">
                      {caseDetail?.data?.others?.classification_batches?.Ready
                        ?.length
                        ? caseDetail?.data?.others?.classification_batches
                            ?.Ready?.length
                        : 0}
                    </Typography>
                    {/* )
                      )} */}
                  </div>
                  <div className="pl-6 ">
                    <Typography variant="subtitle2" color="text.primary">
                      Sent
                    </Typography>
                    {/* {jobOtherDetail?.classification_batches?.Sent &&
                      jobOtherDetail?.classification_batches?.Sent?.map(
                        (item,index) => ( */}
                    <Typography variant="body2" color="text.secondary">
                      {caseDetail?.data?.others?.classification_batches?.Sent
                        ?.length
                        ? caseDetail?.data?.others?.classification_batches?.Sent
                            ?.length
                        : 0}
                    </Typography>
                    {/* )
                      )} */}
                  </div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={6} lg={6} className="pl-6">
              <div className="flex flex-col gap-y-6">
                <div className="flex flex-row ... items-center  justify-between ">
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    className=" whitespace-nowrap "
                  >
                    Verification Batch
                  </Typography>
                  <Button
                    color="primary"
                    className="h-10"
                    onClick={() => {
                      if (
                        caseDetail?.data?.others?.verification_batches?.Sent
                      ) {
                        const sentIds =
                          caseDetail?.data?.others?.verification_batches?.Sent;
                        const ids = [...sentIds];

                        if (ids.length) {
                          ids.forEach((idaa) => {
                            dispatch(
                              DeleteVerifyExtractionBatch(`${idaa}/expire/`)
                            ).then((res) => {
                              if (res.payload) {
                                dispatch(CaseDetailById(id));
                              }
                            });
                          });
                        }
                      }

                      if (
                        caseDetail?.data?.others?.verification_batches?.Ready
                      ) {
                        const sentIds =
                          caseDetail?.data?.others?.verification_batches?.Ready;
                        const ids = [...sentIds];

                        if (ids.length) {
                          ids.forEach((idaa) => {
                            dispatch(
                              DeleteVerifyExtractionBatch(`${idaa}/expire/`)
                            ).then((res) => {
                              if (res.payload) {
                                dispatch(CaseDetailById(id));
                              }
                            });
                          });
                        }
                      }
                    }}
                  >
                    Expire Verification Batch
                  </Button>
                </div>
                <div className="flex flex-row ... items-center  ">
                  <div style={{ minWidth: "230px" }}>
                    <Typography variant="subtitle2" color="text.primary">
                      Ready
                    </Typography>

                    {/* {jobOtherDetail?.verification_batches?.Ready &&
                      jobOtherDetail?.verification_batches?.Ready?.map(
                        (item,index) => ( */}
                    <Typography variant="body2" color="text.secondary">
                      {caseDetail?.data?.others?.verification_batches?.Ready
                        ?.length
                        ? caseDetail?.data?.others?.verification_batches?.Ready
                            ?.length
                        : 0}
                    </Typography>
                    {/* )
                      )} */}
                  </div>
                  <div className="pl-6 ">
                    <Typography variant="subtitle2" color="text.primary">
                      Sent
                    </Typography>
                    {/* {jobOtherDetail?.verification_batches?.Sent &&
                      jobOtherDetail?.verification_batches?.Sent?.map(
                        (item,index) => ( */}
                    <Typography variant="body2" color="text.secondary">
                      {caseDetail?.data?.others?.verification_batches?.Sent
                        ?.length
                        ? caseDetail?.data?.others?.verification_batches?.Sent
                            ?.length
                        : 0}
                    </Typography>
                    {/* )
                      )} */}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h6" color="text.secondary" className="ml-10">
          Jobs
        </Typography>
        <Card variant="outlined" className="other-card-section">
          <div className=" flex flex-col gap-4">
            {jobOtherDetail?.jobs &&
              jobOtherDetail?.jobs.map((item, index) => (
                <Typography variant="h6" color="text.secondary" key={index}>
                  {item}
                </Typography>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobsOthers;
