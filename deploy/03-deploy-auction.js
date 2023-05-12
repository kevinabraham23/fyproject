const { network, getNamedAccounts } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
require("dotenv").config()

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let args = []

    const auction = await deploy("Auction", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: 1,
    })
}

module.exports.tags = ["all", "auction"]
