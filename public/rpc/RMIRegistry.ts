import { Remote } from "./Remote";

export interface RMIRegistry {
  lookup<T>(path: string): Promise<T>;
  serve(path: string, obj: Remote): boolean;
}