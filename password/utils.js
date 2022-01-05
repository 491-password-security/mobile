var crypto = require('crypto-helper-ku');
import { io } from 'socket.io-client';

const Number = crypto.Number;
const MOD = crypto.constants.MOD;
const GEN = crypto.constants.GEN;
const MOD_1 = MOD.subtract(new Number('1'));

export const hashUserData = (userName, siteUrl) => {
  crypto.util.addEntropy(Math.random());
  crypto.util.addEntropy(Math.random());
  const hashed = crypto.util.hash(userName + siteUrl);
  return hashed;
}

export const consts = {
  base_url : "http://46.101.218.223",
  saveEndPoint : "/save-password-share",
  getEndPoint : "/get-password-share",
  portList : [":5001", ":5002", ":5003"],
}

export function OPRF(serverUrl, pwd, finalFunc) {
  const socket = io(serverUrl);
  socket.on("connect", () => {
    let r = GEN.modPow(crypto.util.getBoundedBigInt(MOD), MOD);
    let r_inv = r.modInverse(MOD_1);
    while (r_inv.hex == 0) { // ensure r is invertible
      r = GEN.modPow(crypto.util.getBoundedBigInt(MOD), MOD);
      r_inv = r.modInverse(MOD_1);
    }
    let a = crypto.util.groupHash(pwd).modPow(r, MOD);

    socket.on("respondOPRF", (b) => {
      b = new Number(b, 16);
      let result = crypto.util.hash(pwd + b.modPow(r_inv, MOD).hex);
      finalFunc(result);
    })

    socket.emit("beginOPRF", a.hex)
  });
}