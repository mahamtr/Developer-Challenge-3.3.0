import * as React from 'react';
import { ICartState } from './ICartState';
import { ICartProps } from './ICartProps';
import styles from './Cart.module.scss';

class Cart extends React.Component<ICartProps, ICartState> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  }

  public render(): JSX.Element {
    return (
      <div className={`${styles.cart}`}>
        {this.props.itemsInCart.map((i:any)=> <h3>{i.itemName}</h3>)}
      </div>
    );
  }
}

export default Cart;
