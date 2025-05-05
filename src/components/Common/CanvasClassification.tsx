import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Line, Circle, Text } from "react-konva";
import whitebg from "../../assets/images/whitebg.png";

type Dimensions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

type CanvasComponentProps = {
  imageUrls?: any;
  dimensions: Dimensions;
  setStageScale: (scale: number) => void;
  setStageX: (x: any) => void;
  setStageY: (y: any) => void;
  inputCoordinates?: DOMRect;
};

const URLImage: React.FC<{ src: string; x: number; y: number }> = (props) => {
  const [image, setImage] = useState<any>(null);
  const imageRef = useRef<any>(null);

  const loadImage = (props) => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      let source = (props?.src && props?.src) || whitebg;

      img.onload = () => {
        setImage(img);
      };

      img.src = source;
    }
  };

  useEffect(() => {
    loadImage(props);
  }, [props.src]);

  return (
    <Image
      image={image}
      ref={(node) => {
        if (node) {
          imageRef.current = node;
        }
      }}
    />
  );
};

const CanvasClassification: React.FC<any> = ({
  imageUrls,
  dimensions,
  setStageScale,
  setStageX,
  setStageY,
  inputCoordinates,
  stageScale,
  stageX,
  stageY,
  lineShow,
  fieldLength,
  highlightText,
}) => {
  const [stageWidth, setStageWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth - 600 : 800
  );
  const [stageHeight, setStageHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  const [layerX, SetLayer] = useState<any>("");

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.2;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale >= 0.2 && newScale <= 2) {
      stage.scale({ x: newScale, y: newScale });
      setStageScale(newScale);
      let newStageX =
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale;
      let newStageY =
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale;
      setStageX(newStageX);
      setStageY(newStageY);
    } else {
      let tempNewScal = e.evt.deltaY > 0 ? 2 : 0.2;
      stage.scale({ x: tempNewScal, y: tempNewScal });
      setStageScale(tempNewScal);
      let newStageX =
        -(mousePointTo.x - stage.getPointerPosition().x / tempNewScal) *
        tempNewScal;
      let newStageY =
        -(mousePointTo.y - stage.getPointerPosition().y / tempNewScal) *
        tempNewScal;

      setStageX(newStageX);
      setStageY(newStageY);
    }
  };

  const containerRef = useRef<any>(null);
  const stageRef = useRef(null);

  // function getWindowSize() {
  //   var width =
  //     window.innerWidth ||
  //     document.documentElement.clientWidth ||
  //     document.body.clientWidth;
  //   var height =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     document.body.clientHeight;

  //   return { width: width, height: height };
  // }

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(
        containerRef.current?.offsetWidth ||
          (typeof window !== "undefined" ? window.innerWidth - 600 : 800)
      );
      setStageHeight(
        containerRef.current?.offsetHeight || window.innerHeight - 200
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current?.offsetWidth) {
      SetLayer(containerRef.current?.getBoundingClientRect().width / 3);
      setStageWidth(containerRef.current?.getBoundingClientRect().width);
    }
  }, [containerRef.current?.offsetWidth]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Stage
          width={stageWidth}
          height={stageHeight}
          onWheel={handleWheel}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stageX}
          y={stageY}
          ref={stageRef}
          listening={true}
        >
          <Layer draggable x={layerX}>
            <URLImage
              src={imageUrls ? imageUrls : null}
              x={
                typeof window !== "undefined" ? window.innerWidth / 2 - 200 : 0
              }
              y={
                typeof window !== "undefined" ? window.innerHeight / 2 - 125 : 0
              }
            />
          </Layer>
        </Stage>
      </div>
      {/* {lineShow && (
        <Stage
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            maxHeight: "80vh",
          }}
          width={stageWidth + 400}
          height={containerRef.current?.getBoundingClientRect()?.height}
          listening={false}
          // width={typeof window !== "undefined" ? window.innerWidth : 0}
          // height={typeof window !== "undefined" ? window.innerHeight : 0}
        >
          <Layer>
            <Circle
              x={linePoints[0]}
              y={linePoints[1]}
              radius={6}
              fill="green"
            />
            <Line points={linePoints} stroke="black" strokeWidth={2} />
          </Layer>
        </Stage>
      )} */}
    </>
  );
};

export default CanvasClassification;
