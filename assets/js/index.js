import GF from "./reed-solomon.js";
import { ALIGNMENT, ECC_LEVEL_BITS, QR_BLOCKS, QR_CAPACITY, MODES, CHAR_COUNT_BITS } from './objects.js';
import { downloadSVG } from './functions.js';

function getCharCountBits(version, mode) {
    if (version <= 9) return CHAR_COUNT_BITS[mode][0];
    if (version <= 26) return CHAR_COUNT_BITS[mode][1];
    return CHAR_COUNT_BITS[mode][2];
}

function detectMode(text) {
    if (text.length === 0) return MODES.BYTE;

    // 1. Check for numeric
    if (/^[0-9]+$/.test(text)) return MODES.NUMERIC;

    // 2. Check for alphanumeric - NO UPPERCASE CONVERSION HERE
    const alphanumericRegex = /^[0-9A-Z $%*+\-./:]+$/;

    // Test ORIGINAL text - if lowercase present, it fails
    if (alphanumericRegex.test(text)) {
        return MODES.ALPHANUMERIC;
    }

    // 3. Default to Byte mode for anything else
    return MODES.BYTE;
}

function createMatrix(size) {
    return { matrix: Array.from({ length: size }, () => Array(size).fill(null)), reserved: Array.from({ length: size }, () => Array(size).fill(false)) };
}

function addFinder(state, x, y) {
    const { matrix, reserved } = state;
    const pat = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ];
    for (let dy = 0; dy < 7; dy++) {
        for (let dx = 0; dx < 7; dx++) {
            const r = y + dy, c = x + dx;
            matrix[r][c] = pat[dy][dx];
            reserved[r][c] = true;
        }
    }
    // Add separator (single-module white) around finder
    for (let dy = -1; dy <= 7; dy++) {
        for (let dx = -1; dx <= 7; dx++) {
            const r = y + dy, c = x + dx;
            if (r < 0 || c < 0 || r >= matrix.length || c >= matrix.length) continue;
            if (dy < 0 || dy > 6 || dx < 0 || dx > 6) {
                if (matrix[r][c] === null) matrix[r][c] = 0;
                reserved[r][c] = true;
            }
        }
    }
}

function addTiming(state) {
    const { matrix, reserved } = state;
    const size = matrix.length;
    for (let c = 8; c <= size - 9; c++) {
        matrix[6][c] = c % 2;
        reserved[6][c] = true;
    }
    for (let r = 8; r <= size - 9; r++) {
        matrix[r][6] = r % 2;
        reserved[r][6] = true;
    }
}

function addDark(state) {
    const { matrix, reserved } = state;
    const size = matrix.length;
    matrix[size - 8][8] = 1;
    reserved[size - 8][8] = true;
}

function reserveFormat(state) {
    const { reserved } = state;
    const size = reserved.length;
    for (let i = 0; i <= 8; i++) {
        if (i !== 6) {
            reserved[8][i] = true;
            reserved[i][8] = true;
        }
    }
    for (let i = size - 8; i < size; i++) {
        reserved[8][i] = true;
        reserved[i][8] = true;
    }
}

function placeAlign(state, cy, cx) {
    const size = state.matrix.length;
    if (cy < 0 || cx < 0 || cy >= size || cx >= size) return;
    const pat = [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]];
    const sr = cy - 2, sc = cx - 2;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const rr = sr + r, cc = sc + c;
            if (rr < 0 || cc < 0 || rr >= size || cc >= size) continue;
            if (state.reserved[rr][cc]) continue;
            state.matrix[rr][cc] = pat[r][c];
            state.reserved[rr][cc] = true;
        }
    }
}

