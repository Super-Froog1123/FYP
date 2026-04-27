/* Chart 12: OpenClaw Gov Rollout OSM Map */
(function () {
  var mount = document.getElementById('chart12-map');
  if (!mount || !window.L) return;

  var regions = [
    { name: '北京', lat: 39.9042, lng: 116.4074 },
    { name: '山东', lat: 36.6512, lng: 117.1201 },
    { name: '浙江', lat: 30.2741, lng: 120.1551 },
    { name: '广东', lat: 23.1291, lng: 113.2644 },
    { name: '四川', lat: 30.5728, lng: 104.0668 }
  ];

  var map = L.map(mount, {
    scrollWheelZoom: false,
    zoomControl: true,
    dragging: true
  }).setView([33.5, 112.5], 4.5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  var markers = {};
  regions.forEach(function (region) {
    var marker = L.circleMarker([region.lat, region.lng], {
      radius: 8,
      color: '#ffffff',
      weight: 2,
      fillColor: '#f28c45',
      fillOpacity: 1
    }).addTo(map).bindTooltip(region.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -8]
    });
    markers[region.name] = marker;
  });

  var body = document.querySelector('.chart12-table tbody');
  var rows = Array.from(document.querySelectorAll('.chart12-table tbody tr[data-region]'));

  function activate(region) {
    var hasRegion = !!region;
    if (body) body.classList.toggle('is-dimmed', hasRegion);

    rows.forEach(function (row) {
      row.classList.toggle('is-active', hasRegion && row.getAttribute('data-region') === region);
    });

    Object.keys(markers).forEach(function (name) {
      var marker = markers[name];
      var active = hasRegion && name === region;
      marker.setStyle({
        fillColor: active ? '#ef4444' : '#f28c45',
        fillOpacity: hasRegion && !active ? 0.35 : 1,
        opacity: hasRegion && !active ? 0.35 : 1
      });
      if (active) {
        marker.openTooltip();
      } else {
        marker.closeTooltip();
      }
    });
  }

  rows.forEach(function (row) {
    var region = row.getAttribute('data-region');
    row.addEventListener('mouseenter', function () { activate(region); });
    row.addEventListener('mouseleave', function () { activate(null); });
  });

  Object.keys(markers).forEach(function (name) {
    var marker = markers[name];
    marker.on('mouseover', function () { activate(name); });
    marker.on('mouseout', function () { activate(null); });
  });
})();
