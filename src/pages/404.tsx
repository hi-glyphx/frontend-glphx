// ** Next Import
import Link from "next/link";

// ** MUI Components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}));

const Error404 = () => {
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);
  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper>
          <Typography variant="h1" sx={{ mb: 2.5 }}>
            404
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 2.5,
              letterSpacing: "0.18px",
              fontSize: "1.5rem !important",
            }}
          >
            Page Not Found ⚠️
          </Typography>
          <Typography variant="body2">
            We couldn&prime;t find the page you are looking for.
          </Typography>
        </BoxWrapper>
        <Button
          href={token ? "/upload" : "/auth/signin"}
          component={Link}
          variant="contained"
          sx={{ px: 5.5 }}
          style={{margin: "2rem"}}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default Error404;