function addAlignment(state, version) {
    const pos = ALIGNMENT[version] || [];
    if (pos.length <= 1) return;

    for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
            const y = pos[i];
            const x = pos[j];

            // Skip positions that would overlap with finder patterns
            // Top-left finder: (0,0) to (6,6)
            // Top-right finder: (0, size-7) to (6, size-1)
            // Bottom-left finder: (size-7, 0) to (size-1, 6)
            const size = state.matrix.length;
            const overlapsFinder =
                (x < 7 && y < 7) ||                    // Top-left finder
                (x >= size - 7 && y < 7) ||            // Top-right finder  
                (x < 7 && y >= size - 7);              // Bottom-left finder

            // Skip positions on timing pattern (row 6 or column 6)
            const onTiming = x === 6 || y === 6;

            if (overlapsFinder || onTiming) {
                continue;
            }

            placeAlign(state, y, x);
        }
    }
}

function encodeData(text, version) {
    // Use provided mode or detect
    const mode = detectMode(text);

    // Get mode bits
    let bits = mode.bits;

    // Get character count bits based on version
    const modeName = mode.name;

    const countBits = getCharCountBits(version, modeName);

    // Encode based on mode
    if (mode === MODES.NUMERIC) {
        // Character count
        bits += text.length.toString(2).padStart(countBits, '0');

        // Encode numeric groups
        for (let i = 0; i < text.length; i += 3) {
            const group = text.substr(i, 3);
            const num = parseInt(group, 10);
            const bitsNeeded = group.length === 3 ? 10 :
                group.length === 2 ? 7 : 4;
            bits += num.toString(2).padStart(bitsNeeded, '0');
        }
    } else if (mode === MODES.ALPHANUMERIC) {
        // Character count
        bits += text.length.toString(2).padStart(countBits, '0');

        // Convert to uppercase for encoding
        const uppercaseText = text.toUpperCase();

        // Create alphanumeric value mapping
        const alphanumericValues = {};
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split('').forEach((char, idx) => {
            alphanumericValues[char] = idx;
        });

        // Encode in pairs
        for (let i = 0; i < uppercaseText.length; i += 2) {
            const pair = uppercaseText.substr(i, 2);
            if (pair.length === 2) {
                const value = alphanumericValues[pair[0]] * 45 + alphanumericValues[pair[1]];
                bits += value.toString(2).padStart(11, '0');
            } else {
                // Single character at the end
                bits += alphanumericValues[pair[0]].toString(2).padStart(6, '0');
            }
        }
    } else { // BYTE mode
        const encoder = new TextEncoder();
        const bytes = encoder.encode(text);

        // Byte count (not character count!)
        bits += bytes.length.toString(2).padStart(countBits, '0');

        // Encode each byte
        for (const byte of bytes) {
            bits += byte.toString(2).padStart(8, '0');
        }
    }

    return bits;
}

function padBits(bits, targetLength) {
    let padded = bits;

    // 1. Add terminator (up to 4 zeros)
    if (padded.length < targetLength) {
        const terminatorBits = Math.min(4, targetLength - padded.length);
        padded += '0'.repeat(terminatorBits);
    }

    // 2. If still not at target, add more zeros to make multiple of 8
    if (padded.length < targetLength) {
        const neededZeros = (8 - (padded.length % 8)) % 8;
        padded += '0'.repeat(Math.min(neededZeros, targetLength - padded.length));
    }

    // 3. Add padding bytes until we reach target length
    const padBytes = ['11101100', '00010001']; // 236 and 17
    let padIndex = 0;

    while (padded.length < targetLength) {
        const neededBits = Math.min(8, targetLength - padded.length);
        if (neededBits === 8) {
            padded += padBytes[padIndex % 2];
        } else {
            padded += padBytes[padIndex % 2].substring(0, neededBits);
        }
        padIndex++;
    }

    return padded;
}

function bitsToBytes(bits) {
    const out = [];
    for (let i = 0; i < bits.length; i += 8) {
        out.push(parseInt(bits.slice(i, i + 8), 2));
    }
    return out;
}

function getDataCapacity(version, ecc) {
    const blocks = QR_BLOCKS[version][ecc];
    let totalCapacity = 0;

    // Calculate total data codewords capacity
    for (const group of blocks.groups) {
        totalCapacity += group.count * group.data;
    }

    return totalCapacity;
}

