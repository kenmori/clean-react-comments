// import * as fs from "fs";
// import * as path from "path";
// import { removeComments } from "../src/index"; // 関数をエクスポートしておく

// describe("removeComments (Integration Test)", () => {
//   const testDir = path.join(__dirname, "test-files");

//   beforeAll(() => {
//     fs.mkdirSync(testDir, { recursive: true });
//   });

//   afterEach(() => {
//     fs.rmSync(testDir, { recursive: true, force: true });
//     fs.mkdirSync(testDir, { recursive: true });
//   });

//   afterAll(() => {
//     fs.rmSync(testDir, { recursive: true, force: true });
//   });

//   it("TSXファイルのコメントを削除する", () => {
//     const filePath = path.join(testDir, "test.tsx");
//     fs.writeFileSync(
//       filePath,
//       `
// // コメント
// const a = 1; /* インラインコメント */
// console.log(a);
//       `,
//       "utf8"
//     );

//     removeComments(testDir);

//     const content = fs.readFileSync(filePath, "utf8");
//     expect(content).toBe(`
// const a = 1;
// console.log(a);
//     `);
//   });
// });
