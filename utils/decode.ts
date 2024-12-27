/**
 * Decodes a string that has been encoded using base64 and URI encoding.
 * @param {string} str - The string to decode.
 * @returns {string} The decoded string.
 */
export function decodeHash(str: string) {
    // Decode the base64-encoded string.
    const decoded = atob(str);
    // Convert each character to its corresponding URI-encoded value.
    const uriEncoded = Array.prototype.map.call(decoded, function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    });
    return decodeURIComponent(uriEncoded.join(""));
}

/**
 * Encodes a string using URI encoding and base64 encoding.
 * @param {string} str - The string to encode.
 * @returns {string} The encoded string.
 */
export function encodeHash(str: string) {
    // URI-encode the string and replace each URI-encoded character with its corresponding base64-encoded value.
    const base64Encoded = btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode(parseInt(p1, 16));
        }),
    );
    return base64Encoded;
}

