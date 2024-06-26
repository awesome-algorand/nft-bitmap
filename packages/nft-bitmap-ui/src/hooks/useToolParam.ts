import {useCallback, useMemo} from "react";
import {ToolName} from "nft-bitmap-react/components";
import {useSearchParams} from "react-router-dom";

export function useToolParam() {
    const [searchParams, setSearchParams] = useSearchParams()
    const setTool = useCallback((tool?: ToolName) => {
            setSearchParams((params) => {
                // When it is set twice, remove it
                if (!tool || tool === params.get("tool")) {
                    params.delete("tool")
                } else {
                    params.set("tool", tool)
                }
                return params
            })
    }, [setSearchParams])
    const tool: ToolName | undefined = useMemo(() =>
            searchParams.get("tool") as ToolName || undefined,
        [searchParams])
    return [tool, setTool] as const
}
