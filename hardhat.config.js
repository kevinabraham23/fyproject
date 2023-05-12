/** @type import('hardhat/config').HardhatUserConfig */
require("hardhat-deploy")
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomicfoundation/hardhat-chai-matchers")
require("dotenv").config

const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/nZOMzoDpSQfd7vNm5CE2zwmz3GHsYhqG"
const PRIVATE_KEY = "b6a258a2ce5306df54cb841b10537e161c8bf23c404268cf725d70618a798604"
module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.18",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
