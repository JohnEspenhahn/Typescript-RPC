declare module RMI {

  interface Socket {
    on: (event: string, then: ResolveFunction) => void;
    emit: (event: string, data: any) => void;
  }

}