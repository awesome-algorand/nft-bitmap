import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const MODE_TOOL_NAME: ToolName = 'mode'
export const MODE_TOOL_TITLE = 'Mode'
export const MODE_TOOL_TITLE_EDIT = 'Creative Mode'
export const MODE_TOOL_TITLE_VIEW = 'On-Chain Editor'

export type ModeName = 'edit' | 'view'

export function ModeIcon({mode}: {mode: ModeName}){
    if(mode === 'edit') return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/>
        </svg>
    )
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="m770-302-60-62q40-11 65-42.5t25-73.5q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 57-29.5 105T770-302ZM634-440l-80-80h86v80h-6ZM792-56 56-792l56-56 736 736-56 56ZM440-280H280q-83 0-141.5-58.5T80-480q0-69 42-123t108-71l74 74h-24q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h65l79 80H320Z"/>
        </svg>
    )
}

export function ModeIconButton({mode, ...props}: {mode: ModeName} & Omit<IconButtonProps, 'name'>){
    return (
        <ToolIconButton
            name={MODE_TOOL_NAME}
            title={mode === 'edit' ? MODE_TOOL_TITLE_VIEW : MODE_TOOL_TITLE_EDIT}
            {...props}
        >
            <ModeIcon mode={mode}/>
        </ToolIconButton>
    )
}
