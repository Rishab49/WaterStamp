import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore

import { useImage } from "../store/store";
import { onFileInput } from "../utility/methods";

export function Home() {
  const setImage = useImage(state => state.setImage);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  let changeEvent = (e:Event) => onFileInput(e, setImage, navigate);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.addEventListener("change", changeEvent);
    }

    return () => {
      inputElement?.current?.removeEventListener("change", changeEvent);
    };
  });

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh_-_50px)] w-[100%] gap-4">
      <h1 className="text-3xl md:text-5xl font-bold">WaterStamp</h1>
      <p className="text-center w-[80%] max-w-[40ch]">
        add watermark using text or image to your image within a minute!!
      </p>
      <label
        htmlFor="image"
        className="h-fit w-fit p-4 rounded bg-green-600 cursor-pointer text-white"
      >
        Choose an image
      </label>

      <input
        className="hidden"
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        ref={inputElement}
        id="image"
      ></input>

    </div>
  );
}
