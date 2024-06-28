/**
 * Pixelizer - convert an image to Pixel Art, with/out grayscale and based on a color palette.
 * @author José Moreira @ <https://github.com/giventofly/pixelit>
 * @author Michael Feher @ <https://github.com/PhearZero>
 **/
import {Color, getRandomBitmap} from "@nft-bitmap/kit/colors";

export const DRAWFROM_NOT_DEFINED_MESSAGE = "drawfrom is not defined";
export const DRAWTO_NOT_DEFINED_MESSAGE = "drawto is not defined";
export const CONTEXT_NOT_DEFINED_MESSAGE = "CanvasRenderingContext2D is not defined";
export type RgbColor = [number, number, number];

export type PixelizerConfig = {
    to?: HTMLCanvasElement;
    from?: HTMLImageElement;
    scale?: number;
    palette?: RgbColor[];
    maxHeight: number;
    maxWidth: number;
}
export class Pixelizer {
    drawto: HTMLCanvasElement | null;
    drawfrom: HTMLImageElement | null;
    scale: number;
    palette: RgbColor[];
    maxHeight: number;
    maxWidth: number;
    ctx: CanvasRenderingContext2D & {mozImageSmoothingEnabled?: boolean, webkitImageSmoothingEnabled?: boolean} | null;
    image: Color[][];

    constructor(config: PixelizerConfig = {maxHeight: 64, maxWidth: 40}) {
        //target for canvas
        this.drawto = config.to || document.getElementById("pixelitcanvas") as HTMLCanvasElement;
        //origin of uploaded image/src img
        this.drawfrom = config.from || document.getElementById("pixelitimg") as HTMLImageElement;
        //hide image element
        this.hideFromImg();
        //range between 0 to 100
        this.scale =
            config.scale && config.scale > 0 && config.scale <= 50
                ? config.scale * 0.01
                : 8 * 0.01;
        this.palette = config.palette || [
            [140, 143, 174],
            [88, 69, 99],
            [62, 33, 55],
            [154, 99, 72],
            [215, 155, 125],
            [245, 237, 186],
            [192, 199, 65],
            [100, 125, 52],
            [228, 148, 58],
            [157, 48, 59],
            [210, 100, 113],
            [112, 55, 127],
            [126, 196, 193],
            [52, 133, 157],
            [23, 67, 75],
            [31, 14, 28],
        ];
        this.maxHeight = config.maxHeight;
        this.maxWidth = config.maxWidth;
        this.ctx = this.drawto.getContext("2d");
        //save latest converted colors
        this.image = getRandomBitmap()
    }

    /** hide from image */
    hideFromImg() {
        if(!this.drawfrom) throw new Error(DRAWFROM_NOT_DEFINED_MESSAGE)
        this.drawfrom.style.visibility = "hidden";
        this.drawfrom.style.position = "fixed";
        this.drawfrom.style.top = "0";
        this.drawfrom.style.left = "0";
        return this;
    }

    /**
     * @param {string} src Change the src from the image element
     */
    setFromImgSource(src: string) {
        if(!this.drawfrom) throw new Error(DRAWFROM_NOT_DEFINED_MESSAGE)
        this.drawfrom.src = src;
        return this;
    }

    /**
     *
     * @param {elem} elem set element to read image from
     */
    setDrawFrom(elem: HTMLImageElement) {
        this.drawfrom = elem;
        return this;
    }

    /**
     *
     * @param {elem} elem set element canvas to write the image
     */
    setDrawTo(elem: HTMLCanvasElement) {
        this.drawto = elem;
        return this;
    }

    /**
     *
     * @param {array} arr Array of rgb colors: [[int,int,int]]
     */
    setPalette(arr: RgbColor[]) {
        this.palette = arr;
        return this;
    }

    /**
     *
     * @param {number} width set canvas image maxWidth
     */
    setMaxWidth(width: number) {
        this.maxWidth = width;
        return this;
    }

    /**
     *
     * @param {number} height
     */
    setMaxHeight(height: number) {
        this.maxHeight = height;
        return this;
    }

    /**
     *
     * @param {int} scale set pixelate scale [0...50]
     */
    setScale(scale: number) {
        this.scale = scale > 0 && scale <= 50 ? scale * 0.01 : 8 * 0.01;
        return this;
    }

