# @lume-ui/theme

主题包，集成了 Tailwind CSS 和 shadcn-ui 的各种主题，供其他组件使用。

## 功能特性

- 🎨 集成 Tailwind CSS v4
- 🌈 提供多种主题变体（default、rose、blue、green）
- 🌓 支持亮色和暗色模式
- 📦 打包后可直接在其他组件中使用
- 🔧 提供主题切换工具函数

## 安装

```bash
pnpm add @lume-ui/theme
```

## 使用方法

### 1. 导入 CSS 样式

在你的应用入口文件中导入主题 CSS：

```typescript
import "@lume-ui/theme/index.css";
```

### 2. 使用主题工具函数

```typescript
import { applyTheme, getCurrentTheme, toggleDarkMode } from "@lume-ui/theme";

// 应用默认主题（亮色模式）
applyTheme("default", "light");

// 应用玫瑰主题（暗色模式）
applyTheme("rose", "dark");

// 切换暗色模式
toggleDarkMode();

// 获取当前主题
const { theme, mode } = getCurrentTheme();
console.log(`当前主题: ${theme}, 模式: ${mode}`);
```

### 3. 在 React 组件中使用

```tsx
import { useEffect } from "react";
import { applyTheme } from "@lume-ui/theme";

function App() {
  useEffect(() => {
    // 应用主题
    applyTheme("blue", "light");
  }, []);

  return <div>Your app content</div>;
}
```

## 可用主题

- **default**: 默认中性主题
- **rose**: 玫瑰色主题
- **blue**: 蓝色主题
- **green**: 绿色主题

每个主题都支持亮色（light）和暗色（dark）两种模式。

## API

### `applyTheme(themeName, mode)`

应用指定的主题和模式。

- `themeName`: `"default" | "rose" | "blue" | "green"` - 主题名称
- `mode`: `"light" | "dark"` - 亮色或暗色模式

### `getCurrentTheme()`

获取当前应用的主题和模式。

返回: `{ theme: ThemeName, mode: ThemeMode }`

### `toggleDarkMode()`

切换暗色模式。

返回: 切换后的模式 `"light" | "dark"`

### `getThemeNames()`

获取所有可用的主题名称列表。

返回: `ThemeName[]`

### `getTheme(name)`

根据名称获取主题配置。

- `name`: 主题名称

返回: `ThemeConfig`

## 主题变量

主题使用 CSS 变量定义，包括：

- `--background`: 背景色
- `--foreground`: 前景色
- `--primary`: 主色
- `--secondary`: 次色
- `--muted`: 静音色
- `--accent`: 强调色
- `--destructive`: 危险色
- `--border`: 边框色
- `--ring`: 焦点环色
- `--radius`: 圆角大小
- 以及更多...

## 开发

```bash
# 安装依赖
pnpm install

# 构建
pnpm build

# 开发模式（监听文件变化）
pnpm dev
```

## 许可证

Apache-2.0

