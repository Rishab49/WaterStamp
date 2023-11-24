import { useEffect, useState } from "react";
import { useImage, useLocation } from "../store/store";
import { createImage } from "../utility/methods";
export function Download() {
  let [state, setState] = useState<"Downloading" | "Processing" | "Downloaded">(
    "Processing"
  );
  let ratio = useImage((state) => state.ratio);
  let node = useImage((state) => state.node);
  const location = useLocation();
  useEffect(() => location.setLocation(window.location.pathname), []);
  useEffect(() => {
    new Promise((res, rej) => {
      try {
        let canvas = document.createElement("canvas");
        let svg = document.querySelector("svg");
        let foreignObject = document.querySelector("foreignObject");
        let width = node.dimension.width;
        let height = node.dimension.height;
        if (svg && foreignObject) {
          canvas.classList.add("hidden");
          canvas.height = node.dimension.height * ratio;
          canvas.width = node.dimension.width * ratio;
          document.querySelector(".container")?.appendChild(canvas);
          svg?.setAttribute("viewBox", `0 0 ${width} ${height}`);
          svg?.setAttribute("height", String(height));
          svg?.setAttribute("width", String(width));
          foreignObject?.setAttribute("height", String(height));
          foreignObject?.setAttribute("width", String(width));
          node.elem && foreignObject?.appendChild(node.elem);
          let data = createImage(svg);
          let img = new Image();
          img.src = data;
          img.onload = function () {
            let ctx = canvas.getContext("2d");
            // console.log("ratio", ratio);
            // console.log(img.width, img.height);
            ctx?.drawImage(
              img,
              0,
              0,
              img.width,
              img.height,
              0,
              0,
              img.width * ratio,
              img.height * ratio
            );
            let dataURL = canvas.toDataURL("image/jpeg");
            setState("Downloading");
            let anchor = document.createElement("a");
            anchor.download = "snipit.jpeg";
            anchor.href = dataURL;
            // console.log(anchor);
            anchor.click();
            setState("Downloaded");
          };
          // console.log(data);
        }
        res("done");
      } catch (e) {
        console.log(e);
        rej(e);
        alert("error occured please try again")
      }
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center h-[calc(100vh_-_50px)] w-full">
      <div className="absolute h-full w-full flex items-center justify-center z-10 bg-gray-600/40">
        {state == "Processing" ? (
          <div className="p-4 rounded-md border-2 border-white bg-gray-600">
            Processing...
          </div>
        ) : state == "Downloading" ? (
          <div className="p-4 rounded-md border-2 border-white bg-gray-600">
            Downloading...
          </div>
        ) : (
          <div className="p-4 rounded-md border-2 border-white bg-gray-600">
            Downloaded
          </div>
        )}
      </div>
      <svg>
        <foreignObject x="0" y="0"></foreignObject>
      </svg>
    </div>
  );
}
