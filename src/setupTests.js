// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util';

Object.defineProperty(global, 'crypto', {
    value: {
        randomUUID: () => Math.round(Math.random() * 10000) / 100
    }
});

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder;
}
