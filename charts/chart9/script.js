/* Chart 9: Occupation Exposure Calculator */
(function () {
  var input = document.getElementById('job-search-input');
  var button = document.getElementById('job-search-button');
  var result = document.getElementById('job-search-result');
  var datalist = document.getElementById('job-title-list');
  if (!input || !button || !result || !datalist) return;

  var rows = [];
  var titleMap = {
    'Writers and Authors': '作家与作者',
    'News Analysts, Reporters, and Journalists': '新闻分析师、记者与新闻从业者',
    'Editors': '编辑',
    'Registered Nurses': '注册护士',
    'Nurse Practitioners': '执业护理师',
    'Physicians, Pathologists': '医生、病理学家',
    'Home Health Aides': '居家健康护理员',
    'Carpenters': '木工',
    'Roofers': '屋顶工',
    'Construction Laborers': '建筑劳工'
  };
  var aliases = {
    '记者': 'News Analysts, Reporters, and Journalists',
    '新闻': 'News Analysts, Reporters, and Journalists',
    '作家': 'Writers and Authors',
    '作者': 'Writers and Authors',
    '编辑': 'Editors',
    '护士': 'Registered Nurses',
    '护理': 'Registered Nurses',
    '医生': 'Physicians, Pathologists',
    '木工': 'Carpenters',
    '建筑工': 'Construction Laborers',
    '屋顶工': 'Roofers'
  };

  function parseCSV(text) {
    var lines = text.trim().split(/\r?\n/);
    var headers = lines[0].split(',');
    return lines.slice(1).map(function (line) {
      var parts = [];
      var current = '';
      var inQuotes = false;
      for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (ch === '"' && line[i + 1] === '"') {
          current += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
          parts.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      parts.push(current);
      var obj = {};
      headers.forEach(function (h, idx) { obj[h] = parts[idx] || ''; });
      obj.titleLower = (obj.Title || '').toLowerCase();
      obj.displayTitle = displayTitle(obj.Title || '');
      obj.displayLower = obj.displayTitle.toLowerCase();
      return obj;
    });
  }

  function classify(beta) {
    if (beta >= 0.6) return '高暴露';
    if (beta >= 0.3) return '中等暴露';
    return '低暴露';
  }

  function explain(beta) {
    if (beta >= 0.6) return '这类职业中，较多任务可被写作、总结、检索或格式化型的大语言模型能力明显影响。';
    if (beta >= 0.3) return '这类职业同时包含可被 LLM 影响的认知任务，以及较难被完全替代的判断、沟通或现场执行任务。';
    return '这类职业更依赖线下动作、即时照护、空间操作或复杂现场协作，因此在论文口径下暴露度较低。';
  }

  function displayTitle(title) {
    return titleMap[title] || title;
  }

  function renderEmpty() {
    result.className = 'chart9-result is-empty';
    result.innerHTML = '输入一个职业名称，或点击下方示例，查看它在 OpenAI 论文中的暴露度。';
  }

  function renderRow(row) {
    var beta = +(parseFloat(row.human_rating_beta) * 100).toFixed(1);
    var gamma = +(parseFloat(row.human_rating_gamma) * 100).toFixed(1);
    var label = classify(parseFloat(row.human_rating_beta));
    result.className = 'chart9-result';
    result.innerHTML =
      '<h3>' + displayTitle(row.Title) + '</h3>' +
      '<div class="chart9-meta">O*NET-SOC 职业编码：' + row['O*NET-SOC Code'] + '</div>' +
      '<div class="chart9-badges">' +
        '<div class="chart9-badge"><strong>' + beta + '%</strong><span>暴露度 beta</span></div>' +
        '<div class="chart9-badge"><strong>' + gamma + '%</strong><span>暴露度 gamma</span></div>' +
        '<div class="chart9-badge"><strong>' + label + '</strong><span>解释性分档</span></div>' +
      '</div>' +
      '<div class="chart9-bar">' +
        '<div class="chart9-bar-label"><span>任务暴露度</span><span>' + beta + '%</span></div>' +
        '<div class="chart9-track"><div class="chart9-fill" style="width:' + beta + '%"></div></div>' +
      '</div>' +
      '<div class="chart9-explainer">' + explain(parseFloat(row.human_rating_beta)) + '</div>';
  }

  function renderSuggestions(matches, query) {
    result.className = 'chart9-result';
    result.innerHTML =
      '<h3>没有直接命中“' + query + '”</h3>' +
      '<div class="chart9-suggestions">你可以试试这些最接近的职业：' +
      matches.map(function (row) {
        return '<button type="button" data-suggestion="' + row.Title.replace(/"/g, '&quot;') + '">' + displayTitle(row.Title) + '</button>';
      }).join('') +
      '</div>';
    result.querySelectorAll('[data-suggestion]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        input.value = btn.getAttribute('data-suggestion');
        runSearch();
      });
    });
  }

  function findMatches(query) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    if (aliases[query.trim()]) q = aliases[query.trim()].toLowerCase();
    var exact = rows.find(function (row) {
      return row.titleLower === q || row.displayLower === q;
    });
    if (exact) return [exact];
    var contains = rows.filter(function (row) {
      return row.titleLower.indexOf(q) !== -1 || row.displayLower.indexOf(q) !== -1;
    }).slice(0, 5);
    if (contains.length) return contains;
    return rows
      .map(function (row) {
        var score = 0;
        q.split(/\s+/).forEach(function (token) {
          if (row.titleLower.indexOf(token) !== -1) score++;
          if (row.displayLower.indexOf(token) !== -1) score++;
        });
        return { row: row, score: score };
      })
      .filter(function (item) { return item.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 5)
      .map(function (item) { return item.row; });
  }

  function runSearch() {
    var query = input.value.trim();
    if (!query) {
      renderEmpty();
      return;
    }
    var matches = findMatches(query);
    if (!matches.length) {
      result.className = 'chart9-result is-empty';
      result.innerHTML = '没有找到匹配职业。试试中文、英文原名，或点击上面的快捷按钮。';
      return;
    }
    if (matches.length === 1 && matches[0].titleLower === (aliases[query] ? aliases[query].toLowerCase() : query.toLowerCase())) {
      renderRow(matches[0]);
      return;
    }
    if (matches.length === 1) {
      renderRow(matches[0]);
      return;
    }
    renderSuggestions(matches, query);
  }

  fetch('data/gpts-are-gpts-occ-level.csv')
    .then(function (res) { return res.text(); })
    .then(function (text) {
      rows = parseCSV(text);
      datalist.innerHTML = rows.slice(0, 200).map(function (row) {
        return '<option value="' + row.displayTitle.replace(/"/g, '&quot;') + '"></option>';
      }).join('');
      renderEmpty();
    })
    .catch(function () {
      result.className = 'chart9-result is-empty';
      result.innerHTML = '职业数据加载失败。';
    });

  button.addEventListener('click', runSearch);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') runSearch();
  });
  document.querySelectorAll('.chart9-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      input.value = chip.getAttribute('data-job');
      runSearch();
    });
  });
})();
