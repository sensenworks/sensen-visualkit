declare module 'sensen-visualkit/index' {
  export type IStyleDefault = 'unset' | 'initial';
  export interface IStyleDeclaration extends Partial<CSSStyleDeclaration> {
      display?: 'flex' | 'grid' | 'inline' | 'inline-block' | 'block' | 'none' | IStyleDefault | undefined;
      flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse' | IStyleDefault;
      backdropFilter?: string;
  }
  export type ISensenVisualKitCanvas = {
      [X: string]: HTMLStyleElement;
  };
  export class VisualKitStyle {
      static toPropertyName(value: string): string;
      static fromPropertyName(value: string): string;
      static parse(structure: IStyleDeclaration): string[];
      static parseProperty(property: string): string;
      static parseValue(value: string): string;
  }
  export class SensenVisualKit {
      #private;
      name: string;
      declarations: VisualKitDeclaration;
      property: VisualKitProperty;
      get target(): HTMLElement | null;
      constructor(element: HTMLElement | null);
      define(declaration: IStyleDeclaration): this;
      use(name?: string): this;
      append(name?: string): this;
      sheet(sheet: Kit): this;
  }
  export class VisualKitDeclaration {
      #private;
      get value(): string[];
      define(declaration: IStyleDeclaration): this;
      remove(property: string): this;
      replace(older: string, value: string): this;
      contains(property: string): boolean;
  }
  export class VisualKitProperty {
      #private;
      get codex(): string;
      get payload(): string[];
      get value(): string;
      constructor(element: HTMLElement | null);
      add(value: string): this;
      remove(value: string): this;
      replace(older: string, value: string): this;
      contains(value: string): boolean;
      link(): this;
      unlink(property?: string | string[]): this;
  }
  export class Kit {
      name: string;
      declarations: VisualKitDeclaration;
      constructor(name: string, declarations?: IStyleDeclaration);
  }
  export default function useVisualKit(element: HTMLElement | null): SensenVisualKit;

}
declare module 'sensen-visualkit/test' {
  export {};

}
declare module 'sensen-visualkit' {
  import main = require('sensen-visualkit/index');
  export = main;
}