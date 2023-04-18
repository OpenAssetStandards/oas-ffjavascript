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


import { Scalar, PolField, ZqField } from '../dist/main.js';

const r  = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");

test("Polynomial field", async () => {
    await it("Should compute a multiplication", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(1), PF.F.e(2), PF.F.e(3)];
        const b = [PF.F.e(1), PF.F.e(2), PF.F.e(3)];
        const res = PF.mul(a,b);

        assert(PF.eq(res, [PF.F.e(1), PF.F.e(4), PF.F.e(10), PF.F.e(12), PF.F.e(9)]));
    });
    await it("Should compute a multiplication 2", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(5), PF.F.e(1)];
        const b = [PF.F.e(-5), PF.F.e(1)];
        const res = PF.mul(a,b);

        assert(PF.eq(res, [PF.F.e(-25), PF.F.e(0), PF.F.e(1)]));
    });
    await it("Should compute an addition", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(5), PF.F.e(1)];
        const b = [PF.F.e(-5), PF.F.e(1)];
        const res = PF.add(a,b);

        assert(PF.eq(res, [PF.F.e(0), PF.F.e(2)]));
    });
    await it("Should compute a substraction", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(5), PF.F.e(3), PF.F.e(4)];
        const b = [PF.F.e(5), PF.F.e(1)];
        const res = PF.sub(a,b);

        assert(PF.eq(res, [PF.F.e(0), PF.F.e(2), PF.F.e(4)]));
    });
    await it("Should compute reciprocal", async () => {
        const PF = new PolField(new ZqField(r));

        const a = PF.normalize([PF.F.e(4), PF.F.e(1), PF.F.e(-3), PF.F.e(-1), PF.F.e(2),PF.F.e(1), PF.F.e(-1), PF.F.e(1)]);
        const res = PF._reciprocal(a, 3, 0);

        assert(PF.eq(res, PF.normalize([PF.F.e(12), PF.F.e(15), PF.F.e(3), PF.F.e(-4), PF.F.e(-3), PF.F.e(0), PF.F.e(1), PF.F.e(1)])));
    });
    await it("Should div2", async () => {
        const PF = new PolField(new ZqField(r));

        // x^6
        const a = [PF.F.e(0), PF.F.e(0), PF.F.e(0), PF.F.e(0), PF.F.e(0),PF.F.e(0), PF.F.e(1)];
        // x^5
        const b = [PF.F.e(0), PF.F.e(0), PF.F.e(0), PF.F.e(0), PF.F.e(0), PF.F.e(1)];

        const res = PF._div2(6, b);
        assert(PF.eq(res, [PF.F.e(0), PF.F.e(1)]));

        const res2 = PF.div(a,b);
        assert(PF.eq(res2, [PF.F.e(0), PF.F.e(1)]));
    });
    await it("Should div", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(1), PF.F.e(2), PF.F.e(3), PF.F.e(4), PF.F.e(5),PF.F.e(6), PF.F.e(7)];
        const b = [PF.F.e(8), PF.F.e(9), PF.F.e(10), PF.F.e(11), PF.F.e(12), PF.F.e(13)];

        const c = PF.mul(a,b);
        const d = PF.div(c,b);

        assert(PF.eq(a, d));
    });
    await it("Should div big/small", async () => {
        const PF = new PolField(new ZqField(r));

        const a = [PF.F.e(1), PF.F.e(2), PF.F.e(3), PF.F.e(4), PF.F.e(5),PF.F.e(6), PF.F.e(7)];
        const b = [PF.F.e(8), PF.F.e(9)];

        const c = PF.mul(a,b);
        const d = PF.div(c,b);

        assert(PF.eq(a, d));
    });
    await it("Should div random big", async () => {
        const PF = new PolField(new ZqField(r));

        let a = [];
        let b = [];
        for (let i=0; i<1000; i++) a.push(PF.F.e(Math.floor(Math.random()*100000) -500000));
        for (let i=0; i<900; i++) b.push(PF.F.e(Math.floor(Math.random()*100000) -500000));

        a = PF.normalize(a);
        b = PF.normalize(a);

        const c = PF.mul(a,b);

        const d = PF.div(c,b);

        assert(PF.eq(a, d));
    });
    await it("Should evaluate and zero", async () => {
        const PF = new PolField(new ZqField(r));
        const p = [PF.F.neg(PF.F.e(2)), PF.F.e(1)];
        const v = PF.eval(p, PF.F.e(2));
        assert(PF.F.eq(v, PF.F.e(0)));
    });
    await it("Should evaluate bigger number", async () => {
        const PF = new PolField(new ZqField(r));
        const p = [PF.F.e(1), PF.F.e(2), PF.F.e(3)];
        const v = PF.eval(p, PF.F.e(2));
        assert(PF.F.eq(v, PF.F.e(17)));
    });
    await it("Should create lagrange polynomial minmal", async () => {
        const PF = new PolField(new ZqField(r));

        const points=[];
        points.push([PF.F.e(1), PF.F.e(1)]);
        points.push([PF.F.e(2), PF.F.e(2)]);
        points.push([PF.F.e(3), PF.F.e(5)]);

        const p=PF.lagrange(points);

        for (let i=0; i<points.length; i++) {
            const v = PF.eval(p, points[i][0]);
            assert(PF.F.eq(v, points[i][1]));
        }
    });
    await it("Should create lagrange polynomial", async () => {
        const PF = new PolField(new ZqField(r));

        const points=[];
        points.push([PF.F.e(1), PF.F.e(2)]);
        points.push([PF.F.e(2), PF.F.e(-2)]);
        points.push([PF.F.e(3), PF.F.e(0)]);
        points.push([PF.F.e(4), PF.F.e(453345)]);

        const p=PF.lagrange(points);

        for (let i=0; i<points.length; i++) {
            const v = PF.eval(p, points[i][0]);
            assert(PF.F.eq(v, points[i][1]));
        }
    });
    await it("Should test ruffini", async () => {
        const PF = new PolField(new ZqField(r));
        const a = [PF.F.e(1), PF.F.e(2), PF.F.e(3), PF.F.e(4), PF.F.e(5),PF.F.e(6), PF.F.e(7)];

        const b = PF.mul(a, [PF.F.e(-7), PF.F.e(1)]);
        const c = PF.ruffini(b, PF.F.e(7));

        assert(PF.eq(a, c));
    });
    await it("Should test roots", async () => {
        const PF = new PolField(new ZqField(r));
        let rt;


        rt = PF.oneRoot(256, 16);
        for (let i=0; i<8; i++) {
            rt = PF.F.mul(rt, rt);
        }
        assert(PF.F.eq(rt, PF.F.one));

        rt = PF.oneRoot(256, 15);
        for (let i=0; i<8; i++) {
            rt = PF.F.mul(rt, rt);
        }
        assert(PF.F.eq(rt, PF.F.one));

        rt = PF.oneRoot(8, 3);
        for (let i=0; i<3; i++) {
            rt = PF.F.mul(rt, rt);
        }
        assert(PF.F.eq(rt, PF.F.one));

        rt = PF.oneRoot(8, 0);
        assert(PF.F.eq(rt, PF.F.one));

    });
    await it("Should create a polynomial with values at roots with fft", async () => {
        const PF = new PolField(new ZqField(r));
        const a = [PF.F.e(1), PF.F.e(2), PF.F.e(3), PF.F.e(4), PF.F.e(5),PF.F.e(6), PF.F.e(7)];

        const p = PF.ifft(a);

        for (let i=0; i<a.length; i++) {
            const s = PF.eval(p, PF.oneRoot(8,i));
            assert(PF.F.eq(s, a[i]));
        }

    });

});
