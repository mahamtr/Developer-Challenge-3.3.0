import * as React from 'react';
import { ICartState } from './ICartState';
import { ICartProps } from './ICartProps';
import styles from './Cart.module.scss';
import { FormControl, Row, Form, FormLabel, FormGroup, FormText, ButtonGroup, Button, Table, Col } from 'react-bootstrap';

class Cart extends React.Component<ICartProps, ICartState> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  getItemsTable = () =>{
   return this.props.itemsInCart.map((i:any,index:number)=> 
    <tr>
    <td>{index+1}</td>
  <td>{i.itemName}</td>
  <td>{i.zipCode}</td>
  <td>{i.price.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})}</td>
  <td>
  <Button>Remove</Button>
    </td>

  </tr>) 
 
 
  }

  getTotalPrice=()=>{
    const {itemsInCart} = this.props; 
    let total = 0;
    itemsInCart.forEach((element:any) => {
      total += element.price
    });
    return total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    }

  public render(): JSX.Element {
    return (
      <div className={`${styles.cart}`}>
        {/* {this.props.itemsInCart.map((i:any)=> <h3>{i.itemName}</h3>)} */}
        <Form>
            <h2>Your Cart</h2>
            <div className={`${styles.cart}`}>

            <Table responsive striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Item Name</th>
      <th>Ships from ZipCode</th>
      <th>Price</th>
      <th>Remove</th>
    </tr>
  </thead>
  <tbody>
  {this.getItemsTable()}
  </tbody>
</Table>
              <FormGroup >
                <Row>
                  <Col>
                  <FormLabel>Total to Pay</FormLabel>
                  </Col>
                  <Col>
                  {this.getTotalPrice()}
                  </Col>
                </Row>
              </FormGroup>

                <Button>CheckOut</Button>
            </div>

          </Form>

      </div>
    );
  }
}

export default Cart;
