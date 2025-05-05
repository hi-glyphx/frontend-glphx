import { Button, FormControl, Typography } from "@mui/material";
import { useRouter } from "next/router";
import OTPInputComponent from "../../../views/auth/enter-otp/OTPInput";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { OTPVerify } from "@/Store/Reducer/AuthSlice";
import Toaster from "@/components/Common/Toaster";
import { AppDispatch } from "@/Store/Store";
import OtpInput from "react18-input-otp";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userName } = router.query;

  interface emailType {
    otp: string;
  }
  const initialValues: emailType = {
    otp: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      let data: any = {
        email: userName,
        token: values.otp,
      };
      dispatch(OTPVerify(data)).then((res) => {
        if (res?.payload?.response?.status == 410) {
          formik.setFieldValue("otp", "");
          Toaster({
            error: true,
            customMessage: `${res?.payload?.response?.data}`,
          });
          if (res?.payload?.response?.data == "OTP Retry Exhausted") {
            router.push("/auth/forgot-password");
          }
        } else {
          Toaster({ customMessage: "OTP verification successful" });
          router.push({
            pathname: "/auth/create-new-password",
            query: { uid: res?.payload?.uid, token: res?.payload?.token },
          });
        }
      });
    },
  });

  const handleOtp = (otp) => {
    formik.setFieldValue("otp", otp);
  };

  return (
    <div className="flex flex-col justify-center gap-20">
      <div className="flex flex-col gap-y-3.5">
        <Typography variant="h1" color="text.secondary">
          Enter OTP
        </Typography>
        <div className="flex flex-row items-center gap-1">
          <Typography variant="subtitle1" color="secondary.light">
            We have sent you otp on this email address:
          </Typography>
          <Typography
            className="font-bold"
            variant="subtitle1"
            color="text.secondary"
          >
            {userName}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-y-10">
        <FormControl className="flex flex-col  gap-9 w-full">
          <div className="otp-input-custom">
            <OtpInput
              value={formik.values.otp}
              onChange={(otpValue) => {
                formik.setFieldValue("otp", otpValue);
              }}
              numInputs={6}
              separator={<span style={{ width: "8px" }}> </span>}
              inputStyle={{
                border: "1px solid #E7E6F0",
                borderRadius: "16px",
                width: "64px",
                height: "64px",
                fontSize: "16px",
                fontWeight: "700",
                color: "#524587",
                caretColor: "#524587",
              }}
            />
          </div>
          {/* <OTPInputComponent onOtpChange={handleOtp} /> */}
          {formik.errors?.otp && formik.touched.otp && formik.errors?.otp}
        </FormControl>

        <div className="flex">
          <Button
            variant="text"
            color="primary"
            className="w-full"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
}
