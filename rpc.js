(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./private/rpc/RMIServerRegistry"], factory);
    }
})(function (require, exports) {
    "use strict";
    var RMIServerRegistry_1 = require("./private/rpc/RMIServerRegistry");
    return function (server) {
        var io = require('socket.io')(server);
        // Setup RMI
        return RMIServerRegistry_1.RMIServerRegistry.get(io);
    };
});
//# sourceMappingURL=rpc.js.map