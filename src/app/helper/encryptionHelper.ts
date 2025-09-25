import CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

const SECRET_KEY = environment.encryptionKey;

// Encrypt text
export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

// Decrypt text
export function decrypt(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
