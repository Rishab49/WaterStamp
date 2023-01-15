import BoldIcon from "../assets/icons/bold.png";
import ItalicsIcon from "../assets/icons/italics.png";
import UnderlineIcon from "../assets/icons/underline.png";
import ItalicsOutlinedIcon from "../assets/icons/italics_outlined.png";
import BoldOutlinedIcon from "../assets/icons/bold_outlined.png";
import UnderlineOutlinedIcon from "../assets/icons/underline_outlined.png";
import { IconButton } from "../components/IconButton";
export function EditOptions({
  currentElementRef,
  setShouldReload,
  familyOption,
  sizeOption,
}) {
  function onBoldClicked(e) {
    e.stopPropagation();
    currentElementRef?.setIsBold((state) => !state);
    setShouldReload(true);
  }
  function onItalicClicked(e) {
    e.stopPropagation();
    currentElementRef?.setIsItalic((state) => !state);
    setShouldReload(true);
  }
  function onUnderlineClicked(e) {
    e.stopPropagation();
    currentElementRef?.setIsUnderlined((state) => !state);
    setShouldReload(true);
  }

  function onColorChange(e) {
    currentElementRef?.setFontColor(e.target.value);
    setShouldReload(true);
  }

  function onOpacityChange(e) {
    currentElementRef?.setFontOpacity(e.target.value);
    setShouldReload(true);
  }

  function onFontFamilyChange(e) {
    currentElementRef?.setfontFamily(e.target.value);
    setShouldReload(true);
  }
  function onFontSizeChange(e) {
    currentElementRef?.setFontSize(e.target.value);
    setShouldReload(true);
  }

  return (
    <div
      className="h-[60px] md:w-fit w-[90%] flex flex-row bg-white rounded gap-2 p-2 overflow-x-auto absolute top-[50px] left-[50%] translate-x-[-50%] translate-y-0  shadow-md"
      style={{
        display: currentElementRef !== undefined ? "flex" : "none",
      }}
    >
      <IconButton
        disabled={currentElementRef?.type === "image"}
        src={BoldIcon}
        outlinedSrc={BoldOutlinedIcon}
        onClick={onBoldClicked}
        isClicked={
          currentElementRef?.getBold ? currentElementRef?.getBold : false
        }
      ></IconButton>
      <IconButton
        disabled={currentElementRef?.type === "image"}
        src={ItalicsIcon}
        outlinedSrc={ItalicsOutlinedIcon}
        onClick={onItalicClicked}
        isClicked={
          currentElementRef?.getItalic ? currentElementRef?.getItalic : false
        }
      ></IconButton>
      <IconButton
        disabled={currentElementRef?.type === "image"}
        src={UnderlineIcon}
        outlinedSrc={UnderlineOutlinedIcon}
        onClick={onUnderlineClicked}
        isClicked={
          currentElementRef?.getUnderline
            ? currentElementRef?.getUnderline
            : false
        }
      ></IconButton>
      <select
        disabled={currentElementRef?.type === "image"}
        name="font-family"
        className="border-black border-2 rounded p-2 flex-1"
        value={currentElementRef?.getFontFamily}
        onChange={onFontFamilyChange}
        onClick={(e) => e.stopPropagation()}
      >
        {familyOption.map((family, index) => {
          return (
            <option
              value={family.value}
              style={{ fontFamily: family.value }}
              key={index}
            >
              {family.value}
            </option>
          );
        })}
      </select>
      <select
        disabled={currentElementRef?.type === "image"}
        name="font-size"
        className="border-black border-2 rounded p-2 flex-1"
        value={currentElementRef?.getFontSize}
        onChange={onFontSizeChange}
        onClick={(e) => e.stopPropagation()}
      >
        {sizeOption.map((size, index) => {
          return (
            <option value={size.value} key={index}>
              {size.value + "px"}
            </option>
          );
        })}
      </select>
      <input
        disabled={currentElementRef?.type === "image"}
        type="color"
        className="border-black border-2 rounded h-full w-auto aspect-square"
        onChange={onColorChange}
        onClick={(e) => e.stopPropagation()}
        value={
          currentElementRef?.getFontColor
            ? currentElementRef?.getFontColor
            : "#ffffff"
        }
      ></input>
      <input
        type="number"
        className="h-full w-auto aspect-video p-2 border-black border-2 rounded"
        max="1"
        min="0"
        step="0.1"
        onClick={(e) => e.stopPropagation()}
        onChange={onOpacityChange}
        value={currentElementRef?.getFontOpacity}
      ></input>
    </div>
  );
}
