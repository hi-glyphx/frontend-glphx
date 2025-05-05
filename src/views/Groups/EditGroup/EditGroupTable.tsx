import { updateEditList } from "@/Store/Reducer/GroupsSlice";
import { AppDispatch } from "@/Store/Store";
import Table from "@/components/tables/Table";
import IconService from "@/utils/Icons";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const EditGroupTable = () => {
  const { editList } = useSelector(({ GroupsSlice }) => GroupsSlice);

  const dispatch = useDispatch<AppDispatch>();

  // const handleCheckboxChange = (rowIndex, columnName, subIndex) => {
  //   const updatedData = JSON.parse(JSON.stringify(data));
  //   if (updatedData[rowIndex] && Array.isArray(updatedData[rowIndex].methods)) {
  //     const methodsArray = updatedData[rowIndex].methods;
  //     if (methodsArray.includes(columnName)) {
  //       const methodsIndex = methodsArray.indexOf(columnName);
  //       if (methodsIndex !== -1) {
  //         methodsArray.splice(methodsIndex, 1, null);
  //       }
  //     } else {
  //       methodsArray[subIndex] = columnName;
  //     }

  //     setData(updatedData);
  //   }
  // };

  const columns: any = [
    {
      Header: "URL Name",
      accessor: "reverse_name",
      sort: true,
    },
    {
      Header: () => (
        <div className="flex gap-x-2 justify-center">
          <p>Get</p>
          {/* <GradientCheckbox label="" /> */}
        </div>
      ),
      accessor: "get",
      Cell: (column: any) => {
        return (
          <Checkbox
            checked={column?.row?.original?.methods[0] ?? false}
            color="primary"
            icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
            checkedIcon={
              <img src={IconService.CheckedIcon.src} alt="Checked icon"></img>
            }
            onChange={() =>
              dispatch(
                updateEditList({
                  rowIndex: column.row.index,
                  columnName: "GET",
                  subIndex: 0,
                })
              )
            }
          />
        );
      },
    },
    {
      Header: () => (
        <div className="flex gap-x-2 justify-center">
          <p>Post</p>
          {/* <GradientCheckbox label="" /> */}
        </div>
      ),
      accessor: "post",
      Cell: (column: any) => {
        return (
          <Checkbox
            checked={column?.row?.original?.methods[1] ?? false}
            color="primary"
            icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
            checkedIcon={
              <img src={IconService.CheckedIcon.src} alt="Checked icon"></img>
            }
            onChange={() =>
              dispatch(
                updateEditList({
                  rowIndex: column.row.index,
                  columnName: "POST",
                  subIndex: 1,
                })
              )
            }
          />
        );
      },
    },
    {
      Header: () => (
        <div className="flex gap-x-2 justify-center">
          <p>Put</p>
          {/* <GradientCheckbox label="" /> */}
        </div>
      ),
      accessor: "put",
      Cell: (column: any) => {
        return (
          <Checkbox
            checked={column?.row?.original?.methods[2] ?? false}
            color="primary"
            icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
            checkedIcon={
              <img src={IconService.CheckedIcon.src} alt="Checked icon"></img>
            }
            onChange={() =>
              dispatch(
                updateEditList({
                  rowIndex: column.row.index,
                  columnName: "PUT",
                  subIndex: 2,
                })
              )
            }
          />
        );
      },
    },
    {
      Header: () => (
        <div className="flex gap-x-2 justify-center">
          <p>Delete</p>
          {/* <GradientCheckbox label="" /> */}
        </div>
      ),
      accessor: "delete",
      Cell: (column: any) => {
        return (
          <Checkbox
            checked={column?.row?.original?.methods[3] ?? false}
            color="primary"
            icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
            checkedIcon={
              <img src={IconService.CheckedIcon.src} alt="Checked icon"></img>
            }
            onChange={() =>
              dispatch(
                updateEditList({
                  rowIndex: column.row.index,
                  columnName: "DELETE",
                  subIndex: 3,
                })
              )
            }
          />
        );
      },
    },
  ];

  return (
    <Table columns={columns} data={editList?.permissions} pagination={false} />
  );
};

export default EditGroupTable;
