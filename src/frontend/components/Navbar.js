import {
    Link
} from "react-router-dom";


import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import market from './logo.png'
const Navigation = ({ web3Handler, account }) => {
    return ( < Navbar expand = "lg" bg = "white" variant = "light" >
        < Container >
        <Navbar.Brand href = "http://www.dappuniversity.com/bootcamp" >
        < img src = { market } width = "40" height = "40" className = "" alt = "" />
        &nbsp; Bricklin Marketplace
         </Navbar.Brand> 
         <Navbar.Toggle aria-controls = "responsive-navbar-nav" />
        <Navbar.Collapse id = "responsive-navbar-nav" >
        < Nav className = "me-auto" >
        < Nav.Link as = { Link } to = "/" > Home </Nav.Link>
         < Nav.Link as = { Link } to = "/create" > Create </Nav.Link> 
         < Nav.Link as = { Link } to = "/my-listed-items" > My Listed Items </Nav.Link>
          <Nav.Link as = { Link }to = "/my-purchases" > My Purchases </Nav.Link> 
          </Nav> 
          <Nav > {
            account ? ( <Nav.Link href = { `https://etherscan.io/address/${account}` } target = "_blank"  rel = "noopener noreferrer" className = "button nav-button btn-sm mx-4" >
                <Button variant = "outline-primary" > { account.slice(0, 5) + '...' + account.slice(38, 42) } </Button> </Nav.Link>
            ) : ( <Button onClick = { web3Handler }variant = "outline-primary" > Connect Wallet </Button>
            )
        } </Nav> 
        </Navbar.Collapse>
        </Container> 
        </Navbar>

    )
}

export default Navigation;