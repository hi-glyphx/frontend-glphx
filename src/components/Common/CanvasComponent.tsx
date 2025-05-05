// import React, { useState, useRef, useEffect } from "react";
// import {
//   Stage,
//   Layer,
//   Image,
//   Rect,
//   Line,
//   KonvaNodeComponent,
//   KonvaNodeEvents,
//   Circle,
// } from "react-konva";
// import whitebg from "../../assets/images/whitebg.png";
// import IconService from "@/utils/Icons";
// import { ShapeGetClientRectConfig } from "konva/lib/Shape";
// import { RectConfig } from "konva/lib/shapes/Rect";

// type Dimensions = {
//   x?: number;
//   y?: number;
//   width?: number;
//   height?: number;
// };

// type CanvasComponentProps = {
//   imageUrls?: any;
//   dimensions: Dimensions;
//   stageScale?: any;
//   setStageScale: (scale: number) => void;
//   stageX?: any;
//   setStageX: (x: any) => void;
//   stageY?: any;
//   setStageY: (y: any) => void;
//   inputCoordinates?: DOMRect;
// };

// const URLImage: React.FC<{ src: string; x: number; y: number }> = (props) => {
//   const [image, setImage] = useState<any>(null);
//   const imageRef = useRef<any>(null);

//   // const loadImage = () => {
//   //   if (typeof window !== "undefined") {
//   //     const img = new window.Image();
//   //     img.src = props.src;
//   //     img.onload = () => {
//   //       setImage(img);
//   //     };
//   //   }
//   // };

//   const loadImage = (props) => {
//     if (typeof window !== "undefined") {
//       const img = new window.Image();
//       let source = (props?.src && props?.src) || IconService.whitebg.src; //'https://via.placeholder.com/300/FFFFFF/FFFFFF';

//       img.onload = () => {
//         setImage(img);
//       };

//       img.src = source;
//     }
//   };

//   useEffect(() => {
//     loadImage(props);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [props.src]);

//   return (
//     <Image
//       image={image}
//       ref={(node) => {
//         if (node) {
//           imageRef.current = node;
//         }
//       }}
//       alt={"im"}
//       // x={props.x}
//       // y={props.y}
//     />
//   );
// };

// const CanvasComponent: React.FC<CanvasComponentProps> = ({
//   imageUrls,
//   dimensions,
//   stageScale,
//   setStageScale,
//   stageX,
//   setStageX,
//   stageY,
//   setStageY,
//   inputCoordinates,
// }) => {
//   const highlightedX = dimensions.x;
//   const highlightedY = dimensions.y;
//   const highlightedWidth = dimensions.width || 1;
//   const highlightedHeight = dimensions.height || 1;

//   const scaleAdjustment = 0.5;
//   const xAdjustment = -500;
//   const yAdjustment = -500;

//   // Set initial dimensions based on window availability
//   const initialWidth = typeof window !== "undefined" ? window.innerWidth : 800;
//   const initialHeight =
//     typeof window !== "undefined" ? window.innerHeight : 600;

//   const [stageWidth, setStageWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth - 600 : 800
//   );
//   const [stageHeight, setStageHeight] = useState(
//     typeof window !== "undefined" ? window.innerHeight : 600
//   );

//   const handleWheel = (e: any) => {
//     e.evt.preventDefault();
//     // wheelEventRef.current = e; // Store the event in the ref

//     const scaleBy = 1.2;
//     const stage = e.target.getStage();
//     const oldScale = stage.scaleX();
//     const mousePointTo = {
//       x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
//       y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
//     };

//     const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
//     if (newScale >= 0.2 && newScale <= 2) {
//       stage.scale({ x: newScale, y: newScale });
//       setStageScale(newScale);
//       setStageX(
//         -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
//       );
//       setStageY(
//         -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
//       );
//     } else {
//       let tempNewScal = e.evt.deltaY > 0 ? 2 : 0.2;
//       stage.scale({ x: tempNewScal, y: tempNewScal });
//       setStageScale(tempNewScal);
//       setStageX(
//         -(mousePointTo.x - stage.getPointerPosition().x / tempNewScal) *
//           tempNewScal
//       );
//       setStageY(
//         -(mousePointTo.y - stage.getPointerPosition().y / tempNewScal) *
//           tempNewScal
//       );
//     }
//   };
//   const containerRef = useRef<HTMLDivElement>(null);
//   const stageRef = useRef(null);

//   const adjustViewToHighlightedArea = () => {
//     if (containerRef.current) {
//       const containerWidth: number = containerRef.current.offsetWidth;
//       const containerHeight: number = containerRef.current.offsetHeight;

