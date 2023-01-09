import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Text } from "../components/Text";
import { exportImage } from "../utility/canvas_methods";
import { Image } from "../components/Image";
import { onFileInput } from "../utility/image_methods";
import { EditOptions } from "../components/EditOptions";
import { ActionContainer } from "../components/ActionContainer";
import { Greeting } from "../components/Greeting";
export function Edit({ imageSrc, dimension }) {
  let aspectRatio = `${dimension.width}/${dimension.height}`;
  const [elements, setElements] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [shouldReload, setShouldReload] = useState(true);
  const elementRefs = useRef([]);
  const [currentElementRef, setCurrentElementRef] = useState(null);
  const imageElement = useRef(null);
  let [scale, setScale] = useState(1);
  let sizeOption = [{ value: 16 }, { value: 24 }, { value: 32 }, { value: 48 }];
  let familyOption = [
    { value: "Arial" },
    { value: "Satoshi" },
    { value: "General Sans" },
    { value: "Chillax" },
    { value: "Clash Grotesk" },
    { value: "Times New Roman" },
  ];
  const [currentElement, setCurrentElement] = useState(null);
  const exportImg = () => {
    exportImage(
      elementRefs,
      imageElement.current,
      scale,
      setIsDownloading,
      setIsDownloaded
    );
  };
  const addText = () => {
    setElements((state) => [
      ...state,
      { text: "Enter the text here", type: "text" },
    ]);
  };

  const addImage = (e) => {
    onFileInput(e, setElements);
    e.target.value = null;
  };

  const assignCurrentElementRef = () => {
    //
    let currentElementRef = elementRefs.current.find(
      (ref) =>
        ref.elem.current === currentElement?.querySelector(".text-container")
    );
    console.log("assigned", currentElementRef);
    setCurrentElementRef(currentElementRef);
  };

  useEffect(() => {
    assignCurrentElementRef(); //
    setShouldReload(false);
    console.log(elementRefs);
  }, [shouldReload, currentElement]);

  useEffect(() => {
    let currentHeight = imageElement.current.clientHeight;
    setScale(dimension.height / currentHeight);
  });

  return (
    <div className="flex flex-col lg:flex-row items-stretch h-[calc(100vh_+_200px)] md:h-[calc(100vh_-_50px)] w-[100%] relative">
      <div className="relative flex-[3] flex flex-col items-stretch justify-stretch">
        <EditOptions
          currentElementRef={currentElementRef}
          familyOption={familyOption}
          sizeOption={sizeOption}
          setShouldReload={setShouldReload}
        ></EditOptions>
        <div className="flex items-center justify-center max-h-screen h-[calc(100vh_-_110px)] p-4 flex-1">
          <img
            src={imageSrc}
            className={`h-[75%] w-auto max-h-[75%]`}
            style={{ aspectRatio: aspectRatio }}
            ref={imageElement}
            imgheight={dimension.height}
            imgwidth={dimension.width}
          ></img>

          {elements.map((element, index) => {
            if (element.type === "text") {
              return (
                <Text
                  key={index}
                  text={element.text}
                  ref={(el) => (elementRefs.current[index] = el)}
                  setCurrentElement={setCurrentElement}
                  currentElement={currentElement}
                ></Text>
              );
            } else {
              return (
                <Image
                  key={index}
                  ref={(el) => (elementRefs.current[index] = el)}
                  src={element.src}
                  currentElement={currentElement}
                  setCurrentElement={setCurrentElement}
                  imgHeight={element.height}
                  imgWidth={element.width}
                ></Image>
              );
            }
          })}
        </div>
      </div>
      <ActionContainer
        addImage={addImage}
        addText={addText}
        exportImg={exportImg}
      ></ActionContainer>
      <Greeting
        isDownloaded={isDownloaded}
        isDownloading={isDownloading}
        setIsDownloaded={setIsDownloaded}
        setIsDownloading={setIsDownloading}
      ></Greeting>
    </div>
  );
}
