import {useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useMemo} from "react";

export function useCallbackParam(){
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const trigger = useCallback(() => {
        const callback = searchParams.get('callback')
        if (callback) {
            navigate(callback)
            setSearchParams((params)=>{
                params.delete('callback')
                return params
            })
        } else {
            navigate('/')
        }
    }, [navigate, searchParams, setSearchParams])

    const callback = useMemo(() => {
        return searchParams.get('callback') || undefined
    }, [searchParams])

    return {callback, trigger}
}
