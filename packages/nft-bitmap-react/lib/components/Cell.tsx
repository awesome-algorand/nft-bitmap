import type {Color} from "nft-bitmap-kit/colors";
import {Position} from "./Position";
import {CSSProperties, HTMLAttributes} from "react";

type CellProps = HTMLAttributes<HTMLButtonElement> & {
    cellColor: Color,
    cellSize: number,
    position: Position,
    active: boolean,
    style?: CSSProperties & {
        '--animation-duration'?: string,
        '--animation-delay'?: string,
        '--animation-offset'?: number,
    }
}
export function Cell({cellColor, cellSize, position, active, onClick, onMouseEnter, onMouseLeave, className, style, ...rest}: CellProps) {
    return (
        <button
            role="img"
            aria-label={`${cellColor.name}, Position y: ${position.y}, x: ${position.x}`}
            aria-roledescription="color swatch"
            className={"nft-bitmap-cell" + (active ? " active" : "") + (className ? " " + className : "")}
            data-color-name={cellColor.name}
            data-color-hex={cellColor.hex}
            data-position-y={position.y}
            data-position-x={position.x}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                boxSizing: "border-box",
                width: cellSize,
                height: cellSize,
                padding: 0,
                backgroundColor: cellColor.hex,
                ...style
            }}
            {...rest}
        />
    )
}
