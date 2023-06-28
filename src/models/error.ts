export interface IError<T, U> {
  (key: T, val: U): void;
}
