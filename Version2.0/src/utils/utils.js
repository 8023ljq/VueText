/**
 * 工具类
 */
import Vue from 'vue'
import CryptoJS from 'crypto-js'
export default {
    _KEY : "WDBA9obpQ5fA1JFqM9Z3429qJfLxF0zz",
    _IV : "YrsAMhsSW2StyH6b",

    //加密
    encrypt(word){ 
        var key  = CryptoJS.enc.Utf8.parse(_KEY);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var iv = CryptoJS.enc.Utf8.parse(_IV);

        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode:CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    },
    //解密
    decrypt(word){  
        var key  = CryptoJS.enc.Utf8.parse(_KEY );//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var iv = CryptoJS.enc.Utf8.parse(_IV);

        var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode:CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}
