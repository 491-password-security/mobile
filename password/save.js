var crypto = require('crypto-helper-ku')

import { OPRF } from './oprf'

const base_url = "http://46.101.218.223";
let saveEndPoint = "/save-password-share";
let getEndPoint = "/get-password-share";
let portList = [":5001", ":5002", ":5003"];



const generatePasswordShares = (passwd) => {
  console.log("save start1");
  console.log("save start2");
  const randPwd = crypto.util.random(32);
  console.log("save start3");
  const shares = crypto.ss.share(randPwd, 2, 3);
  let bits = crypto.codec.hex2Bin(crypto.util.hash(passwd));
  console.log("save start4");
  let rv = [];
  for (let index = 0; index < shares.length; index++) {
    console.log("save start5");
    let encKey;
    try{
      encKey = OPRF(base_url + portList[index], bits) 
    }catch(error){
      console.log(error);
      return;
    }
    const encrypted = crypto.aes.encrypt(encKey.hex, shares[index]);
    rv.push(encrypted);
  }
  return rv;
}

export const savePasswordShares = (userName, siteUrl, passwd) => {
  crypto.util.addEntropy(Math.random());
  crypto.util.addEntropy(Math.random());
  console.log("save start");
  const hashed = crypto.util.hash(userName + siteUrl);
  console.log("save after hash");
  let promises = [];
  generatePasswordShares(passwd)
    .forEach((encrypted) => {
      console.log("save fetch");
      let promise = fetch(base_url + portList[index] + saveEndPoint + '/' + hashed + '/' + encrypted.ciphertext + '/' + encrypted.iv);
      promises.push(promise);
    });
  return Promise.all(promises);
}