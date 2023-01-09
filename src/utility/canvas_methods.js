export function exportImage(elementRefs, imgElement, scale,setIsDownloading,setIsDownloaded) {
  setIsDownloading(true);
  let height = getAttribute(imgElement, "imgheight");
  let width = getAttribute(imgElement, "imgwidth");

  let offsetLeft = imgElement.offsetLeft;
  let offsetTop = imgElement.offsetTop;

  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = width;

  ctx.drawImage(imgElement, 0, 0, width, height);
  ctx.scale(scale, scale);

  elementRefs.current.forEach((reference) => {
    reference.type === "text"
      ? drawText(ctx, reference, offsetLeft, offsetTop)
      : drawImage(ctx, reference, offsetLeft, offsetTop);
  });

  let data = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = data;
  a.download = "image";
  a.click();

  setTimeout(() => {
    setIsDownloaded(true);
  },2000);
}

function getAttribute(elem, attr) {
  return Number(elem.getAttribute(attr));
}

function getStyle(elem, property) {
  return window.getComputedStyle(elem).getPropertyValue(property);
}

function drawText(ctx, reference, offsetLeft, offsetTop) {
  let {
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
  } = extractTextProperties(reference);

  let ref = reference.elem;
  let x = transformX - offsetLeft + elemBoundingRect.width / 2;
  let y = transformY - offsetTop + elemBoundingRect.height / 2;
  let textX = transformX - offsetLeft + 16;
  let textY = transformY - offsetTop + elemBoundingRect.height - 18;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x, -y);
  ctx.fillStyle = color;
  ctx.globalAlpha = opacity;
  let str = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
  if (underline.includes("underline")) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = fontSize.match(/\d+/)[0] * 0.1;
    ctx.lineTo(textX, textY + 5);
    ctx.lineTo(
      textX + ref.current.getBoundingClientRect().width - 32,
      textY + 5
    );
    ctx.stroke();
    ctx.closePath();
  }
  ctx.font = str;
  ctx.fillText(text, textX, textY);
  ctx.restore();
  ctx.globalAlpha = 1;
}

function drawImage(ctx, reference, offsetLeft, offsetTop) {
  let {
    transformX,
    transformY,
    angle,
    height,
    width,
    opacity,
    elemBoundingRect,
  } = extractImageProperties(reference);
  let ref = reference.elem;
  let x = transformX - offsetLeft + elemBoundingRect.width / 2;
  let y = transformY - offsetTop + elemBoundingRect.height / 2;
  let imgX = transformX - offsetLeft;
  let imgY = transformY - offsetTop + 35;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x, -y);
  ctx.globalAlpha = opacity;
  ctx.drawImage(ref.current, imgX, imgY, width, height);
  ctx.restore();
  ctx.globalAlpha = 1;
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
  return {
    transformX,
    transformY,
    angle,
    height,
    width,
    opacity,
    elemBoundingRect,
  };
}
