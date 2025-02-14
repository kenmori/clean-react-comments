// import fs from "fs";
// import { removeComments } from "./index"; // テスト対象の関数をインポート

// jest.mock("fs");

// describe("removeComments", () => {
//   let mockFiles: Record<string, string>;

//   beforeEach(() => {
//     // 仮想ファイルシステム
//     mockFiles = {
//       "/test/file1.ts": `// コメント\nconst a = 1;`,
//       "/test/file2.tsx": `/* ブロックコメント */\nconst b = 2;`,
//       "/test/file3.ts": `// TODO: 修正\n/* 注意 */\nconst c = 3;`,
//     };

//     // readFileSync のモック (ファイルの内容を返す)
//     jest.spyOn(fs, "readFileSync").mockImplementation((filePath, options) => {
//       if (typeof filePath === "string") {
//         return mockFiles[filePath] || ""; // undefined を防ぐ
//       }
//       return ""; // デフォルトの値を返す
//     });

//     // writeFileSync のモック (ファイルの書き込みをシミュレート)
//     jest.spyOn(fs, "writeFileSync").mockImplementation((filePath, data) => {
//       if (typeof filePath === "string") {
//         mockFiles[filePath] = data as string; // 文字列として扱う
//       }
//     });
//   });

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });

//   it("should remove single-line and block comments", () => {
//     removeComments("/test/file1.ts");
//     removeComments("/test/file2.tsx");
//     removeComments("/test/file3.ts");

//     expect(mockFiles["/test/file1.ts"]).toBe("\nconst a = 1;");
//     expect(mockFiles["/test/file2.tsx"]).toBe("\nconst b = 2;");
//     expect(mockFiles["/test/file3.ts"]).toBe("\n\nconst c = 3;");
//   });
// });
