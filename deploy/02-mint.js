const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Basic NFT
    const certificateNft = await ethers.getContract("certificateNft", deployer)
    const certificateNftTx = await certificateNft.mintNft()
    await certificateNftTx.wait(1)
    console.log(`Certificate NFT index 0 tokenURI: ${await certificateNft.tokenURI(0)}`)
}
module.exports.tags = ["all", "mint"]
