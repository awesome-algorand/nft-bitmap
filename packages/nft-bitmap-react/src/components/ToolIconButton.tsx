import {ButtonHTMLAttributes, PropsWithChildren} from "react";
import {ToolName} from "./Toolbox.tsx";
import {NoOp} from "@/controllers";

const buttonStyle = {
    padding: "5px",
    width: 175/4,
    height: 175/4
}
export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren & {
    name: ToolName,
    onToolClick?: (toolName: ToolName)=>void
}

/**
 * ToolIconButton
 *
 * @param children
 * @param name
 * @param onToolClick
 * @param props
 * @constructor
 */
export function ToolIconButton({children, name, onToolClick, ...props}: IconButtonProps){
    return (
        <button
            style={{opacity: props.disabled ? 0.2 : 1, ...buttonStyle}}
            onClick={onToolClick ? ()=>onToolClick(name) : NoOp}
            {...props}>
            {children}
        </button>
    )
}
