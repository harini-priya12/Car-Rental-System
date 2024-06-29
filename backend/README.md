### Step by Step

The idea here is to replicate the behaviour of `json-server` using `express` and `node.js`.

1. Creating a new Node.js project
    1. Run `npm init` to create a new package.json file in the current directory.
    2. Add some dummy console.log code in a file `index.js` in the current directory.
    3. Add a new script `"start": "node index.js",` in the `package.json` file.
    4. Run `npm start` to run the dummy code.

2. Add express. Refer to the [official documentation](https://expressjs.com/en/starter/installing.html) for more details.
    1. Run `npm install express` to install express.
    2. Add the sample backend code in the `index.js` file.
    3. Set `"type": "module",` in the `package.json` file to use ES6 import/export syntax.
    4. Run `npm start` to run the express server.

3. Create a `requests.http` and keep on adding the HTTP URLs to test the backend.<br/>
    In our backend, we are using the port 2000 to run the server. So, all requests will be made to `http://localhost:2000/<some-URL-path>`.

4. Add sample routes for assignments : LIST and GET by ID.

5. Add PUT, POST and DELETE routes for assignments.
    1. Install `body-parser` and use it as a middleware to parse the request body as JSON. [Reference](https://expressjs.com/en/resources/middleware/body-parser.html)
    This is required to parse the request body in POST and PUT requests. `npm i body-parser`

6. Add a GET `/groups` route to get all the groups.

7. Let's now use our express server URL instead of the json-server URL in the frontend code.
    1. When we replace `localhost:3000` with `localhost:2000` in the frontend code, in the Groups page, we will get the following error in the browser console.
    ```log
    Access to fetch at 'http://localhost:2000/groups' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    ```
    What is CORS policy? Here's the MDN reference: [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
    
    Definitions:
    > **Origin**: The origin is the combination of protocol, domain, and port of the URL of the page making the request. For example, in a URL `http://www.example.com/path/page.html`, the origin is `http://www.example.com:80` (Protocol: `http:`, Domain: `www.example.com`, Port: `80`). The origin of a page can be viewed inside the `window.location` object. `window.location.origin` returns the origin of the current page.

    > **Cross-Origin**: When you open a webpage, example `http://www.example.com` (**Origin1**), and it makes a request to another domain, example `http://api.example.com` (**Origin2**), it is called a cross-origin request. Here the request originated from Origin1 and is sent to Origin2. The browser blocks such requests by default due to security reasons.

    > **CORS**: Unless the server explicitly allows another domain to access its resources, the **browser** blocks the request. The server needs to be configured to allow such requests. You can configure the server by providing a list of domains which are allowed to access the resources. This is done by setting the `Access-Control-Allow-Origin` header in the response. To allow all domains, you can set the value of this header to `*`.

    Our react dev server is running at `http://localhost:5173` (`Origin1`), and our express server is running at `http://localhost:2000` (`Origin2`). When the react app makes a request to the express server, it is a cross-origin request. Unless the express server allows the react app to access its resources, the browser will block the request.

    2. To fix the issue in our express code, we can set the required header explicitly for every response. Here, we are allowing all domains to access the resources.
    ```js
    res.header("Access-Control-Allow-Origin", "*");
    ```
    Another way is to use a custom middleware to set the required headers for every response. [Reference](https://expressjs.com/en/guide/writing-middleware.html)
    ```js
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        next();
    });
    ```

    Now, during PUT we get the error below:
    ```log
    Access to fetch at 'http://localhost:2000/assignments/1' from origin 'http://localhost:5173' has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.
    ```

    This is because the browser sends a preflight request with the method `OPTIONS` to check if the server allows the method `PUT`. The server should respond with the allowed methods in the `Access-Control-Allow-Methods` header. We can set the required headers in the custom middleware.
    ```js
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    ```

    Next, we get this error:
    ```log
    Access to fetch at 'http://localhost:2000/assignments/1' from origin 'http://localhost:5173' has been blocked by CORS policy: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.
    ```

    This is because the browser sends a preflight request with the header `Content-Type`. The server should respond with the allowed headers in the `Access-Control-Allow-Headers` header. We can set the required headers in the custom middleware.
    ```js
    res.header("Access-Control-Allow-Headers", "Content-Type");
    ```

    3. After adding the 3 headers in the middleware, the requests will now work.

    4. We can also use the cors middleware package instead of setting the headers manually. [Reference](https://expressjs.com/en/resources/middleware/cors.html)
    Install the package `npm i cors`
    ```js
    const cors = require('cors');
    app.use(cors());
    ```