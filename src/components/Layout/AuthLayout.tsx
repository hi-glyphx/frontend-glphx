import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import OwlCarousel from "../owlCarousel";
import Image from "next/image";
import Glyphx from "../../assets/svg/logos/InfosysLogo.png";
import GlyphxLogo from "../../assets/svg/logos/glyphx_logo.svg";
import Head from "next/head";
const AuthLayout = ({ children }: any) => {
  const theme: any = useTheme();

  return (
    <>
      <Head>
        <title>Glyphx</title>
      </Head>

      <Grid container>
        <Grid
          item
          xs={6}
          style={{
            backgroundColor: theme.palette.primary.dark,
            height: "100vh",
          }}
          className="flex justify-center items-center "
        >
          <OwlCarousel />
        </Grid>
        <Grid item xs={6} className="h-screen">
          <div className="common-padding-auth-layout h-full">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-row gap-2">
                {/* <Image
                  priority
                  src={GlyphxLogo}
                  height={40}
                  width={100}
                  alt="Follow us on Twitter"
                /> */}
                <Image
                  priority
                  src={GlyphxLogo}
                  height={40}
                  width={136}
                  alt="Follow us on Twitter"
                />
              </div>
              <div>{children}</div>
              <div></div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLayout;
