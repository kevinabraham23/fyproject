const { network, getNamedAccounts } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")
require("dotenv").config()

const fileLocation = "./images/certificates/jw_certificate.jpg"

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            certificate_no: "",
            color: "",
            clarity: "",
            polish: "",
        },
    ],
}

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let tokenURIs
    if (process.env.UPLOAD_TO_PINATA == "true") {
        tokenURIs = await handleTokenURIs()
    }
    let args = []

    const certificateNft = await deploy("certificateNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}

async function handleTokenURIs() {
    tokenURIs = []
    //store image in ipfs
    //store metadata in ipfs
    const { responses: imageUploadResponses, files } = await storeImages(fileLocation)
    for (imageUploadResponsesIndex in imageUploadResponses) {
        //create metadata
        //upload the metadata
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = "jw_certificate"
        tokenUriMetadata.description = `A ${tokenUriMetadata.name}`
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponsesIndex].IpfsHash}`
        console.log("uploading token uri metadata")
        //store json to pinata /ipfs
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        tokenURIs.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("token uris uploaded ")
    console.log(tokenURIs)

    return tokenURIs
}

module.exports.tags = ["all", "certificateNft", "main"]
