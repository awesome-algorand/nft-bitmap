import {useQuery} from "@tanstack/react-query";
import {Algodv2, decodeUint64} from "algosdk";
import {Color, COLORS} from "nft-bitmap-kit/colors";
import {toByteArray} from "base64-js";

type KeyPair = { key: string, value: { bytes: string } }

export function mapDecodeGlobalState(kp: KeyPair): Color[] {
    return atob(kp.value.bytes).match(/.{1,2}/g)!.map((s: string) => {
        return COLORS.find((c) => c.key === s) || COLORS[0]
    })
}

export function useLiveImage(algod?: Algodv2, appId?: number) {
    return useQuery({
        queryKey: ['liveImage', appId],
        queryFn: async () => {
            if (!algod || !appId) throw new TypeError('Must provide algod and appId')
            return await algod.getApplicationByID(appId).do()
                .then(
                    (r) =>
                        r.params['global-state']
                            .sort((a: KeyPair, b: KeyPair) => {
                                const _a = decodeUint64(toByteArray(a.key), "safe")
                                const _b = decodeUint64(toByteArray(b.key), "safe")
                                return _a - _b
                            })
                            .map(mapDecodeGlobalState)
                )
        },
        enabled: !!algod && !!appId
    })
}
