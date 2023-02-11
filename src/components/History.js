import React, { useState, useEffect } from "react";
import { Button, Input, Select, Table } from "antd";
import { ACTIVE_CHAIN, APP_NAME, CHAIN_OPTIONS } from "../util/constants";
import { getTransactions } from "../util/covalent";
import { capitalize, col, getDateStringFromTimestamp } from "../util";

const { Option } = Select;

const COLUMNS = [
  //   col("tx_hash"),
  //   col("from_address"),
  col("to_address"),
  col("value"),
  col("gas_spent"),
  col("block_signed_at", row => getDateStringFromTimestamp(row, true)),
];

function History(props) {
  const [address, setAddress] = useState(
    "0x21989d2dbe099d4f278d0c7942231fa289b0b6f5"
  );
  const [chainId, setChainId] = useState(ACTIVE_CHAIN.id + "");
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    setData(undefined)
  }, [chainId])

  const fetchHistory = async () => {
    if (!address || !chainId) {
      alert("Address and chainId are required");
      return;
    }

    setLoading(true);
    try {
      const res = await getTransactions(chainId, address);
      setData(res.data.data.items);
    } catch (e) {
      console.error(e);
      alert("error getting signdata" + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>
        This page can be used to lookup {APP_NAME} transactions against a given
        {ACTIVE_CHAIN.name} address.
      </p>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        prefix="Address"
      ></Input>
      <br />
      <p></p>
      <Select
        defaultValue={chainId}
        style={{ width: 200 }}
        onChange={(v) => setChainId(v)}
      >
        {Object.keys(CHAIN_OPTIONS).map((cId, i) => {
          return (
            <Option key={i} value={cId}>
              {capitalize(CHAIN_OPTIONS[cId].name)}
            </Option>
          );
        })}
      </Select>
      &nbsp;
      <Button onClick={fetchHistory} disabled={loading} loading={loading}>
        View transactions
      </Button>
      <br />
      <hr />
      {data && (
        <div>
          <br/>
          <h1>Address History</h1>
          <Table
            dataSource={data}
            columns={COLUMNS}
            className="pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  console.log("event", event.target.value);
                  window.open(
                    `${CHAIN_OPTIONS[chainId].url}tx/${record.tx_hash}`,
                    "_blank"
                  );
                }, // click row
                onDoubleClick: (event) => { }, // double click row
                onContextMenu: (event) => { }, // right button click row
                onMouseEnter: (event) => { }, // mouse enter row
                onMouseLeave: (event) => { }, // mouse leave row
              };
            }}
          />
          ;
        </div>
      )}
    </div>
  );
}

History.propTypes = {};

export default History;
