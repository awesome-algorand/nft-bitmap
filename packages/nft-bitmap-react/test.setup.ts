import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
beforeAll(() => {
    globalThis.ResizeObserver = class ResizeObserver {
        observe() {
            // do nothing
        }
        unobserve() {
            // do nothing
        }
        disconnect() {
            // do nothing
        }
    };
})
// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
})
