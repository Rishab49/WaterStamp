import {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { onClick, onPointerLeave, onWindowClick } from "../utility/common";
import { calculateBoundingRects } from "../utility/input_methods";
import { Boundary } from "./Boundary";

export const Text = forwardRef(function Text(
  { text, setCurrentElement, currentElement },
  ref
) {
  const inputRef = useRef(null);
  const [boundingRect, setBoundingRect] = useState({
    x: -4,
    y: -4,
    height: 0,
    width: 0,
  });
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setfontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [fontOpacity, setFontOpacity] = useState("1");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const setIsActiveTrue = () => setIsActive(true);
  const setIsMouseDownTrue = () => setIsMouseDown(true);
  const setIsMouseDownFalse = () => setIsMouseDown(false);
  const setIsActiveFalse = () => setIsActive(false);

  let current;
  let currentParent1;
  let currentParent2;
  let currentParent3;

  const onClickBounded = (e) =>
    onClick(e, setIsMouseDownTrue, setCurrentElement, currentParent2);

  const onPointerLeaveBounded = () =>
    onPointerLeave(isMouseDown, setIsActiveFalse);

  const onWindowClickBounded = () =>
    onWindowClick(setIsActiveFalse, setIsMouseDownFalse, setCurrentElement);

  const onPointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    current.addEventListener("pointermove", onPointerMove);
    current.addEventListener("pointerup", onPointerUp);
  };

  const onPointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    current.removeEventListener("pointermove", onPointerMove);
    current.removeEventListener("pointerup", onPointerUp);
  };
  const onPointerMove = (e) => {
    if (e.clientX !== 0 && e.clientY !== 0) {
      let x = e.clientX - current.clientWidth / 2;
      let y = e.clientY - 35 + window.scrollY - current.clientHeight / 2;
      setCoordinates({ x: x, y: y });
    }
  };

  let calculateBoundingRectsBounded = () =>
    calculateBoundingRects(inputRef, setBoundingRect);

  useImperativeHandle(ref, () => {
    return {
      type: "text",
      elem: inputRef,
      setfontFamily: setfontFamily,
      setFontSize: setFontSize,
      setFontColor: setFontColor,
      setFontOpacity: setFontOpacity,
      setIsBold: setIsBold,
      setIsItalic: setIsItalic,
      setIsUnderlined: setIsUnderlined,
      getBold: isBold,
      getItalic: isItalic,
      getUnderline: isUnderlined,
      getFontSize: fontSize,
      getFontFamily: fontFamily,
      getFontColor: fontColor,
      getFontOpacity: fontOpacity,
    };
  });
  useEffect(() => {
    current = inputRef.current;
    currentParent1 = current?.parentElement;
    currentParent2 = currentParent1?.parentElement;
    currentParent3 = currentParent2?.parentElement;

    setIsActive(currentParent2 === currentElement);
    setIsMouseDown(currentParent2 === currentElement);
    if (boundingRect.width === 0) {
      let x = currentParent3.clientWidth / 2;
      let y = currentParent3.clientHeight / 2;
      setCoordinates({ x: x, y: y });
    }
    calculateBoundingRectsBounded();
    currentParent1.addEventListener("pointerenter", setIsActiveTrue);
    currentParent1.addEventListener("pointerleave", onPointerLeaveBounded);
    current.addEventListener("click", onClickBounded);
    current.addEventListener("dblclick", setIsMouseDownTrue);
    current.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("click", onWindowClickBounded);
    return () => {
      currentParent1.removeEventListener("pointerenter", setIsActiveTrue);
      currentParent1.removeEventListener("pointerleave", onPointerLeaveBounded);
      current?.removeEventListener("click", onClickBounded);
      current?.removeEventListener("dblclick", setIsMouseDownTrue);
      current?.removeEventListener("pointerdown", onPointerDown);
      window?.removeEventListener("click", onWindowClickBounded);
    };
  }, [
    isBold,
    isItalic,
    isUnderlined,
    fontFamily,
    fontSize,
    fontColor,
    fontOpacity,
    isMouseDown,
  ]);

  return (
    <div
      className="h-fit w-fit absolute"
      angle="0"
      transformy={coordinates.y}
      transformx={coordinates.x}
      style={{
        lineHeight: fontSize + "px",
        fontSize: fontSize + "px",
        color: fontColor,
        opacity: Number(fontOpacity),
        fontFamily: fontFamily,
        fontWeight: isBold ? "bold" : "normal",
        textDecoration: isUnderlined ? "underline" : "",
        fontStyle: isItalic ? "italic" : "",
        top: "0",
        left: "0",
        transform: `translate(${coordinates.x}px,${coordinates.y}px)`,
      }}
    >
      <div
        className="h-fit w-fit relative"
        style={{
          fontFamily: "inherit",
          top: "0",
          left: "0",
          transform: `rotateZ(0deg)`,
        }}
      >
        <Boundary
          boundingRect={boundingRect}
          coordinates={coordinates}
          isActive={isActive}
          onResizePointerDown={null}
        />
        <div
          ref={inputRef}
          draggable="true"
          className="text-container h-fit w-max p-4 flex outline-black outline-dashed items-center justify-center inputElement touch-none"
          contentEditable={isMouseDown}
          onKeyUp={calculateBoundingRectsBounded}
          suppressContentEditableWarning={true}
          style={{
            cursor: isMouseDown ? "text" : "move",
            outlineWidth: isActive ? "2px" : "0px",
            fontFamily: "inherit",
          }}
        >
          <p style={{ fontFamily: "inherit" }}>{text}</p>
        </div>
      </div>
    </div>
  );
});
