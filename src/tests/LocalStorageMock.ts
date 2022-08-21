export class LocalStorageMock {
  private readonly store: {[key: string]: string};
  public length: number;

  constructor() {
    this.store = {};
    this.length = 0;
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {}

  key(index: number): string {
    return "";
  }
}
