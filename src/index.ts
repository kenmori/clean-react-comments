import * as fs from "fs";
import * as path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

interface RemoveCommentsOptions {
  exclude?: string[];
  onlyCodeComments: boolean;
  keepJSDoc: boolean;
  removeAllJSXComments: boolean;
  removeTagJSXComments: boolean;
}

const defaultExcludes = ["node_modules", "dist"];

const ANNOTATION_KEYWORDS = ["TODO", "FIXME", "HACK", "XXX", "REVIEW", "OPTIMIZE", "CHANGED", "NOTE", "WARNING"];

export const removeComments = (directory: string, options: RemoveCommentsOptions) => {
  if (!fs.existsSync(directory)) return;

  const files: string[] = fs.readdirSync(directory) ?? [];

  files.forEach((file: string) => {
    const filePath = path.join(directory, file);

      // `exclude` オプションに該当するファイルは処理しない
      const excludes = options.exclude ? [...defaultExcludes, ...options.exclude] : defaultExcludes;
      if (excludes.some((ex) => filePath.includes(ex))) {
        return;
      }

    if (fs.statSync(filePath).isDirectory()) {
      removeComments(filePath, options);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      let content = fs.readFileSync(filePath, "utf8");

      // JSX の `{/* コメント */}` を削除（オプションが有効な場合のみ）
      if (options.removeAllJSXComments) {
        content = content.replace(/{\/\*.*?\*\/}/gs, "");
      } else if (options.removeTagJSXComments) {
        content = content.replace(/{\/\*\s*<.*?>.*?\*\/}/gs, "");
      }

      // JSDoc コメントの削除（オプションが false の場合のみ削除）
      if (!options.keepJSDoc) {
        content = content.replace(/\/\*\*[^*][\s\S]*?\*\//g, "");
      }

      // 通常のコメント（`//` や `/* */`）の削除
      content = content.replace(/\/\/(?!\s*({{ANNOTATIONS}})).*/g, "").replace(/\/\*[^*][\s\S]*?\*\//g, "");
      const annotationRegex = new RegExp(`\\/\\/\\s*(${ANNOTATION_KEYWORDS.join("|")})(?!\\S)`, "g");
      content = content.replace(annotationRegex, "// $1");

      // `exclude` オプションに該当するファイルは処理しない
      if (options.exclude && options.exclude.some((ex) => filePath.includes(ex))) {
        return;
      }

      // 空白行の削除
      content = content.replace(/^(?:\s*\n)+/gm, "").trim();

      fs.writeFileSync(filePath, content, "utf8");
    }
  });
};

const cli = yargs(hideBin(process.argv))
  .options({
    exclude: { type: "array", string: true, describe: "Files or directories to exclude" },
    onlyCodeComments: { type: "boolean", default: false, describe: "Remove only code comments" },
    keepJSDoc: { type: "boolean", default: false, describe: "Keep JSDoc comments" },
    removeAllJSXComments: { type: "boolean", default: false, describe: "Remove all JSX comments" },
    removeTagJSXComments: { type: "boolean", default: false, describe: "Remove JSX comments that start with a tag" }
  })
  .command<{ directory: string }>(
    "$0 <directory>",
    "Remove comments from .ts and .tsx files",
    (yargs) => {
      yargs.positional("directory", { type: "string", demandOption: true });
    },
    (argv) => {
      removeComments(argv.directory, {
        exclude: argv.exclude as string[],
        onlyCodeComments: argv.onlyCodeComments as boolean,
        keepJSDoc: argv.keepJSDoc as boolean,
        removeAllJSXComments: argv.removeAllJSXComments as boolean,
        removeTagJSXComments: argv.removeTagJSXComments as boolean
      });
    }
  )
  .help();

export default cli;
