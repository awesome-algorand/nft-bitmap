import { expect, test } from "vitest";
import {
  COLORS,
  getRandomColor,
  getRandomBitmap,
  getSingleColorBitmap,
  getColorPaletteBitmap,
  fillColor,
} from "./colors";
test("getRandomColor", () => {
  expect(COLORS).toContain(getRandomColor());
});

test("getRandomBitmap", () => {
  const image = getRandomBitmap();
  expect(image).toHaveLength(64);
  expect(image[0]).toHaveLength(40);
});

test("getSingleColorBitmap", () => {
  const color = getRandomColor();
  const image = getSingleColorBitmap(color);
  expect(image).toHaveLength(64);
  expect(image[0]).toHaveLength(40);
  expect(image.every((row) => row.every((c) => c === color))).toBeTruthy();
});

test("getColorPaletteBitmap", () => {
  const image = getColorPaletteBitmap();
  expect(image).toHaveLength(4);
  expect(image[0]).toHaveLength(8);
  expect(image.flat()).toEqual(COLORS.slice(0, 32));

  expect(() => getColorPaletteBitmap(1, 1)).toThrow(Error);
});

test("fillColor", () => {
  const image = getSingleColorBitmap(COLORS[0]);
  const color = COLORS[1];
  const position = { x: 20, y: 20 };
  const filled = fillColor(image, color, position);
  expect(filled[position.y][position.x]).toEqual(color);
  expect(filled.flat().every((c) => c === color)).toBeTruthy();

  const image2 = getSingleColorBitmap(COLORS[0]);
  const filledSame = fillColor(image2, COLORS[0], position);
  expect(filledSame).toEqual(image2);
});
