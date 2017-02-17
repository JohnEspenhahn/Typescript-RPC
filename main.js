//main.js contents
//Pass a config object to require
require.config({
    "packages": [ "app", "node_modules" ]
});

require(["tsMain"], function (tsMain) {
    //use the modules as usual.
    tsMain.start();
});