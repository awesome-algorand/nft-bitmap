import {useState} from "react";
import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";
import {ControlProps} from "./ControlProps.ts";
import {BitmapViewer} from "../BitmapViewer.tsx";
import {useGalleryStore} from "@/stores.ts";

export const SAVE_TOOL_NAME: ToolName = 'save'
export const SAVE_TOOL_TITLE = 'Save'

export function SaveIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
        </svg>
    )
}

export function SaveIconButton(props: IconButtonProps) {
    return (
        <ToolIconButton
            title={SAVE_TOOL_TITLE}
            {...props}
        >
            <SaveIcon/>
        </ToolIconButton>
    )
}

export function SaveControl({onClose, image}: ControlProps) {
    if(!image) throw new TypeError('Image is required')
    const add = useGalleryStore((state) => state.add)
    const [name, setName] = useState<string | undefined>()
    return (
        <>
            <button onClick={onClose}>Back</button>
            <h2>Save</h2>
            <h3>Image Name</h3>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <h3>Preview</h3>
            <BitmapViewer image={image} style={{height: 250}}/>
            <button onClick={() => {
                add(image, name)
                onClose()
            }}>Save
            </button>
        </>
    )
}
