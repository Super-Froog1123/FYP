/**
 * HX-Pan Module - JavaScript
 *
 * 超宽 PNG 横向滚轮浏览模块
 * 支持滚轮横向滚动、鼠标拖拽、键盘左右键浏览
 *
 * 使用方法：
 *
 * hxPanModule.init({
 *   target: '#my-pan-container',
 *   src: './timeline.png',
 *   alt: '超宽PNG',
 *   zoom: 1.6,
 *   options: {
 *     height: '90vh',
 *     offsetY: '-190px',
 *     speed: 1.2,
 *     radius: '14px'
 *   }
 * });
 */

const hxPanModule = (function () {
  let instances = [];

  /**
   * 默认配置
   */
  const defaults = {
    height: '90vh',
    offsetY: '-190px',
    speed: 1.2,
    radius: '14px'
  };

  /**
   * 生成模块 HTML
   */
  function generateHTML(src, alt, zoom, options) {
    const opts = { ...defaults, ...options };
    return `<div class="hx-pan" tabindex="0" data-zoom="${zoom}" style="height:${opts.height}; --hx-pan-zoom:${zoom}; --hx-pan-offset-y:${opts.offsetY}; --hx-pan-radius:${opts.radius}">
  <img src="${src}" alt="${alt}">
</div>`;
  }

  /**
   * 注入基础样式（仅一次）
   */
  function injectBaseStyles() {
    const styleId = 'hx-pan-base-styles';
    if (document.getElementById(styleId)) return;

    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = `
.hx-pan {
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  border-radius: var(--hx-pan-radius, 14px);
  cursor: grab;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hx-pan::-webkit-scrollbar { width: 0; height: 0; }
.hx-pan.dragging { cursor: grabbing; }
.hx-pan img {
  height: calc(100% * var(--hx-pan-zoom, 1));
  width: auto;
  display: block;
  margin-top: var(--hx-pan-offset-y, -190px);
}`;
    document.head.appendChild(styleEl);
  }

  /**
   * 绑定交互事件到一个 .hx-pan 容器
   */
  function bindPanEvents(viewer, speed) {
    const img = viewer.querySelector('img');

    // —— 滚轮：把纵向滚动转成横向；到边缘时放行给页面 —— //
    function normalizeDeltaY(e) {
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= viewer.clientHeight;
      return dy;
    }

    function onWheel(e) {
      const dy = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : normalizeDeltaY(e);
      const maxLeft = viewer.scrollWidth - viewer.clientWidth;
      const atLeft = viewer.scrollLeft <= 0;
      const atRight = viewer.scrollLeft >= maxLeft - 1;

      if ((dy < 0 && !atLeft) || (dy > 0 && !atRight)) {
        viewer.scrollLeft += dy * speed;
        e.preventDefault();
      }
    }

    viewer.addEventListener('wheel', onWheel, { passive: false });

    // —— 鼠标拖拽横向浏览 —— //
    let dragging = false, startX = 0, startLeft = 0;

    function onPointerDown(e) {
      dragging = true;
      viewer.classList.add('dragging');
      startX = e.clientX;
      startLeft = viewer.scrollLeft;
      viewer.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      viewer.scrollLeft = startLeft - (e.clientX - startX);
    }

    function onPointerUp() {
      dragging = false;
      viewer.classList.remove('dragging');
    }

    viewer.addEventListener('pointerdown', onPointerDown);
    viewer.addEventListener('pointermove', onPointerMove);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => {
      viewer.addEventListener(t, onPointerUp);
    });

    // —— 键盘左右键（容器聚焦时） —— //
    function onKeyDown(e) {
      const step = Math.round(viewer.clientWidth * 0.9);
      if (e.key === 'ArrowLeft') {
        viewer.scrollBy({ left: -step, behavior: 'smooth' });
        e.preventDefault();
      }
      if (e.key === 'ArrowRight') {
        viewer.scrollBy({ left: step, behavior: 'smooth' });
        e.preventDefault();
      }
    }

    viewer.addEventListener('keydown', onKeyDown);

    // 初始对齐到最左
    if (!img.complete) {
      img.addEventListener('load', () => { viewer.scrollLeft = 0; }, { once: true });
    } else {
      viewer.scrollLeft = 0;
    }

    // 返回清理函数
    return function destroy() {
      viewer.removeEventListener('wheel', onWheel);
      viewer.removeEventListener('pointerdown', onPointerDown);
      viewer.removeEventListener('pointermove', onPointerMove);
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => {
        viewer.removeEventListener(t, onPointerUp);
      });
      viewer.removeEventListener('keydown', onKeyDown);
    };
  }

  /**
   * 初始化模块
   * @param {Object} config - 配置对象
   * @param {string} config.target - 目标容器选择器
   * @param {string} config.src - 图片路径
   * @param {string} [config.alt='超宽PNG'] - 图片替代文本
   * @param {number} [config.zoom=1.6] - 缩放倍数（1~2）
   * @param {Object} [config.options] - 自定义样式选项
   * @param {string} [config.options.height='90vh'] - 容器高度
   * @param {string} [config.options.offsetY='-190px'] - 图片纵向偏移
   * @param {number} [config.options.speed=1.2] - 滚轮横向速度倍率
   * @param {string} [config.options.radius='14px'] - 容器圆角
   */
  function init(config) {
    if (!config.target) {
      console.error('[hx-pan-module] 缺少 target 参数');
      return null;
    }
    if (!config.src) {
      console.error('[hx-pan-module] 缺少 src 参数（图片路径）');
      return null;
    }

    const targetEl = document.querySelector(config.target);
    if (!targetEl) {
      console.error(`[hx-pan-module] 未找到目标容器: ${config.target}`);
      return null;
    }

    const zoom = Math.max(1, Math.min(2, parseFloat(config.zoom || '1.6')));
    const alt = config.alt || '超宽PNG';
    const opts = { ...defaults, ...(config.options || {}) };

    // 注入基础样式
    injectBaseStyles();

    // 生成并插入 HTML
    const html = generateHTML(config.src, alt, zoom, opts);
    targetEl.innerHTML = html;

    // 绑定事件
    const viewer = targetEl.querySelector('.hx-pan');
    const cleanup = bindPanEvents(viewer, opts.speed);

    const instance = { target: config.target, viewer, cleanup };
    instances.push(instance);

    console.log(`[hx-pan-module] 已初始化：target=${config.target}, zoom=${zoom}`);
    return instance;
  }

  /**
   * 销毁指定实例
   * @param {string} target - 目标容器选择器
   */
  function destroy(target) {
    const idx = instances.findIndex(inst => inst.target === target);
    if (idx === -1) {
      console.warn(`[hx-pan-module] 未找到实例: ${target}`);
      return;
    }
    const inst = instances[idx];
    inst.cleanup();
    const targetEl = document.querySelector(target);
    if (targetEl) targetEl.innerHTML = '';
    instances.splice(idx, 1);
    console.log(`[hx-pan-module] 已销毁: ${target}`);
  }

  /**
   * 销毁所有实例
   */
  function destroyAll() {
    instances.forEach(inst => {
      inst.cleanup();
      const el = document.querySelector(inst.target);
      if (el) el.innerHTML = '';
    });
    instances = [];
    console.log('[hx-pan-module] 已销毁所有实例');
  }

  return {
    init,
    destroy,
    destroyAll,
    getInstances: () => [...instances]
  };
})();

// 自动导出（支持 AMD/CommonJS/全局变量）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hxPanModule;
} else if (typeof define === 'function' && define.amd) {
  define([], function () { return hxPanModule; });
} else {
  window.hxPanModule = hxPanModule;
}