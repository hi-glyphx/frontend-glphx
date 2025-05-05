import { Dimensions } from "@/shared/config/types";
import React, { useRef, useEffect } from "react";

interface ImgReaderProps {
  dimensions?: Dimensions;
  setDimensions: React.Dispatch<React.SetStateAction<Dimensions>>;
  IMGE_URL?: string;
  dataExists?: boolean;
}

const ImgReader = ({
  dimensions,
  setDimensions,
  IMGE_URL,
}: ImgReaderProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current) {
      setDimensions?.({
        height: "100%",
        width: "100%",
      });
    }
  }, []);

  const imgStyle:any = {
    height: dimensions?.height,
    width: dimensions?.width,
  };


  return (
    <div>
      <img style={imgStyle} ref={imgRef} src={IMGE_URL} alt="gfg" />
    </div>
  );
};

export default ImgReader;