    /**
     *
     */
    getPalette() {
        return this.palette;
    }

    /**
     * color similarity between colors, lower is better
     * @param {array} rgbColor array of ints to make a rgb color: [int,int,int]
     * @param {array} compareColor array of ints to make a rgb color: [int,int,int]
     * @returns {number} limits [0-441.6729559300637]
     */

    colorSim(rgbColor: RgbColor, compareColor: RgbColor) {
        let i;
        let max;
        let d = 0;
        for (i = 0, max = rgbColor.length; i < max; i++) {
            d += (rgbColor[i] - compareColor[i]) * (rgbColor[i] - compareColor[i]);
        }
        return Math.sqrt(d);
    }
    /**
     * given actualColor, check from the paletteColors the most aproximated color
     * @param {array} actualColor rgb color to compare [int,int,int]
     * @returns {array} aproximated rgb color
     */
    similarColorIndex(actualColor: RgbColor) {
        let selectedColorIndex = 0;
        let currentSim = this.colorSim(actualColor, this.palette[selectedColorIndex]);
        let nextColor;
        this.palette.forEach((color, index) => {
            nextColor = this.colorSim(actualColor, color);
            if (nextColor <= currentSim) {
                selectedColorIndex = index;
                currentSim = nextColor;
            }
        });
        return selectedColorIndex;
    }
    /**
     * given actualColor, check from the paletteColors the most aproximated color
     * @param {array} actualColor rgb color to compare [int,int,int]
     * @returns {array} aproximated rgb color
     */
    similarColor(actualColor: RgbColor) {
        let selectedColor: RgbColor = [0,0,0];
        let currentSim = this.colorSim(actualColor, this.palette[0]);
        let nextColor;
        this.palette.forEach((color) => {
            nextColor = this.colorSim(actualColor, color);
            if (nextColor <= currentSim) {
                selectedColor = color;
                currentSim = nextColor;
            }
        });
        return selectedColor;
    }

    /**
     * pixelate based on @author rogeriopvl <https://github.com/rogeriopvl/8bit>
     * Draws a pixelated version of an image in a given canvas
     */
    pixelate() {
        const tempCanvas = document.createElement("canvas");

        if(!this.drawfrom) throw new Error(DRAWFROM_NOT_DEFINED_MESSAGE)
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        if(!this.ctx) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)

        this.drawto.width = this.drawfrom.naturalWidth;
        this.drawto.height = this.drawfrom.naturalHeight;
        let scaledW = this.drawto.width * this.scale;
        let scaledH = this.drawto.height * this.scale;

        // Set temp canvas width/height & hide (fixes higher scaled cutting off image bottom)
        tempCanvas.width = this.drawto.width;
        tempCanvas.height = this.drawto.height;
        tempCanvas.style.visibility = "hidden";
        tempCanvas.style.position = "fixed";
        tempCanvas.style.top = "0";
        tempCanvas.style.left = "0";

        //corner case of bigger images, increase the temporary canvas size to fit everything
        if (this.drawto.width > 900 || this.drawto.height > 900) {
            //fix sclae to pixelate bigger images
            this.scale *= 0.5;
            scaledW = this.drawto.width * this.scale;
            scaledH = this.drawto.height * this.scale;
            //make it big enough to fit
            tempCanvas.width = Math.max(scaledW, scaledH) + 50;
            tempCanvas.height = Math.max(scaledW, scaledH) + 50;
        }
        const tempContext = tempCanvas.getContext("2d");