function chooseVersion(text, ecc) {
    const mode = detectMode(text);

    const modeName = mode.name;

    for (let v = 1; v <= 40; v++) {
        const maxCapacity = QR_CAPACITY[v][ecc][modeName];

        // Check if text fits in capacity
        if (mode === MODES.BYTE) {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(text);
            if (bytes.length > maxCapacity) {
                continue; // Too big for this version
            }
        } else if (text.length > maxCapacity) {
            continue; // Too big for this version
        }

        try {
            // Encode to bits first
            const bits = encodeData(text, v);

            // Check if encoded bits fit in data capacity
            const capacityBits = getDataCapacity(v, ecc) * 8;

            // Calculate required bits (including terminator and padding)
            const requiredBits = Math.ceil(bits.length / 8) * 8;
            if (requiredBits > capacityBits) {
                continue; // Doesn't fit, try next version
            }

            // Pad bits to capacity
            const paddedBits = padBits(bits, capacityBits);

            return {
                version: v,
                mode,
                paddedBits
            };
        } catch (err) {
            console.log(`Version ${v} failed: ${err.message}`);
            continue;
        }
    }

    throw new Error(`Text "${text.substring(0, 20)}..." is too long for QR Code (max version 40)`);
}

function placeDataBits(state, dataBits, positions) {
    const { matrix, reserved } = state;
    const size = matrix.length;
    let bitIndex = 0, col = size - 1;
    let directionUp = true; // Start going upward

    while (col > 0 && bitIndex < dataBits.length) {
        // Skip column 6 (timing pattern)
        if (col === 6) col--;

        if (directionUp) {
            // Move upward
            for (let row = size - 1; row >= 0 && bitIndex < dataBits.length; row--) {
                // Place in right column
                if (!reserved[row][col] && matrix[row][col] === null) {
                    matrix[row][col] = dataBits[bitIndex++];
                    positions.add(`${row},${col}`);
                }

                // Place in left column (if available and not skipping timing)
                if (col > 0 && bitIndex < dataBits.length) {
                    const leftCol = col - 1;
                    if (leftCol !== 6 && !reserved[row][leftCol] && matrix[row][leftCol] === null) {
                        matrix[row][leftCol] = dataBits[bitIndex++];
                        positions.add(`${row},${leftCol}`);
                    }
                }
            }
        } else {
            // Move downward
            for (let row = 0; row < size && bitIndex < dataBits.length; row++) {
                // Place in right column
                if (!reserved[row][col] && matrix[row][col] === null) {
                    matrix[row][col] = dataBits[bitIndex++];
                    positions.add(`${row},${col}`);
                }

                // Place in left column
                if (col > 0 && bitIndex < dataBits.length) {
                    const leftCol = col - 1;
                    if (leftCol !== 6 && !reserved[row][leftCol] && matrix[row][leftCol] === null) {
                        matrix[row][leftCol] = dataBits[bitIndex++];
                        positions.add(`${row},${leftCol}`);
                    }
                }
            }
        }

        // Toggle direction and move left 2 columns
        directionUp = !directionUp;
        col -= 2;
    }

    return bitIndex;
}

function applyMask(matrix, maskPattern, positions) {
    for (const key of positions) {
        const [r, c] = key.split(',').map(Number);
        let invert = false;
        switch (maskPattern) {
            case 0: invert = (r + c) % 2 === 0; break;
            case 1: invert = r % 2 === 0; break;
            case 2: invert = c % 3 === 0; break;
            case 3: invert = (r + c) % 3 === 0; break;
            case 4: invert = (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0; break;
            case 5: invert = ((r * c) % 2 + (r * c) % 3) === 0; break;
            case 6: invert = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0; break;
            case 7: invert = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0; break;
        }
        if (invert) matrix[r][c] ^= 1;
    }
}

function calculateFormatBits(eccLevelBits, maskPattern) {
    let formatData = (eccLevelBits << 3) | maskPattern;
    const generator = 0b10100110111;
    let rem = formatData << 10;
    for (let i = 14; i >= 10; i--) {
        if (rem & (1 << i)) rem ^= generator << (i - 10);
    }
    const combined = (formatData << 10) | (rem & 0x3FF);
    return (combined ^ 0b101010000010010).toString(2).padStart(15, '0');
}

function placeFormatBits(state, eccLevelBits, maskPattern) {
    const bits = calculateFormatBits(eccLevelBits, maskPattern).split('').map(b => parseInt(b, 10));
    const { matrix, reserved } = state;
    const size = matrix.length;

    const coordsA = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5],
        [8, 7], [8, 8], [7, 8], [6, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8]
    ];
    for (let i = 0; i < coordsA.length; i++) {
        const [r, c] = coordsA[i];
        matrix[r][c] = bits[i];
        reserved[r][c] = true;
    }

    const coordsB = [
        [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8],
        [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1], [8, size - 8], [8, size - 9]
    ];

    for (let i = 0; i < coordsB.length && i < bits.length; i++) {
        const [r, c] = coordsB[i];
        matrix[r][c] = bits[i];
        reserved[r][c] = true;
    }
}

