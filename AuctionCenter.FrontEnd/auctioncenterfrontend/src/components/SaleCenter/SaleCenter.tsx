import * as React from 'react';
import { ISaleCenterState } from './ISaleCenterState';
import { ISaleCenterProps } from './ISaleCenterProps';
import styles from './SaleCenter.module.scss';
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import {cookieHelper} from '../../helpers/cookieHelper';


class SaleCenter extends React.Component<ISaleCenterProps, ISaleCenterState> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  componentDidMount(){

  }
 
  public render(): JSX.Element {
    return (
      <div className={`${styles.saleCenter}`}>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
<div className={`${styles.navbarIcon}`}>
<Image src='../../favicon.ico' rounded width={50} height={45} />
</div>
  <Navbar.Brand >Auction Center</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="myCart">My Cart</Nav.Link>
      <NavDropdown title="Categories" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Used</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Brand New</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Auction</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">All Categories</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
    <NavDropdown title={"Signed as :"+ cookieHelper.getCookie("email")}  id="collasible-nav-dropdown">
        <NavDropdown.Item href="/">Log out</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>

    <Nav.Link></Nav.Link>
      <Nav.Link href="https://github.com/mahamtr/Developer-Challenge-3.3.0">
      Git Repo
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>      
</div>
    );
  }
}

export default SaleCenter;