//       const centerX = (dimensions.x || 0) + (dimensions.width || 0) / 2;
//       const centerY = (dimensions.y || 0) + (dimensions.height || 0) / 2;

//       const newStageX: number = containerWidth / 4 - centerX * stageScale;
//       const newStageY: number =
//         containerHeight / 2 - centerY * stageScale - 200;

//       setStageX(newStageX);
//       setStageY(newStageY);
//     }
//   };
//   useEffect(() => {
//     if (highlightedX && highlightedY) {
//       adjustViewToHighlightedArea();

//       window.addEventListener("resize", adjustViewToHighlightedArea);
//       return () => {
//         window.removeEventListener("resize", adjustViewToHighlightedArea);
//       };
//     }
//   }, [highlightedX, highlightedY, highlightedWidth, highlightedHeight]);

//   // const handleKeyDown = (e: KeyboardEvent) => {
//   //   if (e.ctrlKey) {
//   //     if (e.key === "+" || e.key === "=") {
//   //       // Zoom in
//   //       handleZoom(1.2);
//   //     } else if (e.key === "-") {
//   //       // Zoom out
//   //       handleZoomOut();
//   //     }
//   //   }
//   // };

//   // const handleZoom = (scaleFactor: number) => {
//   //   const scaleBy = 1.2;
//   //   const newScale = stageScale * scaleBy;

//   //   if (newScale <= 2) {
//   //     setStageScale(newScale);
//   //   } else {
//   //     setStageScale(2);
//   //   }
//   // };
//   // const handleZoomOut = () => {
//   //   const scaleBy = 1.2;
//   //   const newScale = stageScale / scaleBy;

//   //   if (newScale >= 0.2) {
//   //     setStageScale(newScale);
//   //   } else {
//   //     setStageScale(0.2);
//   //   }
//   // };
//   // useEffect(() => {
//   //   window.addEventListener("keydown", handleKeyDown);
//   //   return () => {
//   //     window.removeEventListener("keydown", handleKeyDown);
//   //   };
//   // }, [handleKeyDown]);

//   // const handleKeyDowns = (e: KeyboardEvent) => {
//   //   if (e.key === "ArrowUp") {
//   //     setStageY(stageY - 20);
//   //   } else if (e.key === "ArrowDown") {
//   //     setStageY(stageY + 20);
//   //   } else if (e.key === "ArrowLeft") {
//   //     setStageX(stageX - 20);
//   //   } else if (e.key === "ArrowRight") {
//   //     setStageX(stageX + 20);
//   //   } else if (e.key === "PageUp" || e.key === "=") {
//   //     const newScale = stageScale + 0.1;
//   //     setStageScale(newScale);
//   //   } else if (e.key === "PageDown" || e.key === "-") {
//   //     const newScale = stageScale - 0.1;
//   //     setStageScale(newScale >= 0.2 ? newScale : 0.2);
//   //   }
//   // };

//   // useEffect(() => {
//   //   window.addEventListener("keydown", handleKeyDowns);

//   //   return () => {
//   //     window.removeEventListener("keydown", handleKeyDowns);
//   //   };
//   // }, [stageScale, setStageScale, stageX, setStageX, stageY, setStageY]);

//   useEffect(() => {
//     const handleResize = () => {
//       setStageWidth(
//         containerRef.current?.offsetWidth ||
//           (typeof window !== "undefined" ? window.innerWidth - 600 : 800)
//       );
//       setStageHeight(containerRef.current?.offsetHeight || window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//   const rectRef = useRef<any>(null!);
//   const [rectPosition, setRectPosition] = useState<{
//     width: number;
//     height: number;
//     x: number;
//     y: number;
//   }>({
//     width: 0,
//     height: 0,
//     x: 0,
//     y: 0,
//   });
//   const [circlePosition, setCirclePosition] = useState<{
//     x: number;
//     y: number;
//   }>({ x: 0, y: 0 });
//   const [linePoints, setLinePoints] = useState<number[]>([]);
//   // useEffect(() => {
//   //   const stage = stageRef.current;
//   //   const rect = rectRef.current;

//   //   if (stage && rect) {
//   //     const rectPosition = rect.getAbsolutePosition();
//   //     const inputCenterX =
//   //       inputCoordinates?.x || 100 + (dimensions?.width || 100) / 2;
//   //     const inputCenterY =
//   //       inputCoordinates?.y || 100 + (dimensions?.height || 100) / 2;
//   //     const rectCenterX = rectPosition.x + (dimensions?.width || 100) / 2;
//   //     const rectCenterY = rectPosition.y + (dimensions?.height || 100) / 2;

