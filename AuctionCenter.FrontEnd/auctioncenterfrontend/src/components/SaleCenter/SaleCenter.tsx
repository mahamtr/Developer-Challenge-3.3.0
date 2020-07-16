import * as React from 'react';
import { ISaleCenterState } from './ISaleCenterState';
import { ISaleCenterProps } from './ISaleCenterProps';
import styles from './SaleCenter.module.scss';

class SaleCenter extends React.Component<ISaleCenterProps, ISaleCenterState> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`${styles.saleCenter}`}>
        <h3>{this.props.token}</h3>
      </div>
    );
  }
}

export default SaleCenter;
