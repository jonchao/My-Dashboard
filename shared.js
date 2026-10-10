// Hidden sites are encrypted with AES-GCM, using a key derived from the
// passcode (PBKDF2-SHA256), by private/build-hidden.mjs. Without the
// passcode the page only contains the scrambled code in hidden.js.
const Vault = (() => {
  const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  // Returns the original text, or null if the passcode is wrong.
  async function unlock(code, passcode) {
    const [version, iterations, salt, iv, ct] = String(code).split(".");
    if (version !== "v1") throw new Error("Unrecognized hidden code");
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(passcode), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: fromB64(salt), iterations: Number(iterations), hash: "SHA-256" },
      base,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
    try {
      return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64(iv) }, key, fromB64(ct)));
    } catch {
      return null;
    }
  }

  return { unlock };
})();

const ICONS = {
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
  home: '<path d="M3.5 10.5 12 4l8.5 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-4.5v-6h-5v6H5A1.5 1.5 0 0 1 3.5 19z"/>',
  chart: '<path d="M4 4v16h16"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5v-3a4 4 0 0 1 8 0v3"/>',
  unlock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5v-3a4 4 0 0 1 7.75-1.4"/>',
  arrow: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
  "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
};

const ICON_COLORS = {
  card: "teal", plane: "blue", calendar: "rose", heart: "rose",
  home: "violet", chart: "teal", link: "slate", lock: "amber",
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.link}</svg>`;
}
