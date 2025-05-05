import dynamic from "next/dynamic";

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
// import PasswordField from "@/components/Common/PasswordField";


const PasswordField = dynamic(() => import("@/components/Common/PasswordField"), {
  ssr: false,
});
import IconService from "@/utils/Icons";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { LogIn } from "@/Store/Reducer/AuthSlice";
import * as Yup from "yup";
import Toaster from "@/components/Common/Toaster";
import { useEffect } from "react";
import { AppDispatch } from "@/Store/Store";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const loginSchema = Yup.object({
    username: Yup.string().required("Please enter Username"),
    password: Yup.string().required("Please enter Password"),
  });

  const existUserData =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("USER") as any);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      isRememberMe: false,
    },
    validationSchema: loginSchema, // Replace with your validation schema
    onSubmit: (values) => {
      if (values) {
        dispatch(LogIn(values)).then((res) => {
          if (res?.payload?.success == true) {
            Toaster({ customMessage: "User logged in successful" });
            document.cookie = `sessionid=${res.payload.session_key}; Max-Age=7200; Path=/;`;
            router.push("/upload");
          } else {
            Toaster({ error: true, customMessage: "An error occurred" });
          }
        });
      }
    },
  });

  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    if (existUserData) {
      formik.setFieldValue("username", existUserData?.username);
      formik.setFieldValue("password", existUserData?.password);
      formik.setFieldValue("isRememberMe", existUserData?.isRememberMe);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center gap-20">
      <div className="flex flex-col gap-y-3.5">
        <Typography variant="h1" color="text.secondary">
          Log in
        </Typography>
        <Typography variant="subtitle1" color="secondary.light">
        Welcome Back! Let&rsquo;s Login in to get started
        </Typography>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="flex flex-col gap-y-9">
            <FormControl className="flex flex-col  gap-9 w-full loginfield">
              <TextField
                id="outlined-required"
                label="Log in ID"
                variant="outlined"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                helperText={
                  formik.errors.username &&
                  formik.touched.username &&
                  formik.errors.username
                }
                onBlur={formik.handleBlur}
              />
            </FormControl>

            <PasswordField
              label="Password"
              name="password"
              value={formik.values.password}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
              setValue={formik.setFieldValue}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-between items-center mb-10 mt-7">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isRememberMe}
                  onChange={formik.handleChange}
                  name="isRememberMe"
                  icon={
                    <img src={IconService.Uncheck.src} alt="Uncheck icon" />
                  }
                  checkedIcon={
                    <img src={IconService.CheckedIcon.src} alt="Checked icon" />
                  }
                />
              }
              label={
                <Typography variant="subtitle2" color="text.secondary">
                  Remember on this device
                </Typography>
              }
            />
            <Link
              onClick={() => router.push("/auth/forgot-password")}
              variant="subtitle2"
              color="text.secondary"
              style={{ cursor: "pointer" }}
            >
              Forgot password?
            </Link>
          </div>
          <Button
            variant="text"
            color="primary"
            className="w-full"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
