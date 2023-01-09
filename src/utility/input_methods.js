export function onFileInput(e, setDimension, setImageSrc, navigate) {
  const reader = new FileReader();
  reader.onload = function () {
    const img = document.createElement("img");
    img.src = reader.result;
    img.onload = function () {
      setDimension({ height: img.height, width: img.width });
      setImageSrc(reader.result);
      navigate("edit");
    }
  };

  reader.readAsDataURL(e.target.files[0]);
}


export const calculateBoundingRects = (inputRef, setBoundingRect) => {
  console.log("recalculating boundaries");
  let boundingRect =
    inputRef?.current?.parentElement.parentElement.getBoundingClientRect();
  let extra_height =
    inputRef?.current?.parentElement.children[0].clientHeight;
  setBoundingRect((state) => {
    return {
      ...state,
      height: boundingRect.height - extra_height,
      width: boundingRect.width,
    };
  });
};
