import * as React from 'react';
import { ILoginState } from './ILoginState';
import { ILoginProps } from './ILoginProps';
import styles from './Login.module.scss';
import { toast } from 'react-toastify';
import { FormControl, FormGroup, Form, Button, ButtonGroup, FormLabel, FormText } from 'react-bootstrap';
import { fetchClient } from '../../helpers/fetchClient';


class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    document.cookie = "token=;expires=expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = "email=;expires=expires=Thu, 01 Jan 1970 00:00:00 GMT;";
  }


  handleKeyPress = (event:any) =>{
    if(event.key === "Enter") this.onHandleSignIn();
  }

  onHandleSignIn = async () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      toast.error("Please input email and password")
      return
    }
    const request = {
      email,
      password
    }
    const response = await fetchClient.httpPost("/api/User/login", request)
    if (response.errors) {
      this.handleValidationErrors(response);
      return
    }
    if (response.status === 401) {
      toast.error(`Email or Password is incorrect`)
      toast.info(`Try Sign Up if you do not have an account`)
      this.clearPassword()

      return
    }
    if (response.token) {
      this.handleSuccessAuth(response, email);
    }

  }


  onHandleSignUp = async () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      toast.error("Please input email and password")
      return
    }
    const request = {
      email,
      password
    }
    const response = await fetchClient.httpPost("/api/User/register", request)
    if (response.errors) {
      this.handleValidationErrors(response);
      return
    }
    if (response.status === 401) {
      toast.error(`Email or Password is incorrect`)
      this.clearPassword()
      return
    }
    if (response.token) {
      this.handleSuccessAuth(response, email);
    }

  }

  private handleSuccessAuth(response: any, email: string) {
    this.saveCookies(response, email);
    this.props.history.push('/SaleCenter');
    toast.success("Welcome");
  }

  private saveCookies(response: any, email: string) {
    const tokenExpiration = new Date();
    tokenExpiration.setMinutes(tokenExpiration.getMinutes() + (Number(response.expires) - 5));
    document.cookie = `token=${response.token};expires=${tokenExpiration.toUTCString()}`;
    document.cookie = `email=${email};expires=${tokenExpiration.toUTCString()}`;
  }

  private handleValidationErrors(response: any) {
    for (const error in response.errors) {
      toast.warn(`${response.errors[error]}`);
    }
    this.clearPassword();
  }

  clearPassword() {
    this.setState({
      password: "",
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
    const { password, email } = this.state;
    return (
      <div className={`${styles.background}`}>

        <div className={`${styles.login}`}>
          <Form>
            <h2>Auction Center</h2>
            <FormLabel>Better than craiglist</FormLabel>
            <div className={`${styles.welcome}`}>

              <FormGroup >
                <FormLabel>Email address</FormLabel>
                <FormControl type="email" placeholder="Email" value={email} onKeyPress={this.handleKeyPress} onChange={this.onHandleChangeEmail} />
                <FormText >
                  We will send you information about your purchases to this email
    </FormText>
                <FormLabel>Password</FormLabel>
                <FormControl type="password" placeholder="Password" value={password} onKeyPress={this.handleKeyPress} onChange={this.onHandleChangePassword} />
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
