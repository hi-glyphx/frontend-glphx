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
const TableTwo = ({ data, caseFlagFuild }) => {
  return (
    <Box>
      <TableContainer className="border border-solid border-[#E7E6F0] rounded-2xl custom-table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                className="table-border  border  border-[#E7E6F0] py-6 pl-10"
                color=""
              >
                Key
              </TableCell>
              <TableCell color="" className="py-6 pl-16 break-words">
                Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((val: any) => {
                return (
                  <TableRow key={val.key}>
                    <TableCell
                      color=""
                      className="table-border py-6 pl-10"
                      component="th"
                      scope="row"
                    >
                      {val?.key}
                    </TableCell>
                    {/* <TableCell color="" className="py-6 pl-16 break-words">
                   {val?.value  == true && "true"}
                   {val?.value  == false && "false"}
                  {val?.value?.callback_url ? `{“callback_url” : ${val?.value?.callback_url}”}` : val?.value }
                </TableCell> */}

                    <TableCell color="" className="py-6 pl-16 break-words">
                      {typeof val?.value === "boolean"
                        ? val?.value
                          ? "true"
                          : "false"
                        : val?.value?.callback_url
                        ? `{"callback_url" : ${val?.value?.callback_url}}`
                        : val?.value}
                    </TableCell>
                  </TableRow>
                );
              })}
            {/* {caseFlagFuild && (
              <TableRow>
                <TableCell color="" className="" component="th" scope="row">
                  download_url |
                </TableCell>
                <TableCell color="" className="break-words">
                  <TextField
                    id="outlined-basic"
                    placeholder="Add Value"
                    label="Add Value"
                    variant="outlined"
                    className="w-full "
                  />
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableTwo;
