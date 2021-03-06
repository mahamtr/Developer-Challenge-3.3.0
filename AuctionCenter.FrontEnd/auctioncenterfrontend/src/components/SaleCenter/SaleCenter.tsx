import * as React from 'react';
import { ISaleCenterState } from './ISaleCenterState';
import { ISaleCenterProps } from './ISaleCenterProps';
import styles from './SaleCenter.module.scss';
import { Navbar, Nav, NavDropdown, Image, Badge } from 'react-bootstrap';
import SaleItems from '../SaleItems/SaleItems';
import Cart from '../Cart/Cart';
import { toast } from 'react-toastify';
import { fetchClient } from '../../helpers/fetchClient';
import { cookieHelper } from "../../helpers/cookieHelper";


class SaleCenter extends React.Component<ISaleCenterProps, ISaleCenterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedCategory: "all categories",
      isCartSelected: false,
      itemsInCart:[]
    };
  }

  

  handleCart = () => {
    this.setState({
      isCartSelected: true
    })
  }

  handleClick = (event: any) => {
    const newCat = event.target.innerText;
    this.setState({
      selectedCategory: newCat === "New" || newCat === "Used" ? newCat : "all categories",
      isCartSelected:false
    })
  }

  handleAddCartItem = (item:any) =>{
    const {itemsInCart} = this.state;
    if(itemsInCart.some((i:any)=> i.id === item.id)){
      toast.warn(`${item.itemName} is already added in your cart`)
      return
    }
    this.setState({
      itemsInCart : [item,...itemsInCart]
    })
    toast.success(`${item.itemName} added to your cart`)
  }

  handleRemoveItem = (item:any) =>{
    const {itemsInCart} = this.state;
    if(itemsInCart.some((i:any)=> i.id === item.id)){
      itemsInCart.splice(itemsInCart.indexOf(item), 1 );
      this.setState({
        itemsInCart :itemsInCart
      })
    }
  }  


  onCheckOutHandle= async ()=>{
    const {itemsInCart} = this.state;
    if(itemsInCart.length <=0){
      toast.warn("Please add items to you cart");
      return;
    }
    const request ={
      items:itemsInCart,
      email:cookieHelper.getCookie("email")
    }
    await fetchClient.httpPostWithAuth('/api/checkout',request);
    this.setState({
      itemsInCart:[]
    })
    toast.success("Order place throught, we've sent you an email");
  }

  getItemToRender = () => {
    const { isCartSelected, selectedCategory,itemsInCart } = this.state;
    if (isCartSelected)
      return <Cart itemsInCart={itemsInCart} 
      handleRemoveItem={this.handleRemoveItem} 
      onCheckOutHandle={this.onCheckOutHandle}
       />

    return <SaleItems 
    handleAddCartItem={this.handleAddCartItem} 
    selectedCategory={selectedCategory} 
    />

  }

  

  public render(): JSX.Element {
    return (
      <div className={`${styles.saleCenter}`}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
          <div className={`${styles.navbarIcon}`}>
            <Image src='../../favicon.ico' rounded width={50} height={45} />
          </div>
          <Navbar.Brand onClick={this.handleClick}  >Auction Center</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.handleCart}>
    My Cart <Badge variant="light">{this.state.itemsInCart.length}</Badge>
              </Nav.Link>
              <NavDropdown title="Categories" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={this.handleClick} >Used</NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleClick}>New</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.handleClick} >All Categories</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title={"Signed as :" + cookieHelper.getCookie("email")} id="collasible-nav-dropdown">
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
        <div className={`${styles.container}`}>
          {this.getItemToRender()}
        </div>


      </div>
    );
  }
}

export default SaleCenter;
