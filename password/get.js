import { OPRF } from './oprf'

var crypto = require('crypto-helper-ku')


const base_url = "http://46.101.218.223";
let saveEndPoint = "/save-password-share";
let getEndPoint = "/get-password-share";
let portList = [":5001", ":5002", ":5003"];


export const getPasswordFromServer = (userName, siteUrl) => {
  let shares = [];
  const hashed = crypto.util.hash(userName + siteUrl);
  const fetchParams = {method : 'GET', };
  let promises = [];
  for (let index = 0; index < 2; index++) {
    let promise = fetch(base_url + portList[index] + getEndPoint + '/' + hashed)
      .then((resp) => {
        return resp.text().split(':');
      })
      .then(([iv, ciphertext]) => {
        //let iv, ciphertext = encrypted; 
        console.log("iv: " + iv); console.log("cipher: " + ciphertext);
        const share = crypto.aes.decrypt(decKey.hex, iv, ciphertext);
        //return share;
        shares.push(share);
      })
      .catch((error) => {
        console.log(error);
      })
    promises.push(promise);
  }

  return Promise.all(promises)
    .then(() => {
        return crypto.ss.combine(shares);
    });
}