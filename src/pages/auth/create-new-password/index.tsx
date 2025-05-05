import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PasswordField from "@/components/Common/PasswordField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword, removeSession } from "@/Store/Reducer/AuthSlice";
import Toaster from "@/components/Common/Toaster";
import { AppDispatch } from "@/Store/Store";

export default function Index() {
  const resetPassSchema = Yup.object().shape({
    password1: Yup.string()
      .required("Password is required")
      .min(6, "password must be at least 6 characters"),
    password2: Yup.string()
      .oneOf([Yup.ref("password1")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSelector(({ AuthSlice }) => AuthSlice);
  const router = useRouter();
const {uid,token} = router.query
  interface passwordType {
    password1: string;
    password2: string;
  }
  const initialValues: passwordType = {
    password1: "",
    password2: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: resetPassSchema,
    onSubmit: (values) => {
      // const { password2, ...valuesWithoutConfirmPass } = values;
      let updatedData = {
        uid:uid,
        token:token,
        values: values,
      };
      dispatch(ResetPassword(updatedData)).then((res) => {
        if (res?.payload?.message) {
          Toaster({ customMessage:res?.payload?.message})
          dispatch(removeSession());
          router.push("/auth/signin");
        } else {
          Toaster({ customMessage: "An error occurred"})
        }
      });
    },
  });

  return (
    <div className="flex flex-col justify-center gap-20">
      <div className="flex flex-col gap-y-3.5">
        <Typography variant="h1" color="text.secondary">
          Create New Password
        </Typography>
        <Typography variant="subtitle1" color="secondary.light">
        Your Account&rsquo;s New Identity: Reset Password
        </Typography>
      </div>
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-9">
          <PasswordField
            label="New Password"
            name="password1"
            value={formik.values?.password1}
            setValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors?.password1 &&
              formik.touched.password1 &&
              formik.errors?.password1
            }
          />
          <PasswordField
            label="Re-Enter New Password"
            name="password2"
            value={formik.values.password2}
            setValue={formik.setFieldValue}
            onBlur={formik.handleBlur}
            helperText={
              formik.errors?.password2 &&
              formik.touched.password2 &&
              formik.errors?.password2
            }
          />
        </div>
        <Button
          variant="text"
          color="primary"
          className="w-full"
          onClick={() => {
            formik.handleSubmit();
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
}
