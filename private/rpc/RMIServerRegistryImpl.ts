import { Remote } from "../../public/rpc/Remote";
import { Marshaller } from "../../public/rpc/Marshaller";
import { RMIRegistry } from "../../public/rpc/RMIRegistry";
import { RMIResponse } from "../../public/rpc/RMIResponse";
import { ProxyDefCache } from "../../public/rpc/ProxyDefCache";
import { ProxyDef, ProxyDefPair } from "../../public/rpc/ProxyDef";

import { ServerDemarshaller } from "./ServerDemarshaller";

export class RMIServerRegistryImpl extends RMIRegistry {
  private serving: { [id: string]: ProxyDefPair } = {};

  constructor() {
    super();
    
    this.setupMiddleware();
  }
  
  public lookup<T>(path: string): Promise<T> {
    throw "Server does not support lookup yet";
  }

  public serve(path: string, obj: Remote): boolean {
    if (this.serving[path]) return false;
    else {
      this.serving[path] = ProxyDefCache.load(obj);
    }
  }

  public readonly express = { middleware: (req: any, res: any, next: Function) => {} };
  private setupMiddleware() {
    var _self = this;
    this.express.middleware = function (req: any, res: any, next: Function) {
      _self.processExpress(req.originalUrl, req.query, res);
      next();
    };
  }

  private remote_lookup(path: string, res: any) {
    console.log("Looking up " + path);
    if (this.serving[path]) {
      res.json(this.serving[path].proxy);
    } else {
      res.status(404).send("Not serving " + path);
    }
  }

  private remote_invoke(uuid: string, fn_name: string, args: RMIResponse[], res: any) {
    console.log("Invoking " + fn_name);
    var def = ProxyDefCache.get(uuid);
    if (def) {
      var def_self = def.self as any;
      if (def_self[fn_name]) {
        var fn = def_self[fn_name] as Function;
        res.json(Marshaller.marshal(fn.apply(def.self, ServerDemarshaller.demarshal_args(args))));
      } else {
        res.status(404).send("Unknown function " + fn_name);
      }
    } else {
      res.status(404).send("Invalid uuid " + uuid);
    }
  }

  private processExpress(path: string, query: { [id: string]: string }, res: any) {
    console.log("Processing " + path);

    var parser = new ExpressParser(path.split(""));
    if (parser.acceptToken("/") && parser.acceptToken(RMIRegistry.RMI_BASE) && parser.acceptToken("/")) {
      var action = parser.getToken();
      switch (action) {
        case "lookup":
          if (parser.acceptToken("/"))
            return this.remote_lookup(parser.getToken(), res);
          break;
        case "invoke":
          if (parser.acceptToken("/")) {
            var uuid = parser.getToken();
            if (parser.acceptToken("/")) {
              var fn_name = parser.getToken();
              var args = JSON.parse(query["q"]);
              return this.remote_invoke(uuid, fn_name, args, res);
            }
          }
          break;
      }
    }

    res.status(404).send("Unknown command " + path);
  }

}

class ExpressParser {
  private cc: string = null;
  private spelling: string = "";

  constructor(private chars: string[]) { }

  getToken(): string {
    this.spelling = "";
    if (!this.cc) this.cc = this.chars.shift();

    if (this.cc.match(/^[a-z0-9_\-]$/i)) {
      while (this.cc && this.cc.match(/^[a-z0-9_\-]$/i))
        this.takeIt();
    } else if (this.cc === '/') {
      this.takeIt();
    } else if (this.cc === '?') {
      this.takeIt();
    } else if (this.cc === '=') {
      this.takeIt();
    } else if (this.cc === '&') {
      this.takeIt();
    } else if (this.cc != undefined) {
      this.takeIt();
    }

    return this.spelling;
  }

  private takeIt() {
    this.spelling += this.cc;
    this.cc = this.chars.shift();
  }

  acceptToken(token: string): boolean {
    return this.getToken() === token;
  }
}