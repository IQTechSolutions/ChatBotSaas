// Stub scrollIntoView so React tests don’t crash in jsdom
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: () => { },          // no‑op
});

// 👉 Stub crypto.randomUUID so components can generate IDs in tests
if (!globalThis.crypto) {
    // @ts-expect-error – jsdom's crypto is partial
    globalThis.crypto = {};
}
let uid = 0;
/** Rudimentary deterministic UUID just for tests (8-4-4-4-12) */
const makeUuid = () =>
    `00000000-0000-4000-8000-${String(uid++).padStart(12, '0')}`;

(globalThis as any).crypto.randomUUID = makeUuid;