/* Chart 4: Human Capacity vs Digital Labor */
(function(){
  var el = document.getElementById('chart4');
  if (!el) return;
  var c = echarts.init(el);
  var txt = '#111827';
  var grid = '#e5e7eb';
  var accent = '#ef4444';

  var data = [
    ['领导者认为必须提升生产力', 53],
    ['员工表示已无足够时间或精力', 80],
    ['领导者有信心使用数字劳动力', 82]
  ];

  c.setOption({
    grid: { left: 56, right: 34, top: 24, bottom: 24, containLabel: true },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: { color: txt, formatter: '{value}%' },
      axisLine: { lineStyle: { color: grid } },
      axisTick: { lineStyle: { color: grid } },
      splitLine: { lineStyle: { color: grid } }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: data.map(function(item){ return item[0]; }),
      axisLabel: { color: txt, fontSize: 13, fontWeight: 700, width: 220, overflow: 'break' },
      axisLine: { show: false },
      axisTick: { show: false }
    },
    series: [{
      type: 'bar',
      data: data.map(function(item){ return item[1]; }),
      barWidth: 28,
      itemStyle: {
        color: function(params){ return params.dataIndex === 1 ? accent : '#d1d5db'; },
        borderWidth: 0
      },
      label: {
        show: true,
        position: 'right',
        formatter: '{c}%',
        color: txt,
        fontSize: 16,
        fontWeight: 800
      }
    }]
  });

  window.addEventListener('resize', function(){ c.resize(); });
})();
