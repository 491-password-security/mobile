import { OPRF } from './oprf'

var crypto = require('crypto-helper-ku')


const base_url = "http://46.101.218.223";
let saveEndPoint = "/save-password-share";
let getEndPoint = "/get-password-share";
let portList = [":5001", ":5002", ":5003"];


export const getPasswordFromServer = (userName, siteUrl, passwd) => {
  let shares = [];
  crypto.util.addEntropy(Math.random());
  crypto.util.addEntropy(Math.random());
  const hashed = crypto.util.hash(userName + siteUrl);
  let bits = crypto.codec.hex2Bin(crypto.util.hash(passwd));
  const fetchParams = {method : 'GET', };
  let promises = [];
  for (let index = 0; index < 2; index++) {
    OPRF(base_url + portList[index], bits, (oprf_result) => {
      //const encrypted = crypto.aes.encrypt(crypto.util.hash(oprf_result.hex), shares[index]);
      fetch(base_url + portList[index] + getEndPoint + '/' + hashed, {method: 'GET'})
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
          }
        })
    });
  }
}