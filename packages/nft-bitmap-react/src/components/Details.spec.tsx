import { describe, it, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Details } from './Details'
import {Color, getRandomColor} from "@nft-bitmap/kit";

describe('Details', () => {
    let color: Color
    const position = {x: 0, y: 0}
    beforeEach(()=>{
        color = getRandomColor()
    })
    it('renders a Details component', () => {
        render(<Details color={color} position={position} visible={true} />)

    })
})
