import { useState } from 'react';
// import { Contract, ethers } from 'ethers';
import { create } from 'ipfs-http-client'
import './App.css';
// import  ERC721URIStorage   from "./ERC721URIStorage.json";

const client = create('https://ipfs.infura.io:5001/api/v0');
function App() {
  // let [contractAddress, setContractAddress] = useState("0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6");
  let [maxNumber, setMaxNumber] = useState(0);
  let [minNumber, setMinNumber] = useState(0);
  let [sum, setSum] = useState(0);
  let [URL, setURL] = useState("");
  let [cid, setCid] = useState("");

  async function getMetadata() {
    // const option = { address: "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6", chain: "Eth" };
  
  
  let jsonArray = [];
 
   for (let index = minNumber; index <= maxNumber; index++) {
      const data = await fetch(`https://gateway.pinata.cloud/ipfs/${cid}/${index}.json`)
      const json = await data.json()
      console.log(json)
      jsonArray.push(json);
      setSum(index);

   }

  const jsonString = JSON.stringify(Object.assign({}, jsonArray));
  console.log(jsonString);

  const added = await client.add(jsonString);
  console.log(added);
  
  const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  console.log(url);
  setURL(url);
    
 }

//  async function fetch() {
//   // let abi = "function tokenURI(uint256 tokenId) external view returns (string memory);"
//   let ethAccounts = await window.ethereum.request({
//     method: "eth_requestAccounts"
//   });
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   const contract = new ethers.Contract(contractAddress, ERC721URIStorage.abi, provider);

//   for (let index = 6969; index < 7025; index++) {
//    const uri = await contract.tokenURI(index);
//    console.log(uri);
    
//   }


   
//  }


  return (
    <div className="App">
      {/* <input type="text" placeholder='base ipfs cid' onChange={(e)=> setContractAddress(e.currentTarget.value) } /> */}
      <input type="text" placeholder='cid' onChange={(e)=> setCid(e.currentTarget.value) } />
      <input type="number" placeholder='start token id' onChange={(e)=> setMinNumber(e.currentTarget.value) } />
      <input type="number" placeholder='end token id' onChange={(e)=> setMaxNumber(e.currentTarget.value) } />
      <button onClick={getMetadata}> Click </button>
      <h2>{sum}</h2>
      {/* <button onClick={fetch}> Fetch </button> */}
      <h1>url - {URL}</h1>
    </div>
   
 
  );
}

export default App;
