export class Cache<T> {
  private values: { [key: string]: T } = {};

  get(key: string): T {
    return this.values[key];
  }

  set(key: string, value: T) {
    this.values[key] = value;
  }

  has(key: string): boolean {
    return this.values[key] !== undefined;
  }

  clear(key: string) {
    delete this.values[key];
  }

  clearAll() {
    for (const value in this.values) {
      delete this.values[value];
    }
  }
}
