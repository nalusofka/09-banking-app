import CryptoJS from "crypto-js";

const VITE_SYMMETRIC_KEY = import.meta.env.VITE_SYMMETRIC_KEY;
const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR;

export const encryptAES = (text: string) => {
    const ciphertext = CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(VITE_SYMMETRIC_KEY),
        {
            iv: CryptoJS.enc.Utf8.parse(INITIALIZATION_VECTOR),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return ciphertext.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decryptAES = (encryptedText: string) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedText,
        CryptoJS.enc.Utf8.parse(VITE_SYMMETRIC_KEY),
        {
            iv: CryptoJS.enc.Utf8.parse(INITIALIZATION_VECTOR),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    return bytes.toString(CryptoJS.enc.Utf8);
};
