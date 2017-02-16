type HttpCallback = (res: any) => void;

export class HttpClient {
    public static get(url: string, callback?: HttpCallback): any {
        var req = new XMLHttpRequest();
        if (typeof callback === "function") {
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

          return req;
        } else {
          req.open( "GET", url, false );
          req.send(null);

          if (req.status === 200)
            return JSON.parse(req.responseText);
          else
            return null;
        }
    }
}