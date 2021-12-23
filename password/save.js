var crypto = require('crypto-helper-ku')

import { OPRF } from './oprf'
import { createPassword } from './generator'

const base_url = "http://46.101.218.223";
let saveEndPoint = "/save-password-share";
let getEndPoint = "/get-password-share";
let portList = [":5001", ":5002", ":5003"];



const generatePasswordShares = (hashed, passwd) => {
  const randPwd = createPassword();
  //const randPwd = crypto.util.random(32);
  console.log("rand pass: " + randPwd);
  const shares = crypto.ss.share(randPwd, 2, 3);
  let bits = crypto.codec.hex2Bin(crypto.util.hash(passwd));
  console.log(shares);
  let rv = [];
  //const finalFunc = (
  for (let index = 0; index < shares.length; index++) {
    OPRF(base_url + portList[index], bits, (oprf_result) => {
      const encrypted = crypto.aes.encrypt(crypto.util.hash(oprf_result.hex), shares[index]);
      try{
        fetch(base_url + portList[index] + saveEndPoint + '/' + hashed + '/' + encrypted.ciphertext + '/' + encrypted.iv, {method: 'GET'});
      }catch(e){
        console.log("fetch error: " + e);
      }
    }); 
  }
  return randPwd;
}

export const savePasswordShares = (userName, siteUrl, passwd) => {
  //setLoadingIndicatorSave(true)
 
  crypto.util.addEntropy(Math.random());
  crypto.util.addEntropy(Math.random());
  console.log("save start");
  const hashed = crypto.util.hash(userName + siteUrl);
  console.log("save after hash");
  
  let promises = [];
  
  return generatePasswordShares(hashed, passwd);
 
  //return generatePasswordShares(hashed, randPass);
 
  /*
    .forEach((encrypted) => {
      console.log("save fetch");
      let promise = 
      promises.push(promise);
    });
  return Promise.all(promises);
  */
}