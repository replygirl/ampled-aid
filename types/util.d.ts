import type { CamelCase, KebabCase, PascalCase, SnakeCase } from 'type-fest'

export type Be<T> = T

export type Case<T> =
  | Be<T>
  | CamelCase<T>
  | Capitalize<T>
  | KebabCase<T>
  | Lowercase<T>
  | PascalCase<T>
  | SnakeCase<T>
  | Uncapitalize<T>
  | Uppercase<T>
