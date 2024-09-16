export class TrionesErr extends Error {
  // @ts-ignore
  private code: string | number;

  constructor(code: string | number, message: string) {
    super(message);
    this.code = code;
  }
}
