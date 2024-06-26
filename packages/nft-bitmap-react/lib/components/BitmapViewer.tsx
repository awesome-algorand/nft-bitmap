import {getRandomBitmap} from "nft-bitmap-kit/colors";
import {Bitmap, BitmapProps} from "./Bitmap.tsx";
import {useCellSize} from "../hooks/useCellSize.ts";

// Randomly generate a 64x40 image
const defaultImage = getRandomBitmap()

export type BitmapViewerProps = BitmapProps & {
    showGuides?: boolean,
}

// TODO: Add overrides for <Bitmap> <Cell> and <Details> components
export function BitmapViewer({
                           className,
                           image = defaultImage,
                           showGuides = false,
                           activeCell,
                           width = 40,
                           height = 64,
                           style,
                           onCellClick = () => {},
                           onCellEnter = () => {},
                           onCellLeave = () => {},
                           onBitmapEnter = () => {},
                           onBitmapLeave = () => {},
                           ...rest

                       }: BitmapViewerProps = {image: defaultImage, showGuides: false}) {
    const {target, cellSize} = useCellSize(height, width)
    return (
            <div
                className={"nft-bitmap-viewer"}
                ref={target}
                style={{
                    display:"flex",
                    flexDirection:"column",
                    border: showGuides ? '1px dashed red' : "none",
                    height: '100%',
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: '100vw',
                    maxHeight:'100vh',
                    ...style
                }}
                {...rest}
            >
                <Bitmap
                    className={className}
                    height={height}
                    width={width}
                    activeCell={activeCell}
                    cellSize={cellSize}
                    image={image}
                    style={{
                        border: showGuides ? '1px dashed blue' : "none",
                        ...style
                    }}
                    onCellEnter={onCellEnter}
                    onCellLeave={onCellLeave}
                    onCellClick={onCellClick}
                    onBitmapEnter={onBitmapEnter}
                    onBitmapLeave={onBitmapLeave}
                />
                </div>
    )
}