//   //     const newLinePoints = [inputCenterX, inputCenterY];
//   //     setLinePoints(newLinePoints);

//   //     const circleX = rectCenterX;
//   //     const circleY = rectCenterY;
//   //     setCirclePosition({ x: circleX, y: circleY });
//   //   }
//   // }, [dimensions, inputCoordinates]);
//   // useEffect(() => {
//   //   if (rectRef.current) {
//   //     const rectElement = rectRef.current;
//   //     const rect = rectElement.getAbsolutePosition();

//   //     const inputCenterX =
//   //       inputCoordinates?.x || 100 + (dimensions?.width || 100) / 2;
//   //     const inputCenterY =
//   //       inputCoordinates?.y || 100 + (dimensions?.height || 100) / 2;
//   //     const rectCenterX = rectPosition.x + (dimensions?.width || 100) / 2;
//   //     const rectCenterY = rectPosition.y + (dimensions?.height || 100) / 2;

//   //     setRectPosition(rect);
//   //     const newLinePoints = [
//   //       inputCenterX,
//   //       inputCenterY,
//   //       rectCenterX,
//   //       rectCenterY,
//   //     ];
//   //     setLinePoints(newLinePoints);
//   //   }
//   // }, [dimensions]);

//   useEffect(() => {
//     const calculateLinePoints = () => {
//       const rectCenterX = dimensions.x + dimensions.width / 2;
//       const rectCenterY = dimensions.y + dimensions.height / 2;

//       // Update the line points to draw from the rectangle center to the absolute position
//       setLinePoints([
//         rectCenterX,
//         rectCenterY,
//         inputCoordinates?.x + 100,
//         inputCoordinates?.y + 60,
//       ]);
//     };

//     calculateLinePoints();
//   }, [dimensions]);

//   // useEffect(() => {
//   //   // Get the absolute position and size of the rectangle using getClientRect
//   //   const rectNode = rectRef.current;
//   //   if (rectNode) {
//   //     const rectClientRect = rectNode.getClientRect();
//   //     setRectPosition(rectClientRect);
//   //   }
//   // }, [dimensions]); // Run this effect when dimensions change

//   return (
//     <>
//       <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
//         <Stage
//           // width={stageWidth - 600}
//           // height={stageHeight}
//           // onWheel={handleWheel}
//           // scaleX={stageScale}
//           // scaleY={stageScale}
//           // x={stageX}
//           // y={stageY}
//           ref={stageRef}
//           width={typeof window !== "undefined" ? window.innerWidth : 0}
//           height={typeof window !== "undefined" ? window.innerHeight : 0}
//         >
//           <Layer draggable>
//             <URLImage
//               src={imageUrls ? imageUrls : null}
//               x={
//                 typeof window !== "undefined" ? window.innerWidth / 2 - 200 : 0
//               }
//               y={
//                 typeof window !== "undefined" ? window.innerHeight / 2 - 125 : 0
//               }
//             />
//             <Rect
//               ref={rectRef}
//               id="rect-ele"
//               x={dimensions.x}
//               y={dimensions.y}
//               width={dimensions.width}
//               height={dimensions.height}
//               stroke="red"
//             />
//           </Layer>
//         </Stage>
//       </div>
//       {console.log(dimensions, [
//         rectPosition.x,
//         rectPosition.y,
//         inputCoordinates?.x || 100,
//         inputCoordinates?.y || 100,
//       ])}
//       <Stage
//         style={{
//           // background: "red",
//           position: "absolute",
//           top: 0, //containerRef.current?.getBoundingClientRect().x,
//           left: 0, //</>containerRef.current?.getBoundingClientRect().x,
//         }}
//         // width={stageWidth}
//         // height={stageHeight - 400}
//         // scaleX={stageScale}
//         // scaleY={stageScale}
//         // width={dimensions.width}
//         // height={600}

//         width={typeof window !== "undefined" ? window.innerWidth : 0}
//         height={typeof window !== "undefined" ? window.innerHeight : 0}
//       >
//         <Layer>
//           <Circle
//             x={dimensions.x + dimensions.width / 2}
//             y={dimensions.y + dimensions.height / 2}
//             radius={10}
//             fill="green"
//           />

//           {/* <Circle
//             x={inp.x}
//             y={circlePosition.y}
//             radius={10}
//             fill="green"
//           /> */}
//           <Line points={linePoints} stroke="blue" strokeWidth={2} />
//         </Layer>
//       </Stage>
//     </>
//   );
// };

