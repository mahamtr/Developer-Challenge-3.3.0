import { toast } from "react-toastify";
import { cookieHelper } from "./cookieHelper";
import waitControlEventListener  from "../components/WaitControl/WaitControl"

class fetchClient {
  static readonly apiUrl: any = 'http://138.0.230.186:4454';


  static async httpPost(url: string, request: any) {
    waitControlEventListener.emit("onChangeFetchEvent",true);
    return fetch(`${this.apiUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(request), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);
        return json
      })
      .catch((e) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);

        toast.error(e)
      })
  };

  static async httpPostWithAuth(url: string, request: any) {
    waitControlEventListener.emit("onChangeFetchEvent",true);
    return fetch(`${this.apiUrl}${url}`, {
      method: 'POST',
      body: JSON.stringify(request), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieHelper.getCookie("token")}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);

        return json
      })
      .catch((e) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);

        toast.error(e)
      })
  };

  static async httpGetWithAuth(url: string, request: any) {
    waitControlEventListener.emit("onChangeFetchEvent",true);
    var requestURL = new URL(this.apiUrl+url);
    requestURL.search = new URLSearchParams(request).toString();
    return fetch(requestURL.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookieHelper.getCookie("token")}`
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);

        return json
      })
      .catch((e) => {
    waitControlEventListener.emit("onChangeFetchEvent",false);

        toast.error(e)
      })
  };

}


export { fetchClient };
