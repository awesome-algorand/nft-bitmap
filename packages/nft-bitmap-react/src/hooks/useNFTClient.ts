import {useMemo} from "react";

import {NftBitmapClient} from "@nft-bitmap/kit/client";

import type {TransactionSignerAccount} from "@algorandfoundation/algokit-utils/types/account";
import type {WalletManager} from "@txnlab/use-wallet-react";

export function useNFTClient(manager: WalletManager, id: number = 0){
    return useMemo(()=> {
        if(!manager.activeAddress) return null
        return new NftBitmapClient({
            resolveBy: "id",
            sender: {signer: manager.transactionSigner, addr: manager.activeAddress} as TransactionSignerAccount,
            id
        }, manager.algodClient)
    },[id, manager.activeAddress, manager.algodClient, manager.transactionSigner])
}
