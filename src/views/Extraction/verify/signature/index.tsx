import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import CommonHeader from "@/components/Common/Header";
import { useDispatch, useSelector } from "react-redux";
import { GetCheckboxes, SaveCheckboxes } from "@/Store/Reducer/ExtractionSlice";
import { AppDispatch } from "@/Store/Store";

interface TYES  {
  setintigateApi?:any
}

const Index = ({setintigateApi}:TYES) => {
  const dispatch = useDispatch<AppDispatch>();
  const { checkboxesDetail } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );

  function cropImageFromUrl(imageUrl, position, callback) {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable cross-origin requests if needed

    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = position.width;
      canvas.height = position.height;
      const ctx: any = canvas.getContext("2d");
      ctx.drawImage(
        img,
        position.x,
        position.y,
        position.width,
        position.height,
        0,
        0,
        position.width,
        position.height
      );

      const croppedImageUrl = canvas.toDataURL("image/jpeg"); // You can change the format if needed

      callback(croppedImageUrl);
    };

    img.src = imageUrl;
  }

  // Example usage:
  const [uncheckedBox, setUncheckedBox] = useState([]);
  const [checkedBox, setcheckedBox] = useState([]);
  const [uncheckedBoxvalue, setUncheckedBoxValue] = useState<any>();
  const [checkedBoxvalue, setCheckedBoxValue] = useState<any>();

  useEffect(() => {
    const newDataArray: any = [];
    const newDataArray2: any = [];

    checkboxesDetail?.data &&
      checkboxesDetail?.data["☐"]?.forEach((item) => {
        cropImageFromUrl(
          `data:image/png;base64,${checkboxesDetail?.meta?.image}`,
          item?.crop_position,
          function (croppedImageUrl) {
            const idExistsInUpdate =
              uncheckedBox &&
              uncheckedBox?.some(
                (updateItem: any) => updateItem.id === item.id
              );

            if (!idExistsInUpdate) {
              newDataArray.push({
                ...item,
                croppedImageUrl: croppedImageUrl,
              });
            }
            setUncheckedBox(newDataArray);
          }
        );
      });
    checkboxesDetail?.data &&
      checkboxesDetail?.data["☑"]?.forEach((item) => {
        cropImageFromUrl(
          `data:image/png;base64,${checkboxesDetail?.meta?.image}`,
          item?.crop_position,
          function (croppedImageUrl) {
            const idExistsInUpdate =
              uncheckedBox &&
              uncheckedBox?.some(
                (updateItem: any) => updateItem.id === item.id
              );

            if (!idExistsInUpdate) {
              newDataArray2.push({
                id: item.id,
                ...item,
                croppedImageUrl: croppedImageUrl,
              });
            }
            setcheckedBox(newDataArray2);
          }
        );
      });
  }, [checkboxesDetail]);

  const moveDataToChecked = (id) => {
    const itemToMove = uncheckedBox.find((item: any) => item.id === id);
    if (itemToMove) {
      setUncheckedBox((prevUnchecked) =>
        prevUnchecked.filter((item: any) => item.id !== id)
      );
      setcheckedBox((prevChecked) => [...prevChecked, itemToMove]);
    }
  };
  // Function to move data from checkedBox to uncheckedBox
  const moveDataToUnchecked = (id) => {
    const itemToMove = checkedBox.find((item: any) => item.id === id);
    if (itemToMove) {
      setcheckedBox((prevChecked) =>
        prevChecked.filter((item: any) => item.id !== id)
      );
      setUncheckedBox((prevUnchecked) => [...prevUnchecked, itemToMove]);
    }
  };

  const handleSave = () => {
    let newUncheck = uncheckedBox?.map((data: any) => {
      delete data.croppedImageUrl;
      return data;
    });
    let newCheck = checkedBox?.map((data: any) => {
      delete data.croppedImageUrl;
      return data;
    });

    let request = {
      meta: {
        count: checkboxesDetail?.meta?.count,
        batch_id: checkboxesDetail?.meta?.batch_id,
      },
      data: {
        "☐": newUncheck,
        "☑": newCheck,
      },
    };
    dispatch(SaveCheckboxes(request)).then((res)=>{
      if(res?.payload){
        dispatch(GetCheckboxes()).then((res) => {
          if (!res?.payload?.data || Object.keys(res.payload.data).length === 0) {
            setintigateApi(true);
          } else {
            setintigateApi(false);
          }
        });
      }
     
    })
  };

  return (
    <>
      <CommonHeader handleSave={handleSave} />

      <div className="grid grid-cols-2 gap-4 px-[2.5rem] pt-[2.5rem] ">
        <Card variant="outlined">
          <div className="p-4 flex flex-col justify-between h-full">
            <div>
              <ImageList cols={4} gap={16} className="m-0">
                {checkedBox &&
                  checkedBox?.map((item: any, i) => (
                    <ImageListItem key={i}>
                      <img
                        className="rounded-lg object-contain"
                        width={178}
                        src={item.croppedImageUrl}
                        srcSet={item.croppedImageUrl}
                        alt={item.id}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        position="below"
                        title={
                          <Typography className="font-bold text-base">
                            {item?.id}
                          </Typography>
                        }
                        className="text-center"
                      />
                    </ImageListItem>
                  ))}
              </ImageList>
            </div>
            <div className="flex justify-between mt-8 items-center">
              <Typography variant="h5" color="text.secondary">
                Blanks
              </Typography>
              <FormControl
                className="flex flex-col gap-9 w-1/3"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Move to Blanks
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(e) => {
                    setCheckedBoxValue(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        style={{
                          height: "40px",
                          minWidth: "40px",
                          width: "40px",
                          padding: "0px",
                        }}
                        onClick={() => moveDataToUnchecked(checkedBoxvalue)}
                      >
                        <ArrowRightAltIcon />
                      </Button>
                    </InputAdornment>
                  }
                  label=" Move to Blanks"
                />
              </FormControl>
            </div>
          </div>
        </Card>

        <Card variant="outlined">
          <div className="p-4 flex flex-col justify-between h-full">
            <ImageList cols={4} gap={16} className="m-0">
              {uncheckedBox &&
                uncheckedBox?.map((item: any, i) => (
                  <ImageListItem key={i}>
                    <img
                      className="rounded-lg objectcontain"
                      width={178}
                      src={item.croppedImageUrl}
                      srcSet={item.croppedImageUrl}
                      alt={item.id}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      position="below"
                      title={
                        <Typography className="font-bold text-base">
                          {item?.id}
                        </Typography>
                      }
                      className="text-center"
                    />
                  </ImageListItem>
                ))}
            </ImageList>
            <div className="flex justify-between mt-8 items-center">
              <Typography variant="h5" color="text.secondary">
                Signed
              </Typography>
              <FormControl
                className="flex flex-col  gap-9 w-1/3"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Move to Signed
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={(e) => {
                    setUncheckedBoxValue(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        color="primary"
                        style={{
                          height: "40px",
                          minWidth: "40px",
                          width: "40px",
                          padding: "0px",
                        }}
                        onClick={() => moveDataToChecked(uncheckedBoxvalue)}
                      >
                        <ArrowRightAltIcon />
                      </Button>
                    </InputAdornment>
                  }
                  label=" Move to Signed"
                />
              </FormControl>
            </div>
          </div>
        </Card>
      </div>
    
    </>
  );
};

export default Index;
