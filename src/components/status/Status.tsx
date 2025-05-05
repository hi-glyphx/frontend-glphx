import { Typography } from "@mui/material";

const Status = ({ text }: any) => {
  switch (text) {
    case "extraction_verification":
      return (
        <Typography
          variant="body2"
          color="#FF5F5F"
          className="whitespace-nowrap"
        >
          Extraction Verification
        </Typography>
      );
    case "classification":
      return (
        <Typography variant="body2" color="#47D8A4">
          Classification
        </Typography>
      );
    case "extraction":
      return (
        <Typography variant="body2" color="#FF5F5F">
          Extraction{" "}
        </Typography>
      );
    case "classification_verification":
      return (
        <Typography variant="body2" color="#F0C965">
          Classification Verification{" "}
        </Typography>
      );
    case "result":
      return (
        <Typography variant="body2" color="#F0C965">
          Result{" "}
        </Typography>
      );
    case "completed":
      return (
        <Typography variant="body2" color="#47D8A4">
          Completed{" "}
        </Typography>
      );
    case "in_progress":
      return (
        <Typography variant="body2" color="#459BFF">
          In Progress{" "}
        </Typography>
      );
    case "error":
      return (
        <Typography variant="body2" color="#FF5F5F">
          Error{" "}
        </Typography>
      );
    case "not_started":
      return (
        <Typography variant="body2" color="#F0C965">
          Not started{" "}
        </Typography>
      );
    case "pending":
      return (
        <Typography variant="body2" color="#F0C965">
          Pending{" "}
        </Typography>
      );

    default:
      return null;
  }
};

export default Status;
