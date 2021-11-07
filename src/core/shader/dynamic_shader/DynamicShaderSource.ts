export class DynamicShaderSource {
  private static readonly VERSION = '#version 300 es';

  private readonly attributes: Array<string> = [];
  private readonly uniforms: Array<string> = [];
  private readonly varyings: Array<string> = [];

  protected readonly mainLines: Array<string> = [];
  protected readonly headers: Array<string> = [DynamicShaderSource.VERSION];

  get source(): string {
    return [
      this.headers.join('\n'),
      this.attributes.join('\n'),
      this.uniforms.join('\n'),
      this.varyings.join('\n'),
      this.main,
    ].join('\n');
  }

  protected get main(): string {
    const body = this.mainLines.join('\n');
    return `void main() {\n${body}\n}`;
  }

  addAttribute(attribute: string) {
    this.attributes.push(attribute);
  }

  addUniform(uniform: string) {
    this.uniforms.push(`uniform ${uniform};`);
  }

  addVarying(varying: string) {
    this.varyings.push(varying);
  }

  addToMain(line: string) {
    this.mainLines.push(line);
  }
}