// export default CanvasComponent;

import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Line, Circle, Text , Arrow } from "react-konva";
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

  // 1st useEffect: Load the image when the source changes
  useEffect(() => {
    console.log("1st useEffect is running"); // Tracking execution
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

const CanvasComponent: React.FC<any> = ({
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
  const highlightedX = dimensions.x;
  const highlightedY = dimensions.y;
  const highlightedWidth = dimensions.width || 1;
  const highlightedHeight = dimensions.height || 1;

  const [stageWidth, setStageWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth - 600 : 800
  );
  const [stageHeight, setStageHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 600
  );

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
      // setDifference({
      //   x: newStageX - stageX,
      //   y: newStageY - stageY,
      // });
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
      // setDifference({
      //   x: newStageX - stageX,
      //   // x: 0,
      //   y: newStageY - stageY,
      // });
      setStageX(newStageX);
      setStageY(newStageY);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(null);

  const highlightTextRef = useRef<any>(null!);
  const [tempWidth, setTempWidth] = useState(0);

  const rectRef = useRef<any>(null!);
  const [draggableMove, setDragMove] = useState(0);

  const [rectPosition, setRectPosition] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [linePoints, setLinePoints] = useState<number[]>([]);

  function getWindowSize() {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    var height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    return { width: width, height: height };
  }

  // 2nd useEffect: Adjust the stage X position based on window size and container width
  useEffect(() => {
    console.log("2nd useEffect is running"); // Tracking execution
    let { width, height } = getWindowSize();
    if (width < 1500) {
      setStageX(0);
    } else {
      if (containerRef?.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const centerX = (dimensions.x || 0) + (dimensions.width || 0) / 2;
        const newStageX = containerWidth / 4 - centerX * stageScale - 50;
        setStageX(newStageX);
      }
    }
}, []);

  // 3rd useEffect: Update stage width and height when the window is resized
  useEffect(() => {
    console.log("3rd useEffect is running"); // Tracking execution
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

  const [difference, setDifference] = useState({
    x: 0,
    y: 0,
  });

  function getValueForHeight(height: number) {
    // Adjusted piecewise linear interpolation
    if (height >= 1100) {
      return 140 + ((height - 1100) / 100) * 20;
    } else if (height >= 1000) {
      return 120 + ((height - 1000) / 100) * 20;
    } else if (height >= 900) {
      return 90 + ((height - 900) / 100) * 30;
    } else if (height >= 800) {
      return 70 + ((height - 800) / 100) * 20;
    } else if (height >= 700) {
      return 50 + ((height - 700) / 100) * 20;
    } else if (height >= 600) {
      return 20 + ((height - 600) / 100) * 30;
    } else {
      return 0;
    }
  }

  // const [value, setValue] = useState(1);

  const adjustViewToHighlightedArea = () => {
    if (containerRef.current) {
      const containerWidth: number = containerRef.current.offsetWidth;
      const containerHeight: number = containerRef.current.offsetHeight;
  
      // Calculate the center coordinates of the highlighted area
      const centerX = (dimensions.x || 0) + (dimensions.width || 0) / 2;
      const centerY = (dimensions.y || 0) + (dimensions.height || 0) / 2;
  
      // Calculate new stage X and Y to center the image
      const newStageX: number = containerWidth / 2 - centerX * stageScale;  // Adjusted to use center of container
      const newStageY: number = containerHeight / 2 - centerY * stageScale // Adjusted to use center of container
  
      // Remove or update this logic if centering is preferred
      setDifference({
        x: newStageX - stageX,
        y: newStageY - stageY,
      });
  
      // Update stageX and stageY to center the image
      if (lineShow) {
        setStageX(newStageX);
        setDragMove(0);  // Reset drag movement if necessary
      }
      setStageY(newStageY);  // Center the stage vertically
    }
  };

  // 4th useEffect: Adjust view to the highlighted area when coordinates change
  useEffect(() => {
    console.log("4th useEffect is running"); // Tracking execution
    if (highlightedX && highlightedY && fieldLength > 1) {
      adjustViewToHighlightedArea();
      window.addEventListener("resize", adjustViewToHighlightedArea);
      return () => {
        window.removeEventListener("resize", adjustViewToHighlightedArea);
      };
    } else {
      setStageY(0);
    }
  }, [
    highlightedX,
    highlightedY,
    highlightedWidth,
    highlightedHeight,
    inputCoordinates,
    lineShow,
  ]);


// 5th useEffect: Reset the difference when image URLs change
  useEffect(() => {
    console.log("5th useEffect is running"); // Tracking execution
    setDifference({
      x: 0,
      y: 0,
    });
  }, [imageUrls]);


  // 6th useEffect: Update the rectangle position whenever the dimensions or other dependencies change
  useEffect(() => {
    console.log("6th useEffect is running"); // Tracking execution
    const rectNode = rectRef.current;

    if (rectNode) {
      const rectAbsolutePosition = rectNode.getAbsolutePosition();
      const rectPosition = {
        x: rectAbsolutePosition.x,
        y: rectAbsolutePosition.y,
        width: rectNode.width(),
        height: rectNode.height(),
      };
      setRectPosition(rectPosition);
    }
  }, [dimensions, inputCoordinates, lineShow]);

  // 7th useEffect: Calculate line points based on the rectangle and input coordinates
  //use it for line behaviour
  useEffect(() => {
    const calculateLinePoints = () => {
      const rectCenterX = rectPosition.x + dimensions.width / 2;
      const rectCenterY = rectPosition.y + dimensions.height / 2;
      // const canvasX = dimensions.x + dimensions.width / 2;
      // const canvasY = dimensions.y + dimensions.height / 2;
      let { height } = getWindowSize();

      const lineX = inputCoordinates?.x - 60; //+ window.innerWidth / 2 - 600;
      const lineY = inputCoordinates?.y - getValueForHeight(height) + 10;
      //changes to lines calculation adjusted the accuracy
      setLinePoints([
        lineX,
        lineY,
        rectCenterX + difference.x + 15,
        rectCenterY + difference.y + 10,
      ]);

      // To set left points to start from reactangle end
      // setLinePoints([
      //   rectCenterX + rectPosition.width / 20 + 22,
      //   rectCenterY + difference.y + 10,
      //   lineX,
      //   lineY,
      // ]);
    };
    calculateLinePoints();
  }, [
    dimensions,
    rectPosition,
    inputCoordinates,
    difference,
    lineShow,
    draggableMove,
  ]);

  useEffect(() => {
    if (highlightTextRef.current) {
      setTempWidth(highlightTextRef.current?.textWidth);
    }
  }, [highlightText]);
  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <Stage
          width={containerRef.current?.getBoundingClientRect().width}
          height={stageHeight}
          onWheel={handleWheel}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stageX}
          y={stageY + 30}
          ref={stageRef}
          listening={true}
        >
          <Layer
            draggable
            onDragMove={(e) => {
              setDragMove(e.evt.clientY);
            }}
            // x={
            //   (containerRef.current?.getBoundingClientRect().width -
            //     stageWidth) /
            //   2
            // }

            y={lineShow ?? draggableMove}
          >
            <URLImage
              src={imageUrls ? imageUrls : null}
              x={
                typeof window !== "undefined" ? window.innerWidth / 2 - 200 : 0
              }
              y={
                typeof window !== "undefined" ? window.innerHeight / 2 - 125 : 0
              }
            />
            <Rect
              ref={rectRef}
              x={dimensions.x - 4}
              y={dimensions.y - 5}
              width={dimensions.width + 5}
              height={dimensions.height + 10}
              fill="#FCFF04" // Background color
              cornerRadius={6} // Border radius
              stroke="#FCFF04" // Border color
              globalCompositeOperation="multiply"
            />
            {/* <Text
              ref={highlightTextRef}
              text={highlightText}
              x={dimensions.x}
              y={dimensions.y}
              offsetX={0} // Adjust as needed
              offsetY={0} // Adjust as needed
              fontSize={20} // Adjust as needed
              fill="black" // Text color
            /> */}

            {/* <Rect
              ref={rectRef}
              x={dimensions.x}
              y={dimensions.y}
              width={dimensions.width}
              height={dimensions.height}
              stroke="red"
            />

            <Text
              text="Hello"
              x={highlightedX + highlightedWidth / 2}
              y={highlightedY + highlightedHeight / 2}
              offsetX={0} // Adjust as needed
              offsetY={9} // Adjust as needed
              fontSize={20} // Adjust as needed
            /> */}
          </Layer>
        </Stage>
      </div>
      {lineShow && (
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
            {/* <Circle
              x={linePoints[0]}
              y={linePoints[1]}
              radius={6}
              fill="green"
            /> */}
            <Arrow
            points={linePoints}
            pointerLength={10}
            pointerWidth={10}
            fill="black"
            stroke="black" 
            strokeWidth={2}
          />
          </Layer>
        </Stage>
      )}
    </>
  );
};

export default CanvasComponent;
