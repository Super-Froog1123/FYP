
# scroll-bg-module

Use this skill when the user wants to add a scroll background module to their project for creating immersive scrolling narrative experiences with background image transitions.

## When to Use

- User asks to add a "scroll background" or "滚动背景" module
- User wants background images to change on scroll
- User mentions "scroll-bg-module" or similar

## Instructions

When the user invokes this skill, follow these steps:

### 1. Add CSS Link

In the `<head>` section, add:

```html
<link rel="stylesheet" href="utils/scroll-bg-module/style.css">
```

### 2. Add Container

Add a container element where the module should appear:

```html
<div id="scroll-bg-container"></div>
```

### 3. Add JS Script

Before the closing `</body>` tag, add:

```html
<script src="utils/scroll-bg-module/script.js"></script>
```

### 4. Initialize the Module

Add initialization script after the JS file:

```html
<script>
scrollBgModule.init({
  target: '#scroll-bg-container',
  images: [
    // User's background images
  ],
  contents: [
    // User's text content
  ],
  options: {
    // Customization options if user specified
  }
});
</script>
```

## Configuration Options

| Option | Default | Description |
|--------|---------|-------------|
| `minHeight` | `'170vh'` | Scroll height per section |
| `cardBg` | `'rgb(255, 255, 255)'` | Card background color |
| `cardRadius` | `'18px'` | Card border radius |
| `cardPadding` | `'26px 30px'` | Card padding |
| `cardShadow` | `'0 15px 40px rgba(0,0,0,0.3)'` | Card shadow |
| `textColor` | `'#000000'` | Text color |
| `fontSize` | `'clamp(16px, 1.6vw, 18px)'` | Text size |
| `titleSize` | `'clamp(26px, 3vw, 40px)'` | Title size |

## Example Usage

Ask the user for:
1. Background image paths (or generate placeholders)
2. Text content for each section
3. Any custom styling preferences

Then generate the complete code:

```html
<link rel="stylesheet" href="utils/scroll-bg-module/style.css">

<div id="scroll-bg-container"></div>

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
    { text: '第一段内容', title: '标题一' },
    { text: '第二段内容', title: '标题二' },
    { text: '第三段内容', title: '标题三' }
  ],
  options: {
    minHeight: '170vh',
    cardBg: 'rgba(255,255,255,0.95)'
  }
});
</script>
```

## Files Location

The module files are located at:
- CSS: `utils/scroll-bg-module/style.css`
- JS: `utils/scroll-bg-module/script.js`
- Template: `utils/scroll-bg-module/template.html`
- README: `utils/scroll-bg-module/README.md`