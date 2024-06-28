import type {
    MouseEventHandler,
    HTMLAttributes,
    CSSProperties,
    MouseEvent as ReactMouseEvent
} from "react";
import {type Color, getRandomBitmap} from "@nft-bitmap/kit/colors";
import {type Position} from "@nft-bitmap/kit";
import {Cell} from './Cell.tsx'
import {NoOp} from "../controllers/NoOp.ts";

// Randomly generate a 64x40 image
const defaultImage = getRandomBitmap()

export type BitmapProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * Image data
     */
    image?: Color[][],
    /**
     * Width in Cells
     */
    width?: number,
    /**
     * Height in Cells
     */
    height?: number,
    /**
     * Cell Size in Pixels
     */
    cellSize?: number,
    /**
     * Active Cell Position
     */
    activeCell?: Position,
    /**
     * Show grid guides for debugging
     */
    showGuides?: boolean,
    /**
     * Style overrides and variables
     */
    style?: CSSProperties & {'--cell-size'?: string, '--selected-color'?: string}

    /**
     * Handle Cell Clicks
     * @param e
     * @param color
     * @param position
     */
    onCellClick?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, color: Color, position: Position) => void
    /**
     * Handle Cell Mouse Enter
     * @param e
     * @param color
     * @param position
     */
    onCellEnter?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, color: Color, position: Position) => void
    /**
     * Handle Cell Mouse Leave
     * @param e
     * @param color
     * @param position
     */
    onCellLeave?: (e: ReactMouseEvent<HTMLButtonElement, MouseEvent>, color: Color, position: Position) => void
    /**
     * Handle Bitmap Mouse Enter
     */
    onBitmapEnter?: MouseEventHandler<HTMLDivElement>
    /**
     * Handle Bitmap Mouse Leave
     */
    onBitmapLeave?: MouseEventHandler<HTMLDivElement>
}

// TODO: Add overrides for <Bitmap> <Cell> and <Row> components
export function Bitmap({
   image = defaultImage,
   //TODO: Derive the size from the image
   width = 40,
   height = 64,
   activeCell,
   cellSize = 25,
   style,
   className,
   onCellClick = NoOp,
   onCellEnter = NoOp,
   onCellLeave = NoOp,
   onBitmapEnter = NoOp,
   onBitmapLeave = NoOp,
   ...rest
}: BitmapProps = {image: defaultImage, showGuides: false}) {
    if(image.length !== height || image[0].length !== width) throw new Error("Image dimensions do not match width and height")
    return (
        // Container
        <div
            className={`nft-bitmap${className ? ` ${className}` : ""}`}
            onMouseEnter={onBitmapEnter}
            onMouseLeave={onBitmapLeave}
            style={{
                "--cell-size": `${cellSize}px`,
                // minWidth: cellSize * width,
                // minHeight: cellSize * height,
                ...style,
            }}
            {...rest}
        >
            {image.map((row, y) => (
                // Row
                <div key={y} style={{display: "flex"}}>
                    {row.map((color, x) => (
                        // Column
                        <Cell
                            key={x}
                            position={{x, y}}
                            cellColor={color}
                            cellSize={cellSize}
                            active={activeCell?.x === x && activeCell?.y === y}
                            onClick={(e) => onCellClick(e, color, {x, y} as Position)}
                            onMouseEnter={(e) => onCellEnter(e, color, {x, y} as Position)}
                            onMouseLeave={(e) => onCellLeave(e, color, {x, y} as Position)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
