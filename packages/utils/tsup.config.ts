import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // 输出 CommonJS 和 ES Module
  dts: true, // 生成类型定义文件
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"], // 不要把 React 打包进去
  // 不要在 tsup 里处理 CSS，我们用 tailwind cli 单独处理，或者配置 postcss 插件
});
