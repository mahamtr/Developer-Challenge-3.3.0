import * as React from 'react';
import { ILoginState } from './ILoginState';
import { ILoginProps } from './ILoginProps';
import styles from './Login.module.scss';
import {  toast, ToastContainer } from 'react-toastify';
import { FormControl, FormGroup, Form, Button, ButtonGroup, FormLabel, FormText, Jumbotron, Toast } from 'react-bootstrap';
import { fetchClient } from '../../helpers/fetchClient';


class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount(){
    document.cookie = "token=;expires=expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  }


  onHandleSignIn = async () => {
    const { email, password } = this.state;
    if (email === "" || password === ""){
      toast.error("Please input email and password")
      return
    }
    const request = {
      email,
      password
    }
    const response  = await fetchClient.httpPost("/api/User/login",request)
    if(response.errors){
      for(const error in response.errors){
        toast.warn(`${response.errors[error]}`)
      }
      this.clearPassword()
      return
    } 
    if(response.status ===401){
      toast.error(`Email or Password is incorrect`)
      toast.info(`Try Sign Up if you do not have an account`)
      this.clearPassword()

      return
    }
    if(response.token ){
      const tokenExpiration = new Date()
      tokenExpiration.setMinutes(tokenExpiration.getMinutes()+Number(response.expires))
      document.cookie = `token=${response.token};expires=${tokenExpiration.toUTCString()}`
      document.cookie = `email=${email};expires=${tokenExpiration.toUTCString()}`
      this.props.history.push('/SaleCenter')
      toast.success("Welcome")
    }

  }


  onHandleSignUp = async () => {
    const { email, password } = this.state;
    if (email === "" || password === ""){
      toast.error("Please input email and password")
      return
    }
    const request = {
      email,
      password
    }
    const response  = await fetchClient.httpPost("/api/User/register",request)
    debugger
    if(response.errors){
      for(const error in response.errors){
        toast.warn(`${response.errors[error]}`)
      }
      this.clearPassword()

      return
    } 
    if(response.status ===401){
      toast.error(`Email or Password is incorrect`)
      this.clearPassword()
      return
    }
    if(response.token ){
      const tokenExpiration = new Date()
      tokenExpiration.setMinutes(tokenExpiration.getMinutes()+Number(response.expires))
      document.cookie = `token=${response.token};expires=${tokenExpiration.toUTCString()}`
      this.props.history.push('/SaleCenter')
      toast.success("Welcome")
    }

  }

  clearPassword(){
    this.setState({
      password:"",
    })
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
    const {password,email} = this.state;
    return (
      <div className={`${styles.background}`}>

        <div className={`${styles.login}`}>
          <Form>
            <h2>Auction Center</h2>
            <FormLabel>Better than craiglist</FormLabel>
            <div className={`${styles.welcome}`}>

              <FormGroup >
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="Email" value={email} onChange={this.onHandleChangeEmail} />
                <FormText >
                  We will send you information about your purchases to this email
    </FormText>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" value={password} onChange={this.onHandleChangePassword} />
              </FormGroup>

              <ButtonGroup className="mb-2">
                <Button onClick={this.onHandleSignIn} >Sign-In</Button>
                <Button onClick={this.onHandleSignUp} >Sign-Up</Button>
              </ButtonGroup>
            </div>

          </Form>



        </div>
      </div>
    );
  }
}

export default Login;
