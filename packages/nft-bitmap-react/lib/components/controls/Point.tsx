import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const POINT_TOOL_NAME: ToolName = 'point'
export const POINT_TOOL_TITLE = 'Point'

export function PointIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm-40-240v-200h80v200h-80Zm0 520v-200h80v200h-80Zm200-320v-80h200v80H640Zm-520 0v-80h200v80H120Z"/>
        </svg>
    )
}

export function PointIconButton(props: IconButtonProps){
    return (
        <ToolIconButton
            title={POINT_TOOL_TITLE}
            {...props}
        >
            <PointIcon/>
        </ToolIconButton>
    )
}
