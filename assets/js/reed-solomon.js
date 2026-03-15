export default class GF {
    static init() {
        if (this.exp) return;
        this.exp = new Array(512);
        this.log = new Array(256).fill(0);
        let x = 1;
        for (let i = 0; i < 255; i++) {
            this.exp[i] = x;
            this.log[x] = i;
            x <<= 1;
            if (x & 0x100) x ^= 0x11d; // x^8 + x^4 + x^3 + x^2 + 1
        }
        for (let i = 255; i < 512; i++) this.exp[i] = this.exp[i - 255];
    }

    static mul(a, b) {
        if (a === 0 || b === 0) return 0;
        return this.exp[(this.log[a] + this.log[b]) % 255];
    }

    static generateECC(dataBytes, ecCount) {
        this.init();

        // Build generator polynomial: (x - α^0)(x - α^1)...(x - α^(ecCount-1))
        let generator = [1];
        for (let i = 0; i < ecCount; i++) {
            // Multiply current generator by (x - α^i)
            const current = generator.slice();
            generator = new Array(current.length + 1).fill(0);

            // Multiply by x (shift)
            for (let j = 0; j < current.length; j++) {
                generator[j] = current[j];
            }

            // Multiply by -α^i (subtract in GF)
            const alphaExp = this.exp[i];
            for (let j = 0; j < current.length; j++) {
                generator[j + 1] ^= this.mul(current[j], alphaExp);
            }
        }

        // Message polynomial with padding
        const msg = dataBytes.slice().concat(new Array(ecCount).fill(0));

        // Synthetic division
        for (let i = 0; i < dataBytes.length; i++) {
            const coef = msg[i];
            if (coef === 0) continue;

            for (let j = 1; j < generator.length; j++) {
                msg[i + j] ^= this.mul(generator[j], coef);
            }
        }

        // Return error correction codewords
        return msg.slice(dataBytes.length, dataBytes.length + ecCount);
    }
}