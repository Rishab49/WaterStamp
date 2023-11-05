
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";
import WaterStamp from "/waterstamp.png";
import { Download } from "./pages/Download";
import { animate, AnimationSequence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "./store/store";
function App() {


  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/edit",
      element: <Edit />,
    },
    {
      path: "/download",
      element: <Download />,
    },
  ]);

  useEffect(() => location.setLocation(window.location.pathname),[]);

  return (
    <div className="h-screen w-screen overflow-hidden edit-container">
      <div className="h-[50px] w-full flex items-center justify-between py-2 px-4">
        <img src={WaterStamp} className="h-full w-auto" />
        {
          location.pathname == "/edit" ?
            <div className="sm:hidden h-fit w-[25px] flex gap-1 flex-col" onClick={() => {
              if (isMenuOpen) {
                let sequenceTop: AnimationSequence = [
                  [".top", { rotateZ: "0deg" }, { type: "spring" }],
                  [".top", { y: "0px" }, { type: "spring" }],
                ]
                let sequenceBottom: AnimationSequence = [
                  [".bottom", { rotateZ: "0deg" }, { type: "spring" }],
                  [".bottom", { y: "0px" }, { type: "spring" }],
                ]

                let sequenceCenter: AnimationSequence = [
                  [".center", { scaleX: 1 }, { type: "spring" }]
                ]
                animate(sequenceTop, {

                  duration: 0.25
                });
                animate(sequenceCenter, {

                  duration: 0.25
                });
                animate(sequenceBottom, {

                  duration: 0.25
                });
                animate(".menu",{
                  x:"100%"
                })
                setIsMenuOpen(false);
              } else {

                let sequenceTop: AnimationSequence = [
                  [".top", { y: "6px" }, { type: "spring" }],
                  [".top", { rotateZ: "-45deg" }, { type: "spring" }],
                ]
                let sequenceBottom: AnimationSequence = [
                  [".bottom", { y: "-6px" }, { type: "spring" }],
                  [".bottom", { rotateZ: "45deg" }, { type: "spring" }],
                ]
                let sequenceCenter: AnimationSequence = [
                  [".center", { scaleX: 0 }, { type: "spring" }]
                ]
                animate(sequenceTop, {

                  duration: 0.25,

                });

                animate(sequenceCenter, {

                  duration: 0.25
                });
                animate(sequenceBottom, {

                  duration: 0.25
                });
                animate(".menu",{
                  x:"0"
                })
                setIsMenuOpen(true);
              }
            }}>
              <div className="top h-[2px] w-full bg-white rounded-md" style={{
                transformOrigin: "center center"
              }}></div>
              <div className="center h-[2px] w-full bg-white rounded-md" style={{
                transformOrigin: "center center"
              }}></div>
              <div className="bottom h-[2px] w-full bg-white rounded-md" style={{
                transformOrigin: "center center"
              }}></div>
            </div>
            : null
        }

      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
