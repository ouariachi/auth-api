import{N as l}from"./q-c409971d.js";const u=()=>l("main",null,null,[l("h1",null,null,"Authorization API",3,null),l("h2",null,null,"Routes:",3,null),l("ul",null,null,[l("li",null,null,[l("h3",null,null,"/auth/login (POST)",3,null),"In this path you can authorize yourself by providing the following parameters in the body of the request:",l("ul",null,null,[l("li",null,null,l("b",null,null,"username",3,null),3,null),l("li",null,null,l("b",null,null,"password",3,null),3,null),l("li",null,null,[l("b",null,null,"grant_type",3,null),': Must be "password"'],3,null)],3,null),l("br",null,null,null,3,null),"Output:",l("pre",null,null,l("code",null,{lang:"json",style:{width:"100%",display:"block"}},`
  {
    "success: true,
    "tokens": {
        "accessToken": "...",
        "refreshToken": "...",
        "expiration": "..."
    },
    "user": {
        "username": "...",
        "email": "...",
        "date": "...",
        "lastConnection": "...",
        "name": { 
          "firstname": "...",
          "lastname": "..."
        },
        "roles": [...]
    }
  }
              `,3,null),3,null)],3,null),l("br",null,null,null,3,null),l("li",null,null,[l("h3",null,null,"/auth/register (POST)",3,null),"In this path you can register by providing the following parameters in the body of the request:",l("ul",null,null,[l("li",null,null,[" ",l("b",null,null,"username",3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,"password",3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,'grant_type: Must be "client_credentials"',3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,"email (optional)",3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,"firstname (optional)",3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,"lastname (optional)",3,null)," "],3,null)],3,null),l("br",null,null,null,3,null),"Output:",l("pre",null,null,l("code",null,{lang:"json",style:{width:"100%",display:"block"}},"{ success: true }",3,null),3,null)],3,null),l("br",null,null,null,3,null),l("li",null,null,[l("h3",null,null,"/auth/refresh (POST)",3,null),"In this path you can refresh your token by providing the following parameters in the body of the request:",l("ul",null,null,[l("li",null,null,[" ",l("b",null,null,"refreshToken",3,null)," "],3,null),l("li",null,null,[" ",l("b",null,null,'grant_type: Must be "refresh_token"',3,null)," "],3,null)],3,null),l("br",null,null,null,3,null),"Output:",l("pre",null,null,l("code",null,{lang:"json",style:{width:"100%",display:"block"}},`
{ 
  "success": true,
  "token": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiration": "..."
  }
}
              `,3,null),3,null)],3,null)],3,null)],3,"iK_0");export{u as s_crp5PYqmBUM};
