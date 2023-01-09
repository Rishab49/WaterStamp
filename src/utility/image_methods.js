export function onProportionateDrag(e, element, setScale) {
    if (e.clientX !== 0 && e.clientY !== 0) {
        let centerx = Number(element.parentElement.parentElement.getAttribute("centerx"));
        let centery = Number(element.parentElement.parentElement.getAttribute("centery"));
        let height = Number(element.getAttribute("height"));
        let width = Number(element.getAttribute("width"));
        let currentDistance = Math.sqrt((width / 2) * (width / 2) + (height / 2) * (height / 2));
        let x = e.clientX - centerx;
        let y = e.clientY - centery;
        let eventDistance = Math.sqrt(x * x + y * y);
        let scale = eventDistance / currentDistance;
        setScale(scale);
    }

}

export function onProportionateDragEnd(element, setScale, setHeight, setWidth, setCoordinates) {
    let centerx = Number(element.getAttribute("centerx"));
    let centery = Number(element.getAttribute("centery"));
    let scale = Number(element.getAttribute("scale"));
    let height = Number(element.getAttribute("height")) * scale;
    let width = Number(element.getAttribute("width")) * scale;
    setWidth(width);
    setHeight(height);
    setCoordinates({ x: centerx - width / 2, y: centery - height / 2 });
    setScale(1);


}


export function onUniDrag() { }



export function onFileInput(e, setElements) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = document.createElement("img");
        img.src = reader.result;
        img.onload = function () {
            console.log("second step");
            setElements((state) => [...state, { src: reader.result, height: img.height, width: img.width, type: "image" }]);
        }
    };

    reader.readAsDataURL(e.target.files[0]);
}