import DownloadingGIF from "../assets/gifs/download.gif";
import ThanksSticker from "../assets/sticker/thank-you.png";
import LinkedinIcon from "../assets/icons/linkedin.png";


import { useNavigate } from "react-router-dom";

export function Greeting({isDownloading,isDownloaded,setIsDownloaded,setIsDownloading}) {


    const navigate = useNavigate();
  return (
    <div
      className="items-center justify-center flex h-full w-screen absolute gap-2 p-4"
      style={{
        display: isDownloading ? "flex" : "none",
        background: "#ffffff",
      }}
    >
      <div
        className="flex flex-col gap-4 items-center justify-center"
        style={{
          display: isDownloading && !isDownloaded ? "flex" : "none",
        }}
      >
        <img src={DownloadingGIF} className="h-auto w-[50px]"></img>
        <p>Downloading</p>
      </div>
      <div
        className="flex items-center justify-center flex-col gap-5 flex-col text-center"
        style={{
          display: isDownloading && isDownloaded ? "flex" : "none",
        }}
      >
        <img src={ThanksSticker} className="h-[200px] w-auto"></img>
        <p className="text-3xl font-bold">Thanks for using WaterStamp</p>
        <button
          type="button"
          className="h-[52px] w-[200px] p-3 rounded bg-green-600 cursor-pointer text-white flex items-center justify-center"
          onClick={() => {
            setIsDownloaded(false);
            setIsDownloading(false);
          }}
        >
          Continue Editing
        </button>
        <button
          type="button"
          className="h-[52px] w-[200px] p-3 rounded bg-green-600 cursor-pointer text-white flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          Select a new Image
        </button>

        {/* <div > */}
            <a href="https://www.linkedin.com/in/rishab-raj-548521238/" target="_blank" className="h-[45px] w-fit flex gap-2 items-center justify-center pt-5">

          <p>Reach out to me on :</p>
          <img src={LinkedinIcon} className="h-full w-auto"></img>
            </a>
        {/* </div> */}
      </div>
    </div>
  );
}
