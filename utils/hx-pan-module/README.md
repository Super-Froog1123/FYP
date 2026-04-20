# HX-Pan Module

超宽 PNG 横向滚轮浏览模块 — 支持滚轮横向滚动、鼠标拖拽、键盘左右键浏览。

## 快速开始

### 方式一：函数式调用（推荐）

```html
<!-- 1. 目标容器 -->
<div id="my-pan-container"></div>

<!-- 2. 引入脚本 -->
<script src="utils/hx-pan-module/script.js"></script>

<!-- 3. 初始化 -->
<script>
hxPanModule.init({
  target: '#my-pan-container',
  src: './timeline.png',
  alt: '超宽PNG',
  zoom: 1.6,
  options: {
    height: '90vh',       // 容器高度
    offsetY: '-190px',    // 图片纵向偏移（负值向上移）
    speed: 1.2,           // 滚轮横向速度倍率
    radius: '14px'        // 容器圆角
  }
});
</script>
```

### 方式二：HTML 模板

直接复制 `template.html` 内容到页面中，手动修改 `src`、`data-zoom` 和 CSS 变量。

```html
<link rel="stylesheet" href="utils/hx-pan-module/style.css">

<div class="hx-pan" tabindex="0" data-zoom="1.6"
     style="height: 90vh; --hx-pan-zoom: 1.6; --hx-pan-offset-y: -190px; --hx-pan-radius: 14px;">
  <img src="./timeline.png" alt="超宽PNG">
</div>

<script src="utils/hx-pan-module/script.js"></script>
```

---

## API 文档

### hxPanModule.init(config)

初始化模块，返回实例对象。

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `target` | string | ✅ | 目标容器选择器 |
| `src` | string | ✅ | 超宽图片路径 |
| `alt` | string | ❌ | 图片替代文本，默认 `'超宽PNG'` |
| `zoom` | number | ❌ | 缩放倍数，范围 1~2，默认 `1.6` |
| `options` | object | ❌ | 自定义样式选项 |

#### options 对象

| 属性 | 默认值 | 说明 |
|------|--------|------|
| `height` | `'90vh'` | 容器高度 |
| `offsetY` | `'-190px'` | 图片纵向偏移（负值向上移） |
| `speed` | `1.2` | 滚轮横向速度倍率 |
| `radius` | `'14px'` | 容器圆角 |

### hxPanModule.destroy(target)

销毁指定实例，清空目标容器。

```javascript
hxPanModule.destroy('#my-pan-container');
```

### hxPanModule.destroyAll()

销毁所有实例。

---

## 交互功能

1. **滚轮横向滚动**：纵向滚轮自动转为横向滚动，到边缘时放行给页面纵向滚动
2. **鼠标拖拽**：按住左键拖拽可横向浏览
3. **键盘导航**：聚焦容器后可用 ← → 键翻页浏览（每次移动 90% 容器宽度）

---

## CSS 变量

可通过 inline style 或自定义 CSS 覆盖：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `--hx-pan-zoom` | `1` | 图片缩放倍数 |
| `--hx-pan-offset-y` | `-190px` | 图片纵向偏移 |
| `--hx-pan-radius` | `14px` | 容器圆角 |

---

## 文件结构

```
hx-pan-module/
├── README.md        # 使用说明
├── template.html    # HTML 模板（方式二）
├── style.css        # 样式文件
└── script.js        # JavaScript 逻辑（支持两种调用方式）
```

---

## 浏览器兼容性

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 16+