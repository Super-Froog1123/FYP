/* Chart 10: Token Cost Scrolly */
(function () {
  var el = document.getElementById('chart10');
  if (!el || !window.echarts) return;
  var chart = echarts.init(el);
  var steps = Array.from(document.querySelectorAll('.chart10-step'));
  if (!steps.length) return;
  var txt = '#111827';
  var sub = '#6b7280';
  var grid = '#e5e7eb';
  var accent = '#ef4444';
  var blendedCostPerMillion = 1.84;

  var stages = [
    {
      title: '阶段 1：偶尔问一句',
      subtitle: '低频对话式使用',
      color: accent,
      tokens: [12, 25, 37, 50, 62, 75, 87, 100, 112, 125, 137, 150, 162, 175, 187, 200, 212, 225, 237, 250, 262, 275, 287, 300, 312, 325, 337, 350, 362, 375]
    },
    {
      title: '阶段 2：接进多步工作流',
      subtitle: '检索、改写、格式化等流程叠加',
      color: accent,
      tokens: [55, 110, 165, 220, 275, 330, 385, 440, 495, 550, 605, 660, 715, 770, 825, 880, 935, 990, 1045, 1100, 1155, 1210, 1265, 1320, 1375, 1430, 1485, 1540, 1595, 1650]
    },
    {
      title: '阶段 3：让 Agent 持续跑',
      subtitle: '轮询、重试、长上下文与多轮执行',
      color: accent,
      tokens: [150, 320, 520, 760, 1030, 1340, 1680, 2050, 2450, 2880, 3340, 3830, 4350, 4900, 5480, 6090, 6730, 7400, 8100, 8830, 9590, 10380, 11200, 12050, 12930, 13840, 14780, 15750, 16750, 17780]
    }
  ];

  stages.forEach(function (stage) {
    stage.cost = stage.tokens.map(function (thousandTokens) {
      return +((thousandTokens / 1000) * blendedCostPerMillion).toFixed(2);
    });
  });

  var days = Array.from({ length: 30 }, function (_, i) { return '第' + (i + 1) + '天'; });

  function applyStage(index) {
    var stage = stages[index];
    steps.forEach(function (step, i) {
      step.classList.toggle('is-active', i === index);
    });

    chart.setOption({
      animationDuration: 700,
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#ffffff',
        borderColor: grid,
        borderWidth: 1,
        textStyle: { color: txt },
        formatter: function (params) {
          var token = params[0];
          var cost = params[1];
          return token.axisValue + '<br>累计 Token: ' + token.value + 'k<br>累计成本: $' + cost.value;
        }
      },
      legend: {
        top: 0,
        textStyle: { color: txt },
        data: ['累计 Token（千）', '累计成本（美元）']
      },
      grid: { left: 54, right: 54, top: 44, bottom: 50 },
      xAxis: {
        type: 'category',
        data: days,
        axisLine: { lineStyle: { color: grid } },
        axisLabel: {
          color: sub,
          interval: 4
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Token（千）',
          nameTextStyle: { color: sub },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: txt },
          splitLine: { lineStyle: { color: grid } }
        },
        {
          type: 'value',
          name: '成本（美元）',
          nameTextStyle: { color: sub },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: txt, formatter: '${value}' },
          splitLine: { show: false }
        }
      ],
      graphic: [{
        type: 'text',
        right: 8,
        top: 26,
        style: {
          text: stage.subtitle,
          fill: sub,
          font: '500 12px sans-serif'
        }
      }],
      series: [
        {
          name: '累计 Token（千）',
          type: 'line',
          smooth: 0.25,
          data: stage.tokens,
          symbol: 'none',
          lineStyle: { width: 3, color: stage.color },
          areaStyle: { opacity: 0 }
        },
        {
          name: '累计成本（美元）',
          type: 'line',
          yAxisIndex: 1,
          smooth: 0.2,
          data: stage.cost,
          symbol: 'circle',
          symbolSize: 5,
          lineStyle: { width: 2.5, color: '#9ca3af', type: 'dashed' },
          itemStyle: { color: '#9ca3af' }
        }
      ]
    }, true);
  }

  var observer = new IntersectionObserver(function (entries) {
    var visible = entries
      .filter(function (entry) { return entry.isIntersecting; })
      .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
    if (!visible) return;
    applyStage(parseInt(visible.target.getAttribute('data-stage'), 10) || 0);
  }, {
    threshold: [0.35, 0.6],
    rootMargin: '-10% 0px -20% 0px'
  });

  steps.forEach(function (step) { observer.observe(step); });
  applyStage(0);
  window.addEventListener('resize', function () { chart.resize(); });
})();
