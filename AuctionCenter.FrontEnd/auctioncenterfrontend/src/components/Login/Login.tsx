import * as React from 'react';
import { ILoginState } from './ILoginState';
import { ILoginProps } from './ILoginProps';
import styles from './Login.module.scss';
import { FormControl, FormGroup, Form, Button, ButtonGroup, FormLabel, FormText, Jumbotron } from 'react-bootstrap';

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`${styles.background}`}>

      <div className={`${styles.login}`}>
        <Form>
          <h2>Auction Center</h2>
          <FormLabel>Better than craiglist</FormLabel>
          <div className={`${styles.welcome}`}>

          <FormGroup >
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" placeholder="Email" />
            <FormText className="text-muted">
              We will send you information about your purchases to this email
    </FormText>
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="Password" />
          </FormGroup>

          <ButtonGroup className="mb-2">
            <Button >Sign-In</Button>
            <Button >Sign-Up</Button>
          </ButtonGroup>
        </div>

        </Form>


      
      </div>
      </div>
    );
  }
}

export default Login;
