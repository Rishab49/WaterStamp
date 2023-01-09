import { useState } from "react";

export function IconButton({ src, outlinedSrc, onClick, isClicked, disabled }) {
  return (
    <button
      disabled={disabled}
      type="button"
      className="flex items-center justify-center p-4 rounded h-full w-auto aspect-square"
      style={{
        backgroundColor: isClicked
          ? "rgb(22 163 74)"
          : "white",
      }}
      onClick={onClick}
    >
      <img src={isClicked ? src : outlinedSrc} className="h-full w-auto"></img>
    </button>
  );
}
