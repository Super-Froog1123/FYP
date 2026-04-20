# Scroll Background Module

滚动背景切换模块 - 用于创建沉浸式滚动叙事体验。

## 快速开始

### 方式一：函数式调用（推荐）

```html
<!-- 1. 引入样式 -->
<link rel="stylesheet" href="utils/scroll-bg-module/style.css">

<!-- 2. 目标容器 -->
<div id="scroll-bg-container"></div>

<!-- 3. 引入脚本 -->
<script src="utils/scroll-bg-module/script.js"></script>

<!-- 4. 初始化 -->
<script>
scrollBgModule.init({
  target: '#scroll-bg-container',
  images: [
    'img/bg1.png',
    'img/bg2.png',
    'img/bg3.png'
  ],
  contents: [
    { text: '第一段文字内容' },
    { text: '第二段文字内容', title: '可选标题' },
    { text: '第三段文字内容' }
  ],
  options: {
    minHeight: '170vh',      // 每段滚动高度
    cardBg: '#ffffff',       // 卡片背景色
    cardRadius: '18px'       // 卡片圆角
  }
});
</script>
```

### 方式二：HTML 模板

直接复制 `template.html` 内容到页面中。

```html
<link rel="stylesheet" href="utils/scroll-bg-module/style.css">
<script src="utils/scroll-bg-module/script.js"></script>

<!-- 粘贴 template.html 内容 -->
```

---

## API 文档

### scrollBgModule.init(config)

初始化模块。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `target` | string | ✅ | 目标容器选择器 |
| `images` | string[] | ✅ | 背景图片路径数组 |
| `contents` | object[] | ✅ | 内容数组 |
| `options` | object | ❌ | 自定义样式选项 |

#### contents 数组

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `text` | string | ✅ | 文字内容 |
| `title` | string | ❌ | 标题（可选） |

#### options 对象

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `minHeight` | `'170vh'` | 每段滚动高度 |
| `cardBg` | `'rgb(255, 255, 255)'` | 卡片背景色 |
| `cardRadius` | `'18px'` | 卡片圆角 |
| `cardPadding` | `'26px 30px'` | 卡片内边距 |
| `cardShadow` | `'0 15px 40px rgba(0,0,0,0.3)'` | 卡片阴影 |
| `textColor` | `'#000000'` | 文字颜色 |
| `fontSize` | `'clamp(16px, 1.6vw, 18px)'` | 文字大小 |
| `titleSize` | `'clamp(26px, 3vw, 40px)'` | 标题大小 |

### scrollBgModule.destroy(target)

销毁模块，清空目标容器。

```javascript
scrollBgModule.destroy('#scroll-bg-container');
```

---

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Background Demo</title>
  <link rel="stylesheet" href="utils/scroll-bg-module/style.css">
  <style>
    body { margin: 0; font-family: sans-serif; }
  </style>
</head>
<body>

  <!-- 其他页面内容 -->
  <section style="height: 100vh; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
    <h1>向下滚动</h1>
  </section>

  <!-- 滚动背景模块容器 -->
  <div id="scroll-bg-container"></div>

  <!-- 其他页面内容 -->
  <section style="height: 100vh; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
    <h1>继续浏览</h1>
  </section>

  <script src="utils/scroll-bg-module/script.js"></script>
  <script>
    scrollBgModule.init({
      target: '#scroll-bg-container',
      images: [
        'img/bg1.png',
        'img/bg2.png',
        'img/bg3.png'
      ],
      contents: [
        { text: '第一幕：故事的开始', title: '序幕' },
        { text: '第二幕：冲突与转折', title: '发展' },
        { text: '第三幕：尘埃落定', title: '尾声' }
      ],
      options: {
        minHeight: '150vh',
        cardBg: 'rgba(255, 255, 255, 0.95)',
        cardRadius: '12px'
      }
    });
  </script>
</body>
</html>
```

---

## 文件结构

```
scroll-bg-module/
├── README.md        # 使用说明
├── template.html    # HTML 模板（方式二）
├── style.css        # 样式文件
└── script.js        # JavaScript 逻辑（支持两种调用方式）
```

---

## 原理说明

1. **CSS Sticky**: 背景舞台固定在视口
2. **IntersectionObserver**: 监听内容区进入视口
3. **类名切换**: 根据滚动位置切换 `.is-active` 类
4. **CSS 过渡**: 平滑的淡入淡出动画

---

## 浏览器兼容性

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 16+