function calculateVersionBits(version) {
    let v = version << 12;
    const generator = 0x1f25;
    for (let i = 17; i >= 12; i--) {
        if (v & (1 << i)) v ^= generator << (i - 12);
    }
    return ((version << 12) | (v & 0xFFF)).toString(2).padStart(18, '0');
}

function placeVersionBits(state, version) {
    if (version < 7) return;

    const bits = calculateVersionBits(version).split('').map(Number);
    const { matrix, reserved } = state;
    const size = matrix.length;

    // Bottom-left (normal order)
    let idx = 0;
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 3; c++) {
            matrix[size - 11 + r][c] = bits[idx++];
        }
    }

    // Top-right (REVERSED order)
    idx = 17;
    for (let c = 0; c < 6; c++) {
        for (let r = 0; r < 3; r++) {
            matrix[r][size - 11 + c] = bits[idx--];
        }
    }
}

function generateQRCode(text) {
    // First, validate input length
    if (text.length === 0) {
        throw new Error("Text cannot be empty");
    }

    // Try different ECC levels
    const eccLevels = ['L', 'M', 'Q', 'H'];
    let chosen = null;

    for (const ecc of eccLevels) {
        try {
            chosen = chooseVersion(text, ecc);
            chosen.ecc = ecc;
            console.log(`Using version ${chosen.version} with ${ecc} ECC`);
            break;
        } catch (err) {
            console.log(`ECC ${ecc} failed: ${err.message}`);
            continue;
        }
    }

    if (!chosen) {
        throw new Error(`Text "${text.substring(0, 20)}..." is too long for QR Code (max version 40)`);
    }

    const { version, paddedBits, ecc } = chosen;
    const dataBytes = bitsToBytes(paddedBits);

    // Validate we have the right number of data bytes
    const blocksDef = QR_BLOCKS[version][ecc];
    const totalDataCodewords = blocksDef.groups.reduce((sum, g) => sum + g.count * g.data, 0);

    console.log(totalDataCodewords, dataBytes.length)

    if (dataBytes.length !== totalDataCodewords) {
        throw new Error(`Data length mismatch: ${dataBytes.length} vs ${totalDataCodewords}`);
    }

    // Generate Reed-Solomon error correction codes
    const dataBlocks = [];
    const eccBlocks = [];
    let offset = 0;

    for (const g of blocksDef.groups) {
        for (let i = 0; i < g.count; i++) {
            const block = dataBytes.slice(offset, offset + g.data);
            offset += g.data;
            dataBlocks.push(block);
            eccBlocks.push(GF.generateECC(block, blocksDef.ec));
        }
    }

    // Interleave data blocks
    const interleavedData = [];
    const maxDataBlockLength = Math.max(...dataBlocks.map(b => b.length));

    for (let i = 0; i < maxDataBlockLength; i++) {
        for (let blockIdx = 0; blockIdx < dataBlocks.length; blockIdx++) {
            if (i < dataBlocks[blockIdx].length) {
                interleavedData.push(dataBlocks[blockIdx][i]);
            }
        }
    }

    // Interleave ECC blocks
    const interleavedEcc = [];
    for (let i = 0; i < blocksDef.ec; i++) {
        for (let blockIdx = 0; blockIdx < eccBlocks.length; blockIdx++) {
            interleavedEcc.push(eccBlocks[blockIdx][i]);
        }
    }

    // Combine all bytes
    const allBytes = [...interleavedData, ...interleavedEcc];
    const dataBits = [];

    for (const b of allBytes) {
        for (let i = 7; i >= 0; i--) {
            dataBits.push((b >> i) & 1);
        }
    }

    // Create matrix
    const size = 21 + (version - 1) * 4;
    const state = createMatrix(size);

    // Add patterns
    addFinder(state, 0, 0);
    addFinder(state, size - 7, 0);
    addFinder(state, 0, size - 7);
    addTiming(state);
    addDark(state);
    reserveFormat(state);
    addAlignment(state, version);

    // Test all masks and choose best one
    const best = { score: Infinity, mask: 0, matrix: null };
    for (let mask = 0; mask < 8; mask++) {
        const trial = {
            matrix: state.matrix.map(r => r.slice()),
            reserved: state.reserved.map(r => r.slice())
        };
        const positions = new Set();
        placeDataBits(trial, dataBits, positions);

        if (positions.size !== dataBits.length) {
            throw new Error("Data placement mismatch");
        }

        applyMask(trial.matrix, mask, positions);
        placeFormatBits(trial, ECC_LEVEL_BITS[ecc], mask);
        placeVersionBits(trial, version);

        // Calculate penalty score (rules 1..4)
        let penalty = 0;

        // Condition 1: Adjacent same-color modules in row/column
        for (let r = 0; r < size; r++) {
            let run = 1, val = trial.matrix[r][0];
            for (let c = 1; c < size; c++) {
                if (trial.matrix[r][c] === val) {
                    run++;
                } else {
                    if (run >= 5) penalty += 3 + (run - 5);
                    val = trial.matrix[r][c];
                    run = 1;
                }
            }
            if (run >= 5) penalty += 3 + (run - 5);
        }

        for (let c = 0; c < size; c++) {
            let run = 1, val = trial.matrix[0][c];
            for (let r = 1; r < size; r++) {
                if (trial.matrix[r][c] === val) {
                    run++;
                } else {
                    if (run >= 5) penalty += 3 + (run - 5);
                    val = trial.matrix[r][c];
                    run = 1;
                }
            }
            if (run >= 5) penalty += 3 + (run - 5);
        }

        // Condition 2: 2x2 blocks of same color
        for (let r = 0; r < size - 1; r++) {
            for (let c = 0; c < size - 1; c++) {
                const v = trial.matrix[r][c];
                if (v === trial.matrix[r][c + 1] &&
                    v === trial.matrix[r + 1][c] &&
                    v === trial.matrix[r + 1][c + 1]) {
                    penalty += 3;
                }
            }
        }

        // Condition 3: Finder-like patterns (1011101 with 4 light modules on sides)
        function checkFinderPattern(line) {
            const s = line.join('');
            let count = 0;

            // Pattern: 1011101 preceded by 4 zeros or followed by 4 zeros
            // More precisely: look for "00001011101" or "10111010000" in 11-module window
            for (let i = 0; i <= s.length - 11; i++) {
                const window = s.substr(i, 11);
                if (window === '00001011101' || window === '10111010000') {
                    count++;
                }
            }
            return count;
        }

        // Check rows
        for (let r = 0; r < size; r++) {
            penalty += 40 * checkFinderPattern(trial.matrix[r]);
        }

        // Check columns
        for (let c = 0; c < size; c++) {
            const col = [];
            for (let r = 0; r < size; r++) {
                col.push(trial.matrix[r][c]);
            }
            penalty += 40 * checkFinderPattern(col);
        }

        // Condition 4: Balance of dark modules
        let darkCount = 0;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (trial.matrix[r][c] === 1) darkCount++;
            }
        }

        const totalModules = size * size;
        const percentDark = (darkCount * 100) / totalModules;
        const deviation = Math.abs(percentDark - 50);
        penalty += Math.floor(deviation / 5) * 10;

        if (penalty < best.score) {
            best.score = penalty;
            best.mask = mask;
            best.matrix = trial.matrix;
        }
    }

    // Validate all cells are filled
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (best.matrix[r][c] === null) {
                // Fill with 0 (white) if somehow still null
                best.matrix[r][c] = 0;
            }
        }
    }

    return { matrix: best.matrix, version, mask: best.mask, ecc, mode: chosen.mode };
}





