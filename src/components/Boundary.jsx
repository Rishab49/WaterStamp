import { ResizeCircle } from "./ResizeCircle";
import { Rotator } from "./Rotator";

export function Boundary({
  isActive,
  coordinates,
  boundingRect,
  onResizePointerDown,
}) {
  let resizeCircleCoordinates = [
    { x: boundingRect.x, y: boundingRect.y },
    {
      x: boundingRect.x + boundingRect.width / 2,
      y: boundingRect.y,
    },
    {
      x: boundingRect.x + boundingRect.width,
      y: boundingRect.y,
    },
    {
      x: boundingRect.x,
      y: boundingRect.y + boundingRect.height / 2,
    },
    {
      x: boundingRect.x,
      y: boundingRect.y + boundingRect.height,
    },
    {
      x: boundingRect.x + boundingRect.width,
      y: boundingRect.y + boundingRect.height / 2,
    },
    {
      x: boundingRect.x + boundingRect.width / 2,
      y: boundingRect.y + boundingRect.height,
    },
    {
      x: boundingRect.x + boundingRect.width,
      y: boundingRect.y + boundingRect.height,
    },
  ];

  return (
    <>
      <Rotator
        isActive={isActive}
        coordinates={coordinates}
        boundingRect={boundingRect}
      ></Rotator>

    {
        resizeCircleCoordinates.map((coordinate,index) => {
            return  <ResizeCircle
            key={index}
            isActive={isActive}
            coordinates={{
              x: coordinate.x,
              y: coordinate.y,
            }}
            onResizePointerDown={onResizePointerDown}
          ></ResizeCircle>
        })
    }
    </>
  );
}
