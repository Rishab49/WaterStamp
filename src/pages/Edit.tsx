import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useImage, useLocation, useProps } from "../store/store";
import { useNavigate } from "react-router-dom";
import { loadImage } from "../utility/methods";
import TextPattern from "../component/TextPattern";


export function Edit() {
  let navigate = useNavigate();
  const props = useProps((state) => state.props);
  const image = useImage(state => state);
  const setter = useProps((state) => state);
  const patternContainerRef = useRef<HTMLImageElement | null>(null);
  const [tabState, setTabState] = useState<number>(1);
  const location = useLocation();

  useEffect(() => {

    let img = document.querySelector(".dummy");
    if (img) {

      let { height } = img.getBoundingClientRect();
      let ratio = image.image.dimension.height / height;
      image.setRatio(ratio);
    }

  }, []);

  useEffect(() => location.setLocation(window.location.pathname), []);
  return (
    <div className="flex flex-row items-stretch justify-center h-[calc(100vh_-_50px)] w-[100%] gap-4 relative">
      <TextPattern />
      <div className="h-full flex-1 flex items-center justify-center  p-8  ">
        <div className="container  overflow-hidden flex items-center justify-center relative w-full h-auto sm:w-auto sm:h-full"
  style={{
    aspectRatio:`${image.image.dimension.width} / ${image.image.dimension.height}`
  }}
        >
          <img src={image.image.src} className="w-auto h-full dummy" />

          <div className="pattern absolute top-1/2 left-1/2  flex flex-wrap gap-0 items-start justify-start" style={{
            height: props.position == "repeat" ? image.image.dimension.ratio >= 1 ? "auto" : "120%" : "100%",
            width: props.position == "repeat" ? image.image.dimension.ratio >= 1 ? "120%" : "auto" : "100%",
            aspectRatio: props.position == "repeat" ? "1/1" : "",
            transform: `translateX(-50%) translateY(-50%)  rotateZ(${props.position == "repeat" ? props.rotation : 0}deg)`,
            fontSize: `${props.size}px`,
            color: props.color,
            opacity: props.opacity
          }} ref={patternContainerRef} >
            {
              tabState == 1 ?
                props.position == "repeat" ?
                  // new Array(patternDimension.cols * patternDimension.rows).fill(0).map((e, ind) => <p className="p-1 w-fit" key={`${e + ind}`}>{
                  //   props.text
                  // }</p>)
                  <div className="h-full w-full" style={{
                    backgroundImage: `url(${image.textImage})`,
                    backgroundOrigin: "border-box",
                    backgroundSize: `${props.size * 0.7 * props.text.length}px ${props.size * 1.5}px `
                  }}></div>
                  :
                  props.position == "bottomLeft" ?
                    <p className="p-2  w-auto absolute bottom-0 left-0 text-inherit">{
                      props.text
                    }</p> :
                    props.position == "bottomRight" ?
                      <p className="p-2  w-auto  absolute bottom-0 right-0 text-inherit">{
                        props.text
                      }</p> : null
                :
                props.position == "repeat" ?
                  <div className="h-full w-full" style={{
                    backgroundImage: `url(${image.icon.src})`,
                    backgroundOrigin: "border-box",
                    backgroundSize: `${props.size * 1.5}px auto`
                  }}></div>
                  :
                  props.position == "bottomLeft" ?
                    <img src={image.icon.src} alt="logo" className="absolute w-auto bottom-0 left-0" style={{
                      height: props.size
                    }} /> :
                    props.position == "bottomRight" ?
                      <img src={image.icon.src} alt="logo" className="absolute w-auto bottom-0 right-0" style={{
                        height: props.size
                      }} /> : null

            }

          </div>
        </div>
      </div>
      <aside className="menu w-full translate-x-full sm:translate-x-0 absolute sm:relative sm:w-[300px] text-gray-400 p-4 bg-black">
        <div className="flex flex-col gap-2 w-full">
          <ul className="flex gap-2 items-center justify-start">
            <motion.li style={{
              borderBottom: tabState == 1 ? "2px solid white" : "",
              color: tabState == 1 ? "white" : ""
            }} onClick={() => setTabState(1)} className="p-4 cursor-pointer">Text</motion.li>
            <motion.li style={{
              borderBottom: tabState == 2 ? "2px solid white" : "",
              color: tabState == 2 ? "white" : ""
            }} onClick={() => setTabState(2)} className="p-4 cursor-pointer">Image</motion.li>
          </ul>
          <div className="content"></div>
        </div>
        <AnimatePresence mode="wait">
          <form className="flex flex-col items-start gap-4">
            {tabState == 1 && <motion.label className="flex flex-col items-start justify-center gap-2 w-full" key={tabState} initial={{
              x: 20,
              opacity: 0
            }}
              animate={{
                x: 0,
                opacity: 1
              }}
              exit={{
                x: -20,
                opacity: 0
              }}
              transition={{ duration: 0.2 }}>
              Text
              <input type="text"
                className="border-2 border-white rounded-md p-2 w-full bg-transparent"
                value={props.text}
                onChange={e => setter.setText(e.target.value)} />
            </motion.label>}
            {tabState == 2 &&
              <motion.label className="flex flex-col items-start justify-center gap-2" key={tabState} initial={{
                x: 20,
                opacity: 0
              }}
                animate={{
                  x: 0,
                  opacity: 1
                }}
                exit={{
                  x: 20,
                  opacity: 0
                }}
                transition={{ duration: 0.2 }}>
                Image
                <input type="file" onChange={async (e) => {
                  let result = await loadImage(e);
                  image.setIcon(result.str, result.height, result.width);
                }} />
              </motion.label>}
            <div className="flex gap-2">


              <label className="flex flex-col items-start justify-center gap-2 w-full">
                Color
                <select
                  className="w-full p-2 rounded-md text-black"
                  value={props.color}
                  onChange={(e) => setter.setColor(e.currentTarget.value)}>
                  <option value="red">red</option>
                  <option value="black">black</option>
                  <option value="gray">gray</option>
                  <option value="cyan">cyan</option>
                  <option value="khaki">khaki</option>
                </select>
              </label>
              <label className="flex flex-col items-start justify-center gap-2">
                Rotation
                <input type="number" className="border-2 border-white rounded-md p-2 w-full bg-transparent" value={props.rotation}
                  onChange={(e) => setter.setRotation(Number(e.target.value))} />
              </label>
            </div>
            <label className="flex flex-col items-start justify-center gap-2 w-full">
              Position
              <select className="w-full p-2 rounded-md text-black"
                value={props.position}
                onChange={(e) => setter.setPosition(e.currentTarget.value)}>
                <option value="repeat">repeat</option>
                <option value="bottomLeft">bottom-left</option>
                <option value="bottomRight">bottom-right</option>
              </select>
            </label>

            <label className="flex flex-col items-start justify-center gap-2 w-full">
              Opacity
              <input className="w-full" type="range" min="0" max="1" step="0.1" value={props.opacity} onInput={(e) => setter.setOpacity(Number(e.currentTarget.value))} />
            </label>
            <label className="flex flex-col items-start justify-center gap-2 w-full">
              Size
              <input type="range" className="w-full" value={props.size} min={8} max={72} onInput={(e) => setter.setSize(Number(e.currentTarget.value))} />
            </label>
            <button type="button" className="bg-blue-700 rounded-md p-4 w-full text-white" onClick={() => {
              let node = document.querySelector(".container")?.cloneNode(true) ?? null;
              let height = document.querySelector(".container")?.clientHeight ?? 0;
              let width = document.querySelector(".container")?.clientWidth ?? 0;

              node && image.setNode(node, height, width);
              navigate("/download");
            }}>download</button>
          </form>
        </AnimatePresence>
      </aside>

    </div>
  );
}
