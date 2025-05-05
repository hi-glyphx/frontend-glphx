import React from "react";
import { useFormik } from "formik";
import {
  Box,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";

const AddCaseTable = ({ values, handleSubmit, handleChange }) => {
  return (
    <form>
      <Box>
        <TableContainer className="add_flag_table border border-solid border-[#E7E6F0] rounded-2xl custom-table">
          <Table className="add-case-table" aria-label="simple table">
            <TableHead>
              <TableRow className="">
                <TableCell
                  className="table-border w-[240px] border border-[#E7E6F0] py-[26px]"
                  color="text.secondary"
                >
                  Key
                </TableCell>
                <TableCell
                  color="text.secondary"
                  className="break-words py-[26px]"
                >
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.keyValuePairs.map((pair, index) => (
                <TableRow key={index} className="">
                  <TableCell
                    component="th"
                    scope="row"
                    className="table-border"
                  >
                    <TextField
                      name={`keyValuePairs.${index}.key`}
                      className="border-remove table_textfield"
                      fullWidth
                      value={pair.key}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell color="" className="break-words">
                    <TextField
                      name={`keyValuePairs.${index}.value`}
                      className="border-remove w-full table_textarea p-0"
                      fullWidth
                      multiline
                      value={pair.value}
                      onChange={handleChange}
                      inputProps={{ style: { color: "#9C95BA" } }}
                    />
                  </TableCell>
                  {/* <TableCell>
                    <Button
                      type="button"
                      onClick={() =>
                        formik.setFieldValue(
                          "keyValuePairs",
                          values.keyValuePairs.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={3}>
                  <Button
                    type="button"
                    onClick={() =>
                      formik.setFieldValue("keyValuePairs", [
                        ...values.keyValuePairs,
                        { key: "", value: "" },
                      ])
                    }
                  >
                    Add Key-Value Pair
                  </Button>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button type="submit">Submit</Button> */}
      </Box>
    </form>
  );
};

export default AddCaseTable;
