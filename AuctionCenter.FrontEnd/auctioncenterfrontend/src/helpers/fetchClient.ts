import { toast } from "react-toastify";
import { cookieHelper } from "./cookieHelper";

class fetchClient {
  static readonly apiUrl: any = 'http://138.0.230.186:4454';


  static async httpPost(url: string, request: any) {
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
        return json
      })
      .catch((e) => {
        toast.error(e)
      })
  };

  static async httpPostWithAuth(url: string, request: any) {
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
        return json
      })
      .catch((e) => {
        toast.error(e)
      })
  };

  static async httpGetWithAuth(url: string, request: any) {
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
        return json
      })
      .catch((e) => {
        toast.error(e)
      })
  };

}


export { fetchClient };
