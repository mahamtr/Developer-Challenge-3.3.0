import { toast } from "react-toastify";
import { cookieHelper } from "./cookieHelper";

class fetchClient {
  static readonly apiUrl: any = 'https://localhost:44303';

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

  static async httpGetWithAuth(url: string, request: any) {
    return fetch(`${this.apiUrl}${url}`, {
      method: 'GET',
      // body: JSON.stringify(request), // data can be `string` or {object}!
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
