export abstract class Remote {

  constructor() {
    console.log("In Remote");

    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(this);
    let remote_proto = remote_proto_parent;
    while (!remote_proto.hasOwnProperty(Remote.EXPORT)) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Export it
    Remote.export_prototype(this, remote_proto_parent);

    console.log("Done Remote");
  }

  public static export(o: Remote) {
    let proto = Object.getPrototypeOf(o);
    Remote.export_prototype(o, proto);
  }

  public static export_prototype(obj: any, proto: any) {
    while (!proto.hasOwnProperty(Remote.EXPORT)) {
      // For every non-constructor function in the prototype
      let keys = Object.getOwnPropertyNames(proto);
      for (let key of keys) {
        if (key === "constructor") continue;
        else if (typeof proto[key] !== "function") continue;

        // Generate the proxy function
        Remote.export_func_proxy.apply(obj, [ proto, key ]);
      }

      // Go to next layer's prototype
      proto = Object.getPrototypeOf(proto);
    }
  }

  private static export_func_proxy(proto: any, key: string) {
    var _this = this;
    var old_func = proto[key];
    proto[key] = function() {
      console.log("Start proxy");
      old_func.apply(_this, arguments);
      console.log("End proxy");
    };
  }

  public static readonly EXPORT = "___i_am_the_real_remote_object_hidden_key___";
  private ___i_am_the_real_remote_object_hidden_key___() { }
}