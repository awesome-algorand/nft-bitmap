import {MutableRefObject, useLayoutEffect, useMemo, useRef, useState} from "react";
import useResizeObserver from "@react-hook/resize-observer";

export const useSize = (target: MutableRefObject<HTMLElement | null>) => {
    const [size, setSize] = useState<DOMRectReadOnly>()
    useLayoutEffect(() => {
        if (!target.current) return
        setSize(target.current.getBoundingClientRect())
    }, [target])
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

export function useCellSize(height: number, width: number) {
    const target = useRef(null)
    const size = useSize(target)
    const cellSize = useMemo(() => {
        if (!size) return 1
        return Math.min(size.width / width, size.height / height)
    }, [height, size, width])

    return {cellSize, target}
}
