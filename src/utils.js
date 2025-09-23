import { IV_BYTELENGTH } from './consts';

function encode(message) {
    const encoder = new TextEncoder();
    return encoder.encode(message);
}

function decode(message) {
    const decoder = new TextDecoder();
    return decoder.decode(message);
}

function getFileText(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject(fileReader.error);
        };
        fileReader.readAsText(file);
    });
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
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
    return [...new Uint8Array(encrypted), ...iv];
}

function aesGcmDecrypt(data, key) {
    const encrypted = new Uint8Array(data.slice(0, -IV_BYTELENGTH));
    const iv = new Uint8Array(data.slice(-IV_BYTELENGTH));
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
}

export { encode, decode, getFileText, getAesGcmKey, aesGcmEncrypt, aesGcmDecrypt };
