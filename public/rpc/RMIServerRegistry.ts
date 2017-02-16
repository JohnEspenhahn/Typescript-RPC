import { Remote } from "./Remote";
import { RMIRegistry } from "./RMIRegistry";
import { ProxyDef, ProxyDefGenerator } from "./ProxyDef";

export class RMIServerRegistry implements RMIRegistry {
  static RMI_BASE = "/rmi"; // also in RMIClientRegistry

  private serving: { [id: string]: ProxyDef } = {};
  
  public lookup<T>(path: string): Promise<T> {
    throw "Server does not support lookup yet";
    
  }

  public serve(path: string, obj: Remote): boolean {
    if (this.serving[path]) return false;
    else {
      this.serving[path] = obj;
    }
  }

  private lookup(path: string, res: any) {

  }

  public readonly express = {
    middleware: function (req: any, res: any, next: Function) {
      this.parseExpressAction(req.originalUrl, res);
      next();
    }
  }

  private parseExpressAction(path: string, res: any) {
    var chars = path.split("");
    if (this.acceptExpressToken(chars, RMIServerRegistry.RMI_BASE)) {
      if (this.acceptExpressToken(chars, "/")) {
        var action = this.getExpressToken(chars);
        switch (action) {
          case "lookup":
            return this.lookup(chars.join(""), res);
        }
      }
    }

    res.status(404).send("Unknown command " + path);
  }

  private getExpressToken(path: string[]): string {
    var spelling = "";
    var cc = path.shift();
    if (cc.match(/^[a-z0-9_]+$/i)) {
      while (cc.match(/^[a-z0-9_]+$/i)) {
        spelling += cc;
        cc = path.shift();
      }
    } else if (cc === '/') {
      spelling = '/';
    } else if (cc === '?') {
      spelling = '?'
    } else if (cc === '=') {
      spelling = '=';
    } else if (cc === '&') {
      spelling = '&';
    } else if (cc != undefined) {
      spelling = cc;
    }

    return spelling;
  }

  private acceptExpressToken(path: string[], token: string): boolean {
    return this.getExpressToken(path) === token;
  }

}