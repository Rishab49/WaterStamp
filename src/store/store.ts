import { create } from "zustand";


interface Props {
    props: {
        text: string,
        color: string,
        position: string,
        rotation: number,
        opacity: number,
        size: number
    },
    setText: (val: string) => void,
    setColor: (val: string) => void,
    setPosition: (val: string) => void,
    setRotation: (val: number) => void,
    setOpacity: (val: number) => void,
    setSize: (val: number) => void,
}


interface Images {
    textImage: string,
    image: {
        src: string,
        dimension: {
            height: number,
            width: number,
            ratio: number
        }
    },
    icon: {
        src: string,
        dimension: {
            height: number,
            width: number,
            ratio: number
        }
    },
    node: {
        elem: Node | null,
        dimension: {
            height: number,
            width: number
        }
    },
    ratio: number,
    setTextImage: (s: string) => void,
    setRatio: (r: number) => void,
    setImage: (str: string, height: number, width: number) => void,
    setIcon: (str: string, height: number, width: number) => void,
    setNode: (n: Node, height: number, width: number) => void
}

const useProps = create<Props>((set) => ({
    props: {
        text: "WaterStamp",
        color: "black",
        position: "repeat",
        rotation: 45,
        opacity: 1,
        size: 16
    },
    setText: (val: string) => set((state: Props) => ({ props: { ...state.props, text: val } })),
    setColor: (val: string) => set((state: Props) => ({ props: { ...state.props, color: val } })),
    setPosition: (val: string) => set((state: Props) => ({ props: { ...state.props, position: val } })),
    setRotation: (val: number) => set((state: Props) => ({ props: { ...state.props, rotation: val } })),
    setOpacity: (val: number) => set((state: Props) => ({ props: { ...state.props, opacity: val } })),
    setSize: (val: number) => set((state: Props) => ({ props: { ...state.props, size: val } })),
}));

const useImage = create<Images>((set) => ({
    textImage: "",
    image: {
        src: "",
        dimension: {
            height: 0,
            width: 0,
            ratio: 1
        }
    },
    icon: {
        src: "",
        dimension: {
            height: 0,
            width: 0,
            ratio: 1
        }
    },
    node: {
        elem: null,
        dimension: {
            height: 0,
            width: 0
        }
    },
    ratio: 1,
    setTextImage: (s: string) => set({ textImage: s }),
    setRatio: (r: number) => set({ ratio: r }),
    setImage: (str: string, height: number, width: number) => set({
        image: {
            src: str,
            dimension: {
                height,
                width,
                ratio: width / height
            }
        }
    }),
    setIcon: (str: string, height: number, width: number) => set({
        icon: {
            src: str,
            dimension: {
                height,
                width,
                ratio: width / height
            }
        }
    }),
    setNode: (n: Node, height: number, width: number) => set({
        node: {
            elem: n,
            dimension: {
                height,
                width
            }
        }
    })
}))

const useLocation = create<{ pathname: string, setLocation: (pathname: string) => void }>(set => ({
    pathname: "/",
    setLocation: (pathname: string) => set({ pathname: pathname })
}))
export {
    useProps,
    useImage,
    useLocation
}
