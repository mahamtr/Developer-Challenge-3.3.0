
 class cookieHelper  {

    static getCookie (cookieName:string) {
        var cookies = document.cookie.split(';');
        var cookie = cookies.filter((cookie:any)=> cookie.includes(cookieName));
        return cookie[0] && cookie[0].replace(`${cookieName}=`,"");
    };

}


export { cookieHelper };
