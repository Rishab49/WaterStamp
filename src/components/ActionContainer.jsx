import AddImageIcon from "../assets/icons/add-image.png";
import AddTextIcon from "../assets/icons/add-text.png";
import DownloadIcon from "../assets/icons/download.png";

export function ActionContainer({ addImage, addText, exportImg }) {
  return (
    <div className="flex-1  max-h-[160px] md:max-h-screen flex items-center justify-center flex-row md:flex-col flex-wrap gap-4">
      <label
        htmlFor="file"
        className="h-[52px] w-[140px] p-3 rounded bg-green-600 cursor-pointer text-white flex items-center justify-start gap-2"
      >
        <img src={AddImageIcon} className="h-full w-auto"></img>
        <p>Add Image</p>
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
        className="h-[52px] w-[140px] p-3 rounded bg-green-600 cursor-pointer text-white flex items-center justify-start gap-2"
      >
        <img src={AddTextIcon} className="h-full w-auto"></img>
        <p>Add Text</p>
      </button>
      <button
        className="h-[52px] w-[140px] p-3 rounded bg-green-600 cursor-pointer text-white flex items-center justify-start gap-2"
        type="button"
        onClick={exportImg}
      >
        <img src={DownloadIcon} className="h-full w-auto"></img>
        <p>Download</p>
      </button>
    </div>
  );
}
