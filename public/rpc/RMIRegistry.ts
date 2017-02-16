import { Remote } from "./Remote";
import { RMIResponse } from "./RMIResponse";

export abstract class RMIRegistry {
  public static readonly RMI_BASE = "rmi";

  abstract lookup<T>(path: string): Promise<T>;
  abstract serve(path: string, obj: Remote): boolean;
}