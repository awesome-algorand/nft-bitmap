import { describe, it, beforeEach } from 'vitest'
import {render} from '@testing-library/react'
import { Bitmap } from './Bitmap'
import {getRandomBitmap, Color} from "@nft-bitmap/kit/colors";

describe('Bitmap', () => {
    let image: Color[][]
    beforeEach(()=>{
        image = getRandomBitmap()
    })
    it('renders a Bitmap component', () => {
        render(<Bitmap image={image} />)
    })
})
