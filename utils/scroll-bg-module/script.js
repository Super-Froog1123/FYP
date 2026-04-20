/**
 * Scroll Background Module - JavaScript
 *
 * 函数式调用版本
 * 使用方法：
 *
 * scrollBgModule.init({
 *   target: '#container',
 *   images: ['img/bg1.png', 'img/bg2.png'],
 *   contents: [
 *     { text: '第一段文字', title: '标题（可选）' },
 *     { text: '第二段文字' }
 *   ],
 *   options: {
 *     minHeight: '170vh',      // 每段滚动高度
 *     cardBg: '#ffffff',       // 卡片背景色
 *     cardRadius: '18px'       // 卡片圆角
 *   }
 * });
 */

const scrollBgModule = (function() {
  let isInitialized = false;

  /**
   * 默认配置
   */
  const defaults = {
    minHeight: '100vh',
    layoutDisplay: 'flex',
    layoutJustify: 'center',
    layoutAlign: 'center',

    cardMaxWidth: 'clamp(420px, 60vw, 600px)',
    cardWidth: '100%',

    cardBg: 'rgb(255, 255, 255)',
    cardRadius: '18px',
    cardPadding: '26px 30px',
    cardShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',

    textColor: '#000000',
    fontSize: 'clamp(16px, 1.6vw, 18px)',
    titleSize: 'clamp(26px, 3vw, 40px)'
  };

  /**
   * 生成模块 HTML
   */
  function generateHTML(config) {
    const { images, contents, options } = config;
    const opts = { ...defaults, ...options };

    // 背景图片列表
    const bgImages = images.map((src, i) => {
      const activeClass = i === 0 ? ' class="is-active"' : '';
      return `<img${activeClass} src="${src}" alt="">`;
    }).join('\n      ');

    // 内容区
    const sections = contents.map((item, i) => {
      const titleHTML = item.title
        ? `<h2>${item.title}</h2>`
        : '';
      return `
    <section class="text_" data-bg="${i}">
      <div class="overlay-card">
        ${titleHTML}
        <p>${item.text}</p>
      </div>
    </section>`;
    }).join('\n');

    return `
<section class="scroll-bg-module">
  <div class="bg-stage" aria-hidden="true">
      ${bgImages}
  </div>
  <div class="bg-dim" aria-hidden="true"></div>
  <div class="scroll-content">
${sections}
  </div>
</section>`;
  }

  /**
   * 注入动态样式
   */
  function injectStyles(options) {
    const opts = { ...defaults, ...options };
    const styleId = 'scroll-bg-module-custom-styles';

    // 避免重复注入
    if (document.getElementById(styleId)) return;

    const customStyles = `
      .scroll-bg-module .overlay-card {
        background: ${opts.cardBg};
        border-radius: ${opts.cardRadius};
        padding: ${opts.cardPadding};
        box-shadow: ${opts.cardShadow};
      }
      .scroll-bg-module .overlay-card p {
        color: ${opts.textColor};
        font-size: ${opts.fontSize};
      }
      .scroll-bg-module .overlay-card h2 {
        font-size: ${opts.titleSize};
      }
      .scroll-bg-module section.text_ {
        min-height: ${opts.minHeight};
      }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = customStyles;
    document.head.appendChild(styleEl);
  }

  /**
   * 初始化 IntersectionObserver
   */
  function initObserver() {
    const module = document.querySelector(".scroll-bg-module");
    if (!module) {
      console.warn("[scroll-bg-module] 未找到 .scroll-bg-module 元素");
      return false;
    }

    const bgImgs = Array.from(module.querySelectorAll(".bg-stage img"));
    const steps = Array.from(module.querySelectorAll("section.text_[data-bg]"));

    if (bgImgs.length === 0) {
      console.warn("[scroll-bg-module] 未找到背景图片");
      return false;
    }

    if (steps.length === 0) {
      console.warn("[scroll-bg-module] 未找到内容区");
      return false;
    }

    function setBackground(index) {
      bgImgs.forEach((img, i) => {
        img.classList.toggle("is-active", i === index);
      });
    }

    // 初始化：显示第一张背景
    setBackground(0);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const index = Number(visible.target.dataset.bg);
      if (!Number.isNaN(index) && index < bgImgs.length) {
        setBackground(index);
      }
    }, {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "0px 0px -10% 0px"
    });

    steps.forEach(step => observer.observe(step));

    console.log(`[scroll-bg-module] 已初始化：${bgImgs.length} 张背景图，${steps.length} 个内容区`);
    return true;
  }

  /**
   * 初始化模块
   * @param {Object} config - 配置对象
   * @param {string} config.target - 目标容器选择器
   * @param {string[]} config.images - 背景图片路径数组
   * @param {Object[]} config.contents - 内容数组
   * @param {string} config.contents[].text - 文字内容
   * @param {string} [config.contents[].title] - 标题（可选）
   * @param {Object} [config.options] - 自定义样式选项
   */
  function init(config) {
    // 参数校验
    if (!config.target) {
      console.error("[scroll-bg-module] 缺少 target 参数");
      return false;
    }

    if (!config.images || !Array.isArray(config.images) || config.images.length === 0) {
      console.error("[scroll-bg-module] 缺少或无效的 images 参数");
      return false;
    }

    if (!config.contents || !Array.isArray(config.contents) || config.contents.length === 0) {
      console.error("[scroll-bg-module] 缺少或无效的 contents 参数");
      return false;
    }

    const targetEl = document.querySelector(config.target);
    if (!targetEl) {
      console.error(`[scroll-bg-module] 未找到目标容器: ${config.target}`);
      return false;
    }

    // 检查数量匹配
    if (config.images.length !== config.contents.length) {
      console.warn(`[scroll-bg-module] 背景图数量(${config.images.length})与内容数量(${config.contents.length})不匹配`);
    }

    // 注入样式
    injectStyles(config.options);

    // 生成并插入 HTML
    const html = generateHTML(config);
    targetEl.innerHTML = html;

    // 初始化观察器
    setTimeout(() => {
      initObserver();
      isInitialized = true;
    }, 0);

    return true;
  }

  /**
   * 销毁模块
   * @param {string} target - 目标容器选择器
   */
  function destroy(target) {
    const targetEl = document.querySelector(target);
    if (targetEl) {
      targetEl.innerHTML = '';
    }
    isInitialized = false;
    console.log("[scroll-bg-module] 已销毁");
  }

  return {
    init,
    destroy,
    isInitialized: () => isInitialized
  };
})();

// 自动导出（支持 AMD/CommonJS/全局变量）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = scrollBgModule;
} else if (typeof define === 'function' && define.amd) {
  define([], function() { return scrollBgModule; });
} else {
  window.scrollBgModule = scrollBgModule;
}