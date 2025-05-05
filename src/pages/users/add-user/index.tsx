import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import PasswordField from "@/components/Common/PasswordField";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  SelectGroups,
  SelectTeam,
} from "@/Store/Reducer/UserSlice";
import { UpdateUser, UserList } from "@/Store/Reducer/UserSlice";
import * as Yup from "yup";
import Toaster from "@/components/Common/Toaster";
import { AppDispatch } from "@/Store/Store";
const AddUser = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { userID } = router.query;

  const { selectTeam, selectGroups } = useSelector(
    ({ UserSlice }) => UserSlice
  );

  const userSchema = Yup.object().shape({
    username: Yup.string().required("please enter username"),
    email: Yup.string().required("invalid email"),
    teams: Yup.array().min(1, "Select at least one team"),
    groups: Yup.array().min(1, "Select at least one groups"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "password must be at least 6 characters"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  interface emailType {
    email: string;
    username: string;
    teams: [];
    groups: string[];
    password: string;
    confirmPass: string;
  }
  const initialValues: emailType = {
    username: "",
    email: "",
    teams: [],
    groups: [],
    password: "",
    confirmPass: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userID ? "" : userSchema,
    onSubmit: (values) => {
      const { confirmPass, ...valuesWithoutConfirmPass } = values;

      if (valuesWithoutConfirmPass) {
        if (userID) {
          let updateData: any = {
            data: { teams: values.teams,groups:values.groups, team_type:"update" ,group_type: "update" },
            id: userID,
          };
          // Update existing user
          dispatch(UpdateUser(updateData)).then((res) => {
            if (res?.payload) {
              router.push("/users");
              Toaster({ customMessage: "User updated successfully" });
            } else {
              Toaster({ error: true, customMessage: "An error occurred" });
            }
          });
        } else {
          // Create new user
          dispatch(createUser({...valuesWithoutConfirmPass,team_type:"append" ,group_type: "append" })).then((res) => {
            if (res?.payload?.item?.success) {
              router.push("/users");
              Toaster({ customMessage: "User created successfully" });
            } else {
              Toaster({ error: true, customMessage: "An error occurred" });
            }
          });
        }
      }
    },
  });

  useEffect(() => {
    dispatch(SelectTeam());
    dispatch(SelectGroups());
  }, [dispatch]);

  useEffect(() => {
    if (userID) {
      dispatch(UserList("?page=1")).then((res) => {
        const user = res.payload.items.find((item: any) => item.id === userID);
        const teamparts = user.teams.split(" | ");
        const groupsarts = user.groups.split(" | ");

        let updateTeams =
          selectTeam.items &&
          selectTeam.items
            .filter((item) => teamparts?.includes(item.name))
            .map((item) => item.id);

        let updategroups =
          selectGroups &&
          selectGroups
            .filter((item) => groupsarts?.includes(item.name))
            .map((item) => item.id);

        if (user) {
          const { username, email } = user;

          formik.setValues({
            username: username || "",
            email: email || "",
            password: "",
            confirmPass: "",
            teams: updateTeams || [],
            groups: updategroups || [],
          });
        }
      });
    }
  }, [userID, selectTeam.items]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Typography variant="h5" color="text.secondary">
          {userID ? "Edit User Details" : "Add New User Details"}
        </Typography>
        <Card variant="outlined" className="mt-4 add_user_fome">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl className="flex flex-col  gap-9 w-full">
                <TextField
                  id="outlined-required"
                  label="User Name"
                  defaultValue="User Name"
                  variant="outlined"
                  name="username"
                  value={formik.values?.username}
                  onChange={formik.handleChange}
                  helperText={
                    formik.errors?.username &&
                    formik.touched.username &&
                    formik.errors?.username
                  }
                  onBlur={formik.handleBlur}
                  disabled={!!userID}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl className="flex flex-col  gap-9 w-full">
                <TextField
                  label="Email "
                  defaultValue="Email"
                  name="email"
                  variant="outlined"
                  value={formik.values?.email}
                  onChange={formik.handleChange}
                  helperText={
                    formik.errors?.email &&
                    formik.touched.email &&
                    formik.errors?.email
                  }
                  onBlur={formik.handleBlur}
                  disabled={!!userID}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className="flex flex-col  gap-1 w-full">
                <InputLabel shrink htmlFor="select-multiple-native">
                  teams
                </InputLabel>
                <Select
                  multiple
                  native
                  name="teams"
                  value={formik.values?.teams}
                  onChange={formik.handleChange}
                  label="teams"
                  inputProps={{
                    id: "select-multiple-native",
                  }}
                  onBlur={formik.handleBlur}
                >
                  {selectTeam &&
                    selectTeam?.items?.map((name) => (
                      <option key={name.id} value={name.id}>
                        {name.name}
                      </option>
                    ))}
                </Select>
                <FormHelperText>
                  {formik.errors?.teams &&
                    formik.touched.teams &&
                    formik.errors?.teams}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl className="flex flex-col  gap-1 w-full">
                <InputLabel shrink htmlFor="select-multiple-native">
                  Groups
                </InputLabel>
                <Select
                  multiple
                  native
                  name="groups"
                  value={formik.values?.groups}
                  onChange={formik.handleChange}
                  label="Groups"
                  onBlur={formik.handleBlur}
                >
                  {selectGroups?.map((name) => (
                    <option key={name.id} value={name.id}>
                      {name.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.errors?.teams &&
                    formik.touched.teams &&
                    formik.errors?.teams}
                </FormHelperText>
              </FormControl>
            </Grid>
            {userID ? (
              <div></div>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <PasswordField
                    label="Password"
                    name="password"
                    value={formik.values?.password}
                    helperText={
                      formik.errors?.password &&
                      formik.touched.password &&
                      formik.errors?.password
                    }
                    setValue={formik.setFieldValue}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <PasswordField
                    label="ConfirmPassword"
                    name="confirmPass"
                    value={formik.values.confirmPass}
                    helperText={
                      formik.errors?.confirmPass &&
                      formik.touched.confirmPass &&
                      formik.errors?.confirmPass
                    }
                    setValue={formik.setFieldValue}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </>
            )}

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "flex-end",
                }}
              >
                <Box className="flex flex-row justify-end gap-4">
                  <Button
                    className="text-color btn px-6 py-3  text-base font-bold"
                    variant="outlined"
                    onClick={() => {
                      router.push("/users");
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button
                    className=" background px-6 py-3 text-base font-bold"
                    variant="text"
                    color="primary"
                    type="submit"
                    // onClick={() => {
                    //   formik.handleSubmit();
                    // }}
                  >
                    SUBMIT
                  </Button>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>
    </form>
  );
};

export default AddUser;
