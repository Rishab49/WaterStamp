import { useRef } from "react";
import { ResizeCircle } from "./ResizeCircle";

export function Rotator({ coordinates, boundingRect, isActive}) {
  const rotationElement = useRef();

  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    e.target.addEventListener("pointermove", onPointerMove);
    e.target.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e) => {
    if (e.clientX !== 0 && e.clientY !== 0) {
      let angle = Math.atan2(
        e.clientY - (coordinates.y + boundingRect.height / 2),
        e.clientX - (coordinates.x + boundingRect.width / 2)
      );
      angle = (angle * 180) / Math.PI;
      rotationElement.current.parentElement.style.transform = `rotateZ(${angle}deg)`;
      rotationElement.current.parentElement.parentElement.setAttribute(
        "angle",
        angle
      );
    }
  };

  const onPointerUp = (e) => {
    e.target.removeEventListener("pointermove", onPointerMove);
    e.target.removeEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      className="h-[35px] w-full flex items-start flex-row justify-center relative touch-none"
      onPointerDown={onPointerDown}
      ref={rotationElement}
    >
      <ResizeCircle
        coordinates={{ x: 0, y: 0 }}
        isActive={isActive}
      ></ResizeCircle>
      <div
        className="w-[0px] h-full border-dashed border-black border-r-2"
        style={{
          display: isActive ? "block" : "none",
        }}
      ></div>
    </div>
  );
}
