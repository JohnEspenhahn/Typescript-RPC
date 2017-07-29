## About

The general goal of remote procedure calls is to make distributed code look like local code to a developer. In web development, a developer often needs to write distributed code. This could be something as simple as a call-and-callback to a server. But, as more and more code moves from the backend to the frontend, distributed front end code could start to require libraries that support the complex, distrubted interactions that backend libraries currently do.

This project could also be useful to instructors, as the Typescript lanugage provides a much less verbose syntax than a language such as Java. This means the code required to build an RPC library could be more comprehensible to a student. This could be very useful to systems courses, which hope to expose students to many aspects of design, without getting stuck in the weeds of implementation.

To learn more, read my indepth blog post about the design of this library here:
http://espenhahn.org/john/#/posts/rpc%2FRPC

## How to run the demo

Clone the package, then in the directory run
```javascript
  npm install    // install basic dependencies
  npm install --only=dev    // install development dependencies
  npm run jspm install    // setup systemjs package loading
  npm install -g typescript    // install typescript compiler (if you haven't already)
  tsc    // compile typescript
  npm start    // start the server
```

Then naviage to `localhost:8080`
