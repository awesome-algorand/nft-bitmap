import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Cell } from './Cell'
import {Color, getRandomColor, Position} from "@nft-bitmap/kit";

function expectToBeCell(img: HTMLElement, color: Color, position: Position){
    expect(img.getAttribute("data-color-hex")).toEqual(color.hex)
    expect(img.getAttribute("data-color-name")).toEqual(color.name)
    expect(img.getAttribute("data-position-x")).toEqual(position.x.toString())
    expect(img.getAttribute("data-position-y")).toEqual(position.y.toString())
}
describe('Cell', () => {
    let color: Color
    const position = {x: 0, y: 0}
    let onClick: Mock
    beforeEach(()=>{
        color = getRandomColor()
        onClick = vi.fn()
    })
    it('renders a Cell component', () => {
        render(<Cell className="test" cellColor={color} cellSize={25} position={position} active={false} onClick={onClick}/>)
        screen.getAllByRole('img').forEach((img) => {
            expect(img.getAttribute("class")).toEqual('nft-bitmap-cell test')
            expectToBeCell(img, color, position)
            fireEvent.click(img)
            expect(onClick).toHaveBeenCalled()
        })
    })
    it('renders a active Cell component', () => {
        render(<Cell cellColor={color} cellSize={25} position={position} active={true}/>)
        screen.getAllByRole('img').forEach((img) => {
            expect(img.getAttribute("class")).toEqual('nft-bitmap-cell active')
            expectToBeCell(img, color, position)
            fireEvent.click(img)
            expect(onClick).toHaveBeenCalledTimes(0)
        })
    })
})
