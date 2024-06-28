import {useEffect, useState} from "react";
import {Color, COLORS, getRandomBitmap} from "@nft-bitmap/kit/colors";
import {Pixelizer, RgbColor} from '@/controllers/Pixelizer.ts'
import {useEditorImage} from "@/stores.ts";
import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const UPLOAD_TOOL_NAME: ToolName = 'upload'
export const UPLOAD_TOOL_TITLE = 'Upload Image'

export function UploadIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
        </svg>
    )
}
export function UploadIconButton(props: Omit<IconButtonProps, 'name'>){
    return (
        <ToolIconButton
            name={UPLOAD_TOOL_NAME}
            title={UPLOAD_TOOL_TITLE}
            {...props}
        >
            <UploadIcon/>
        </ToolIconButton>
    )
}
export type UploadImageControlProps = {
    onChange: (image: Color[][]) => void
    onClose: () => void
}

function hexToRgb(hex: string): RgbColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(!result) throw new Error('invalid hex color')
    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];
}

export function UploadImageControl({onChange, onClose}: UploadImageControlProps) {
    const editorImage = useEditorImage((state) => state.image)
    const setEditorImage = useEditorImage((state) => state.setImage)
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    // const [canvas] = useState(()=>document.createElement('canvas'))
    useEffect(() => {
        if(!selectedImage) return
        onChange(getRandomBitmap());
    }, [onChange, selectedImage]);

    return (
        <>
            <button onClick={onClose}>Back</button>
            {selectedImage && <><img
                id="pixelitimg"
                alt="not found"
                height={64}
                width={40}
                src={URL.createObjectURL(selectedImage)}
            />
                <button onClick={() => setSelectedImage(null)}>Remove</button>
                <button onClick={() => {
                    // Create Pixelizer instance
                    const inst = new Pixelizer({
                        palette: COLORS.map(c=>hexToRgb(c.hex)),
                        maxHeight: 64,
                        //defaults to null
                        maxWidth: 40,
                        scale: 0,
                        //defaults to null
                    }).draw().pixelate().convertPalette()
                    if(!inst.ctx || !inst.drawto || !inst.drawfrom) return
                    const imageData = inst.ctx.getImageData(0, 0, inst.drawto.width, inst.drawto.height)

                    const colors = []
                    const colorz = imageData.data.reduce((pre, _, i) => {
                        if(i % 4 === 0) {
                            pre.push(COLORS[inst.similarColorIndex([imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]])])
                        }
                        return pre
                    }, [] as Color[]).reduce((pre, _, i, arr) => {
                        if(i % 500 === 0) {
                            pre.push(arr.slice(i, i + 500))
                        }
                        return pre
                    }, [] as Color[][]).reduce((pre, next, i) => {
                        if(i % 12 === 0) {
                          pre.push(next.reduce((wow, n, b)=>{
                                if(b % 12 === 0) {
                                    wow.push(n)
                                }
                                return wow
                          }, [] as Color[]))
                        }
                        return pre
                    }, [] as Color[][])

                    for(let i = 0; i < imageData.data.length; i += 4) {

                        const currentColor: RgbColor = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]
                        const similarColorIndex = inst.similarColorIndex(currentColor)
                        // console.log(COLORS[similarColorIndex])
                        colors.push(COLORS[similarColorIndex])
                        // var color = inst.palette.findIndex((p, i ,arr)=>{
                        //     // console.log(p)
                        //
                        //     return p[0] === currentColor[0] && p[1] === currentColor[1] && p[2] === currentColor[3]
                        // });
                        // console.log(color)
                        // var brightness = 0.34 * imageData[i] + 0.5 * imageData[i + 1] + 0.16 * imageData[i + 2];
                        // imageData[i] = brightness;
                        // imageData[i + 1] = brightness;
                        // imageData[i + 2] = brightness;
                    }
                    // these are 12x the pixels
                    const res = editorImage.map((row, y)=>{
                        return row.map((cell, x) => {
                            const colorRow = typeof colorz[y] !== 'undefined' ? colorz[y] : Array(40).fill(COLORS[COLORS.length - 1])
                            return typeof colorRow[x] !== 'undefined' ? colorRow[x] : cell
                        })
                    })
                    console.log({res})
                    setEditorImage(res)
                }}>pixelate</button>
            </>}
            <canvas id="pixelitcanvas" height="64px" width="40px" style={{border: "1px solid purple", height: 64 * 4, width: 40 * 4}}></canvas>
            <input
                type="file"
                name="myImage"
                // Event handler to capture file selection and update the state
                onChange={(event) => {
                    if(!event.target.files) return
                    setSelectedImage(event.target.files[0]); // Update the state with the selected file
                }}
            />
        </>

    )
}
