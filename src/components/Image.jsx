import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { calculateBoundingRects } from "../utility/input_methods";
import {
  onProportionateDrag,
  onProportionateDragEnd,
} from "../utility/image_methods";
import { Boundary } from "./Boundary";
import { onClick, onPointerLeave, onWindowClick } from "../utility/common";

export const Image = forwardRef(function Image(
  { src, setCurrentElement, currentElement, imgHeight, imgWidth },
  ref
) {
  const imageRef = useRef(null);

  const [boundingRect, setBoundingRect] = useState({
    x: -4,
    y: -4,
    height: 0,
    width: 0,
  });
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200 * (imgWidth / imgHeight));
  const [scale, setScale] = useState(1);
  const [fontOpacity, setFontOpacity] = useState(1);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  let aspectRatio = `${imgWidth}/${imgHeight}`;
  let evCache = [];
  let current;
  let currentParent1;
  let currentParent2;
  let currentParent3;

  const setIsActiveTrue = () => setIsActive(true);
  const setIsMouseDownTrue = () => setIsMouseDown(true);
  const setIsMouseDownFalse = () => setIsMouseDown(false);
  const setIsActiveFalse = () => setIsActive(false);

  const onResizePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    e.target.addEventListener("pointermove", onResizePointerMove);
    e.target.addEventListener("pointerup", onResizePointerUp);
  };

  let onResizePointerMove = (e) => {
    onProportionateDrag(e, imageRef.current, setScale);
  };

  let onResizePointerUp = (e) => {
    onProportionateDragEnd(
      imageRef.current?.parentElement?.parentElement,
      setScale,
      setHeight,
      setWidth,
      setCoordinates
    );

    e.target.removeEventListener("pointermove", onResizePointerMove);
    e.target.removeEventListener("pointerup", onResizePointerUp);
  };

  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    evCache.push(e);
    current.addEventListener("pointermove", onPointerMove);
    current.addEventListener("pointerup", onPointerUp);
  };

  const onPointerUp = () => {
    onProportionateDragEnd(
      currentParent2,
      setScale,
      setHeight,
      setWidth,
      setCoordinates
    );
    current.removeEventListener("pointermove", onPointerMove);
    current.removeEventListener("pointerup", onPointerUp);
    evCache = [];
  };
  const onPointerMove = (e) => {
    const index = evCache.findIndex(
      (cachedEv) => cachedEv.pointerId === e.pointerId
    );
    evCache[index] = e;

    if (evCache.length === 1) {
      if (e.clientX !== 0 && e.clientY !== 0) {
        let x = e.clientX - current.clientWidth / 2;
        let y = e.clientY - 35 - current.clientHeight / 2;
        setCoordinates({ x: x, y: y });
      }
    }

    if (evCache.length === 2) {
      const curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
      setScale(curDiff / width);
    }
  };

  const onClickBounded = (e) =>
    onClick(e, setIsMouseDownTrue, setCurrentElement, currentParent2);

  const onPointerLeaveBounded = () =>
    onPointerLeave(isMouseDown, setIsActiveFalse);

  const onWindowClickBounded = () =>
    onWindowClick(setIsActiveFalse, setIsMouseDownFalse, setCurrentElement);

  let calculateBoundingRectsBounded = () =>
    calculateBoundingRects(imageRef, setBoundingRect);

  useImperativeHandle(ref, () => {
    return {
      type: "image",
      elem: imageRef,
      setFontOpacity: setFontOpacity,
      getFontOpacity: fontOpacity,
    };
  });
  useEffect(() => {
    current = imageRef.current;
    currentParent1 = current?.parentElement;
    currentParent2 = currentParent1?.parentElement;
    currentParent3 = currentParent2?.parentElement;

    setIsActive(currentParent2 === currentElement);
    setIsMouseDown(currentParent2 === currentElement);
    if (boundingRect.width === 0) {
      console.log(current === currentElement);
      let x = currentParent3.clientWidth / 2;
      let y = currentParent3.clientHeight / 2;
      setCoordinates({ x: x, y: y });
    }
    calculateBoundingRectsBounded();
    currentParent2.addEventListener("pointerenter", setIsActiveTrue);
    currentParent2.addEventListener("pointerleave", onPointerLeaveBounded);
    current.addEventListener("click", onClickBounded);
    current.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("click", onWindowClickBounded);
    return () => {
      currentParent2.removeEventListener("pointerenter", setIsActiveTrue);
      currentParent2.removeEventListener("pointerleave", onPointerLeaveBounded);
      current?.removeEventListener("click", onClickBounded);
      current?.removeEventListener("pointerdown", onPointerDown);
      window?.removeEventListener("click", onWindowClickBounded);
    };
  }, [fontOpacity, isMouseDown, height]);

  return (
    <div
      className="h-fit w-fit absolute touch-none"
      angle="0"
      transformy={coordinates.y}
      transformx={coordinates.x}
      centerx={coordinates.x + boundingRect.width / 2}
      centery={coordinates.y + boundingRect.height / 2}
      style={{
        opacity: Number(fontOpacity),
        top: "0",
        left: "0",
        transform: `translate(${coordinates.x}px,${coordinates.y}px)`,
      }}
      height={height}
      width={width}
      scale={scale}
    >
      <div
        className="h-fit w-fit relative"
        style={{
          top: "0",
          left: "0",
          transform: `rotateZ(0deg)`,
        }}
      >
        <Boundary
          boundingRect={boundingRect}
          coordinates={coordinates}
          isActive={isActive}
          onResizePointerDown={onResizePointerDown}
        />
        <img
          src={src}
          ref={imageRef}
          draggable="false"
          className="text-container relative cursor-move touch-none -z-10"
          height={height}
          width={width}
          style={{
            height: height + "px",
            width: width + "px",
            aspectRatio: aspectRatio,
            transform: ` scale(${scale})`,
          }}
        />
      </div>
    </div>
  );
});
