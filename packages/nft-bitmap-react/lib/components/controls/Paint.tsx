import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const PAINT_TOOL_NAME: ToolName = 'paint'
export const PAINT_TOOL_TITLE = 'Paint Brush'

export function PaintIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z"/>
        </svg>
    )
}

export function PaintIconButton(props: IconButtonProps){
    return (
        <ToolIconButton
            title={props.disabled ? `${PAINT_TOOL_TITLE} (Disabled)` : PAINT_TOOL_TITLE}
            {...props}
        >
            <PaintIcon/>
        </ToolIconButton>
    )
}
