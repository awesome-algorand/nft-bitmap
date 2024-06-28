import type {WalletManager} from "@txnlab/use-wallet-react";
import {Color} from "@nft-bitmap/kit/colors";

export type ControlProps = {
    onClose: () => void
    image?: Color[][],
    manager?: WalletManager
}
