import axios from "axios";

export function exportImage(
  elementRefs,
  imgElement,
  scale,
  setIsProcessing,
  setIsDownloaded
) {
  console.log(elementRefs);
  let imageObj = {
    img: imgElement.src,
    offsetLeft:imgElement.offsetLeft,
    offsetTop:imgElement.offsetTop,
    scale: scale,
    elements: elementRefs.current.map((el) => {
      return {
        type: el.type,
        element:
          el.type === "text"
            ? extractTextProperties(el)
            : extractImageProperties(el),
      };
    }),
  };
  console.log(imageObj);
  setIsProcessing(true);

let data = JSON.stringify({params:imageObj});

  fetch("http://localhost:3000/image",{
    method:"POST",
    body:data,
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => {
    res.json().then(data => {
      setIsDownloaded(true);
      let a = document.createElement("a");
      a.href= data.data;
      a.download = "image.png";
      a.click();
    })
})
;

}

function getAttribute(elem, attr) {
  return Number(elem.getAttribute(attr));
}

function getStyle(elem, property) {
  return window.getComputedStyle(elem).getPropertyValue(property);
}

function extractTextProperties(reference) {
  let element = reference.elem.current;
  let containerElement = element.parentElement.parentElement;
  let transformX = getAttribute(containerElement, "transformx");
  let transformY = getAttribute(containerElement, "transformy");
  let angle = getAttribute(containerElement, "angle");
  let color = getStyle(containerElement, "color");
  let opacity = getStyle(containerElement, "opacity");
  let fontSize = getStyle(containerElement, "font-size");
  let fontStyle = getStyle(containerElement, "font-style");
  let fontWeight = getStyle(containerElement, "font-weight");
  let fontFamily = getStyle(containerElement, "font-family");
  let underline = getStyle(containerElement, "text-decoration");
  let text = element.innerText;
  let elemBoundingRect = containerElement.getBoundingClientRect();
  return {
    transformX,
    transformY,
    angle,
    color,
    opacity,
    fontSize,
    fontStyle,
    fontWeight,
    fontFamily,
    underline,
    text,
    elemBoundingRect,
  };
}

function extractImageProperties(reference) {
  let element = reference.elem.current;
  let containerElement = element.parentElement.parentElement;
  let transformX = getAttribute(containerElement, "transformx");
  let transformY = getAttribute(containerElement, "transformy");
  let angle = getAttribute(containerElement, "angle");
  let height = getAttribute(containerElement, "height");
  let width = getAttribute(containerElement, "width");
  let opacity = getStyle(containerElement, "opacity");
  let elemBoundingRect = containerElement.getBoundingClientRect();
  let img = element.src;
  return {
    transformX,
    transformY,
    angle,
    height,
    width,
    opacity,
    elemBoundingRect,
    img
  };
}
