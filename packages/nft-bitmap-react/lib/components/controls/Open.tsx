import {useGalleryStore} from "@/stores.ts";
import {Color} from "@nft-bitmap/kit/colors";
import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";
import {ControlProps} from "./ControlProps.ts";
import { BitmapViewer } from "../BitmapViewer.tsx";

export const OPEN_TOOL_NAME: ToolName = 'open'
export const OPEN_TOOL_TITLE = 'Open'


export function OpenIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960">
            <path
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z"/>
        </svg>
    )
}

export function OpenIconButton(props: IconButtonProps){
    return (
        <ToolIconButton
            title={OPEN_TOOL_TITLE}
            {...props}
        >
            <OpenIcon/>
        </ToolIconButton>
    )
}

type OpenControlProps = ControlProps & {
    onOpen: (image: Color[][])=>void
}

export function OpenControl({onClose, onOpen}: OpenControlProps) {
    const gallery = useGalleryStore((state) => state.gallery)
    return (
        <>
            <button onClick={onClose}>Back</button>
            <h2>Open</h2>
            <form style={{display: "none", border: "2px solid", padding: 10, backgroundColor: "grey"}}>
                <h4>On-Chain</h4>

                <input placeholder="Application Id" title="Enter the Bitmap's application identifier"/>
                <input placeholder="Network" title="Choose a network"/>
                <input type="checkbox" title="Save"/>
                <button>Open</button>
            </form>
            <h4>Local Storage</h4>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                {gallery.map((item) => (
                    <button role="button"
                            key={item.timestamp}
                            style={{
                                height: 250,
                                backgroundColor: "transparent",
                                border: "none",
                                cursor: "pointer",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}
                            onClick={() => {
                                onOpen(item.image)
                                onClose()
                            }}>
                        <BitmapViewer image={item.image}/>
                        <span style={{textAlign: 'center'}}>{item.name}</span>
                    </button>
                ))}
            </div>

        </>
    )
}
