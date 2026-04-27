/* Chart 1: AI Workforce Strategy Bar Chart */
(function(){
  var el = document.getElementById('chart1');
  if (!el) return;
  var c = echarts.init(el);
  var txt = '#111827';
  var sub = '#6b7280';
  var grid = '#e5e7eb';
  var accent = '#ef4444';

  function wrapLabel(text, maxLen) {
    var words = text.split(' ');
    var lines = [];
    var line = '';
    for (var i = 0; i < words.length; i++) {
      var next = line ? line + ' ' + words[i] : words[i];
      if (next.length > maxLen && line) {
        lines.push(line);
        line = words[i];
      } else {
        line = next;
      }
    }
    if (line) lines.push(line);
    return lines.join('\n');
  }

  var d = [
    ['优先提升现有员工的 AI 专项技能', '优先提升现有员工的\nAI 专项技能', 47],
    ['维持现有编制，但把 AI 作为数字劳动力使用', '维持现有编制，\n用 AI 充当数字劳动力', 45],
    ['投入资源维持员工士气', '投入资源维持\n员工士气', 44],
    ['优先通过长期激励和奖金提升留任率', '通过长期激励与奖金\n提升员工留任', 40],
    ['使用 AI 缩减人员规模', '使用 AI\n缩减人员规模', 33],
    ['为支持业务需求而增加招聘', '为支持业务需求而\n增加招聘', 32],
    ['用 AI 缩减编制，但奖励高绩效员工', '缩减编制，\n但奖励高绩效员工', 32],
    ['劳动力策略暂不调整', '劳动力策略\n暂不调整', 28]
  ];

  function render() {
    var isMobile = window.innerWidth <= 900;
    var isWide = window.innerWidth >= 1200;
    c.setOption({
    grid:{left:isMobile ? 160 : (isWide ? 280 : 250),right:isMobile ? 72 : 84,top:10,bottom:48,containLabel:false},
    tooltip:{
      trigger:'axis',
      axisPointer:{ type:'shadow' },
      backgroundColor:'#ffffff',
      borderColor:grid,
      borderWidth:1,
      textStyle:{ color: txt },
      formatter:function(params){
        var item = params[0];
        return d[item.dataIndex][0] + '<br>' + item.value + '%';
      }
    },
    xAxis:{type:'value',min:0,max:50,interval:10,
      axisLabel:{color:txt,formatter:'{value}%'},
      axisLine:{lineStyle:{color:grid}},splitLine:{show:true,lineStyle:{color:grid}},axisTick:{lineStyle:{color:grid}}},
    yAxis:{type:'category',inverse:true,data:d.map(function(x){return x[1]}),
      axisLabel:{
        color:txt,
        fontSize:isMobile ? 11 : 13,
        fontWeight:700,
        width:isMobile ? 130 : (isWide ? 240 : 210),
        lineHeight:isMobile ? 15 : 18,
        margin:isMobile ? 14 : 18,
        align:'right',
        formatter:function(value){
          return value;
        }
      },
      axisLine:{show:false},axisTick:{show:false},
      splitLine:{show:true,lineStyle:{color:grid}}},
    series:[{type:'bar',data:d.map(function(x){return x[2]}),barWidth:isMobile ? 18 : 24,
      itemStyle:{
        color:function(params){ return params.dataIndex < 2 ? accent : '#d1d5db'; },
        borderWidth:0
      },
      label:{show:true,position:'right',distance:10,formatter:'{c}%',color:txt,fontSize:isMobile ? 14 : 16,fontWeight:800}}],
    graphic:[{type:'text',right:isMobile ? 0 : 4,bottom:0,
      style:{text:'将该项列为最可能前三策略的受访者占比',fill:sub,font:(isMobile ? '500 11px sans-serif' : '500 12px sans-serif')}}]
  }, true);
  }

  render();
  window.addEventListener('resize',function(){
    render();
    c.resize();
  });
})();
