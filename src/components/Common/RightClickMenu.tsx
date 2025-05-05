import React from "react";

function RightContext() {
  const [context, setContext] = React.useState(false);
  const [xYPosistion, setXyPosistion] = React.useState({ x: 0, y: 0 });
  const showNav = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    setContext(false);
    const positionChange = {
      x: event.pageX,
      y: event.pageY,
    };
    setXyPosistion(positionChange);
    setContext(true);
  };
  const hideContext = () => {
    setContext(false);
  };
  const [chosen, setChosen] = React.useState<string>();
  const initMenu = (chosen: string) => {
    setChosen(chosen);
  };
  return (
    <>
      <div
        className="contextContainer"
        onContextMenu={showNav}
        onClick={hideContext}
      >
        {chosen && <h1>{`"${chosen}" is chosen`}</h1>}
        {context && (
          <div
            style={{ top: xYPosistion.y, left: xYPosistion.x }}
            className="rightClick"
          >
            <div className="menuElement" onClick={() => initMenu("Refactor")}>
              Refactor
            </div>
            <div className="menuElement" onClick={() => initMenu("Cut")}>
              Cut
            </div>
            <div className="menuElement" onClick={() => initMenu("Copy")}>
              Copy
            </div>
            <div className="menuElement" onClick={() => initMenu("Paste")}>
              Paste
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default RightContext;
