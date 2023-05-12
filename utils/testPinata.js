const pinataSDK = require("@pinata/sdk")
const pinataApiKey = "960840a39cf5c95bf2a6"
const pinataApiSecret = "9eb5cb843afd647710f610f432226928cd1d9eb6374b551db56391260f4ffa1a"
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

const fs = require("fs")
const readableStreamForFile = fs.createReadStream("./images/certificates/jw_certificate.jpg")
const options = {
    pinataMetadata: {
        name: "n",
        keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2",
        },
    },
    pinataOptions: {
        cidVersion: 0,
    },
}
pinata
    .pinFileToIPFS(readableStreamForFile, options)
    .then((result) => {
        //handle results here
        console.log(result)
    })
    .catch((err) => {
        //handle error here
        console.log(err)
    })
