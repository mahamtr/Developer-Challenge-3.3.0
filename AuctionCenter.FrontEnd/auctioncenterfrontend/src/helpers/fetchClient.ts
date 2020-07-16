import { toast } from "react-toastify";

 class fetchClient  {
     static readonly apiUrl: any = 'https://localhost:44303';

    static async httpPost (url:string,request:any) {
        return fetch(`${this.apiUrl}${url}`,{
            method:'POST',
            body: JSON.stringify(request), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
              },
        })
        .then((response)=> {
          return response.json();
        })
        .then((json)=> {
          return json
        })
        .catch((e)=>{
            toast.error(e)
        })
};

}


export { fetchClient };
