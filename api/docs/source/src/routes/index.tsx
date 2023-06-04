import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <main>
      <h1>Authorization API</h1>
      
      <h2>Routes:</h2>
      <ul>
        <li>
          <h3>/auth/login (POST)</h3>
          In this path you can authorize yourself by providing the following parameters in the body of the request:
          <ul>
            <li><b>username</b></li>
            <li><b>password</b></li>
            <li><b>grant_type</b>: Must be "password"</li>
          </ul>

          <br />

          Output:
          <pre>
            <code lang='json' style={{width: "100%", display: "block"}}>
              {`
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
              `}
            </code>
          </pre>
        </li>

        <br />

        <li>
          <h3>/auth/register (POST)</h3>
          In this path you can register by providing the following parameters in the body of the request:
          <ul>
            <li> <b>username</b> </li>
            <li> <b>password</b> </li>
            <li> <b>grant_type: Must be "client_credentials"</b> </li>
            <li> <b>email (optional)</b> </li>
            <li> <b>firstname (optional)</b> </li>
            <li> <b>lastname (optional)</b> </li>
          </ul>

          <br />

          Output:
          <pre>
            <code lang='json' style={{width: "100%", display: "block"}}>
              {`{ success: true }`}
            </code>
          </pre>
        </li>

        <br />
        
        <li>
          <h3>/auth/refresh (POST)</h3>
          In this path you can refresh your token by providing the following parameters in the body of the request:
          <ul>
            <li> <b>refreshToken</b> </li>
            <li> <b>grant_type: Must be "refresh_token"</b> </li>
          </ul>

          <br />

          Output:
          <pre>
            <code lang='json' style={{width: "100%", display: "block"}}>
              {`
{ 
  "success": true,
  "token": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiration": "..."
  }
}
              `}
            </code>
          </pre>
        </li>
      </ul>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Authorization API Docs',
};
