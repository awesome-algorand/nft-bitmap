import { Contract } from "@algorandfoundation/tealscript";

/**
 * Algorand Place
 * @description The best place to put your pixels
 */
class NftBitmap extends Contract {
  /**
   * The image
   */
  image = GlobalStateMap<uint64, bytes>({ maxKeys: 64 });

  /**
   * Create the application with the default image
   */
  createApplication(): void {
    const row =
      "01020304050607080910111213141516171819202122232425262728293031323130292827262524";
    this.image(0).value = row;
    this.image(1).value = row;
    this.image(2).value = row;
    this.image(3).value = row;
    this.image(4).value = row;
    this.image(5).value = row;
    this.image(6).value = row;
    this.image(7).value = row;
    this.image(8).value = row;
    this.image(9).value = row;
    this.image(10).value = row;
    this.image(11).value = row;
    this.image(12).value = row;
    this.image(13).value = row;
    this.image(14).value = row;
    this.image(15).value = row;
    this.image(16).value = row;
    this.image(17).value = row;
    this.image(18).value = row;
    this.image(19).value = row;
    this.image(20).value = row;
    this.image(21).value = row;
    this.image(22).value = row;
    this.image(23).value = row;
    this.image(24).value = row;
    this.image(25).value = row;
    this.image(26).value = row;
    this.image(27).value = row;
    this.image(28).value = row;
    this.image(29).value = row;
    this.image(30).value = row;
    this.image(31).value = row;
    this.image(32).value = row;
    this.image(33).value = row;
    this.image(34).value = row;
    this.image(35).value = row;
    this.image(36).value = row;
    this.image(37).value = row;
    this.image(38).value = row;
    this.image(39).value = row;
    this.image(40).value = row;
    this.image(41).value = row;
    this.image(42).value = row;
    this.image(43).value = row;
    this.image(44).value = row;
    this.image(45).value = row;
    this.image(46).value = row;
    this.image(47).value = row;
    this.image(48).value = row;
    this.image(49).value = row;
    this.image(50).value = row;
    this.image(51).value = row;
    this.image(52).value = row;
    this.image(53).value = row;
    this.image(54).value = row;
    this.image(55).value = row;
    this.image(56).value = row;
    this.image(57).value = row;
    this.image(58).value = row;
    this.image(59).value = row;
    this.image(60).value = row;
    this.image(61).value = row;
    this.image(62).value = row;
    this.image(63).value = row;
  }

  /**
   * Update the application
   */
  updateApplication(): void {
    assert(this.txn.sender === globals.creatorAddress);
  }

  /**
   * Delete the application
   */
  deleteApplication(): void {
    assert(this.txn.sender === globals.creatorAddress);
  }

  /**
   * Ascii number to integer
   * @param x
   * @see https://github.com/algorand/pyteal-utils/blob/main/pytealutils/strings/string.py
   * @private
   */
  private _ascii_to_int(x: uint64): uint64 {
    const ascii_zero = 48;
    const ascii_nine = ascii_zero + 9;
    assert(x >= ascii_zero);
    assert(x <= ascii_nine);
    return x - ascii_zero;
  }

  /**
   * Convert an integer to an ASCII character
   * @param x
   * @private
   */
  private _int_to_ascii(x: uint64): string {
    return extract3("0123456789", x, 1);
  }

  /**
   * Calculate 10^x
   * @param x
   * @private
   */
  private _pow10(x: uint64): uint64 {
    let value = 1;
    // TODO: use exp opcode
    for (let i = 0; i < x; i = i + 1) {
      value = value * 10;
    }
    return value;
  }

  /**
   * Convert a string to an integer
   * @param x
   * @private
   */
  private _atoi(x: string): uint64 {
    const length = len(x);
    if (length > 0) {
      return (
        this._ascii_to_int(getbyte(x, 0)) * this._pow10(length - 1) +
        this._atoi(substring3(x, 1, length))
      );
    } else {
      return 0;
    }
  }

  /**
   * Convert an integer to a string
   * @param x
   * @private
   */
  private _itoa(x: uint64): string {
    if (x > 0) {
      return concat(
        x / 10 > 0 ? this._itoa(x / 10) : "",
        this._int_to_ascii(x % 10),
      );
    } else {
      return "0";
    }
  }

  /**
   * Convert an integer to a string
   * @param x
   */
  itoa(x: uint64): string {
    return this._itoa(x);
  }

  /**
   * Convert a string to an integer
   * @param x
   */
  atoi(x: string): uint64 {
    return this._atoi(x);
  }

  /**
   * Allow the creator to place a row
   * @param y
   * @param row
   */
  placeRow(y: uint64, row: string): void {
    assert(this.txn.sender === globals.creatorAddress);
    assert(y <= 64);
    assert(len(row) === 80);
    this.image(y).value = row;
  }
  /**
   * Place a Pixel
   * @param x - The x coordinate of the pixel
   * @param y - The y coordinate of the pixel
   * @param color - The color of the pixel
   */
  place(x: uint64, y: uint64, color: uint64): void {
    // assert(x <= 40);
    // assert(y <= 64);
    assert(color > 0 && color <= 40);

    // const xValue = x - 1;
    // const yValue = y - 1;
    const rowValue = this.image(x).value;

    this.image(x).value = concat(
      // Add preceding values with color
      concat(
        substring3(rowValue, 0, y * 2),
        // Under 10, we need to add a leading 0
        concat(color < 10 ? "0" : "", this._itoa(color)),
      ),
      // Remaining values
      substring3(rowValue, y * 2 + 2, 80),
    );
  }

  /**
   * Get the color of a pixel
   * @param x
   * @param y
   */
  get(x: uint64, y: uint64): uint64 {
    assert(x <= 40);
    assert(y <= 64);

    const xValue = x - 1;
    const yValue = y - 1;

    return this._atoi(
      substring3(this.image(xValue).value, yValue * 2, yValue * 2 + 2),
    );
  }
}
