export class BaseClass<T> {
  toPlainObject(): T {
    return Object.assign({} as T, this);
  }
}
