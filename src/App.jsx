import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Edit } from "./pages/Edit";
import { Home } from "./pages/Home";
import WaterStamp from "./assets/icons/WaterStamp.png";
function App() {
  const [dimension, setDimension] = useState({ height: 0, width: 0 });
  const [imageSrc, setImageSrc] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home setImageSrc={setImageSrc} setDimension={setDimension} />,
    },
    {
      path: "/edit",
      element: <Edit imageSrc={imageSrc} dimension={dimension} />,
    },
  ]);

  return (
    <div className="h-fit md:h-screen min-h-screen w-screen overflow-x-hidden">
      <div className="h-[50px] w-full flex items-center justify-flex-start p-2">
        <img src={WaterStamp} className="h-full w-auto"/>
      </div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
