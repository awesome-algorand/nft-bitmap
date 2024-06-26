import type {Color} from "nft-bitmap-kit/colors";
import {Position} from "./Position";

export type DetailsProps = {
    color: Color,
    position?: Position,
    visible?: boolean
}

export function Details({color, position = {x: 0, y: 0}, visible = false}: DetailsProps) {
    const textColor = color.name === "Black" ? "white" : "black"
    const speed = '0.5s'
    return (
        <div className="nft-bitmap-details" style={{
            // visibility: visible ? 'visible' : 'hidden',
            opacity: visible ? 1 : 0,
            transition: `opacity ${speed} linear, background-color ${speed} linear, color ${speed} linear, border ${speed} linear`,
            top: '1rem',
            left: '1rem',
            width: 175,
            height: 175,
            padding: '1rem',
            borderRadius: '1rem',
            border: `5px solid ${textColor}`,
            position: 'absolute',
            color: textColor,
            backgroundColor: color.hex,
        }}>
            <h3>{color.name}</h3>
            <p><strong>x:</strong> {position.x} <strong>y:</strong> {position.y}</p>
            <p>
               TODO: Timestamp
               TODO: Block Number
               TODO: Transaction ID
            </p>
        </div>
    )
}
