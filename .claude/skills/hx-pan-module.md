# hx-pan-module

Use this skill when the user wants to add a horizontal scroll/pan viewer for ultra-wide PNG images to their project.

## When to Use

- User asks to add a "horizontal pan" or "横向滚轮" or "超宽PNG" viewer
- User mentions "hx-pan" or "长图浏览" or "横向浏览"
- User wants an image viewer that scrolls horizontally with wheel/drag/keyboard

## Instructions

When the user invokes this skill, follow these steps:

### 1. Add Container

Add a container element where the module should appear:

```html
<div id="hx-pan-container"></div>
```

### 2. Add JS Script

Before the closing `</body>` tag, add:

```html
<script src="utils/hx-pan-module/script.js"></script>
```

### 3. Initialize the Module

Add initialization script after the JS file:

```html
<script>
hxPanModule.init({
  target: '#hx-pan-container',
  src: './timeline.png',   // User's image path
  alt: '超宽PNG',
  zoom: 1.6,               // Scale factor 1~2
  options: {
    height: '90vh',         // Container height
    offsetY: '-190px',      // Vertical offset (negative moves up)
    speed: 1.2,             // Wheel scroll speed multiplier
    radius: '14px'          // Container border radius
  }
});
</script>
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `target` | *(required)* | CSS selector for container element |
| `src` | *(required)* | Image file path |
| `alt` | `'超宽PNG'` | Image alt text |
| `zoom` | `1.6` | Scale factor (1~2) |
| `options.height` | `'90vh'` | Container height |
| `options.offsetY` | `'-190px'` | Image vertical offset |
| `options.speed` | `1.2` | Wheel scroll speed |
| `options.radius` | `'14px'` | Container border radius |

## Alternative: HTML Template Mode

If the user prefers inline HTML without dynamic initialization:

```html
<link rel="stylesheet" href="utils/hx-pan-module/style.css">

<div class="hx-pan" tabindex="0" data-zoom="1.6"
     style="height: 90vh; --hx-pan-zoom: 1.6; --hx-pan-offset-y: -190px; --hx-pan-radius: 14px;">
  <img src="./timeline.png" alt="超宽PNG">
</div>

<script src="utils/hx-pan-module/script.js"></script>
```

## Interactive Features

- **Wheel**: Vertical scroll auto-converts to horizontal; releases to page scroll at edges
- **Drag**: Click and drag to pan horizontally
- **Keyboard**: Focus container, use ← → arrow keys (moves 90% of container width per press)

## Files Location

The module files are located at:
- CSS: `utils/hx-pan-module/style.css`
- JS: `utils/hx-pan-module/script.js`
- Template: `utils/hx-pan-module/template.html`
- README: `utils/hx-pan-module/README.md`