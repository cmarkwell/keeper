const IV_BYTELENGTH = 12;

function encode(message) {
    const encoder = new TextEncoder();
    return encoder.encode(message);
}

function decode(message) {
    const decoder = new TextDecoder();
    return decoder.decode(message);
}

function getAesGcmKey(rawData) {
    return crypto.subtle.importKey(
        'raw',
        encode(rawData).buffer.transfer(32),
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt'],
    );
}

async function aesGcmEncrypt(data, key) {
    const iv = crypto.getRandomValues(new Uint8Array(IV_BYTELENGTH));
    const encoded = encode(data);
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded,
    );

    return [encrypted, iv];
}

function aesGcmDecrypt(data, key, iv) {
    return crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        data,
    );
}

export {
    encode,
    decode,
    getAesGcmKey,
    aesGcmEncrypt,
    aesGcmDecrypt,
}