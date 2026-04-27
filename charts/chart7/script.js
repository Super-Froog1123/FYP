/* Chart 7: GitHub Copilot Slope */
(function () {
  var el = document.getElementById('chart7');
  if (!el) return;
  var chart = echarts.init(el);
  var txt = '#111827';
  var sub = '#6b7280';
  var grid = '#e5e7eb';
  var accent = '#ef4444';

  var manualMinutes = 160;
  var aiMinutes = +(manualMinutes / 1.558).toFixed(1);
  var speedGainLabelY = +(aiMinutes + (manualMinutes - aiMinutes) * 0.52).toFixed(1);

  function render() {
    var mobile = window.innerWidth <= 900;
    chart.setOption({
      grid: { left: 46, right: 24, top: 40, bottom: 44 },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#ffffff',
        borderColor: grid,
        borderWidth: 1,
        textStyle: { color: txt },
        formatter: function (params) {
          var p = params[0];
          return p.axisValue + '<br>时间成本: ' + p.value + ' 分钟';
        }
      },
      xAxis: {
        type: 'category',
        data: ['传统手工生产', 'AI 辅助生产'],
        axisLine: { lineStyle: { color: grid } },
        axisTick: { show: false },
        axisLabel: {
          color: txt,
          fontSize: mobile ? 11 : 13,
          fontWeight: 700
        }
      },
      yAxis: {
        type: 'value',
        min: 60,
        max: 170,
        interval: 20,
        name: '任务时间（分钟）',
        nameTextStyle: { color: sub },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: txt,
          formatter: '{value}'
        },
        splitLine: { lineStyle: { color: grid } }
      },
      series: [{
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: mobile ? 18 : 22,
        lineStyle: {
          width: 4,
          color: accent
        },
        itemStyle: {
          color: '#ffffff',
          borderColor: accent,
          borderWidth: 3
        },
        label: {
          show: true,
          formatter: function (p) { return p.value + ' 分钟'; },
          color: txt,
          fontSize: mobile ? 12 : 14,
          fontWeight: 800
        },
        data: [manualMinutes, aiMinutes],
        markPoint: {
          silent: true,
          symbol: 'roundRect',
          symbolSize: mobile ? [120, 42] : [138, 46],
          symbolOffset: mobile ? [-28, 0] : [-56, 0],
          itemStyle: {
            color: '#fef2f2',
            borderColor: accent,
            borderWidth: 1
          },
          label: {
            color: accent,
            fontSize: mobile ? 11 : 12,
            fontWeight: 800,
            formatter: '快 55.8%'
          },
          data: [{
            coord: ['AI 辅助生产', speedGainLabelY]
          }]
        },
        markLine: {
          silent: true,
          symbol: ['none', 'none'],
          lineStyle: { color: '#9ca3af', type: 'dashed' },
          data: [{ yAxis: manualMinutes }, { yAxis: aiMinutes }]
        }
      }]
    }, true);
  }

  render();
  window.addEventListener('resize', function () {
    render();
    chart.resize();
  });
})();
