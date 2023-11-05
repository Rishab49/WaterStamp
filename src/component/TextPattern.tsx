import { useEffect, useRef } from "react";
import { useImage, useProps } from "../store/store"

export default function TextPattern() {

    let props = useProps();
    let image = useImage();
    let ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        let length = props.props.text.length
        let width =Math.ceil( props.props.size * 0.7 * length);
        let height = Math.ceil(props.props.size * 1.5);
        if (ref.current) {

            ref.current.height = height * 2;
            ref.current.width = width * 2;
            let ctx = ref.current.getContext("2d");

            ctx && (ctx.fillStyle =props.props.color);
            ctx && (ctx.font = `${props.props.size * 2}px General Sans`);
            ctx && (ctx.fillText(props.props.text, 0, props.props.size * 2));
            let dataURI = ref.current.toDataURL();
            image.setTextImage(dataURI);
        }

    }, [props.props.text,props.props.color]);

    return <canvas ref={ref} className="absolute hidden"></canvas>
}