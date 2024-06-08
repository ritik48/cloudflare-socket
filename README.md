#### How to use

1.  Run: `npm run dev`

2.  Open two hoppscoth client for two clients (https://hoppscotch.io/realtime/websocket)

3.  For 1st client `ws://127.0.0.1:8787?name="Client_1"`

4.  For 2nd client `ws://127.0.0.1:8787?name="Client_2"`

5.  Now, from client 1, send the folllowing json one by one:

    `{"type: "client_ready"}`

    `{"type: "init"}`

6.  Now repeat step 5 for client 2, you will notice that , on sending

    `{"type: "init"}`

    the client diconnect with the error:

```
X [ERROR] Uncaught Error:
Cannot perform I/O on behalf of a different request. I/O objects (such as streams, request/response bodies, and others) created in the context of one request handler cannot be accessed from a different request's handler. This is a limitation of Cloudflare Workers which allows us to improve overall performance. (I/O type: Native)
```
