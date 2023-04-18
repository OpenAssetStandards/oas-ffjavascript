import {test, describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';

import { Scalar } from '../dist/main.js';

test("Basic scalar convertions", async () => {
    await it("Should convertion Native", () => {
        assert(Scalar.eq(Scalar.e("0x12"), 18));
        assert(Scalar.eq(Scalar.e("0x12", 16), 18));
        assert(Scalar.eq(Scalar.e("12", 16), 18));
        assert(Scalar.eq(Scalar.e("18"), 18));
        assert(Scalar.eq(Scalar.e("18", 10), 18));
        assert(Scalar.eq(Scalar.e(18, 10), 18));
        assert(Scalar.eq(Scalar.e(18n, 10), 18));
        assert(Scalar.eq(Scalar.e(0x12, 10), 18));
        assert(Scalar.eq(Scalar.e(0x12n, 10), 18));

    });
    await it("Should convert to js Number Native", () => {
        const maxJsNum = Number.MAX_SAFE_INTEGER;
        const maxToScalar = Scalar.e(maxJsNum);

        const backToNum = Scalar.toNumber(maxToScalar);
        assert(backToNum, maxJsNum);

        const overMaxJsNum = Scalar.add(maxToScalar, 1);
        assert.throws(() => Scalar.toNumber(overMaxJsNum));
    });
});
