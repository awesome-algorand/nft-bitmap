import {ButtonHTMLAttributes, PropsWithChildren} from "react";
import {ToolName} from "./Toolbox.tsx";

const buttonStyle = {
    padding: "5px",
    width: 175/4,
    height: 175/4
}
export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren & {
    onToolClick?: (toolName: ToolName)=>void
}

/**
 * IconButton
 *
 *
 *
 * @param children
 * @param props
 * @constructor
 */
export function ToolIconButton({children, ...props}: IconButtonProps){
    return (
        <button
            style={{opacity: props.disabled ? 0.2 : 1, ...buttonStyle}}
            {...props}>
            {children}
        </button>
    )
}