function debugVersionSelection(text) {
    console.log("=== DEBUG VERSION SELECTION ===");
    console.log(`Text length: ${text.length} characters`);

    // Check capacities for each version
    console.log("\nVersion capacities (data codewords):");
    for (let v = 1; v <= 40; v++) {
        console.log(`Version ${v}:`);
        for (const ecc of ['L', 'M', 'Q', 'H']) {
            const capacity = getDataCapacity(v, ecc);
            console.log(`  ${ecc}: ${capacity} codewords (${capacity * 8} bits)`);
        }
    }

    // // Test encoding for each version
    // console.log("\nEncoded bit lengths:");
    // for (let v = 1; v <= 40; v++) {
    //     const bits = encodeData(text, v);
    //     console.log(`Version ${v}: ${bits.length} bits, ${Math.ceil(bits.length / 8)} bytes`);
    // }

    console.log("=== END DEBUG ===");
}

function renderSVG(matrix, moduleSize = 8, shape = 'rectangle', color = 'black', bgColor = 'white') {
    const size = matrix.length;
    const quiet = 4;
    const totalSize = (size + quiet * 2) * moduleSize;
    let svg = `<svg width="${totalSize}" height="${totalSize}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="${bgColor}"/>`;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (matrix[r][c] === 1) {
                const x = (c + quiet) * moduleSize;
                const y = (r + quiet) * moduleSize;

                if (shape === 'rectangle') {
                    svg += `<rect width="${moduleSize}" height="${moduleSize}" x="${x}" y="${y}" fill="${color}"/>`;
                } else if (shape === 'rectangle_radius') {
                    const borderRadius = moduleSize * 0.3;
                    svg += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${borderRadius}" ry="${borderRadius}" fill="${color}"/>`;
                } else if (shape === 'circle') {
                    const radius = moduleSize / 2;
                    const cx = x + radius; // center x
                    const cy = y + radius; // center y
                    svg += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" />`;
                }
            }
        }
    }
    svg += '</svg>';
    return svg;
}

