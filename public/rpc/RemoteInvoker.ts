import { RMIResponse } from "./RMIResponse";

type HttpCallback = (res: RMIResponse) => void;

export class RemoteInvoker {
  public static invoke(url: string, args: RMIResponse[]): RMIResponse {
    if (typeof XMLHttpRequest != "undefined") {
      return RemoteInvoker.xhr_invoke(url, args);
    } else {
      return RemoteInvoker.sse_invoke(url, args);
    }
  }

  public static invoke_async(url: string, args: RMIResponse[], callback: HttpCallback) {
    if (typeof XMLHttpRequest != "undefined") {
      return RemoteInvoker.xhr_invoke_async(url, args, callback);
    } else {
      return RemoteInvoker.sse_invoke_async(url, args, callback);
    }
  }

  private static get_xhr_url(url: string, args: RMIResponse[]): string {
    return `${url}?q=${encodeURIComponent(JSON.stringify(args))}`;
  }

  private static xhr_invoke(url: string, args: RMIResponse[]): RMIResponse {
    url = RemoteInvoker.get_xhr_url(url, args);

    var req = new XMLHttpRequest();
    req.open( "GET", url, false );
    req.send(null);

    if (req.status === 200)
      return JSON.parse(req.responseText);
    else
      return null;
  }

  private static xhr_invoke_async(url: string, args: RMIResponse[], callback: HttpCallback): RMIResponse {
    url = RemoteInvoker.get_xhr_url(url, args);

    var req = new XMLHttpRequest();
    try {
      req.onreadystatechange = function() { 
          if (req.readyState === 4)
              if (req.status === 200)
                callback(JSON.parse(req.responseText));
              else
                callback(null);
      }

      req.open("GET", url, true);            
      req.send(null);
    } catch (exp) {
      console.log(exp);
    }

    return null;
  }

  private static sse_invoke(url: string, args: RMIResponse[]): RMIResponse {
    throw "sse_invoke does not yet support synchronous returning";
  }

  private static sse_invoke_async(url: string, args: RMIResponse[], callback: HttpCallback) {
    
  }
}