import { useState } from "react";
import AddImageIcon from "../assets/icons/add-image.png";
import AddTextIcon from "../assets/icons/add-text.png";
import DownloadIcon from "../assets/icons/download.png";
import PlusIcon from "../assets/icons/plus.png";

export function ActionContainer({ addImage, addText, exportImg }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="absolute top-[95%] left-[98%] translate-x-[-100%] translate-y-[-100%]">
      <button
        type="button"
        onClick={() => setIsActive((state) => !state)}
        className="icon-button"
        style={{
          transform: isActive ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        <img src={PlusIcon} className="h-full w-auto"></img>
      </button>
      <div className="h-fit w-[52px] flex items-center justify-center flex-col flex-wrap gap-4 absolute top-[-200px] transition-all duration-500">
        <label
          htmlFor="file"
          className="icon-button"
          style={{
            opacity: isActive ? "1" : "0",
            transform: isActive ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          <img src={AddImageIcon} className="h-full w-auto"></img>
          {/* <p>Add Image</p> */}
        </label>
        <input
          type="file"
          className="hidden"
          id="file"
          onChange={addImage}
          accept="image/jpeg,image/jpg,image/png"
        />
        <button
          type="button"
          onClick={addText}
          className="icon-button"
          style={{
            opacity: isActive ? "1" : "0",
            transform: isActive ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          <img src={AddTextIcon} className="h-full w-auto"></img>
          {/* <p>Add Text</p> */}
        </button>
        <button
          className="icon-button"
          type="button"
          style={{
            opacity: isActive ? "1" : "0",
            transform: isActive ? "translateY(0px)" : "translateY(10px)",
          }}
          onClick={exportImg}
        >
          <img src={DownloadIcon} className="h-full w-auto"></img>
          {/* <p>Download</p> */}
        </button>
      </div>
    </div>
  );
}
