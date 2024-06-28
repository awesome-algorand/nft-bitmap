import {ToolIconButton, IconButtonProps} from "../ToolIconButton.tsx";
import {ToolName} from "../Toolbox.tsx";

export const WIPE_TOOL_NAME: ToolName = 'wipe'
export const WIPE_TOOL_TITLE = 'Wipe Image'

export function WipeIcon(){
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
            <path
                d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/>
        </svg>
    )
}

export function WipeIconButton(props: Omit<IconButtonProps, 'name'>){
    return (
        <ToolIconButton
            name={WIPE_TOOL_NAME}
            title={props.disabled ? `${WIPE_TOOL_TITLE} (Disabled)` : WIPE_TOOL_TITLE}
            {...props}
        >
            <WipeIcon/>
        </ToolIconButton>
    )
}
