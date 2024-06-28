import {useCallback, useMemo} from "react";
import {Color, COLORS} from "@nft-bitmap/kit/colors";
import {useSearchParams} from "react-router-dom";

export function useColorParam(){
    const [searchParams, setSearchParams] = useSearchParams()
    const setColor = useCallback((color?: Color)=>{
        setSearchParams((params)=>{
            // When it is set twice, remove it
            if(!color || color.hex === params.get("color")){
                params.delete("color")
            } else {
                params.set("color", color.hex)
            }
            return params
        })
    },[setSearchParams])
    const color = useMemo(() =>
            COLORS.find((c) => c.hex === searchParams.get('color')) || undefined
        , [searchParams])

    return [color, setColor] as const
}
