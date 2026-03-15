export const ALIGNMENT = {
    1: [],
    2: [6, 18],
    3: [6, 22],
    4: [6, 26],
    5: [6, 30],
    6: [6, 34],
    7: [6, 22, 38],
    8: [6, 24, 42],
    9: [6, 26, 46],
    10: [6, 28, 50],
    11: [6, 30, 54],
    12: [6, 32, 58],
    13: [6, 34, 62],
    14: [6, 26, 46, 66],
    15: [6, 26, 48, 70],
    16: [6, 26, 50, 74],
    17: [6, 30, 54, 78],
    18: [6, 30, 56, 82],
    19: [6, 30, 58, 86],
    20: [6, 34, 62, 90],
    21: [6, 28, 50, 72, 94],
    22: [6, 26, 50, 74, 98],
    23: [6, 30, 54, 78, 102],
    24: [6, 28, 54, 80, 106],
    25: [6, 32, 58, 84, 110],
    26: [6, 30, 58, 86, 114],
    27: [6, 34, 62, 90, 118],
    28: [6, 26, 50, 74, 98, 122],
    29: [6, 30, 54, 78, 102, 126],
    30: [6, 26, 52, 78, 104, 130],
    31: [6, 30, 56, 82, 108, 134],
    32: [6, 34, 60, 86, 112, 138],
    33: [6, 30, 58, 86, 114, 142],
    34: [6, 34, 62, 90, 118, 146],
    35: [6, 30, 54, 78, 102, 126, 150],
    36: [6, 24, 50, 76, 102, 128, 154],
    37: [6, 28, 54, 80, 106, 132, 158],
    38: [6, 32, 58, 84, 110, 136, 162],
    39: [6, 26, 50, 74, 98, 122, 146, 170],
    40: [6, 30, 54, 78, 102, 126, 150, 174]
};

export const ECC_LEVEL_BITS = { L: 1, M: 0, Q: 3, H: 2 };

