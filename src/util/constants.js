export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

export const APP_NAME = "FantomSign";
export const APP_DESC = "Fantom-backed esignature requests";

// https://docs.fantom.foundation/wallet/set-up-metamask
// Include trailing slashes
export const CHAIN_OPTIONS = {
  "250": {
    name: "Fantom Opera",
    symbol: "FTM",
    rpc: "https://rpc.ankr.com/fantom/",
    url: "https://ftmscan.com/",
    id: 250,
  },
  "4002": {
    name: "Fantom Testnet",
    symbol: "FTM",
    rpc: "https://rpc.testnet.fantom.network/",
    url: "https://testnet.ftmscan.com/",
    id: 4002,
  },
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)

// 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
  // 42: { name: "kovan", url: "https://kovan.etherscan.io/tx/", id: 42 },
// 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },

export const ACTIVE_CHAIN_ID = 0xfa2
export const ACTIVE_CHAIN = CHAIN_OPTIONS[ACTIVE_CHAIN_ID]

export const EXAMPLE_FORM = {
  title: "Renter agreement",
  description: "Please agree to the included renters agreement document",
  signerAddress: "0xD7e02fB8A60E78071D69ded9Eb1b89E372EE2292",
  files: [],
};

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

export const CREATE_STEPS = [
  {
    title: "Fill in fields",
    description: "Enter required data."
  },
  {
    title: "Create esignature request",
    description: "Requires authorizing a create esignature request operation."
  },
  {
    title: "Wait for esignature",
    description: "Your esignature request will be live for others to view and submit esignature."
  }
]

console.log("config", COVALENT_KEY, NFT_PORT_KEY, ACTIVE_CHAIN);
