"use client";
import React from "react";
import TableTwo from "../tables/TableTwo";
import { useSelector } from "react-redux";

const Flags = () => {
  const { caseDetail } = useSelector(({ CaseSlice }) => CaseSlice);
  const flags = caseDetail?.data?.flags;

  const keyValueArray = Array();

  for (const key in flags) {
    if (flags.hasOwnProperty(key)) {
      keyValueArray.push([key, flags[key]]);
    }
  }

  const newData = keyValueArray.map((item) => ({
    key: item[0],
    value: item[1],
  }));

  return (
    <>
      <div>
        <TableTwo data={newData} caseFlagFuild={undefined} />
      </div>
    </>
  );
};

export default Flags;