function generateAndRender() {
    try {
        const text = document.getElementById('qrCodeText').value || 'https://dev.to';

        const mode = detectMode(text);
        const modeName = mode.name;

        // // Add debug output
        // debugVersionSelection(text);

        // const shape = document.getElementById('qrCodeShape').value;
        // const color = document.getElementById('qrCodeColor').value;
        // const bgColor = document.getElementById('qrCodeBGColor').value;
        const moduleSize = 7.5;

        const result = generateQRCode(text);
        const svgContainer = document.getElementById('svg-container');
        svgContainer.innerHTML = renderSVG(result.matrix, moduleSize);

        // Update info display
        document.getElementById('version').innerHTML = result.version;
        document.getElementById('mask_pattern').innerHTML = result.mask;
        document.getElementById('ecc_level').innerHTML = result.ecc;
        document.getElementById('matrix_size').innerHTML = `${result.matrix.length} x ${result.matrix.length}`;
        document.getElementById('mode').innerHTML = modeName;
        document.getElementById('length').innerHTML = `${text.length} chars`;

    } catch (err) {
        console.error(err);
        alert('Error: ' + err.message);
    }
}

generateAndRender();

document.addEventListener('click', (e) => {
    const generateQRCodeButton = e.target.closest('[data-button="generate_code"]');
    if (generateQRCodeButton) {
        generateAndRender();
    }

    const svgDownloadButton = e.target.closest('[data-button="download_svg"]');
    if (svgDownloadButton) {
        downloadSVG();
    }
});