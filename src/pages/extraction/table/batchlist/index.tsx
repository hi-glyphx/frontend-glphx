import ExtractionTable from "@/views/Extraction/Table/ExtractionTable";
import { GetClassificationBatches } from "@/Store/Reducer/ClassificationSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Store/Store";
import { useEffect, useState } from "react";


export default function Classification() {

  //state changes to call api again
  const dispatch = useDispatch<AppDispatch>();
  const[Trigger,setTrigger]=useState(0)

  useEffect(() => {

    dispatch(GetClassificationBatches());
  }, [dispatch,Trigger]);

  const onDeleteCases = () =>{
    setTrigger((prev)=> prev +1)
  }
  const onExpiresVerifications= () => {
    setTrigger((prev)=>prev+1)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ExtractionTable
      onDeleteCases={onDeleteCases}
      onExpiresVerifications={onExpiresVerifications}
      />
    </div>
  );
}
