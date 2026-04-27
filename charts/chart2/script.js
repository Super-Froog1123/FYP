/* Chart 2: Why Employees Turn to AI – Radial Chart */
(function(){
  function init(){
    var el = document.getElementById('chart2');
    if (!el || el.offsetWidth === 0) { requestAnimationFrame(init); return; }
    var c = echarts.init(el);
    var calloutsWrap = document.querySelector('.chart2-callouts');
    var callouts = calloutsWrap ? Array.from(calloutsWrap.querySelectorAll('.callout[data-chart-index]')) : [];
    var panel = document.querySelector('.chart2-panel');
    var txt = '#111827';
    var sub = '#6b7280';
    var grid = '#e5e7eb';
    var accent = '#ef4444';
    var lockedIndex = null;
    var suppressNextPanelClick = false;

    var r = [42,30,28,23,17,16,15,8];

    function buildOption(activeIndex) {
      return {
      polar:{center:['50%','50%'],radius:['22%','85%']},
      angleAxis:{type:'category',startAngle:110,
        data:r.map(function(_,i){return String(i)}),
        axisLabel:{show:false},axisLine:{lineStyle:{color:grid}},
        axisTick:{show:true,length:8,lineStyle:{color:grid}},
        splitLine:{show:true,lineStyle:{color:grid}}},
      radiusAxis:{min:0,max:50,interval:10,
        axisLabel:{color:txt,formatter:'{value}%'},
        splitLine:{lineStyle:{color:grid}},
        axisLine:{show:false},axisTick:{show:false}},
      series:[{type:'bar',coordinateSystem:'polar',roundCap:false,barWidth:20,
        data:r.map(function(value, idx){
          var isActive = activeIndex === idx;
          var isNeutral = activeIndex === null || activeIndex === undefined;
          return {
            value: value,
            itemStyle: {
              color: isNeutral ? (idx === 0 ? accent : '#d1d5db') : (isActive ? accent : '#d1d5db'),
              opacity: isNeutral ? 1 : (isActive ? 1 : 0.35)
            }
          };
        }),
        itemStyle:{
          borderWidth:0
        },
        emphasis: {
          itemStyle: {
            color: accent,
            opacity: 1
          }
        }}],
      graphic:[{type:'text',left:'48%',bottom:4,
        style:{text:'选择各项原因的受访者占比',fill:sub,font:'500 11px sans-serif',textAlign:'center'}}]
    };
    }

    function syncActive(index) {
      if (calloutsWrap) {
        calloutsWrap.classList.toggle('is-dimmed', index !== null && index !== undefined);
      }
      callouts.forEach(function(node){
        node.classList.toggle('is-active', String(index) === node.getAttribute('data-chart-index'));
      });
      c.setOption(buildOption(index), true);
    }

    c.setOption(buildOption(null), true);

    callouts.forEach(function(node){
      var idx = Number(node.getAttribute('data-chart-index'));
      node.addEventListener('mouseenter', function(){
        if (lockedIndex !== null) return;
        syncActive(idx);
      });
      node.addEventListener('mouseleave', function(){
        if (lockedIndex !== null) return;
        syncActive(null);
      });
    });

    c.on('mouseover', function(params){
      if (lockedIndex !== null) return;
      if (params.componentType === 'series' && typeof params.dataIndex === 'number') {
        syncActive(params.dataIndex);
      }
    });

    c.on('click', function(params){
      if (params.componentType === 'series' && typeof params.dataIndex === 'number') {
        suppressNextPanelClick = true;
        lockedIndex = params.dataIndex;
        syncActive(lockedIndex);
      }
    });

    c.getZr().on('mouseout', function(){
      if (lockedIndex === null) syncActive(null);
    });

    if (panel) {
      panel.addEventListener('mouseleave', function(){
        if (lockedIndex === null) syncActive(null);
      });
      panel.addEventListener('click', function(e){
        if (suppressNextPanelClick) {
          suppressNextPanelClick = false;
          return;
        }
        if (e.target.closest('.callout')) return;
        lockedIndex = null;
        syncActive(null);
      });
    }

    window.addEventListener('resize',function(){c.resize();});
  }
  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init);
})();
