/* Chart 8: Student AI Usage Channel Preference */
(function () {
  var el = document.getElementById('chart8');
  if (!el) return;
  var chart = echarts.init(el);
  var txt = '#111827';
  var sub = '#6b7280';
  var grid = '#e5e7eb';
  var accent = '#ef4444';

  var data = [
    { name: 'AI 工具', value: 3.34, color: accent },
    { name: '传统搜索引擎', value: 2.60, color: '#d1d5db' },
    { name: '社交媒体', value: 2.81, color: '#9ca3af' }
  ];

  function render() {
    var mobile = window.innerWidth <= 900;
    chart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#ffffff',
        borderColor: grid,
        borderWidth: 1,
        textStyle: { color: txt },
        formatter: function (params) {
          var item = params[0];
          return item.name + '<br>渠道偏好评分：' + item.value.toFixed(2) + ' / 5';
        }
      },
      grid: {
        left: mobile ? 48 : 66,
        right: mobile ? 16 : 24,
        top: 18,
        bottom: mobile ? 34 : 40
      },
      xAxis: {
        type: 'category',
        data: data.map(function (item) { return item.name; }),
        axisLine: { lineStyle: { color: grid } },
        axisTick: { show: false },
        axisLabel: {
          color: txt,
          fontSize: mobile ? 12 : 14,
          fontWeight: 700
        }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 4,
        interval: 1,
        name: '偏好评分',
        nameTextStyle: { color: sub },
        axisLine: { lineStyle: { color: grid } },
        axisTick: { show: false },
        axisLabel: {
          color: txt,
          fontSize: mobile ? 11 : 12
        },
        splitLine: { lineStyle: { color: grid } }
      },
      series: [{
        type: 'bar',
        data: data.map(function (item) {
          return {
            value: item.value,
            itemStyle: { color: item.color }
          };
        }),
        barWidth: mobile ? 44 : 60,
        label: {
          show: true,
          position: 'top',
          distance: 6,
          color: txt,
          fontSize: mobile ? 16 : 18,
          fontWeight: 800,
          formatter: function (params) {
            return params.value.toFixed(2);
          }
        },
        itemStyle: {
          borderRadius: [2, 2, 0, 0]
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
