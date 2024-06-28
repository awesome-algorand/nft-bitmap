import {useMemo} from "react";
import {COLORS} from "@nft-bitmap/kit/colors";

import {Cell} from "@nft-bitmap/react/components";
import styles from './TetrisBackground.module.css'

/**
 * Tetris Background
 *
 * Shows a background of Tetris cells
 *
 * @todo: update based on state changes
 * @constructor
 */
export function TetrisBackground(){
    const cellProps = useMemo(()=>{
        return COLORS.map((c)=>({
            active: false,
            className: `tetris-cell ${styles['tetris-cell']}`,
            cellColor: c,
            cellSize: 24,
            position: {x:0, y:0},
            style: {
                '--animation-duration': `${Math.random() * 10 + 5}s`,
                '--animation-delay': `${Math.random() * 10}s`,
                '--animation-offset': COLORS.indexOf(c)
            }
        }))
    },[])
    return (
        <div className={`tetris-background ${styles['tetris-background']}`}>
            {cellProps.map((p, i) => (
                <Cell key={i} {...p}></Cell>
            ))}
        </div>
    )
}
