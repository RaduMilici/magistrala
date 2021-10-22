export abstract class UniqueID {
  private static id: number = 0;

  static get(): number {
    return UniqueID.id++;
  }
}
