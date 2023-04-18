import { isNode, isBrowser } from './detect';
export const getHardwareConcurrency = () => {
  return !isBrowser && isNode && typeof require !== 'undefined'
    ? require('os').cpus().length
    : typeof window !== 'undefined' &&
      typeof navigator === 'object' &&
      navigator &&
      typeof navigator.hardwareConcurrency === 'number'
    ? navigator.hardwareConcurrency
    : 1;
};

export const getRandomValues = (() => {
  // Look up the crypto module if available.
  const crypto =
    (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) ||
    (typeof require !== 'undefined' && require('crypto')) ||
    null;

  // Modern browsers and IE 11
  if (crypto && typeof crypto.getRandomValues === 'function') {
    return function getRandomValues(buffer) {
      return crypto.getRandomValues(buffer);
    };
  }

  // Node 7+
  if (crypto && typeof crypto.randomFillSync === 'function') {
    return function getRandomValues(buffer) {
      return crypto.randomFillSync(buffer);
    };
  }

  // Node 0.10+
  if (crypto && typeof crypto.randomBytes === 'function') {
    return function getRandomValues(buffer) {
      let bytes = crypto.randomBytes(buffer.length);
      for (let i = 0, n = bytes.length; i < n; ++i) {
        buffer[i] = bytes[i];
      }
    };
  }

  // Fallback
  return function getRandomValues(buffer) {
    throw new Error(
      'getRandomValues not supported for this browser or node version!'
    );
    /*
    let value = 0;
    for (let i = 0, n = buffer.length; i < n; ++i) {
      if (i % 4 === 0) {
        value = (Math.random() * 0xffffffff) >>> 0;
      }
      buffer[i] = value & 0xff;
      value >>>= 8;
    }*/
  };
})();
