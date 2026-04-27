/* Chart 3: Leaders vs Employees – Grouped Bar Chart */
(function(){
  var el = document.getElementById('chart3');
  if (!el) return;
  var c = echarts.init(el);
  var txt = '#111827';
  var grid = '#e5e7eb';
  var accent = '#ef4444';
  function hatchPattern(){
    var cv=document.createElement('canvas');cv.width=8;cv.height=8;
    var x=cv.getContext('2d');
    x.fillStyle='#f3f4f6';x.fillRect(0,0,8,8);
    x.strokeStyle='#9ca3af';x.lineWidth=1;
    x.beginPath();x.moveTo(-2,8);x.lineTo(8,-2);x.moveTo(2,10);x.lineTo(10,2);x.stroke();
    return cv;
  }

  var cats=[
    '对智能体的\n熟悉度','经常使用 AI','信任 AI 处理\n高风险工作',
    '预期未来会\n管理智能体','把 AI 当作\n思考伙伴','把 AI 视为\n职业加速器',
    '每天借助 AI\n节省 1 小时以上'
  ];
  var leaders=[67,69,78,36,54,79,29];
  var employees=[40,45,66,21,41,67,20];

  c.setOption({
    grid:{left:88,right:24,top:28,bottom:24,containLabel:true},
    xAxis:{type:'value',min:0,max:80,interval:20,
      axisLabel:{color:txt,formatter:'{value}%'},
      axisLine:{lineStyle:{color:grid}},splitLine:{show:true,lineStyle:{color:grid}},axisTick:{lineStyle:{color:grid}}},
    yAxis:{type:'category',inverse:true,data:cats,
      axisLabel:{
        color:txt,
        fontSize:12,
        fontWeight:700,
        width:132,
        lineHeight:18,
        margin:14,
        align:'right',
        overflow:'break'
      },
      axisLine:{show:false},axisTick:{show:false},
      splitLine:{show:true,lineStyle:{color:grid}}},
    series:[
      {name:'领导者',type:'bar',data:leaders,barWidth:20,barGap:'10%',
        itemStyle:{color:accent},
        label:{show:true,position:'right',distance:8,formatter:'{c}%',color:txt,fontSize:11,fontWeight:800}},
      {name:'员工',type:'bar',data:employees,barWidth:20,
        itemStyle:{color:{type:'pattern',image:hatchPattern(),repeat:'repeat'},borderColor:'#9ca3af',borderWidth:1},
        label:{show:true,position:'right',distance:8,formatter:'{c}%',color:txt,fontSize:11,fontWeight:800}}
    ]
  });

  window.addEventListener('resize',function(){c.resize();});
})();
