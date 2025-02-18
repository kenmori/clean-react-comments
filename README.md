# clean-react-comments Documentation

## Description

`clean-react-comments` is a CLI tool that removes comments from JavaScript, TypeScript, and JSX/TSX files. It supports flexible options to control which comments are removed.

## Features

- Remove single-line (`//`) and block (`/* */`) comments
- Handle JSX comments (`{/* comment */}`) with optional fine-tuning
- Preserve meaningful JSDoc comments (`/** ... */`)
- Support for annotation comments like `// TODO`, `// FIXME`, `// HACK`, `// XXX`, `// REVIEW`, `// OPTIMIZE`, `// CHANGED`, `// NOTE`, `// WARNING`.
- Default exclusion of `node_modules` and `dist` directories

## Installation

```sh
npm install -g @kenmori/clean-react-comments
```

## Usage

```sh
clean-react-comments <directory> [options]
```

## Default Behavior

By default, the tool ignores `node_modules` and `dist` directories.

## Options

| Option               | Description | Default |
|----------------------|-------------|---------|
| `--exclude <glob>` | Exclude files matching the pattern | `node_modules`, `dist` |
| `--only-code-comments` | Remove only `//` and `/* */` comments, preserving JSDoc & JSX | `false` |
| `--keep-jsdoc` | Preserve JSDoc comments (`/** ... */`) | `true` |
| `--remove-all-jsx-comments` | Remove all JSX comments (`{/* ... */}`) | `false` |
| `--remove-tag-jsx-comments` | Remove JSX comments wrapping tags (`{/* <div>...</div> */}`) | `true` |
| `--remove-annotations` | Remove annotation comments like `// TODO`, `// FIXME` | `false` |

## Examples

### `--only-code-comments`

Before:

```tsx
// This is a comment
const x = 42; /* inline comment */

{/** JSX Comment */}
```

After:

```tsx
{/** JSX Comment */}
const x = 42;
```

### `--keep-jsdoc`

Before:

```ts
/**
 * This is a JSDoc comment
 */
function test() {}
```

After:

```ts
/**
 * This is a JSDoc comment
 */
function test() {}
```

### `--remove-all-jsx-comments`

Before:

```tsx
const App = () => {
  return (
    <div>
      {/* JSX comment */}
    </div>
  );
};
```

After:

```tsx
const App = () => {
  return (
    <div>
    </div>
  );
};
```

### `--remove-tag-jsx-comments`

Before:

```tsx
const App = () => {
  return (
    <div>
      {/* <Button>Click</Button> */}
      <Button>Click</Button>
    </div>
  );
};
```

After:

```tsx
const App = () => {
  return (
    <div>
      <Button>Click</Button>
    </div>
  );
};
```

### `--remove-annotations`

Before:

```ts
// TODO: Implement this function
function foo() {
  // FIXME: Handle edge cases
  return 42;
}
```

After:

```ts
function foo() {
  return 42;
}
```
