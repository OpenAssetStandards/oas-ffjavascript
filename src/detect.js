/*
The MIT License (MIT)

Copyright (c) 2018 Dineshkumar Pandiyan <flexdinesh@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const isBrowser =
typeof window !== "undefined" && typeof window.document !== "undefined";

const isNode =
typeof process !== "undefined" &&
process.versions != null &&
process.versions.node != null;

const isWebWorker =
typeof self === "object" &&
self.constructor &&
self.constructor.name === "DedicatedWorkerGlobalScope";

/**
* @see https://github.com/jsdom/jsdom/releases/tag/12.0.0
* @see https://github.com/jsdom/jsdom/issues/1537
*/
const isJsDom =
(typeof window !== "undefined" && window.name === "nodejs") ||
(typeof navigator !== "undefined" &&
  (navigator.userAgent.includes("Node.js") ||
    navigator.userAgent.includes("jsdom")));

const isDeno =
typeof Deno !== "undefined" &&
typeof Deno.version !== "undefined" &&
typeof Deno.version.deno !== "undefined";

export { isBrowser, isWebWorker, isNode, isJsDom, isDeno };
