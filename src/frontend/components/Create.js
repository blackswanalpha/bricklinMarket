import{useState} from 'react'
import {ethers} from "ethers"
import {Row, Form, Button} from 'react-bootstrap'
import {create as ipfsHttpClient} from 'ipfs-http-client'

// const client =ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


// import { create } from 'ipfs-http-client'
// import {Buffer} from 'buffer';
const projectId = "2FMIhoh1cRvwE90HNDrkwlscGCR"
const projectSecret = "674f8e093edba9b85ad751a8f27317fd"
const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

const client = ipfsHttpClient({
 url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
})

const Create =({marketplace, nft}) => {
const [image, setImage] = useState("")
const [price, setPrice] = useState(null)
const [name, setName]= useState("")
const [description, setDescription] =useState('')

const uploadToIPFS =async (event) =>{
event.preventDefault()
const file =event.target.files[0]
if(typeof file!== "undefined") {
try{
    
const result = await client.add(file)
console.log(result)
setImage( ...image,
      {
        cid: result.cid,
        path: result.path,
      },)
      
}catch (error) {
console.log("ipfs image upload error: ", error)
}
}
}
const createNFT= async () =>{
if(!image || !price|| !name || !description) return
try{
const result = await client.add(JSON.stringify({image, name, description}))
mintThenList(result)
}catch (error) {
console.log("ipfs uri upload error:",error)
}
}




const mintThenList= async (result)=> { 
const uri =`https://bricklinverse.infura-ipfs.io/ipfs/${result.path}`
// mint aft
await (await nft.mint(uri)).wait()
// get tokenId of new aftAuthorization:
const id = await nft.tokenCount()
// approve marketplace to spend nft
await (await nft.setApprovalForAll(marketplace.address, true)).wait()
// add nft to marketplace
const listingPrice= ethers.utils.parseEther(price.toString())
await ( await marketplace.makeItem(nft.address, id, listingPrice)).wait()

}

return(
    <div className="container-fluid mt-5">
   <div className="row">
<main role="main" className="col-lg-12 mx-auto" style= {{maxWidth: '1000px'} }>
<div className="content mx-auto">
<Row className="g-4">
<Form.Control
type="file"
name="file"
onChange={uploadToIPFS}
/>
<Form.Control
onChange={(e)=> setName(e.target.value)}
size="lg"
type="text"
placeholder="Name"
/>
<Form.Control
onChange={(e)=> setDescription(e.target.value)}
size="1g"
as ="textarea"
placeholder="Description"
/>
<Form.Control
onChange={(e)=> setPrice(e.target.value)}
size="1g"
type="number"
placeholder="Price in ETH"/>
<div className="d-grid px-8">
<Button onClick={createNFT} variant="primary" size="lg">
Create & List NFT!
</Button>
</div>

</Row>

</div>
</main>
    </div>
    </div>

);

}



export default Create;