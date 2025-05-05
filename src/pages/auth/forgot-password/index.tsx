import Toaster from "@/components/Common/Toaster";
import { forgotPassword } from "@/Store/Reducer/AuthSlice";
import { AppDispatch } from "@/Store/Store";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const emailSchema = Yup.object({
    email: Yup.string().required("Place enter User Name"),
  });

  interface emailType {
    email: string;
  }
  const initialValues: emailType = {
    email: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values)).then((res) => {
        if (res?.payload?.status == true) {
          Toaster({customMessage: 'OTP sent on registered email'})
          router.push({
            pathname: "/auth/enter-otp",
            query: { userName: values.email },
          });
        } else {
          Toaster({ error: true, customMessage: `User ${values.email} does not exist` })
        }
      });
    },
  });

  return (
    <div className="flex flex-col justify-center  gap-20">
      <div className="flex flex-col gap-y-3.5">
        <Typography variant="h1" color="text.secondary">
          Forgot Password
        </Typography>
        <Typography variant="subtitle1" color="secondary.light">
        Oops, Did You Forget Your Password? Don&rsquo;t Sweat it. Password Recovery Is Easy.
        </Typography>
      </div>
      <div className="flex flex-col gap-y-10">
        <FormControl className="flex flex-col  gap-9 w-full">
          <TextField
            id="outlined-required"
            label="User Name"
            // defaultValue="john@mail.com"
            variant="outlined"
            name="email"
            value={formik.values?.email}
            onChange={formik.handleChange}
            helperText={
              formik.errors?.email &&
              formik.touched.email &&
              formik.errors?.email
            }
            onBlur={formik.handleBlur}
          />
        </FormControl>

        <div className="flex">
          <Button
            variant="text"
            color="primary"
            className="w-full"
            type="submit"
            onClick={() => {
              formik.handleSubmit();
            }}
            // onClick={() => router.push("/auth/enter-otp")}
          >
            Verify User Name
          </Button>
        </div>
      </div>
    </div>
  );
}
