var crypto = require('crypto-helper-ku')

import { OPRF, hashUserData, consts } from './utils'
import { createPassword } from './generator'



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
    OPRF(consts.base_url + consts.portList[index], bits, (oprf_result) => {
      const encrypted = crypto.aes.encrypt(crypto.util.hash(oprf_result.hex), shares[index]);
      try{
        fetch(consts.base_url + consts.portList[index] + consts.saveEndPoint + '/' + hashed + '/' + encrypted.ciphertext + '/' + encrypted.iv, {method: 'GET'});
      }catch(e){
        console.log("fetch error: " + e);
      }
    }); 
  }
  return randPwd;
}

export const savePasswordShares = (userName, siteUrl, passwd) => {
  console.log("save start");
  const hashed = hashUserData(userName, siteUrl);
  console.log("save after hash");
  return generatePasswordShares(hashed, passwd);
}