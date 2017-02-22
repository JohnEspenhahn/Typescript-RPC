declare type ResolveFunction = (value: any) => void;

declare interface Thenable {
  then: (onFulfill: ResolveFunction, onReject: ResolveFunction) => void;
}