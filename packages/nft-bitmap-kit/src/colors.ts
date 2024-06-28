import type { Position } from "nft-bitmap-react/lib/components/Position";

export type Color = {
  key?: string;
  name: string;
  hex: string;
};
export function getRandomColor(): Color {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}
export function getRandomBitmap(height = 64, width = 40): Color[][] {
  return Array(height)
    .fill(Array(width).fill(getRandomColor()))
    .map((row) => row.map(() => getRandomColor()));
}
export function getSingleColorBitmap(
  color: Color,
  height = 64,
  width = 40,
): Color[][] {
  return Array(height)
    .fill(Array(width).fill(color))
    .map((row) => row.map(() => color));
}
export function getColorPaletteBitmap(height = 4, width = 8) {
  if (height * width < COLORS.length) {
    throw new Error("Palette is too small for the image");
  }
  let idx = 0;
  return Array(height)
    .fill(Array(width).fill(null))
    .map((row) => row.map(() => COLORS[idx++]));
}
export function fillColor(image: Color[][], color: Color, position: Position) {
  const targetColor = image[position.y][position.x];
  if (targetColor.hex === color.hex) return image;
  const stack: Position[] = [position];
  while (stack.length) {
    const current = stack.pop()!;
    if (image[current.y][current.x].hex === targetColor.hex) {
      image[current.y][current.x] = color;
      if (current.x > 0) stack.push({ x: current.x - 1, y: current.y });
      if (current.x < image[0].length - 1)
        stack.push({ x: current.x + 1, y: current.y });
      if (current.y > 0) stack.push({ x: current.x, y: current.y - 1 });
      if (current.y < image.length - 1)
        stack.push({ x: current.x, y: current.y + 1 });
    }
  }
  return image;
}

export const COLORS: Color[] = [
  { name: "Boysenberry", hex: "#6d001a", key: "01" },
  { name: "Crimson Glory", hex: "#be0039", key: "02" },
  { name: "Red Orange", hex: "#ff4500", key: "03" },
  { name: "Chrome Yellow", hex: "#ffa800", key: "04" },
  { name: "Sunglow", hex: "#ffd635", key: "05" },
  { name: "Very Pale Yellow", hex: "#fff8b8", key: "06" },
  { name: "Green (NCS)", hex: "#00a368", key: "07" },
  { name: "Caribbean Green", hex: "#00cc78", key: "08" },
  { name: "Kiwi", hex: "#7eed56", key: "09" },
  { name: "Pine Green", hex: "#00756f", key: "10" },
  { name: "Blue (Munsell)", hex: "#009eaa", key: "11" },
  { name: "Robin Egg Blue", hex: "#00ccc0", key: "12" },
  { name: "Cyan Cobalt Blue", hex: "#2450a4", key: "13" },
  { name: "Bleu De France", hex: "#3690ea", key: "14" },
  { name: "Turquoise", hex: "#51e9f4", key: "15" },
  { name: "Ocean Blue", hex: "#493ac1", key: "16" },
  { name: "Very Light Blue", hex: "#6a5cff", key: "17" },
  { name: "Jordy Blue", hex: "#94b3ff", key: "18" },
  { name: "Grape", hex: "#811e9f", key: "19" },
  { name: "Deep Fuchsia", hex: "#b44ac0", key: "20" },
  { name: "Mauve", hex: "#e4abff", key: "21" },
  { name: "Vivid Cerise", hex: "#de107f", key: "22" },
  { name: "Sasquatch Socks", hex: "#ff3881", key: "23" },
  { name: "Baker-Miller Pink", hex: "#ff99aa", key: "24" },
  { name: "Coffee", hex: "#6d482f", key: "25" },
  { name: "Golden Brown", hex: "#9c6926", key: "26" },
  { name: "Very Light Tangelo", hex: "#ffb470", key: "27" },
  { name: "Black", hex: "#000000", key: "28" },
  { name: "Davy's Grey", hex: "#515252", key: "29" },
  { name: "Philippine Gray", hex: "#898d90", key: "30" },
  { name: "Light Silver", hex: "#d4d7d9", key: "31" },
  { name: "White", hex: "#ffffff", key: "32" },
];
