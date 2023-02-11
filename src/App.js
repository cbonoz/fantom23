import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/Home";
import CreateRequest from "./components/CreateRequest";
import { Layout, Menu, Breadcrumb, Button } from "antd";
import { APP_NAME } from "./util/constants";
import History from "./components/History";
import Sign from "./components/Sign";
import logo from "./assets/logo.png";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
  const [account, setAccount] = useState();
  const [loading, setLoading] = useState(false);

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

  const logout =

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
      label: "Lookup history",
      onClick: () => navigate("/history"),
    },
    {
      key: 0,
      label:
        <span>
          {!account && <span>
            <Button type="primary" onClick={login} loading={loading} disabled={loading}>Login with Metamask</Button>
          </span>}
          {account && <span>
            Hello: {account}</span>}
            
        </span>
    }
  ];



  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          {/* <div className="logo" /> */}
          <Menu
            // theme="dark"
            mode="horizontal"
            selectedKeys={[path]}
            items={menuItems

            }
          >

          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign/:signId" element={<Sign account={account} />} />
              <Route path="/create" element={<CreateRequest account={account} />} />
              <Route path="/history" element={<History />} />
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
