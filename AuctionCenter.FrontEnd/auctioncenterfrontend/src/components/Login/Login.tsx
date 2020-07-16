import * as React from 'react';
import { ILoginState } from './ILoginState';
import { ILoginProps } from './ILoginProps';
import styles from './Login.module.scss';
import {  toast, ToastContainer } from 'react-toastify';
import { FormControl, FormGroup, Form, Button, ButtonGroup, FormLabel, FormText, Jumbotron, Toast } from 'react-bootstrap';

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isInputEmpty:false
    };
  }

  onHandleSignIn = () => {
    const { email, password } = this.state;
    if (email === "" || password === ""){
      toast.error("Please input email and password")
      return
    }
  }

  onHandleChangeEmail = (e: any) => {
    this.setState({
      email: e.target.value
    })
  }
  onHandleChangePassword = (e: any) => {
    this.setState({
      password: e.target.value
    })
  }



  public render(): JSX.Element {
    const {isInputEmpty} = this.state;
    return (
      <div className={`${styles.background}`}>

        <div className={`${styles.login}`}>
          <Form>
            <h2>Auction Center</h2>
            <FormLabel>Better than craiglist</FormLabel>
            <div className={`${styles.welcome}`}>

              <FormGroup >
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="Email" onChange={this.onHandleChangeEmail} />
                <FormText >
                  We will send you information about your purchases to this email
    </FormText>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" onChange={this.onHandleChangePassword} />
              </FormGroup>

              <ButtonGroup className="mb-2">
                <Button onClick={this.onHandleSignIn} >Sign-In</Button>
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
