export const ResizeCircle = function ResizeCircle({
  isActive,
  coordinates,
  onResizePointerDown,
}) {
  let elem =  <div
      draggable="false"
      className="h-2 w-2 rounded bg-white absolute border-black border-[1px] active:bg-red"
      style={{
        transform: ` translate(${coordinates.x}px,${coordinates.y}px`,
        transformOrigin: "center",
        display: isActive ? "block" : "none",
        cursor: "resize",
      }}
      onPointerDown={onResizePointerDown}
    ></div>

  return elem;
};
