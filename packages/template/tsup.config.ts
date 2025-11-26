import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 入口文件
  format: ["cjs", "esm"], // 打包格式：CommonJS 和 ESM
  dts: true, // 生成 .d.ts 类型文件
  splitting: false, // 代码分割（组件库通常不需要，除非体积很大）
  sourcemap: true, // 生成 source map 方便调试
  clean: true, // 每次打包前清空 dist 目录
  treeshake: true, // 移除未使用的代码
  minify: false, // 开发阶段不压缩，发布时可以设为 true
  // 关键：排除 react 和 react-dom，避免打包进组件库
  external: ["react", "react-dom"],
  // CSS 通过 postcss 单独处理，在构建脚本中处理
});
