/* Chart 11: Shenzhen Policy Map */
(function () {
  var mapEl = document.getElementById('chart11-map');
  var sidebar = document.getElementById('chart11-sidebar');
  if (!mapEl || !sidebar || !window.L) return;

  var sites = [
    {
      name: '龙岗政策覆盖区',
      type: 'policy',
      lat: 22.7208,
      lng: 114.2478,
      radius: 15000,
      body: '龙岗区作为“龙虾十条”的政策主场，覆盖机器人、智能体与 AI+产业应用落地。'
    },
    {
      name: '全球首家人工智能6S店',
      type: 'deploy',
      lat: 22.6352,
      lng: 114.0628,
      body: '免费部署点之一。官方公告位置在坂田街道雅中路与雅丽路交叉口附近。'
    },
    {
      name: '粤港澳超高清数创产业园',
      type: 'deploy',
      lat: 22.7192,
      lng: 114.2466,
      body: '免费部署点之一。官方公告位置在龙城街道龙飞大道 500 号附近。'
    },
    {
      name: '大运AI小镇',
      type: 'park',
      lat: 22.6965,
      lng: 114.2235,
      body: '龙岗政府公开提出的人工智能全产业链园区，位于大运深港国际科教城南拓片区。'
    },
    {
      name: '创投·模力谷AI生态社区',
      type: 'park',
      lat: 22.7058,
      lng: 114.2365,
      body: '龙城街道的 AI 生态社区节点，强调创新创业、产业孵化与资本资源聚合。'
    },
    {
      name: '湾区未来科技园',
      type: 'park',
      lat: 22.6868,
      lng: 114.3208,
      body: '宝龙街道的“AI+生命健康”园区节点，体现龙岗对垂直行业场景的布局。'
    }
  ];

  var map = L.map(mapEl, {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([22.705, 114.215], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap 贡献者'
  }).addTo(map);

  var colors = {
    policy: '#ef4444',
    deploy: '#9ca3af',
    park: '#d1d5db'
  };

  var markerMap = {};

  function activate(name) {
    document.querySelectorAll('.chart11-card').forEach(function (card) {
      card.classList.toggle('is-active', card.getAttribute('data-site') === name);
    });
  }

  sites.forEach(function (site) {
    if (site.type === 'policy') {
      var circle = L.circle([site.lat, site.lng], {
        radius: site.radius,
        color: colors.policy,
        weight: 1.5,
        fillColor: colors.policy,
        fillOpacity: 0.08
      }).addTo(map).bindPopup('<strong>' + site.name + '</strong><br>' + site.body);
      markerMap[site.name] = circle;
      circle.on('click', function () { activate(site.name); });
      return;
    }

    var marker = L.circleMarker([site.lat, site.lng], {
      radius: site.type === 'deploy' ? 8 : 7,
      color: '#6b7280',
      weight: 1,
      fillColor: colors[site.type],
      fillOpacity: 1
    }).addTo(map).bindPopup('<strong>' + site.name + '</strong><br>' + site.body);
    markerMap[site.name] = marker;
    marker.on('click', function () { activate(site.name); });
  });

  sidebar.querySelectorAll('.chart11-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var name = card.getAttribute('data-site');
      var layer = markerMap[name];
      if (!layer) return;
      activate(name);
      if (layer.getBounds) {
        map.fitBounds(layer.getBounds(), { padding: [30, 30] });
      } else if (layer.getLatLng) {
        map.setView(layer.getLatLng(), 13, { animate: true });
      }
      if (layer.openPopup) layer.openPopup();
    });
  });
})();