        if(!tempContext) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)

        // draw the image into the canvas
        tempContext.drawImage(this.drawfrom, 0, 0, scaledW, scaledH);
        document.body.appendChild(tempCanvas);
        //configs to pixelate
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        //calculations to remove extra border
        let finalWidth = this.drawfrom.naturalWidth;
        if (this.drawfrom.naturalWidth > 300) {
            finalWidth +=
                this.drawfrom.naturalWidth > this.drawfrom.naturalHeight
                    ? (
                    this.drawfrom.naturalWidth / (this.drawfrom.naturalWidth * this.scale)
                ) / 1.5
                    : (
                        this.drawfrom.naturalWidth / (this.drawfrom.naturalWidth * this.scale)
                    );
        }
        let finalHeight = this.drawfrom.naturalHeight;
        if (this.drawfrom.naturalHeight > 300) {
            finalHeight +=
                this.drawfrom.naturalHeight > this.drawfrom.naturalWidth
                    ? (
                    this.drawfrom.naturalHeight / (this.drawfrom.naturalHeight * this.scale)
                ) / 1.5
                    : (
                        this.drawfrom.naturalHeight / (this.drawfrom.naturalHeight * this.scale)
                    );
        }
        //draw to final canvas
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        this.ctx.drawImage(
            tempCanvas,
            0,
            0,
            scaledW,
            scaledH,
            0,
            0,
            finalWidth, //+ Math.max(24, 25 * this.scale),
            finalHeight //+ Math.max(24, 25 * this.scale)
        );
        //remove temp element
        tempCanvas.remove();

        return this;
    }

    /**
     * Converts image to grayscale
     */
    convertGrayscale() {
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        if(!this.ctx) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)

        const w = this.drawto.width;
        const h = this.drawto.height;
        const imgPixels = this.ctx.getImageData(0, 0, w, h);
        for (let y = 0; y < imgPixels.height; y++) {
            for (let x = 0; x < imgPixels.width; x++) {
                const i = y * 4 * imgPixels.width + x * 4;
                const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }
        this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return this;
    }

    /**
     * converts image to palette using the defined palette or default palette
     */
    convertPalette() {
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        if(!this.ctx) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)

        const w = this.drawto.width;
        const h = this.drawto.height;

        const imgPixels = this.ctx.getImageData(0, 0, w, h);
        for (let y = 0; y < imgPixels.height; y++) {
            for (let x = 0; x < imgPixels.width; x++) {
                const i = y * 4 * imgPixels.width + x * 4;
                //var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                const finalcolor = this.similarColor([
                    imgPixels.data[i],
                    imgPixels.data[i + 1],
                    imgPixels.data[i + 2],
                ]);


                imgPixels.data[i] = finalcolor[0];
                imgPixels.data[i + 1] = finalcolor[1];
                imgPixels.data[i + 2] = finalcolor[2];
            }
        }
        this.ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return this;
    }

    /**
     * Resizes image proportionally according to a max width or max height
     * height takes precedence if definied
     */
    resizeImage() {
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        if(!this.ctx) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)

        //var ctx = canvas.getContext("2d")
        const canvasCopy = document.createElement("canvas");
        const copyContext = canvasCopy.getContext("2d");
        if(!copyContext) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)
        let ratio = 1.0;

        //if none defined skip
        if (!this.maxWidth && !this.maxHeight) {
            return 0;
        }

        if (this.maxWidth && this.drawto.width > this.maxWidth) {
            ratio = this.maxWidth / this.drawto.width;
        }
        //max height overrides max width
        if (this.maxHeight && this.drawto.height > this.maxHeight) {
            ratio = this.maxHeight / this.drawto.height;
        }

        canvasCopy.width = this.drawto.width;
        canvasCopy.height = this.drawto.height;
        copyContext.drawImage(this.drawto, 0, 0);

        this.drawto.width = this.drawto.width * ratio;
        this.drawto.height = this.drawto.height * ratio;
        this.ctx.drawImage(
            canvasCopy,
            0,
            0,
            canvasCopy.width,
            canvasCopy.height,
            0,
            0,
            this.drawto.width,
            this.drawto.height
        );

        return this;
    }

    /**
     * draw to canvas from image source and resize
     *
     */
    draw() {
        if(!this.drawfrom) throw new Error(DRAWFROM_NOT_DEFINED_MESSAGE)
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        if(!this.ctx) throw new Error(CONTEXT_NOT_DEFINED_MESSAGE)
        //draw image to canvas
        this.drawto.width = this.drawfrom.width;
        this.drawto.height = this.drawfrom.height;
        //draw
        this.ctx.drawImage(this.drawfrom, 0, 0);
        //resize is always done
        this.resizeImage();
        return this;
    }

    /**
     * Save image from canvas
     */
    saveImage() {
        if(!this.drawto) throw new Error(DRAWTO_NOT_DEFINED_MESSAGE)
        const link = document.createElement("a");
        link.download = "pxArt.png";
        link.href = this.drawto
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        document.querySelector("body")?.appendChild(link);
        link.click();
        document.querySelector("body")?.removeChild(link);
    }
}
