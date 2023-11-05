import { NavigateFunction } from "react-router-dom";

export async function loadImage(e: React.ChangeEvent<HTMLInputElement>): Promise<{
    str: string,
    height: number,
    width: number
}> {

    return new Promise((res) => {

        let file = e.target.files ? e.target.files[0] : null;
        let reader = new FileReader();
        let img = new Image();
        if (file) {
            reader.readAsDataURL(file);
            reader.onload = function () {
                img.src = reader.result as string;
                img.onload = function () {
                    res({
                        str: reader.result as string,
                        height: img.height,
                        width: img.width
                    }
                    );
                }
            }
        }
        reader.onerror = function () {
            throw new Error("Cannot read file");
        }
    })

}


export function createStyleElementFromCSS() {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");

    let styleRules = [];
    for (let i = 0; i < document.styleSheets[2].cssRules.length; i++) {
        // @ts-ignore
        styleRules.push(document.styleSheets[2].cssRules.item(i).cssText);
    }
    style.appendChild(document.createTextNode(styleRules.join(" ")));
    console.log(style);
    return style;
};


export function createImage(svg: SVGSVGElement): string {
    let style = createStyleElementFromCSS();
    svg?.insertBefore(style, svg.firstChild);
    let xml = new XMLSerializer().serializeToString(svg);
    let svg64 = btoa(xml);
    let b64start = "data:image/svg+xml;base64,";
    let img64 = b64start + svg64;
    return img64;

}


export function onFileInput(e: Event, setImage: (str: string, height: number, width: number) => void, navigate: NavigateFunction) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = function () {
            setImage(reader.result as string, img.height, img.width);
            navigate("edit");
        }
    };

    //@ts-ignore
    e.currentTarget && reader.readAsDataURL(e.currentTarget.files[0]);
}
