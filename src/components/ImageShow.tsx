import React, { useEffect, useState } from "react";
// import ImgReader from "@/components/Common/ImgReader";
import { SESSION } from "@/utils/Enums";
import { setLoading } from "@/Store/Reducer/LayoutsSice";
import { useDispatch, useSelector } from "react-redux";
// import { Dimensions } from "@/shared/config/types";
import CanvasComponent from "./Common/CanvasComponent";
import CanvasClassification from "./Common/CanvasClassification";

interface ImageShowProps {
  url: string;
  imageUrls?: any;
  stageScale?: number;
  setStageScale: (scale: number) => void;
  stageX?: number;
  setStageX: (x: number) => void;
  stageY?: number;
  setStageY: (y: number) => void;
  // dimensions?: Dimensions;
  // setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
  divWidth?: any;
}

const ImageShow: React.FC<ImageShowProps> = ({
  url,
  stageScale,
  setStageScale,
  stageX,
  setStageX,
  stageY,
  setStageY,
  divWidth,
}) => {
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null);
  const { isSidebarOpen } = useSelector(({ CommonSlice }) => CommonSlice);

  const dispatch = useDispatch();
  const fetchImage = async (imageUrl) => {
    try {
      dispatch(setLoading(true));
      const SessionData = JSON.parse(localStorage.getItem(SESSION) || "{}");
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Basic ${btoa(
            `${SessionData.username}:${SessionData.password}`
          )}`,
        },
      };

      const response = await fetch(imageUrl, requestOptions);
      if (response.ok) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setFetchedImageUrl(objectURL);
        dispatch(setLoading(false));
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
    // finally {
    //   dispatch(setLoading(false));
    // }
  };

  useEffect(() => {
    setTimeout(() => fetchImage(url));
    // fetchImage(url);
  }, [url]);

  return (
    <>
      {fetchedImageUrl ? (
        <CanvasClassification
          dimensions={{}}
          imageUrls={fetchedImageUrl}
          stageScale={stageScale}
          setStageScale={setStageScale}
          stageX={stageX}
          setStageX={setStageX}
          stageY={stageY}
          setStageY={setStageY}
          // minWidth={0.35}
        />
      ) : (
        // <ImgReader
        //   dimensions={dimensions}
        //   setDimensions={setDimensions}
        //   IMGE_URL={fetchedImageUrl}
        // />
        <p>Loading image...</p>
      )}
    </>
  );
};

export default ImageShow;
