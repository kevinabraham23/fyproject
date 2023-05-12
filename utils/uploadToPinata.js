const pinataSDK = require("@pinata/sdk")
require("dotenv").config
const fs = require("fs")

const pinataApiKey = "960840a39cf5c95bf2a6"
const pinataApiSecret = "9eb5cb843afd647710f610f432226928cd1d9eb6374b551db56391260f4ffa1a"
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret)

async function storeImages(fileLocation) {
    const readableStreamForFile = fs.createReadStream(fileLocation)
    let responses = []
    const options = {
        pinataMetadata: {
            name: "jw_certificate",
        },
    }
    await pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result) => {
            responses.push(result)
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    return { responses }
}

async function storeTokenUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

module.exports = { storeImages, storeTokenUriMetadata }
