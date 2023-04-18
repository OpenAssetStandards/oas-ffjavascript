/*
    Copyright 2018 0kims association.

    This file is part of zksnark JavaScript library.

    zksnark JavaScript library is a free software: you can redistribute it and/or
    modify it under the terms of the GNU General Public License as published by the
    Free Software Foundation, either version 3 of the License, or (at your option)
    any later version.

    zksnark JavaScript library is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
    more details.

    You should have received a copy of the GNU General Public License along with
    zksnark JavaScript library. If not, see <https://www.gnu.org/licenses/>.
*/
import {test, describe, it, before, after} from 'node:test';
import assert from 'node:assert/strict';
import { Scalar, RatField, ZqField } from '../dist/main.js';

const q  = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Z = new ZqField(q);
const R = new RatField(Z);

function r(a,b) {
    return [Z.e(a), Z.e(b)];
}


test("Rational zq Field", async () => {
    await it("Should compare correctly", () => {
        assert( R.eq(r(3,5), r(6,10)));
        assert(!R.eq(r(3,5), r(6,11)));
    });
    await it("Should add correctly", () => {
        const a = r(7,4);
        const b = r(5,12);

        assert(R.eq( R.add(a,b), r(13, 6)));
    });
    await it("Should substract", () => {
        const a = r(7,4);
        const b = r(5,12);

        assert(R.eq( R.sub(a,b), r(4, 3)));
    });
    await it("Should multiply", () => {
        const a = r(7,4);
        const b = r(5,12);

        assert(R.eq( R.mul(a,b), r(35, 48)));
    });
    await it("Should div", () => {
        const a = r(7,4);
        const b = r(5,12);

        assert(R.eq( R.div(a,b), r(7*12, 5*4)));
    });
    await it("Should square", () => {
        const a = r(7,4);

        assert(R.eq( R.square(a), r(49, 16)));
    });
    await it("Should affine", () => {
        const a = r(12,4);
        const aa = R.affine(a);
        assert(Z.eq( aa[0], Z.e(3)));
        assert(Z.eq( aa[1], Z.one));
    });
    await it("Should convert from Z to R", () => {
        const vz = Z.e(34);
        const vr = R.fromF(vz);

        assert(R.eq( vr, r(34,1)));
    });
    await it("Should convert from R to Z", () => {
        const vr = r(32, 2);
        const vz = R.toF(vr);

        assert(Z.eq( vz, Z.e(16)));
    });
});
