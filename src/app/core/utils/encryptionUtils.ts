import CryptoJS from "crypto-js";

const VITE_SYMMETRIC_KEY = import.meta.env.VITE_SYMMETRIC_KEY;
const INITIALIZATION_VECTOR = import.meta.env.VITE_INITIALIZATION_VECTOR;

const decodeBase64Key = (base64Key: string) => {
  return CryptoJS.enc.Utf8.parse(atob(base64Key.replace(/['"]+/g, '')));
};

const symmetricKey = decodeBase64Key(VITE_SYMMETRIC_KEY);
const initializationVector = decodeBase64Key(INITIALIZATION_VECTOR);

export const encryptAES = (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(text, symmetricKey, {
    iv: initializationVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return ciphertext.ciphertext.toString(CryptoJS.enc.Base64);
};

export const decryptAES = (encryptedText: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, symmetricKey, {
    iv: initializationVector,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return bytes.toString(CryptoJS.enc.Utf8);
};
