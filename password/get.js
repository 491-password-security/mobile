import { OPRF, hashUserData, consts } from './utils'

var crypto = require('crypto-helper-ku')


export const getPasswordFromServer = (userName, siteUrl, passwd,_callback) => {
  let shares = [];
  const hashed = hashUserData(userName, siteUrl);
  let bits = crypto.codec.hex2Bin(crypto.util.hash(passwd));
  for (let index = 0; index < 2; index++) {
    OPRF(consts.base_url + consts.portList[index], bits, (oprf_result) => {
      fetch(consts.base_url + consts.portList[index] + consts.getEndPoint + '/' + hashed, {method: 'GET'})
        .then((resp) => {
          return resp.text();
        })
        .then((encrypted) => {
          encrypted = encrypted.split(":");
          const iv = encrypted[1];
          const ciphertext = encrypted[0];
          try{
            const share = crypto.aes.decrypt(crypto.util.hash(oprf_result.hex), iv, ciphertext);
            shares.push(share);
          }catch (error) {
            console.log(error);
          }
          if (shares.length >= 2) {
            const rv = crypto.ss.combine(shares);
            console.log("password : " + rv);
            console.log(shares);
            lastReceivedPass = rv;
            _callback();
          }
        })
    });
  }
}