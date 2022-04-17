import logo from './logo.svg';
import './App.css';
import * as Web3 from 'web3';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { OpenSeaPort, Network } from 'opensea-js';
import { OrderSide } from 'opensea-js/lib/types'


const provider = new Web3.providers.HttpProvider('http://localhost:3000');
const seaport = new OpenSeaPort(provider, {
  networkName: Network.Rinkeby,
  apiKey: ""
});

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

async function getWalletInfo() {
  const tokenAddress = "0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656";
  const tokenId = "34474639229749473455998702798638031310108318423512110661652871179771440005121";
  const assets = await seaport.api.getAsset({
    tokenAddress,
    tokenId
  });
  console.log(assets);
  await timeout(2000);
  // Get page 2 of all auctions, a.k.a. orders where `side == 1`
  const { orders, count } = await seaport.api.getOrders({
    asset_contract_address: tokenAddress,
    token_id: tokenId,
    side: OrderSide.Sell
  }) 
  if (count > 0) {
    const walletAddr = "0x045f3A9Da7Cc32E554cB7cCB722FD7A51cE8e42a";
    const sellOrder = orders.at(0);
    console.log(sellOrder);
    
    await timeout(2000);

    const transactionHash = await seaport.fulfillOrder({ sellOrder, walletAddr })


  }

}

function App() {
  getWalletInfo();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         Wuming nft
        </a>
      </header>
    </div>
  );
}

export default App;
