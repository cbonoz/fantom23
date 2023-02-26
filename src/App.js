import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import CreateRequest from "./components/CreateRequest";
import { Layout, Menu, Select, Button } from "antd";
import { APP_NAME, CHAIN_OPTIONS, DEFAULT_CHAIN } from "./util/constants";
import History from "./components/History";
import Home from "./components/Home";
import Sign from "./components/Sign";
import logo from "./assets/logo.png";
import { capitalize } from "./util";

import "./App.css";

const { Option } = Select;



const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);
  const [activeChain, setActiveChain] = useState(DEFAULT_CHAIN);

  const login = async () => {
    setLoading(true)
    const e = window.ethereum
    if (!e) {
      alert('Metamask must be connected to use FantomSign')
      return
    }
    try {
      const accs = await e.request({ method: 'eth_requestAccounts' });
      console.log('accounts', accs)
      setAccount(accs[0])
    } catch (e) {

    } finally {
      setLoading(false)
    }
  }

  const checkConnected = async () => {
    const e = window.ethereum
    if (!e) {
      return
    }
    const connected = e.isConnected()
    console.log('connected', connected)
    if (connected) {
      await login()
    }
  }

  useEffect(() => {
    checkConnected()
  }, [])

  const navigate = useNavigate();
  const path = window.location.pathname;

  const isSignature = path.startsWith("/sign");

  const menuItems = [
    {
      key: '/',
      label: <img
        src={logo}
        className="header-logo pointer"
        onClick={() => navigate("/")}
      />
    },
    {
      key: '/create',
      label: "Create",
      onClick: () => navigate("/create"),
    },
    {
      key: '/history',
      label: "Lookup request",
      onClick: () => navigate("/history"),
    },
    {
      key: 0,
      label: <>
      Network:&nbsp;
      <Select
        defaultValue={activeChain.id}
        style={{ width: 200 }}
        onChange={(v) => setActiveChain(CHAIN_OPTIONS[v])}
      >
        {Object.values(CHAIN_OPTIONS).map((chain, i) => {
          return (
            <Option key={i} value={chain.id}>
              {capitalize(chain.name)}
            </Option>
          );
        })}
      </Select>
</>
    },
    {
      key: 1,
      label:
        <span>
          {!account && <span>
            <Button type="primary" onClick={login} loading={loading} disabled={loading}>Login with Metamask</Button>
          </span>}
          {account && <span>
            Hello: {account}</span>}

        </span>
    },
  ];

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        console.log('accountsChanged', accounts)
        setAccount(accounts[0])
      })
    }
  })

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <Menu
            // theme="dark"
            mode="horizontal"
            selectedKeys={[path]}
            items={isSignature ? [menuItems[0], menuItems[menuItems.length - 1]] : menuItems}
          >

          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign/:signId" element={<Sign activeChain={activeChain} account={account} />} />
              <Route path="/create" element={<CreateRequest activeChain={activeChain} account={account} />} />
              <Route path="/history" element={<History activeChain={activeChain} />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {APP_NAME} ©2023 - A Fantom-powered esignature platform
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
