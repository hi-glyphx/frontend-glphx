import React from "react";
import { FormControl } from "@mui/material";

interface ListLayoutProps {
  searchText: string;
  filteredTextFields: React.ReactNode[];
  textFields: React.ReactNode[];
}

const ListLayout: React.FC<ListLayoutProps> = ({
  searchText,
  filteredTextFields,
  textFields,
}) => {
  return (
    <div>
      <div>
        {(searchText ? filteredTextFields : textFields).map(
          (textField, index) => (
            <FormControl
              key={index}
              className="flex flex-col gap-9 w-full loginfield"
            >
              {textField}
            </FormControl>
          )
        )}
      </div>
    </div>
  );
};

export default ListLayout;
