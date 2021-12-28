var crypto = require('crypto-helper-ku');
import { io } from 'socket.io-client';

const Number = crypto.Number;
const MOD = crypto.constants.MOD;
const GEN = crypto.constants.GEN;

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

var count = 0;

function beginOPRFRound(socket, bits, index) {
  let receiver = new crypto.ObliviousTransferReceiver(parseInt(bits[index]), null, null);
  socket.emit("oprfRound", index)
  if (index == 255) {
    count++;
    if (count == 3) {
      console.log("Done");
      //load_msg.textContent = "Done!"
      loadingIndicatorSave = false;
      count = 0;
    }
  }
  return receiver;
}

export function OPRF(serverUrl, bits, finalFunc) {
  const socket = io(serverUrl);
  socket.on("connect", () => {
    let receiver;
    let count = 0;
    let client_prod = new Number('1');
    let server_prod;

    // receive OT key from server
    socket.on("serverKey", (serverKey) => {
      let key = new Number(serverKey, 16)
      receiver.generateKeys(key);
      socket.emit("clientKey", receiver.keys[receiver.choice].hex);
    });

    // compute final value at the end of the oprf protocol
    socket.on("serverProd", (serverProdInv) => {
      server_prod = new Number(serverProdInv, 16);
      let exp = server_prod.multiply(client_prod).mod(MOD);
      let oprf_result = GEN.modPow(exp, MOD);
      finalFunc(oprf_result);
    })

    // receive OT ciphertexts from server
    socket.on("ciphertexts", (ciphertexts) => {
      let e_0 = ciphertexts[0].map(c => new Number(c, 16));
      let e_1 = ciphertexts[1].map(c => new Number(c, 16));
      let result = receiver.readMessage([e_0, e_1]);
      client_prod = client_prod.multiply(result).mod(MOD);

      // at the end of the oprf round
      count += 1;
      if (count == 256) {
        // get server prod to finalize protocol
        socket.emit("requestServerProd");
      } else {
        // start next oprf round
        receiver = beginOPRFRound(socket, bits, count);
      }
    });

    // start first  oprf round
    receiver = beginOPRFRound(socket, bits, count);
  });
}