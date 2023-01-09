export function onClick(e, setIsMouseDownTrue, setCurrentElement, element) {
    e.stopPropagation(),
        setIsMouseDownTrue(),
        setCurrentElement(element);
}


export function onWindowClick(setIsActiveFalse, setIsMouseDownFalse, setCurrentElement) {

    setIsActiveFalse();
    setIsMouseDownFalse();
    setCurrentElement(null);

}



export function onPointerLeave(isMouseDown,setIsActiveFalse){

    !isMouseDown ? setIsActiveFalse() : null;
}   
