import Table from "@/components/tables/Table";
import Link from "next/link";
import styles from "./Group.module.css";
import { useSelector } from "react-redux";
import { TableColumn } from "@/shared/config/types";
import { useRouter } from "next/router";

const GroupsTable = () => {
  const { groupslist } = useSelector(({ GroupsSlice }) => GroupsSlice);

  const router = useRouter();

  const columns: TableColumn[] = [
    {
      Header: "Name",
      accessor: "name",
      sort: true,
    },
    {
      Header: "Permission",
      accessor: "permissions",
      sort: true,
      Cell: (column) => {
        return <PermissionTags data={column?.row?.original?.permissions} />;
      },
    },
    // {
    //   Header: "Action",
    //   accessor: "default_url",
    //   Cell: (column) => {
    //     return (
    //       <Link href={""} className={`${styles.actionColumn}`}>
    //         {column.value}
    //       </Link>
    //     );
    //   },
    // },
    {
      Header: "Action",
      accessor: "action1",
      Cell: (column) => {
        return (
          <div
            className="cursor-pointer"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              router.push({
                pathname: "groups/edit-group",
                query: { id: column?.row?.original?.id },
              });
            }}
          >
            Edit
          </div>
        );
      },
    },
  ];

  const PermissionTags = (props: any) => {
    const { data } = props;
    return (
      <div className="flex gap-2 py-2 flex-wrap ">
        {data?.length &&
          data.map((item, i) => (
            <div className={`py-1 px-2 ${styles.permissionTags}`} key={i}>
              {item}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      {" "}
      {groupslist && (
        <Table columns={columns} data={groupslist} pagination={false} />
      )}
    </div>
  );
};

export default GroupsTable;
