import { DEFAULT_CHAIN, IPFS_BASE_URL } from "./constants";

export const ipfsUrl = (cid, fileName) => {
  // let url = `https://ipfs.io/ipfs/${cid}`;
  let url = `${IPFS_BASE_URL}/${cid}`;
  if (fileName) {
    return `${url}/${fileName}`;
  }
  return url;
};

export const isEmpty = (obj) => {
  return !obj || obj.length === 0;
};

export const signatureUrl = (cid) => `${window.location.origin}/sign/${cid}`;

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const toHexString = (number) => {
  return "0x" + Number(number).toString(16);
}

// abbreviate string with asterisks
export const abbreviate = (str, chars) => {
  return str.substring(0, chars || 6) + "**";
};

export const humanize = (str) => {
  return capitalize(str.replace(/_/g, " "));
};

export const getExplorerUrl = (activeChain, hash, useTx) =>
  `${activeChain?.url || DEFAULT_CHAIN.url}${useTx ? "tx/" : "address/"}${hash}`;

export const createJsonFile = (signload, fileName) => {
  const st = JSON.stringify(signload);
  const blob = new Blob([st], { type: "application/json" });
  const fileData = new File([blob], fileName);
  return fileData;
};

export const getDateStringFromTimestamp = (ts, showTime) => {
  const d = new Date(ts);
  if (showTime) {
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }
  return d.toLocaleDateString();
};

export const col = (k, render) => ({
  title: humanize(k),
  dataIndex: k,
  key: k,
  render,
});

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "0 Byte";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
