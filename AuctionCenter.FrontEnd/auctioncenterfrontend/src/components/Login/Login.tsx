import * as React from 'react';
import { ILoginState } from './ILoginState';
import { ILoginProps } from './ILoginProps';
import styles from './Login.module.scss';

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`${styles.login}`}>
        <h3>Login Component!</h3>
      </div>
    );
  }
}

export default Login;
