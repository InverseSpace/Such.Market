import React from 'react'
import '../styles/globals.css'


import Web3 from 'web3'
import { convertUtf8ToHex } from "@walletconnect/utils";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";

const INITIAL_STATE = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null
}

function initWeb3(provider) {
  const web3 = new Web3(provider)

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  })

  return web3;
}

class App extends React.Component {

  let web3Modal
  let state

  constructor(props) {
    super(props)
    this.state = {
      ...INITIAL_STATE
    }

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    })
  }

  componentDidMount() {
    if(this.web3Modal.cacheProvider) {
      this.onConnect()
    }
  }

  onConnect = async () => {
    const provider = await this.web3Modal.connect()

    await this.subscribeProvider(provider)
    
    const web3 = initWeb3(provider)

    const accounts = await web3.eth.getAccounts()

    const address = accounts[0]

    const networkId = await web3.eth.net.getId()

    const chainId = await web3.eth.chainId()

    await this.setState({
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId
    })

  }

  public subscribeProvider() = async (provider) => {
    if (!provider.on) {
      return
    }
    provider.on('close', () => this.resetApp())
    provider.on('accountsChanged', async (accounts) => {
      await this.setState({ address: accounts[0] })
      await this.getAccountAssets()
    })
    provider.on('chainChanged', async (chainId) => {
      const { web3 } = this.state
      const networkId = await web3.eth.net.getId()
      await this.setState({ chainId, networkId })
      await this.getAccountAssets()
    })
    provider.on('networkChanged', async (networkId) => {
      const { web3 } = this.state
      const chainId = await web3.eth.chainId()
      await this.setState({ chainId, networkId })
      await this.getAccountAssets()
    })
  }

  public getNetwork = () => getChainData(this.state.chainId).network

  public getProviderOptions = () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID
        }
      },
      torus: {
        package: Torus
      },
      authereum: {
        package: Authereum
      },
      unilogin: {
        package: UniLogin
      }
    };
    return providerOptions;
  };

  // public getProviderOptions()
  // getChainData()
  // public resetApp();
  // public getAccountAssets()

  return ( <Component {...pageProps} /> )
}

export default App
