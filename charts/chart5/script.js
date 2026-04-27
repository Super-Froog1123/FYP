/* Chart 5: AI Keyword Network */
(function () {
  var el = document.getElementById('chart5');
  if (!el) return;
  var chart = echarts.init(el);

  var categoryColors = ['#d1d5db', '#d1d5db', '#d1d5db', '#d1d5db'];
  var categories = [
    { name: '核心技术层' },
    { name: '产品工具层' },
    { name: '商业应用层' },
    { name: '社会情绪层' }
  ];

  var nodes = [
    { name: '大语言模型', category: 0, value: 50, symbolSize: 52 },
    { name: 'AI 智能体', category: 0, value: 68, symbolSize: 64 },
    { name: 'MCP', category: 0, value: 42, symbolSize: 42 },
    { name: 'RAG', category: 0, value: 34, symbolSize: 34 },
    { name: '工具调用', category: 0, value: 46, symbolSize: 46 },
    { name: '工作流', category: 0, value: 38, symbolSize: 38 },
    { name: '本地部署', category: 0, value: 32, symbolSize: 32 },

    { name: 'OpenClaw', category: 1, value: 44, symbolSize: 54, itemStyle: { color: '#ef4444' } },
    { name: 'Claude Code', category: 1, value: 34, symbolSize: 34 },
    { name: 'Cursor', category: 1, value: 34, symbolSize: 34 },
    { name: 'Manus', category: 1, value: 28, symbolSize: 28 },
    { name: 'Coze', category: 1, value: 30, symbolSize: 30 },
    { name: 'Dify', category: 1, value: 28, symbolSize: 28 },
    { name: '微信连接', category: 1, value: 26, symbolSize: 26 },
    { name: 'AI 编程', category: 1, value: 26, symbolSize: 26 },

    { name: '数字劳动力', category: 2, value: 42, symbolSize: 42 },
    { name: '自动化', category: 2, value: 36, symbolSize: 36 },
    { name: '智能体平台', category: 2, value: 30, symbolSize: 30 },
    { name: '降本增效', category: 2, value: 34, symbolSize: 34 },
    { name: '技能升级', category: 2, value: 28, symbolSize: 28 },

    { name: 'AI焦虑', category: 3, value: 40, symbolSize: 40 },
    { name: '替代', category: 3, value: 30, symbolSize: 30 },
    { name: '裁员', category: 3, value: 26, symbolSize: 26 },
    { name: '副业', category: 3, value: 26, symbolSize: 26 },
    { name: '提效', category: 3, value: 30, symbolSize: 30 },
    { name: '技术崇拜', category: 3, value: 26, symbolSize: 26 },
    { name: '开源社区', category: 3, value: 28, symbolSize: 28 }
  ];

  var links = [
    { source: 'OpenClaw', target: 'AI 智能体', value: 5, lineStyle: { width: 3.8 } },
    { source: 'OpenClaw', target: '工具调用', value: 4, lineStyle: { width: 3.2 } },
    { source: 'OpenClaw', target: 'MCP', value: 4, lineStyle: { width: 3.2 } },
    { source: 'OpenClaw', target: '本地部署', value: 4, lineStyle: { width: 3.2 } },
    { source: 'OpenClaw', target: '微信连接', value: 5, lineStyle: { width: 3.8 } },
    { source: 'OpenClaw', target: '自动化', value: 4, lineStyle: { width: 3.2 } },
    { source: 'OpenClaw', target: '数字劳动力', value: 3, lineStyle: { width: 2.6 } },
    { source: 'OpenClaw', target: 'AI焦虑', value: 4, lineStyle: { width: 3.2 } },
    { source: 'OpenClaw', target: '副业', value: 3, lineStyle: { width: 2.6 } },
    { source: 'OpenClaw', target: '技术崇拜', value: 3, lineStyle: { width: 2.6 } },
    { source: 'OpenClaw', target: '开源社区', value: 3, lineStyle: { width: 2.6 } },

    { source: '大语言模型', target: 'AI 智能体', value: 5, lineStyle: { width: 3.8 } },
    { source: 'AI 智能体', target: 'MCP', value: 4, lineStyle: { width: 3.2 } },
    { source: 'AI 智能体', target: '工作流', value: 4, lineStyle: { width: 3.2 } },
    { source: 'AI 智能体', target: '工具调用', value: 5, lineStyle: { width: 3.8 } },
    { source: 'AI 智能体', target: '数字劳动力', value: 5, lineStyle: { width: 3.8 } },
    { source: 'AI 智能体', target: '自动化', value: 4, lineStyle: { width: 3.2 } },
    { source: 'AI 智能体', target: '智能体平台', value: 4, lineStyle: { width: 3.2 } },
    { source: 'MCP', target: '工具调用', value: 5, lineStyle: { width: 3.8 } },
    { source: 'RAG', target: '工作流', value: 3, lineStyle: { width: 2.6 } },
    { source: '工作流', target: '自动化', value: 4, lineStyle: { width: 3.2 } },

    { source: 'Claude Code', target: 'AI 编程', value: 5, lineStyle: { width: 3.8 } },
    { source: 'Cursor', target: 'AI 编程', value: 5, lineStyle: { width: 3.8 } },
    { source: 'Coze', target: 'AI 智能体', value: 4, lineStyle: { width: 3.2 } },
    { source: 'Dify', target: '工作流', value: 4, lineStyle: { width: 3.2 } },
    { source: 'Manus', target: 'AI 智能体', value: 3, lineStyle: { width: 2.6 } },

    { source: '数字劳动力', target: '降本增效', value: 4, lineStyle: { width: 3.2 } },
    { source: '数字劳动力', target: '技能升级', value: 3, lineStyle: { width: 2.6 } },
    { source: 'AI焦虑', target: '替代', value: 4, lineStyle: { width: 3.2 } },
    { source: '替代', target: '裁员', value: 3, lineStyle: { width: 2.6 } },
    { source: '提效', target: '降本增效', value: 4, lineStyle: { width: 3.2 } },
    { source: 'AI焦虑', target: '技能升级', value: 3, lineStyle: { width: 2.6 } }
  ];

  function render() {
    var mobile = window.innerWidth <= 900;
    chart.setOption({
      animationDuration: 1200,
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: { color: '#111827' },
        formatter: function (params) {
          if (params.dataType === 'edge') {
            return params.data.source + ' ↔ ' + params.data.target + '<br>连接强度: ' + params.data.value;
          }
          return params.data.name + '<br>圈层: ' + categories[params.data.category].name;
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        left: mobile ? '2%' : '1%',
        top: mobile ? '8%' : '4%',
        right: mobile ? '2%' : '1%',
        bottom: mobile ? '6%' : '3%',
        roam: 'move',
        draggable: true,
        focusNodeAdjacency: true,
        force: {
          repulsion: mobile ? 320 : 760,
          gravity: 0.025,
          edgeLength: mobile ? [54, 118] : [110, 240],
          friction: 0.06
        },
        label: {
          show: true,
          position: 'right',
          color: '#111827',
          fontSize: mobile ? 11 : 13,
          fontWeight: 500,
          formatter: function (params) {
            return params.data.name;
          }
        },
        lineStyle: {
          color: '#d1d5db',
          opacity: 0.8,
          curveness: 0.12
        },
        emphasis: {
          scale: true,
          label: { show: true }
        },
        edgeSymbol: ['none', 'none'],
        categories: categories.map(function (item, index) {
          return {
            name: item.name,
            itemStyle: { color: categoryColors[index] }
          };
        }),
        data: nodes.map(function (node) {
          var base = {
            name: node.name,
            category: node.category,
            value: node.value,
            symbolSize: mobile ? Math.max(18, node.symbolSize - 4) : node.symbolSize,
            itemStyle: node.itemStyle || { color: categoryColors[node.category] }
          };
          if (node.name === 'OpenClaw') {
            base.label = {
              color: '#ef4444',
              fontSize: mobile ? 12 : 13,
              fontWeight: 800
            };
          } else if (node.name === 'AI 智能体' || node.name === 'AI焦虑') {
            base.itemStyle = { color: '#9ca3af' };
          }
          return base;
        }),
        links: links
      }]
    }, true);
  }

  render();
  window.addEventListener('resize', function () {
    render();
    chart.resize();
  });
})();
