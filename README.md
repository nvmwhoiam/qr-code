# QR Code Generator

A pure JavaScript QR code generator that creates QR codes from text input. This implementation follows the QR code specification (ISO/IEC 18004) and supports all 40 versions with automatic version selection based on data capacity.

## Features

- **Pure JavaScript**- No external dependencies
- **Automatic version selection** - Chooses the smallest version that fits your data
- **All ECC levels** - L (7%), M (15%), Q (25%), H (30%)
- **All encoding modes** - Numeric, Alphanumeric, and Byte mode
- **Mask pattern optimization** - Tests all 8 masks and selects the one with lowest penalty score
- **SVG output** - Clean, scalable vector graphics
- **Customizable appearance** - Module shape and colors can be modified

## Technologies Used

- **HTML5:** Semantic structure and accessibility
- **SCSS/CSS3:** Modern styling and animations
- **JavaScript:** Theme handling and interactions

## How It Works

1. **Mode Detection** - Automatically detects the most efficient encoding mode (Numeric, Alphanumeric, or Byte)
2. **Version Selection** - Tests versions 1-40 to find the smallest that can fit the data with the requested ECC level
3. **Data Encoding** - Converts text to bits according to the QR specification:
   - Numeric: Groups of 3 digits (10 bits per group)
   - Alphanumeric: Pairs of characters (11 bits per pair)
   - Byte: UTF-8 bytes (8 bits per byte)
4. **Error Correction** - Generates Reed-Solomon error correction codes
5. **Matrix Placement** - Places data in the QR matrix using the standard zigzag pattern

6. **Mask Optimization** - Tests all 8 masks and selects the one with the lowest penalty score:
   - Rule 1: Adjacent same-color modules
   - Rule 2: 2×2 blocks of same color
   - Rule 3: Finder-like patterns
   - Rule 4: Balance of dark/light modules
7. **Format Information** - Adds format and version information

## How to Use

**1. Clone the Repository:**

```bash
git clone https://github.com/nvmwhoiam/qr-code.git
```

**2. Navigate to the Project Directory:**

```bash
cd qr-code
```

**3. Open `index.html` in a Browser** or serve it using a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Usage

1. Enter Text: Type or paste your text into the input area. The QR code generator can handle up to 2,953 bytes of data (approximately 2,953 characters for basic Latin text, fewer for complex Unicode characters).
2. Generate QR Code:
   - Click the "Generate Code" button to create a QR code from your text
   - The generator automatically selects the smallest QR version that fits your data
   - Results update with the QR code visualization and technical details
3. Sample Testing: Use the sample text buttons to quickly test the generator with pre-written content at different lengths and complexity levels.
4. Download: Click the "Download SVG" button to save your QR code as a scalable vector graphic (SVG) file.
5. Interpret Results: The panel below the QR code displays technical information about your generated code:
   - Version: QR code version (1-40) - larger versions can store more data
   - ECC Level: Error correction capacity (L, M, Q, or H)
   - Mask Pattern: The selected mask pattern (0-7) used to optimize readability
   - Matrix Size: Dimensions of the QR code in modules (e.g., 21×21 for version 1)
   - Mode: Encoding mode used (Numeric, Alphanumeric, or Byte)
   - Length: Number of characters in your input text
6. Customization Options (if enabled):
   - Module Shape: Choose between rectangles, rounded rectangles, or circles
   - Colors: Customize the dark module color and background color

## Understanding the Results

- Version Selection: The generator automatically chooses the smallest version that can fit your data with the highest possible error correction level. If your text is too long for version 40 with the current ECC level, it will try lower ECC levels before failing.
- Error Correction: Higher ECC levels (H > Q > M > L) provide better damage resistance but reduce data capacity. The generator tries ECC levels in order: L → M → Q → H, using the first one that fits.
- Mask Patterns: All 8 possible masks are evaluated, and the one with the lowest penalty score (best readability) is automatically selected.

## Tips

- For URLs and short text, version 1-3 QR codes are typically used
- Longer texts (like paragraphs) will require larger versions (10+)
- Byte mode is automatically used for text containing lowercase letters or special characters
- The QR code includes quiet zone (margin) of 4 modules on all sides as required by the specification

## Screenshots

![Project screenshot](https://sadevworks.com/assets/img/projects/qr-code.png)

## Live Demo

[Live Demo](https://sadevworks.com/demo/qr-code)

## Contact

If you have any questions or need assistance, please do not hesitate to reach out. I apologize if any part of this setup is not clear; this is my first major project, and I am putting in continuous effort to improve it. Feel free to contact me at [info@sadevworks.com](mailto:info@sadevworks.com) or open an issue on the [GitHub Repository](https://github.com/nvmwhoiam/qr-code).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

- Email: [info@sadevworks.com](mailto:info@sadevworks.com)
- Website: [sadevworks.com](https://sadevworks.com)
- GitHub: [@nvmwhoiam](https://github.com/nvmwhoiam/)
