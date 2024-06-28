import { describe, it, beforeEach } from 'vitest'
import {render} from '@testing-library/react'
import { BitmapViewer } from './BitmapViewer'
import {getRandomBitmap, Color} from "@nft-bitmap/kit/colors";

describe('BitmapViewer', () => {
    let image: Color[][]
    beforeEach(()=>{
        image = getRandomBitmap()
    })
    it('renders a BitmapViewer component', () => {
        render(<BitmapViewer image={image} />)
    })
})
