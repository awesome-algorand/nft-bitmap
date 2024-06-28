import { describe, it, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Toolbox } from './Toolbox'
import {getRandomBitmap, Color} from "@nft-bitmap/kit/colors";
import {WalletManager} from "@txnlab/use-wallet-react";

describe('Toolbox', () => {
    let image: Color[][]
    let manager: WalletManager
    beforeEach(()=>{
        image = getRandomBitmap()
        manager = new WalletManager()
    })
    it('renders a Toolbox component', () => {
        render(<Toolbox image={image} manager={manager} />)

    })
})
