import * as React from 'react';
import { IWaitControlProps } from './IWaitControlProps';
import styles from './WaitControl.module.scss';
import { Spinner } from 'react-bootstrap';
var EventEmitter = require('events')

var waitControlEventListener = new EventEmitter()

 export const WaitControl: React.SFC<IWaitControlProps> = (props) => {
  const [isLoading,setIsLoading] = React.useState(false)

  waitControlEventListener.on('onChangeFetchEvent', (isLoadingSetter:boolean) =>{
    setIsLoading(isLoadingSetter);
  })

  return ( isLoading ? (<div className={`${styles.waitControl}`}>
    <div className={`${styles.absoluteContainer}`}>
    <Spinner animation="grow" variant="primary"  />
      </div>
    </div>) : null)
    
};

export default waitControlEventListener;

