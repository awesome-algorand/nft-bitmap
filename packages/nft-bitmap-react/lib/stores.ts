import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {getRandomBitmap, getSingleColorBitmap, type Color} from "nft-bitmap-kit/colors";
import type {Position} from "@/components/Position";

export interface ImageState {
    image: Color[][]
    clearImage: (color?: Color) => void
    setImage: (image: Color[][]) => void
    setCell: (position: Position, color: Color) => void
}

export function createImageStore(name: string) {
    return create<ImageState, [["zustand/persist", ImageState]]>(
        persist((set) => ({
            image: getRandomBitmap(),
            type: name,
            clearImage: (color?: Color) => set(()=>{
                if(name !== 'editor-image') throw new Error('Cannot clear live image')
                return {image: color ? getSingleColorBitmap(color) : getRandomBitmap()}
            }),
            setImage: (image) => set({image}),
            setCell: (position: Position, color: Color) => set((state) => {
                const image = state.image.map((row, i) => {
                    if (i !== position.y) return row
                    return row.map((cell, j) => {
                        if (j !== position.x) return cell
                        return color
                    })
                })
                return {image}
            })
        }), {
            name
        })
    )
}

export const useImage = createImageStore('live-image')
export const useEditorImage = createImageStore('editor-image')

type GalleryItem = {
    name?: string,
    image: Color[][],
    timestamp: number
}

interface GalleryState {
    gallery: GalleryItem[]
    add: (image: Color[][], name?: string) => void
}
export const useGalleryStore = create<GalleryState, [["zustand/persist", GalleryState]]>(
    persist((set) => ({
        gallery: [],
        add: (image: Color[][], name?: string) => set((state) => {
            return {
                gallery: [...state.gallery, {name, image, timestamp: Date.now()}]
            }
        }),
    }), {
        name: 'gallery'
    })

)
