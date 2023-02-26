import React, { useState, useEffect, useMemo } from "react";
import { Spin } from "antd";
import Packet from "./Packet";
import { useParams } from "react-router-dom";
import { createSignatureNFT, getMintedNFT } from "../util/nftport";
import { fetchMetadata, retrieveFiles } from "../util/stor";
import { getExplorerUrl, ipfsUrl } from "../util";
import {
  getPrimaryAccount,
  markContractCompleted,
} from "../contract/signatureContract";

function Sign({ account, activeChain }) {
  const { signId } = useParams(); // cid
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const fetchData = async () => {
    console.log("fetch", signId);
    if (!signId) {
      return;
    }

    setLoading(true);
    setError(undefined)

    try {
      const res = await fetchMetadata(signId);
      setData(res.data);
      console.log("esignature request", res.data);
    } catch (e) {
      console.error(e);
      setError(e.response.data)
      alert("error getting signdata" + e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [signId]);

  const authed = useMemo(() => {
    return data && (data.signerAddress || '').toLowerCase() === (account || '').toLowerCase()
  } ,[data, account])

  const { description, title, signerAddress, address: contractAddress } = data;

  const sign = async (signatureData) => {
    let nftResults = {};

    setLoading(true);

    try {
      //   https://docs.nftport.xyz/docs/nftport/b3A6MjE2NjM5MDM-easy-minting-w-url
      let res = await createSignatureNFT(
        title,
        description,
        signerAddress,
        signatureData
      );
      const nftUrl = ipfsUrl(res.data.ipfs_url.split("/").pop());
      res.data = { ...res.data, ipfs_url: nftUrl };
      nftResults["signatureNft"] = res.data;
      const url = nftResults["transaction_external_url"];
      res = await markContractCompleted(contractAddress, url || signId);
      nftResults = { nftResults, ...res };
      setResult(nftResults);
    } catch (e) {
      console.error("error signing", e);
      alert("Error completing esignature: " + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Error looking up request, the url entered may not be valid.</h1>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="container">
        {/* <img src={logo} className="header-logo" /> */}
        <br />
        <br />
        <h1>Transaction complete!</h1>
        <p>Access your completed fantom contract and signature packet.</p>

        <a href={getExplorerUrl(activeChain, contractAddress)} target="_blank">
          View Contract
        </a>
        <p>Full response below:</p>
        <pre>{JSON.stringify(result, null, "\t")}</pre>
      </div>
    );
  }

  return (
    <div className="container boxed white">
      <h2 className="centered">Sign Documents</h2>
      <br />
      <Packet {...data} authed={authed} sign={sign} signId={signId} />
    </div>
  );
}

Sign.propTypes = {};

export default Sign;
