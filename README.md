# clean-react-comments Documentation

## Description

`clean-react-comments` is a CLI tool that removes comments from JavaScript, TypeScript, and JSX/TSX files. It supports flexible options to control which comments are removed.

## Features

- Remove single-line (`//`) and block (`/* */`) comments
- Handle JSX comments (`{/* comment */}`) with optional fine-tuning
- Preserve meaningful JSDoc comments (`/** ... */`)
- Options for filtering only code comments or excluding files

## Installation

Installation

### 1. Install via npm (Recommended)

To install clean-react-comments globally using npm:

```sh
npm install -g clean-react-comments
```

Then, you can run the CLI with:

```sh
clean-react-comments --help
```

### 2. Local Installation for Development

If you want to test the CLI locally from the repository, follow these steps:

```sh
# 1. Clone the repository
git clone https://github.com/your-username/clean-react-comments.git
cd clean-react-comments

# 2. Install dependencies
npm install

# 3. Build the TypeScript files (creates the dist/ directory)
npm run build

# 4. Install the CLI globally from the local repository
npm install -g .

# 5. Verify the installation
clean-react-comments --help
```

## Usage

```sh
clean-react-comments <directory> [options]
```

## Options

| Option                      | Description | Default |
|-----------------------------|-------------|---------|
| `--exclude <glob>`          | Exclude files matching the pattern | None |
| `--only-code-comments`      | Remove only `//` and `/* */` comments, preserving JSDoc & JSX | `false` |
| `--keep-jsdoc`              | Preserve JSDoc comments (`/** ... */`) | `true` |
| `--remove-all-jsx-comments` | Remove all JSX comments (`{/* ... */}`) | `false` |
| `--remove-tag-jsx-comments` | Remove JSX comments wrapping tags (`{/* <div>...</div> */}`) | `true` |

## Examples

### Remove all comments except JSDoc

```sh
clean-react-comments ./src --only-code-comments
```

### Remove all JSX comments

```sh
clean-react-comments ./src --remove-all-jsx-comments
```

### Remove only JSX tag-wrapped comments (default)

```sh
clean-react-comments ./src --remove-tag-jsx-comments
```

## React Example

Before:

```tsx
const App = () => {
  return (
    <div>
      {/** This is a JSX comment */}
      {/** <StyledButton>{label}</StyledButton> */}
      <StyledButton>{label}</StyledButton>
    </div>
  );
};
```

After running `clean-react-comments ./src`:

```tsx
const App = () => {
  return (
    <div>
      {/** This is a JSX comment */}  // This remains unless `--remove-all-jsx-comments` is used
      <StyledButton>{label}</StyledButton>
    </div>
  );
};
```

Using `--remove-all-jsx-comments`:

```tsx
const App = () => {
  return (
    <div>
      <StyledButton>{label}</StyledButton>
    </div>
  );
};
```

Using `--remove-tag-jsx-comments` (default):

```tsx
const App = () => {
  return (
    <div>
      {/** This is a JSX comment */} // Remains, since it's text-only
      <StyledButton>{label}</StyledButton>
    </div>
  );
};
```