export const QR_BLOCKS = {
    1: {
        L: { ec: 7, groups: [{ count: 1, data: 19 }] },
        M: { ec: 10, groups: [{ count: 1, data: 16 }] },
        Q: { ec: 13, groups: [{ count: 1, data: 13 }] },
        H: { ec: 17, groups: [{ count: 1, data: 9 }] }
    },
    2: {
        L: { ec: 10, groups: [{ count: 1, data: 34 }] },
        M: { ec: 16, groups: [{ count: 1, data: 28 }] },
        Q: { ec: 22, groups: [{ count: 1, data: 22 }] },
        H: { ec: 28, groups: [{ count: 1, data: 16 }] }
    },
    3: {
        L: { ec: 15, groups: [{ count: 1, data: 55 }] },
        M: { ec: 26, groups: [{ count: 1, data: 44 }] },
        Q: { ec: 18, groups: [{ count: 2, data: 17 }, { count: 2, data: 18 }] },
        H: { ec: 22, groups: [{ count: 2, data: 13 }] }
    },
    4: {
        L: { ec: 20, groups: [{ count: 1, data: 80 }] },
        M: { ec: 18, groups: [{ count: 2, data: 32 }] },
        Q: { ec: 26, groups: [{ count: 2, data: 24 }] },
        H: { ec: 16, groups: [{ count: 4, data: 9 }] }
    },
    5: {
        L: { ec: 26, groups: [{ count: 1, data: 108 }] },
        M: { ec: 24, groups: [{ count: 2, data: 43 }] },
        Q: { ec: 18, groups: [{ count: 2, data: 15 }, { count: 2, data: 16 }] },
        H: { ec: 22, groups: [{ count: 2, data: 11 }, { count: 2, data: 12 }] }
    },
    6: {
        L: { ec: 18, groups: [{ count: 2, data: 68 }] },
        M: { ec: 16, groups: [{ count: 4, data: 27 }] },
        Q: { ec: 24, groups: [{ count: 4, data: 19 }] },
        H: { ec: 28, groups: [{ count: 4, data: 15 }] }
    },
    7: {
        L: { ec: 20, groups: [{ count: 2, data: 78 }] },
        M: { ec: 18, groups: [{ count: 4, data: 31 }] },
        Q: { ec: 18, groups: [{ count: 2, data: 14 }, { count: 4, data: 15 }] },
        H: { ec: 26, groups: [{ count: 4, data: 13 }, { count: 1, data: 14 }] }
    },
    8: {
        L: { ec: 24, groups: [{ count: 2, data: 97 }] },
        M: { ec: 22, groups: [{ count: 2, data: 38 }, { count: 2, data: 39 }] },
        Q: { ec: 22, groups: [{ count: 4, data: 18 }, { count: 2, data: 19 }] },
        H: { ec: 26, groups: [{ count: 4, data: 14 }, { count: 2, data: 15 }] }
    },
    9: {
        L: { ec: 30, groups: [{ count: 2, data: 116 }] },
        M: { ec: 22, groups: [{ count: 3, data: 36 }, { count: 2, data: 37 }] },
        Q: { ec: 20, groups: [{ count: 4, data: 16 }, { count: 4, data: 17 }] },
        H: { ec: 24, groups: [{ count: 4, data: 12 }, { count: 4, data: 13 }] }
    },
    10: {
        L: { ec: 18, groups: [{ count: 2, data: 68 }, { count: 2, data: 69 }] },
        M: { ec: 26, groups: [{ count: 4, data: 43 }, { count: 1, data: 44 }] },
        Q: { ec: 24, groups: [{ count: 6, data: 19 }, { count: 2, data: 20 }] },
        H: { ec: 28, groups: [{ count: 6, data: 15 }, { count: 2, data: 16 }] }
    },
    11: {
        L: { ec: 30, groups: [{ count: 4, data: 81 }] },
        M: { ec: 28, groups: [{ count: 4, data: 63 }, { count: 1, data: 64 }] },
        Q: { ec: 28, groups: [{ count: 4, data: 48 }, { count: 2, data: 49 }] },
        H: { ec: 30, groups: [{ count: 4, data: 34 }, { count: 2, data: 35 }] }
    },
    12: {
        L: { ec: 30, groups: [{ count: 4, data: 97 }] },
        M: { ec: 28, groups: [{ count: 4, data: 75 }] },
        Q: { ec: 30, groups: [{ count: 4, data: 54 }, { count: 2, data: 55 }] },
        H: { ec: 30, groups: [{ count: 4, data: 43 }, { count: 2, data: 44 }] }
    },
    13: {
        L: { ec: 30, groups: [{ count: 4, data: 107 }] },
        M: { ec: 28, groups: [{ count: 4, data: 84 }] },
        Q: { ec: 30, groups: [{ count: 4, data: 60 }] },
        H: { ec: 30, groups: [{ count: 4, data: 50 }] }
    },
    14: {
        L: { ec: 30, groups: [{ count: 4, data: 115 }] },
        M: { ec: 28, groups: [{ count: 4, data: 90 }] },
        Q: { ec: 30, groups: [{ count: 4, data: 66 }] },
        H: { ec: 30, groups: [{ count: 4, data: 56 }] }
    },
    15: {
        L: { ec: 30, groups: [{ count: 4, data: 130 }] },
        M: { ec: 28, groups: [{ count: 4, data: 106 }] },
        Q: { ec: 30, groups: [{ count: 4, data: 74 }] },
        H: { ec: 30, groups: [{ count: 4, data: 64 }] }
    },
    16: {
        L: { ec: 24, groups: [{ count: 5, data: 98 }, { count: 1, data: 99 }] },
        M: { ec: 28, groups: [{ count: 7, data: 45 }, { count: 3, data: 46 }] },
        Q: { ec: 24, groups: [{ count: 15, data: 19 }, { count: 2, data: 20 }] },
        H: { ec: 30, groups: [{ count: 3, data: 15 }, { count: 13, data: 16 }] }
    },
    17: {
        L: { ec: 28, groups: [{ count: 1, data: 107 }, { count: 5, data: 108 }] },
        M: { ec: 28, groups: [{ count: 10, data: 46 }, { count: 1, data: 47 }] },
        Q: { ec: 28, groups: [{ count: 1, data: 22 }, { count: 15, data: 23 }] },
        H: { ec: 28, groups: [{ count: 2, data: 14 }, { count: 17, data: 15 }] }
    },
    18: {
        L: { ec: 30, groups: [{ count: 5, data: 120 }, { count: 1, data: 121 }] },
        M: { ec: 26, groups: [{ count: 9, data: 43 }, { count: 4, data: 44 }] },
        Q: { ec: 28, groups: [{ count: 17, data: 22 }, { count: 1, data: 23 }] },
        H: { ec: 28, groups: [{ count: 2, data: 14 }, { count: 19, data: 15 }] }
    },
    19: {
        L: { ec: 28, groups: [{ count: 3, data: 113 }, { count: 4, data: 114 }] },
        M: { ec: 26, groups: [{ count: 3, data: 44 }, { count: 11, data: 45 }] },
        Q: { ec: 26, groups: [{ count: 17, data: 21 }, { count: 4, data: 22 }] },
        H: { ec: 26, groups: [{ count: 9, data: 13 }, { count: 16, data: 14 }] }
    },
    20: {
        L: { ec: 28, groups: [{ count: 3, data: 107 }, { count: 5, data: 108 }] },
        M: { ec: 26, groups: [{ count: 3, data: 41 }, { count: 13, data: 42 }] },
        Q: { ec: 30, groups: [{ count: 15, data: 24 }, { count: 5, data: 25 }] },
        H: { ec: 28, groups: [{ count: 15, data: 15 }, { count: 10, data: 16 }] }
    },
    21: {
        L: { ec: 28, groups: [{ count: 4, data: 116 }, { count: 4, data: 117 }] },
        M: { ec: 26, groups: [{ count: 17, data: 42 }] },
        Q: { ec: 28, groups: [{ count: 17, data: 22 }, { count: 6, data: 23 }] },
        H: { ec: 30, groups: [{ count: 19, data: 16 }, { count: 6, data: 17 }] }
    },
    22: {
        L: { ec: 28, groups: [{ count: 2, data: 111 }, { count: 7, data: 112 }] },
        M: { ec: 28, groups: [{ count: 17, data: 46 }] },
        Q: { ec: 30, groups: [{ count: 7, data: 24 }, { count: 16, data: 25 }] },
        H: { ec: 24, groups: [{ count: 34, data: 13 }] }
    },
    23: {
        L: { ec: 30, groups: [{ count: 4, data: 121 }, { count: 5, data: 122 }] },
        M: { ec: 28, groups: [{ count: 4, data: 47 }, { count: 14, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 11, data: 24 }, { count: 14, data: 25 }] },
        H: { ec: 30, groups: [{ count: 16, data: 15 }, { count: 14, data: 16 }] }
    },
    24: {
        L: { ec: 30, groups: [{ count: 6, data: 117 }, { count: 4, data: 118 }] },
        M: { ec: 28, groups: [{ count: 6, data: 45 }, { count: 14, data: 46 }] },
        Q: { ec: 30, groups: [{ count: 11, data: 24 }, { count: 16, data: 25 }] },
        H: { ec: 30, groups: [{ count: 30, data: 16 }, { count: 2, data: 17 }] }
    },
    25: {
        L: { ec: 26, groups: [{ count: 8, data: 106 }, { count: 4, data: 107 }] },
        M: { ec: 28, groups: [{ count: 8, data: 47 }, { count: 13, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 7, data: 24 }, { count: 22, data: 25 }] },
        H: { ec: 30, groups: [{ count: 22, data: 15 }, { count: 13, data: 16 }] }
    },
    26: {
        L: { ec: 28, groups: [{ count: 10, data: 114 }, { count: 2, data: 115 }] },
        M: { ec: 28, groups: [{ count: 19, data: 46 }, { count: 4, data: 47 }] },
        Q: { ec: 28, groups: [{ count: 28, data: 22 }, { count: 6, data: 23 }] },
        H: { ec: 30, groups: [{ count: 33, data: 16 }, { count: 4, data: 17 }] }
    },
    27: {
        L: { ec: 30, groups: [{ count: 8, data: 122 }, { count: 4, data: 123 }] },
        M: { ec: 28, groups: [{ count: 22, data: 45 }, { count: 3, data: 46 }] },
        Q: { ec: 30, groups: [{ count: 8, data: 23 }, { count: 26, data: 24 }] },
        H: { ec: 30, groups: [{ count: 12, data: 15 }, { count: 28, data: 16 }] }
    },
    28: {
        L: { ec: 30, groups: [{ count: 3, data: 117 }, { count: 10, data: 118 }] },
        M: { ec: 28, groups: [{ count: 3, data: 45 }, { count: 23, data: 46 }] },
        Q: { ec: 30, groups: [{ count: 4, data: 24 }, { count: 31, data: 25 }] },
        H: { ec: 30, groups: [{ count: 11, data: 15 }, { count: 31, data: 16 }] }
    },
    29: {
        L: { ec: 30, groups: [{ count: 7, data: 116 }, { count: 7, data: 117 }] },
        M: { ec: 28, groups: [{ count: 21, data: 45 }, { count: 7, data: 46 }] },
        Q: { ec: 30, groups: [{ count: 1, data: 23 }, { count: 37, data: 24 }] },
        H: { ec: 30, groups: [{ count: 19, data: 15 }, { count: 26, data: 16 }] }
    },
    30: {
        L: { ec: 30, groups: [{ count: 5, data: 115 }, { count: 10, data: 116 }] },
        M: { ec: 28, groups: [{ count: 19, data: 47 }, { count: 10, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 15, data: 24 }, { count: 25, data: 25 }] },
        H: { ec: 30, groups: [{ count: 23, data: 15 }, { count: 25, data: 16 }] }
    },
    31: {
        L: { ec: 30, groups: [{ count: 13, data: 115 }, { count: 3, data: 116 }] },
        M: { ec: 28, groups: [{ count: 2, data: 46 }, { count: 29, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 42, data: 24 }, { count: 1, data: 25 }] },
        H: { ec: 30, groups: [{ count: 23, data: 15 }, { count: 28, data: 16 }] }
    },
    32: {
        L: { ec: 30, groups: [{ count: 17, data: 115 }] },
        M: { ec: 28, groups: [{ count: 10, data: 46 }, { count: 23, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 10, data: 24 }, { count: 35, data: 25 }] },
        H: { ec: 30, groups: [{ count: 19, data: 15 }, { count: 35, data: 16 }] }
    },
    33: {
        L: { ec: 30, groups: [{ count: 17, data: 115 }, { count: 1, data: 116 }] },
        M: { ec: 28, groups: [{ count: 14, data: 46 }, { count: 21, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 29, data: 24 }, { count: 19, data: 25 }] },
        H: { ec: 30, groups: [{ count: 11, data: 15 }, { count: 46, data: 16 }] }
    },
    34: {
        L: { ec: 30, groups: [{ count: 13, data: 115 }, { count: 6, data: 116 }] },
        M: { ec: 28, groups: [{ count: 14, data: 46 }, { count: 23, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 44, data: 24 }, { count: 7, data: 25 }] },
        H: { ec: 30, groups: [{ count: 59, data: 16 }, { count: 1, data: 17 }] }
    },
    35: {
        L: { ec: 30, groups: [{ count: 12, data: 121 }, { count: 7, data: 122 }] },
        M: { ec: 28, groups: [{ count: 12, data: 47 }, { count: 26, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 39, data: 24 }, { count: 14, data: 25 }] },
        H: { ec: 30, groups: [{ count: 22, data: 15 }, { count: 41, data: 16 }] }
    },
    36: {
        L: { ec: 30, groups: [{ count: 6, data: 121 }, { count: 14, data: 122 }] },
        M: { ec: 28, groups: [{ count: 6, data: 47 }, { count: 34, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 46, data: 24 }, { count: 10, data: 25 }] },
        H: { ec: 30, groups: [{ count: 2, data: 15 }, { count: 64, data: 16 }] }
    },
    37: {
        L: { ec: 30, groups: [{ count: 17, data: 122 }, { count: 4, data: 123 }] },
        M: { ec: 28, groups: [{ count: 29, data: 46 }, { count: 14, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 49, data: 24 }, { count: 10, data: 25 }] },
        H: { ec: 30, groups: [{ count: 24, data: 15 }, { count: 46, data: 16 }] }
    },
    38: {
        L: { ec: 30, groups: [{ count: 4, data: 122 }, { count: 18, data: 123 }] },
        M: { ec: 28, groups: [{ count: 13, data: 46 }, { count: 32, data: 47 }] },
        Q: { ec: 30, groups: [{ count: 48, data: 24 }, { count: 14, data: 25 }] },
        H: { ec: 30, groups: [{ count: 42, data: 15 }, { count: 32, data: 16 }] }
    },
    39: {
        L: { ec: 30, groups: [{ count: 20, data: 117 }, { count: 4, data: 118 }] },
        M: { ec: 28, groups: [{ count: 40, data: 47 }, { count: 7, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 43, data: 24 }, { count: 22, data: 25 }] },
        H: { ec: 30, groups: [{ count: 10, data: 15 }, { count: 67, data: 16 }] }
    },
    40: {
        L: { ec: 30, groups: [{ count: 19, data: 118 }, { count: 6, data: 119 }] },
        M: { ec: 28, groups: [{ count: 18, data: 47 }, { count: 31, data: 48 }] },
        Q: { ec: 30, groups: [{ count: 34, data: 24 }, { count: 34, data: 25 }] },
        H: { ec: 30, groups: [{ count: 20, data: 15 }, { count: 61, data: 16 }] }
    }
};

