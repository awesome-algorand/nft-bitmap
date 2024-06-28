import {NetworkId, SupportedWallet, WalletId, WalletManager, WalletProvider} from "@txnlab/use-wallet-react";
import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";
import type {AlgodSettings} from "@nft-bitmap/react/components";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

interface AlgodContextProps {
    algod: AlgodSettings
    setAlgod: (algod: AlgodSettings) => void
    network: NetworkId
    setNetwork: (network: NetworkId) => void
}

export const AlgodContext = createContext<AlgodContextProps>({
    algod: {
        token: import.meta.env.VITE_ALGOD_TOKEN || "",
        baseServer: import.meta.env.VITE_ALGOD_SERVER || "https://testnet-api.algonode.cloud",
        port: parseInt(import.meta.env.VITE_ALGOD_PORT) || 443,
    },
    setAlgod: () => {},
    network: import.meta.env.VITE_ALGOD_NETWORK as NetworkId || NetworkId.TESTNET,
    setNetwork: () => {}
})

export function AlgodProvider({children}: PropsWithChildren) {
    const [algod, setAlgod] = useState<AlgodSettings>({
        token: import.meta.env.VITE_ALGOD_TOKEN || "",
        baseServer: import.meta.env.VITE_ALGOD_SERVER || "https://testnet-api.algonode.cloud",
        port: parseInt(import.meta.env.VITE_ALGOD_PORT) || 443,
    })
    const [network, setNetwork] = useState<NetworkId>( import.meta.env.VITE_ALGOD_NETWORK as NetworkId || NetworkId.TESTNET)

    return (
        <AlgodContext.Provider value={{algod, setAlgod, network, setNetwork}}>
            {children}
        </AlgodContext.Provider>
    )
}

function useAlgod() {
    return useContext(AlgodContext)
}

export function BitmapWalletProvider({children}: PropsWithChildren) {
    const {algod, network} = useAlgod()
    console.log(algod)
    const manager = useMemo(() => {
        const wallets: SupportedWallet[] = [
            WalletId.MNEMONIC,
            WalletId.PERA,
            WalletId.DEFLY,
            {
                id: WalletId.LUTE,
                options: {
                    siteName: 'Nft Bitmap',
                }
            },
            WalletId.KIBISIS,
            WalletId.EXODUS,
        ]
        if(import.meta.env.DEV) wallets.push({
            id:WalletId.KMD,
            options:{
                baseServer: algod.baseServer,
            }
        })
        return new WalletManager({
            wallets,
            network,
            algod
        })
    }, [algod, network])
    return (
        <WalletProvider manager={manager}>
            {children}
        </WalletProvider>
    )
}

export function Providers({children}: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            <AlgodProvider>
                <BitmapWalletProvider>
                    {children}
                </BitmapWalletProvider>
            </AlgodProvider>
        </QueryClientProvider>
    )
}
