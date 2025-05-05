import * as React from "react";

interface AppContextValue {
  selectedData: {
    isSelecteAll: boolean;
    tableSelectedData: object[];
  };
  setSelectedData: React.Dispatch<
    React.SetStateAction<AppContextValue["selectedData"]>
  >;
  isSelecteAll: boolean;
}
interface SelectedDataState {
  isSelecteAll: boolean;
  tableSelectedData: object[];
}

export const SimpleCtx = React.createContext<AppContextValue>({
  selectedData: {
    isSelecteAll: false,
    tableSelectedData: [],
  },
  setSelectedData: () => {},
  isSelecteAll: false,
});
const CtxProvider = (props: any) => {
  const [selectedData, setSelectedData] = React.useState<SelectedDataState>({
    isSelecteAll: false,
    tableSelectedData: [],
  });

  return (
    <SimpleCtx.Provider
      value={{
        selectedData,
        setSelectedData,
        isSelecteAll: false,
      }}
    >
      {props?.children}
    </SimpleCtx.Provider>
  );
};

export default CtxProvider;