export const QR_CAPACITY = {
    1: {
        L: { numeric: 41, alphanumeric: 25, byte: 17, kanji: 10 },
        M: { numeric: 34, alphanumeric: 20, byte: 14, kanji: 8 },
        Q: { numeric: 27, alphanumeric: 16, byte: 11, kanji: 7 },
        H: { numeric: 17, alphanumeric: 10, byte: 7, kanji: 4 }
    },
    2: {
        L: { numeric: 77, alphanumeric: 47, byte: 32, kanji: 20 },
        M: { numeric: 63, alphanumeric: 38, byte: 26, kanji: 16 },
        Q: { numeric: 48, alphanumeric: 29, byte: 20, kanji: 12 },
        H: { numeric: 34, alphanumeric: 20, byte: 14, kanji: 8 }
    },
    3: {
        L: { numeric: 127, alphanumeric: 77, byte: 53, kanji: 32 },
        M: { numeric: 101, alphanumeric: 61, byte: 42, kanji: 26 },
        Q: { numeric: 77, alphanumeric: 47, byte: 32, kanji: 20 },
        H: { numeric: 58, alphanumeric: 35, byte: 24, kanji: 15 }
    },
    4: {
        L: { numeric: 187, alphanumeric: 114, byte: 78, kanji: 48 },
        M: { numeric: 149, alphanumeric: 90, byte: 62, kanji: 38 },
        Q: { numeric: 111, alphanumeric: 67, byte: 46, kanji: 28 },
        H: { numeric: 82, alphanumeric: 50, byte: 34, kanji: 21 }
    },
    5: {
        L: { numeric: 255, alphanumeric: 154, byte: 106, kanji: 65 },
        M: { numeric: 202, alphanumeric: 122, byte: 84, kanji: 52 },
        Q: { numeric: 144, alphanumeric: 87, byte: 60, kanji: 37 },
        H: { numeric: 106, alphanumeric: 64, byte: 44, kanji: 27 }
    },
    6: {
        L: { numeric: 322, alphanumeric: 195, byte: 134, kanji: 82 },
        M: { numeric: 255, alphanumeric: 154, byte: 106, kanji: 65 },
        Q: { numeric: 178, alphanumeric: 108, byte: 74, kanji: 45 },
        H: { numeric: 139, alphanumeric: 84, byte: 58, kanji: 36 }
    },
    7: {
        L: { numeric: 370, alphanumeric: 224, byte: 154, kanji: 95 },
        M: { numeric: 293, alphanumeric: 178, byte: 122, kanji: 75 },
        Q: { numeric: 207, alphanumeric: 125, byte: 86, kanji: 53 },
        H: { numeric: 154, alphanumeric: 93, byte: 64, kanji: 39 }
    },
    8: {
        L: { numeric: 461, alphanumeric: 279, byte: 192, kanji: 118 },
        M: { numeric: 365, alphanumeric: 221, byte: 152, kanji: 93 },
        Q: { numeric: 259, alphanumeric: 157, byte: 108, kanji: 66 },
        H: { numeric: 202, alphanumeric: 122, byte: 84, kanji: 52 }
    },
    9: {
        L: { numeric: 552, alphanumeric: 335, byte: 230, kanji: 141 },
        M: { numeric: 432, alphanumeric: 262, byte: 180, kanji: 111 },
        Q: { numeric: 312, alphanumeric: 189, byte: 130, kanji: 80 },
        H: { numeric: 235, alphanumeric: 143, byte: 98, kanji: 60 }
    },
    10: {
        L: { numeric: 652, alphanumeric: 395, byte: 271, kanji: 167 },
        M: { numeric: 513, alphanumeric: 311, byte: 213, kanji: 131 },
        Q: { numeric: 364, alphanumeric: 221, byte: 151, kanji: 93 },
        H: { numeric: 288, alphanumeric: 174, byte: 119, kanji: 74 }
    },
    11: {
        L: { numeric: 772, alphanumeric: 468, byte: 321, kanji: 198 },
        M: { numeric: 604, alphanumeric: 366, byte: 251, kanji: 155 },
        Q: { numeric: 427, alphanumeric: 259, byte: 177, kanji: 109 },
        H: { numeric: 331, alphanumeric: 200, byte: 137, kanji: 85 }
    },
    12: {
        L: { numeric: 883, alphanumeric: 535, byte: 367, kanji: 226 },
        M: { numeric: 691, alphanumeric: 419, byte: 287, kanji: 177 },
        Q: { numeric: 490, alphanumeric: 296, byte: 203, kanji: 125 },
        H: { numeric: 374, alphanumeric: 227, byte: 155, kanji: 96 }
    },
    13: {
        L: { numeric: 1022, alphanumeric: 619, byte: 425, kanji: 262 },
        M: { numeric: 796, alphanumeric: 483, byte: 331, kanji: 204 },
        Q: { numeric: 580, alphanumeric: 352, byte: 241, kanji: 149 },
        H: { numeric: 427, alphanumeric: 259, byte: 177, kanji: 109 }
    },
    14: {
        L: { numeric: 1101, alphanumeric: 667, byte: 458, kanji: 282 },
        M: { numeric: 871, alphanumeric: 528, byte: 362, kanji: 223 },
        Q: { numeric: 621, alphanumeric: 376, byte: 258, kanji: 159 },
        H: { numeric: 468, alphanumeric: 283, byte: 194, kanji: 120 }
    },
    15: {
        L: { numeric: 1250, alphanumeric: 758, byte: 520, kanji: 320 },
        M: { numeric: 991, alphanumeric: 600, byte: 412, kanji: 254 },
        Q: { numeric: 703, alphanumeric: 426, byte: 292, kanji: 180 },
        H: { numeric: 530, alphanumeric: 321, byte: 220, kanji: 136 }
    },
    16: {
        L: { numeric: 1408, alphanumeric: 854, byte: 586, kanji: 361 },
        M: { numeric: 1082, alphanumeric: 656, byte: 450, kanji: 277 },
        Q: { numeric: 775, alphanumeric: 470, byte: 322, kanji: 198 },
        H: { numeric: 602, alphanumeric: 365, byte: 250, kanji: 154 }
    },
    17: {
        L: { numeric: 1548, alphanumeric: 938, byte: 644, kanji: 397 },
        M: { numeric: 1212, alphanumeric: 734, byte: 504, kanji: 310 },
        Q: { numeric: 876, alphanumeric: 531, byte: 364, kanji: 224 },
        H: { numeric: 674, alphanumeric: 408, byte: 280, kanji: 173 }
    },
    18: {
        L: { numeric: 1725, alphanumeric: 1046, byte: 718, kanji: 442 },
        M: { numeric: 1346, alphanumeric: 816, byte: 560, kanji: 345 },
        Q: { numeric: 948, alphanumeric: 574, byte: 394, kanji: 243 },
        H: { numeric: 746, alphanumeric: 452, byte: 310, kanji: 191 }
    },
    19: {
        L: { numeric: 1903, alphanumeric: 1153, byte: 792, kanji: 488 },
        M: { numeric: 1500, alphanumeric: 909, byte: 624, kanji: 384 },
        Q: { numeric: 1063, alphanumeric: 644, byte: 442, kanji: 272 },
        H: { numeric: 813, alphanumeric: 493, byte: 338, kanji: 208 }
    },
    20: {
        L: { numeric: 2061, alphanumeric: 1249, byte: 858, kanji: 528 },
        M: { numeric: 1600, alphanumeric: 970, byte: 666, kanji: 410 },
        Q: { numeric: 1159, alphanumeric: 702, byte: 482, kanji: 297 },
        H: { numeric: 919, alphanumeric: 557, byte: 382, kanji: 235 }
    },
    21: {
        L: { numeric: 2232, alphanumeric: 1343, byte: 929, kanji: 572 },
        M: { numeric: 1708, alphanumeric: 1035, byte: 711, kanji: 438 },
        Q: { numeric: 1224, alphanumeric: 742, byte: 509, kanji: 314 },
        H: { numeric: 969, alphanumeric: 587, byte: 403, kanji: 248 }
    },
    22: {
        L: { numeric: 2409, alphanumeric: 1439, byte: 1003, kanji: 618 },
        M: { numeric: 1872, alphanumeric: 1134, byte: 779, kanji: 480 },
        Q: { numeric: 1358, alphanumeric: 823, byte: 565, kanji: 348 },
        H: { numeric: 1056, alphanumeric: 640, byte: 439, kanji: 270 }
    },
    23: {
        L: { numeric: 2620, alphanumeric: 1531, byte: 1091, kanji: 672 },
        M: { numeric: 2059, alphanumeric: 1248, byte: 857, kanji: 528 },
        Q: { numeric: 1468, alphanumeric: 890, byte: 611, kanji: 376 },
        H: { numeric: 1108, alphanumeric: 672, byte: 461, kanji: 284 }
    },
    24: {
        L: { numeric: 2812, alphanumeric: 1635, byte: 1171, kanji: 721 },
        M: { numeric: 2188, alphanumeric: 1326, byte: 911, kanji: 561 },
        Q: { numeric: 1588, alphanumeric: 963, byte: 661, kanji: 407 },
        H: { numeric: 1228, alphanumeric: 744, byte: 511, kanji: 315 }
    },
    25: {
        L: { numeric: 3057, alphanumeric: 1732, byte: 1273, kanji: 784 },
        M: { numeric: 2395, alphanumeric: 1451, byte: 997, kanji: 614 },
        Q: { numeric: 1718, alphanumeric: 1041, byte: 715, kanji: 440 },
        H: { numeric: 1286, alphanumeric: 779, byte: 535, kanji: 330 }
    },
    26: {
        L: { numeric: 3283, alphanumeric: 1839, byte: 1367, kanji: 842 },
        M: { numeric: 2544, alphanumeric: 1542, byte: 1059, kanji: 652 },
        Q: { numeric: 1804, alphanumeric: 1094, byte: 751, kanji: 462 },
        H: { numeric: 1425, alphanumeric: 864, byte: 593, kanji: 365 }
    },
    27: {
        L: { numeric: 3517, alphanumeric: 1994, byte: 1465, kanji: 902 },
        M: { numeric: 2701, alphanumeric: 1637, byte: 1125, kanji: 692 },
        Q: { numeric: 1933, alphanumeric: 1172, byte: 805, kanji: 496 },
        H: { numeric: 1501, alphanumeric: 910, byte: 625, kanji: 385 }
    },
    28: {
        L: { numeric: 3669, alphanumeric: 2113, byte: 1528, kanji: 940 },
        M: { numeric: 2857, alphanumeric: 1732, byte: 1190, kanji: 732 },
        Q: { numeric: 2085, alphanumeric: 1263, byte: 868, kanji: 534 },
        H: { numeric: 1581, alphanumeric: 958, byte: 658, kanji: 405 }
    },
    29: {
        L: { numeric: 3909, alphanumeric: 2238, byte: 1628, kanji: 1002 },
        M: { numeric: 3035, alphanumeric: 1839, byte: 1264, kanji: 778 },
        Q: { numeric: 2181, alphanumeric: 1322, byte: 908, kanji: 559 },
        H: { numeric: 1677, alphanumeric: 1016, byte: 698, kanji: 430 }
    },
    30: {
        L: { numeric: 4158, alphanumeric: 2369, byte: 1732, kanji: 1066 },
        M: { numeric: 3289, alphanumeric: 1994, byte: 1370, kanji: 843 },
        Q: { numeric: 2358, alphanumeric: 1429, byte: 982, kanji: 604 },
        H: { numeric: 1782, alphanumeric: 1080, byte: 742, kanji: 457 }
    },
    31: {
        L: { numeric: 4417, alphanumeric: 2506, byte: 1840, kanji: 1132 },
        M: { numeric: 3486, alphanumeric: 2113, byte: 1452, kanji: 894 },
        Q: { numeric: 2473, alphanumeric: 1499, byte: 1030, kanji: 634 },
        H: { numeric: 1897, alphanumeric: 1150, byte: 790, kanji: 486 }
    },
    32: {
        L: { numeric: 4686, alphanumeric: 2632, byte: 1952, kanji: 1201 },
        M: { numeric: 3693, alphanumeric: 2238, byte: 1538, kanji: 947 },
        Q: { numeric: 2670, alphanumeric: 1618, byte: 1112, kanji: 684 },
        H: { numeric: 2022, alphanumeric: 1226, byte: 842, kanji: 518 }
    },
    33: {
        L: { numeric: 4965, alphanumeric: 2780, byte: 2068, kanji: 1273 },
        M: { numeric: 3909, alphanumeric: 2369, byte: 1628, kanji: 1002 },
        Q: { numeric: 2805, alphanumeric: 1700, byte: 1168, kanji: 719 },
        H: { numeric: 2157, alphanumeric: 1307, byte: 898, kanji: 553 }
    },
    34: {
        L: { numeric: 5253, alphanumeric: 2924, byte: 2188, kanji: 1347 },
        M: { numeric: 4134, alphanumeric: 2506, byte: 1722, kanji: 1060 },
        Q: { numeric: 2949, alphanumeric: 1787, byte: 1228, kanji: 756 },
        H: { numeric: 2301, alphanumeric: 1394, byte: 958, kanji: 590 }
    },
    35: {
        L: { numeric: 5529, alphanumeric: 3054, byte: 2303, kanji: 1417 },
        M: { numeric: 4343, alphanumeric: 2632, byte: 1809, kanji: 1113 },
        Q: { numeric: 3081, alphanumeric: 1867, byte: 1283, kanji: 790 },
        H: { numeric: 2361, alphanumeric: 1431, byte: 983, kanji: 605 }
    },
    36: {
        L: { numeric: 5836, alphanumeric: 3220, byte: 2431, kanji: 1496 },
        M: { numeric: 4588, alphanumeric: 2780, byte: 1911, kanji: 1176 },
        Q: { numeric: 3244, alphanumeric: 1966, byte: 1351, kanji: 832 },
        H: { numeric: 2524, alphanumeric: 1530, byte: 1051, kanji: 647 }
    },
    37: {
        L: { numeric: 6153, alphanumeric: 3391, byte: 2563, kanji: 1577 },
        M: { numeric: 4775, alphanumeric: 2894, byte: 1989, kanji: 1224 },
        Q: { numeric: 3417, alphanumeric: 2071, byte: 1423, kanji: 876 },
        H: { numeric: 2625, alphanumeric: 1591, byte: 1093, kanji: 673 }
    },
    38: {
        L: { numeric: 6479, alphanumeric: 3567, byte: 2699, kanji: 1661 },
        M: { numeric: 5039, alphanumeric: 3054, byte: 2099, kanji: 1292 },
        Q: { numeric: 3599, alphanumeric: 2181, byte: 1499, kanji: 923 },
        H: { numeric: 2735, alphanumeric: 1658, byte: 1139, kanji: 701 }
    },
    39: {
        L: { numeric: 6743, alphanumeric: 3706, byte: 2809, kanji: 1729 },
        M: { numeric: 5313, alphanumeric: 3220, byte: 2213, kanji: 1362 },
        Q: { numeric: 3791, alphanumeric: 2298, byte: 1579, kanji: 972 },
        H: { numeric: 2927, alphanumeric: 1774, byte: 1219, kanji: 750 }
    },
    40: {
        L: { numeric: 7089, alphanumeric: 3953, byte: 2953, kanji: 1817 },
        M: { numeric: 5596, alphanumeric: 3391, byte: 2331, kanji: 1435 },
        Q: { numeric: 3993, alphanumeric: 2420, byte: 1663, kanji: 1024 },
        H: { numeric: 3057, alphanumeric: 1852, byte: 1273, kanji: 784 }
    }
};

export const MODES = {
    NUMERIC: { name: 'numeric', bits: '0001' },
    ALPHANUMERIC: { name: 'alphanumeric', bits: '0010' },
    BYTE: { name: 'byte', bits: '0100' },
    KANJI: { name: 'kanji', bits: '1000' },
    ECI: { name: 'eci', bits: '0111' } // For UTF-8 encoding
};

// Character count bits for each version range
export const CHAR_COUNT_BITS = {
    numeric: [10, 12, 14],
    alphanumeric: [9, 11, 13],
    byte: [8, 16, 16],
    kanji: [8, 10, 12]
};