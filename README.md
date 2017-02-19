## How to run

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

## Directories

### /rpc
The actual RPC code

### /demo_public
The files made public to the client (in addition to the rpc code)

### /demo_private
The files only the backend has access to
