/* Chart 6: Occupation Exposure Bubble */
(function () {
  var el = document.getElementById('chart6');
  if (!el) return;
  var chart = echarts.init(el);
  var txt = '#111827';
  var sub = '#6b7280';
  var grid = '#e5e7eb';
  var accent = '#ef4444';

  var data = [
    { name: '作家与作者', skill: 5, exposure: 80.8, employment: 49450, category: 'media', skillLabel: '本科', labelPosition: 'top', labelOffset: [0, -8] },
    { name: '新闻分析师、记者\n与新闻从业者', skill: 5, exposure: 63.3, employment: 45020, category: 'media', skillLabel: '本科', labelPosition: 'right', labelOffset: [26, -2], labelAlign: 'left' },
    { name: '编辑', skill: 5, exposure: 64.7, employment: 95700, category: 'media', skillLabel: '本科', labelPosition: 'left', labelOffset: [-26, -12], labelAlign: 'right' },
    { name: '注册护士', skill: 5, exposure: 38.1, employment: 3172500, category: 'health', skillLabel: '本科', labelPosition: 'insideTop', labelOffset: [0, 8] },
    { name: '执业护理师', skill: 6, exposure: 31.5, employment: 323900, category: 'health', skillLabel: '硕士', labelPosition: 'top', labelOffset: [0, -10] },
    { name: '医生、\n病理学家', skill: 7, exposure: 31.8, employment: 12600, category: 'health', skillLabel: '博士/职业学位', labelPosition: 'top', labelOffset: [0, -10] },
    { name: '居家健康护理员', skill: 2, exposure: 3.8, employment: 3810800, category: 'care', skillLabel: '高中或同等学历', labelPosition: 'top', labelOffset: [24, -10], labelAlign: 'center' },
    { name: '木工', skill: 1, exposure: 8.9, employment: 942000, category: 'manual', skillLabel: '无正式门槛', labelPosition: 'top', labelOffset: [18, -16], labelAlign: 'left' },
    { name: '屋顶工', skill: 1, exposure: 0.0, employment: 135140, category: 'manual', skillLabel: '无正式门槛', labelPosition: 'insideTop', labelOffset: [0, 10], labelAlign: 'center' },
    { name: '建筑劳工', skill: 1, exposure: 2.5, employment: 1298900, category: 'manual', skillLabel: '无正式门槛', labelPosition: 'top', labelOffset: [-22, -36], labelAlign: 'right' }
  ];

  function symbolSize(val) {
    return Math.max(18, Math.sqrt(val[2]) / 24);
  }

  function render() {
    var mobile = window.innerWidth <= 900;
    chart.setOption({
      tooltip: {
        backgroundColor: '#ffffff',
        borderColor: grid,
        borderWidth: 1,
        textStyle: { color: txt },
        formatter: function (params) {
          var d = params.data.raw;
          return d.name.replace(/\n/g, ' ') +
            '<br>暴露度（beta）: ' + d.exposure.toFixed(1) + '%' +
            '<br>典型入职教育: ' + d.skillLabel +
            '<br>美国就业人数: ' + d.employment.toLocaleString();
        }
      },
      grid: { left: mobile ? 56 : 72, right: mobile ? 22 : 32, top: 34, bottom: 72 },
      xAxis: {
        min: 1,
        max: 7,
        interval: 1,
        name: '职业技能/教育门槛（简化）',
        nameLocation: 'middle',
        nameGap: 46,
        nameTextStyle: { color: sub },
        axisLine: { lineStyle: { color: grid } },
        axisTick: { lineStyle: { color: grid } },
        axisLabel: {
          color: txt,
          fontSize: mobile ? 10 : 11,
          formatter: function (val) {
            var map = {
              1: '无正式门槛',
              2: '高中',
              3: '证书',
              4: '副学士',
              5: '本科',
              6: '硕士',
              7: '博士/职业'
            };
            return map[val] || val;
          }
        },
        splitLine: { lineStyle: { color: grid } }
      },
      yAxis: {
        min: 0,
        max: 100,
        interval: 20,
        name: 'AI 暴露度（beta）',
        nameTextStyle: { color: sub },
        axisLine: { lineStyle: { color: grid } },
        axisTick: { lineStyle: { color: grid } },
        axisLabel: {
          color: txt,
          formatter: '{value}%'
        },
        splitLine: { lineStyle: { color: grid } }
      },
      series: [{
        type: 'scatter',
        symbolSize: symbolSize,
        data: data.map(function (d) {
          return {
            value: [d.skill, d.exposure, d.employment],
            raw: d,
            itemStyle: {
              color: d.category === 'media' ? accent : '#d1d5db',
              opacity: d.category === 'media' ? 0.9 : 0.75
            },
            label: {
              show: true,
              position: d.labelPosition || 'top',
              offset: d.labelOffset || [0, 0],
              distance: 8,
              formatter: function () { return d.name; },
              color: d.category === 'media' ? accent : txt,
              fontSize: mobile ? 10 : 11,
              fontWeight: d.category === 'media' ? 700 : 500,
              lineHeight: mobile ? 12 : 14,
              align: d.labelAlign || 'center'
            }
          };
        }),
        emphasis: { scale: true },
        markLine: {
          silent: true,
          symbol: ['none', 'none'],
          lineStyle: { color: '#9ca3af', type: 'dashed' },
          label: {
            color: sub,
            formatter: '50% 暴露参考线'
          },
          data: [{ yAxis: 50 }]
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
