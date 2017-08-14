declare module RMI {
  interface Socket {
    on: (event: string, then: (data: any, callback: ResolveFunction) => void) => void;
    emit: (event: string, data: any, callbacK: ResolveFunction) => void;

    connected: boolean;
  }

}