// // ==UserScript==
// // @name         Bing AutoSearch (Tampermonkey Version)
// // @namespace    https://github.com/gerisonsabino/bing_autosearch
// // @version      1.0
// // @description  Auto search Bing for Microsoft Rewards
// // @author       gerisonsabino + Quang
// // @match        https://www.bing.com/*
// // @grant        none
// // ==/UserScript==

// (function() {
//     'use strict';

//     // ======== CONFIG ========
//     const searchTerms = [
//         "Ancestors: The Humankind Odyssey",
//         "Angry Birds 2",
//         "Apex Legends",
//         "Asphalt 9: Legends",
//         "Assassin's Creed Valhalla",
//         "Batman: Arkham Knight",
//         "Battlefield V",
//         "BioShock Infinite",
//         "Call of Duty: Modern Warfare",
//         "Cuphead",
//         "Diablo IV",
//         "Elden Ring",
//         "FIFA 21",
//         "Fallout 4",
//         "Far Cry 6",
//         "Fortnite",
//         "GTA V",
//         "Halo Infinite",
//         "League of Legends",
//         "Need for Speed Heat",
//         "Overwatch",
//         "PUBG",
//         "Resident Evil Village",
//         "Spider-Man",
//         "The Legend of Zelda: Breath of the Wild",
//         "The Witcher 3",
//         "Valorant",
//         "Watch Dogs: Legion",
//         "Cyberpunk 2077"
//     ];

//     const intervalMs = 5000; // Delay 5 giây giữa các lần search
//     // ========================

//     let index = parseInt(localStorage.getItem("bing_auto_index") || "0", 10);

//     if (index >= searchTerms.length) {
//         console.log("Bing AutoSearch: Hoàn thành tất cả tìm kiếm.");
//         localStorage.removeItem("bing_auto_index");
//         return;
//     }

//     if (window.location.pathname === "/search") {
//         // Đang ở trang kết quả → chờ rồi tìm tiếp
//         setTimeout(() => {
//             index++;
//             localStorage.setItem("bing_auto_index", index);
//             if (index < searchTerms.length) {
//                 window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(searchTerms[index])}`;
//             } else {
//                 console.log("Bing AutoSearch: Hoàn tất.");
//                 localStorage.removeItem("bing_auto_index");
//             }
//         }, intervalMs);
//     } else {
//         // Đang ở trang bing.com gốc → bắt đầu search
//         window.location.href = `https://www.bing.com/search?q=${encodeURIComponent(searchTerms[index])}`;
//     }
// })();

// ==UserScript==
// @name         Bing AutoSearch (1000+ terms, A→Z, daily shuffle)
// @namespace    quang.bing.autosearch
// @version      1.2
// @description  Auto-search Bing with 1000+ generated queries (A→Z), daily shuffled; menu: Start/Stop/Reset; persists progress.
// @author       Quang + GPT
// @match        https://www.bing.com/*
// @run-at       document-idle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// ==/UserScript==

(function () {
  'use strict';

  // ===== CONFIG =====
  // Delay ngẫu nhiên giữa các lần tìm (ms)
  const MIN_DELAY = 4000;
  const MAX_DELAY = 9000;

  // Giới hạn tối đa mỗi phiên (0 = không giới hạn; bạn có thể đặt 150, 200, ...)
  const SESSION_CAP = 0;

  // Dừng nếu phát hiện dấu hiệu captcha/robot
  const STOP_ON_SUSPECT = true;

  // ===== STATE KEYS =====
  const K_RUNNING = 'ba_running';
  const K_INDEX   = 'ba_index';
  const K_DATE    = 'ba_date';
  const K_SHUFFLE = 'ba_shuffle'; // seed lưu để cùng 1 ngày thì cùng thứ tự

  // ===== UTIL =====
  const todayKey = () => new Date().toISOString().slice(0,10); // YYYY-MM-DD
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // PRNG tuyến tính có seed (đủ dùng để xáo trộn ổn định theo ngày)
  function seededRandom(seed) {
    let x = seed >>> 0;
    return function () {
      // xorshift32
      x ^= x << 13; x >>>= 0;
      x ^= x >>> 17; x >>>= 0;
      x ^= x << 5;  x >>>= 0;
      return (x >>> 0) / 4294967296;
    };
  }
  function shuffleInPlace(arr, rnd) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ===== WORD BANK (A→Z) =====
  // 26 adjectives (mỗi chữ cái) × ~50 nouns ≈ 1300 cụm; script chỉ lấy 1000+ đầu tiên.
  const ADJ_AZ = [
    'ancient','brave','calm','daring','eager','fresh','gentle','humble','iconic','joyful',
    'keen','lively','mellow','noble','optimistic','proud','quiet','radiant','swift','true',
    'unique','vivid','wise','xenial','young','zesty'
  ];

  const NOUNS_CORE = [
    'art','astronomy','adventure','architecture','algorithm','apple','android','arduino','analytics','astronaut',
    'biology','book','battery','business','butterfly','bonsai','backend','breakfast','beach','bundle',
    'cloud','code','camera','cinema','coffee','cookie','console','crypto','chemistry','concert',
    'design','database','drone','desert','dinosaur','documentary','dessert','download','driver','debugger',
    'energy','ecosystem','eclipse','education','ecommerce','election','espresso','ecosystem-map','ecosystem-trend','economy',
    'film','festival','forest','frontend','framework','football','formula','fitness','finance','firefly',
    'game','galaxy','gadget','garden','geography','geology','guitar','grammar','graphic','greenhouse',
    'history','hiking','hologram','hometown','honey','horror','hybrid','hydrogen','hypervisor','hurricane',
    'internet','idea','island','illustration','innovation','insect','infrastructure','interface','intelligence','ice-cream',
    'jazz','journey','jungle','jigsaw','jogging','journal','jupiter','java','javascript','jeans',
    'knowledge','keyboard','kitchen','karaoke','kayak','koala','knitting','kendo','kitesurf','kubernetes',
    'language','library','laptop','landscape','legend','lighthouse','linux','literature','logic','luminosity',
    'music','mystery','mountain','museum','microservice','mathematics','meteor','microchip','manga','mythology',
    'nature','network','nebula','novel','notebook','notion','navigation','neuron','narrative','nanotech',
    'ocean','opera','orchestra','orchid','origami','outdoor','owl','oxide','ontology','opensource',
    'planet','poetry','photography','philosophy','physics','piano','pipeline','pyramid','python','puzzle',
    'quantum','quality','quartz','question','queue','query','quokka','quill','quote','quasar',
    'robot','rainforest','recipe','river','rocket','ruby','rust','router','roadmap','racing',
    'science','satellite','solar','security','server','stadium','storm','studio','sushi','synergy',
    'technology','theater','travel','telescope','tennis','topology','transistor','tornado','tutorial','typescript',
    'universe','umbrella','urban','ux','utopia','underwater','utilities','unicode','ukulele','uranium',
    'volcano','violin','vector','vintage','virtualization','vocabulary','voyage','voltage','vortex','vulnerability',
    'wildlife','weather','web','wireless','workout','workstation','workflow','wiki','wellbeing','wilderness',
    'xylophone','xenon','xylem','x86','xamarin','xenops','xigua','x-ray','xenolith','xbox',
    'yoga','yosemite','yacht','yogurt','youtuber','yosegi','yarn','yearbook','yellowstone','yield',
    'zoology','zebra','zeppelin','zen','zodiac','zigzag','zinc','zither','zucchini','zumba'
  ];

  // mở rộng: thêm danh sách địa danh/ngày/tháng để làm truy vấn tự nhiên hơn
  const PLACES = [
    'tokyo','paris','new york','london','singapore','sydney','berlin','hanoi','ho chi minh','bangkok',
    'osaka','kyoto','madrid','lisbon','vienna','zurich','seoul','taipei','hong kong','dubai',
    'sapa','dalat','danang','phu quoc','nha trang'
  ];
  const YEARS = Array.from({length: 26}, (_,i) => (2000 + i).toString()); // 2000..2025

  // Tạo 1000+ terms: adj + noun + (tùy chọn place/year để đa dạng)
  function buildTerms(target = 1050) {
    const combos = [];
    for (const adj of ADJ_AZ) {
      for (const n of NOUNS_CORE) {
        // xâu chuỗi tự nhiên; đôi khi thêm place hoặc year
        const usePlace = Math.random() < 0.35;
        const useYear  = !usePlace && Math.random() < 0.35;
        const extra = usePlace ? ' ' + PLACES[randInt(0, PLACES.length-1)]
                    : useYear  ? ' ' + YEARS[randInt(0, YEARS.length-1)]
                    : '';
        combos.push(`${adj} ${n}${extra}`.trim());
        if (combos.length >= target) break;
      }
      if (combos.length >= target) break;
    }
    // Bổ sung nếu thiếu (rất hiếm)
    while (combos.length < target) {
      combos.push(`random query ${combos.length + 1}`);
    }
    return combos;
  }

  // Tạo danh sách theo ngày, xáo trộn ổn định
  function getDailyTerms() {
    const day = todayKey();
    let savedDay = GM_getValue(K_DATE, '');
    let seed = GM_getValue(K_SHUFFLE, 0);

    if (savedDay !== day || !seed) {
      seed = Math.floor(Math.random() * 0xFFFFFFFF) >>> 0;
      GM_setValue(K_DATE, day);
      GM_setValue(K_SHUFFLE, seed);
      GM_setValue(K_INDEX, 0);
    }

    // tạo và shuffle với seed cố định trong ngày
    const rnd = seededRandom(seed);
    const terms = buildTerms(1050);
    shuffleInPlace(terms, rnd);
    return { day, terms };
  }

  // Phát hiện trang nghi ngờ/captcha
  function looksSuspicious() {
    const text = document.body ? document.body.innerText.toLowerCase() : '';
    return text.includes('verify you are a human')
        || text.includes('unusual traffic')
        || text.includes('complete the challenge')
        || text.includes('are you a robot')
        || text.includes('captcha');
  }

  // Điều hướng tìm kiếm
  function navigateToQuery(q) {
    const url = `https://www.bing.com/search?q=${encodeURIComponent(q)}`;
    window.location.replace(url);
  }

  // Menu điều khiển
  function registerMenu() {
    GM_registerMenuCommand('▶ Start', () => {
      GM_setValue(K_RUNNING, true);
      tick();
    });
    GM_registerMenuCommand('⏹ Stop', () => {
      GM_setValue(K_RUNNING, false);
      notify('Bing AutoSearch', 'Stopped.');
    });
    GM_registerMenuCommand('🔁 Reset Progress (today)', () => {
      GM_setValue(K_INDEX, 0);
      notify('Bing AutoSearch', 'Progress reset to 0 for today.');
    });
  }

  function notify(title, text) {
    try {
      GM_notification({ title, text, timeout: 3000 });
    } catch {
      console.log(`[${title}] ${text}`);
    }
  }

  // Vòng chạy chính
  function tick() {
    const running = !!GM_getValue(K_RUNNING, false);
    if (!running) return;

    // an toàn: dừng nếu thấy captcha/robot
    if (STOP_ON_SUSPECT && looksSuspicious()) {
      GM_setValue(K_RUNNING, false);
      notify('Bing AutoSearch', 'Stopped due to suspicious page (captcha/robot).');
      return;
    }

    const { day, terms } = getDailyTerms();
    let idx = +GM_getValue(K_INDEX, 0) || 0;

    // chuyển ngày -> đã reset trong getDailyTerms, nhưng đảm bảo:
    const savedDay = GM_getValue(K_DATE, '');
    if (savedDay !== day) {
      GM_setValue(K_INDEX, 0);
      idx = 0;
    }

    if (SESSION_CAP > 0 && idx >= SESSION_CAP) {
      GM_setValue(K_RUNNING, false);
      notify('Bing AutoSearch', `Reached session cap (${SESSION_CAP}).`);
      return;
    }

    if (idx >= terms.length) {
      GM_setValue(K_RUNNING, false);
      notify('Bing AutoSearch', 'Completed all daily terms (1000+).');
      return;
    }

    // Nếu đang ở trang kết quả, chuẩn bị nhảy tiếp; nếu ở homepage, bắt đầu
    const onResults = location.pathname.startsWith('/search');

    // đặt delay ngẫu nhiên
    const delay = randInt(MIN_DELAY, MAX_DELAY);

    if (onResults) {
      // tăng index sau khi đã hiển thị 1 kết quả
      setTimeout(() => {
        idx++;
        GM_setValue(K_INDEX, idx);
        if (idx < terms.length && (SESSION_CAP === 0 || idx < SESSION_CAP)) {
          navigateToQuery(terms[idx]);
        } else {
          GM_setValue(K_RUNNING, false);
          notify('Bing AutoSearch', 'Done.');
        }
      }, delay);
    } else {
      // trang chủ hoặc trang khác trên bing → bắt đầu/tiếp tục
      setTimeout(() => {
        if (idx < terms.length) {
          navigateToQuery(terms[idx]);
        }
      }, 1000);
    }
  }

  // Khởi tạo
  registerMenu();

  // Tự chạy nếu đang bật
  if (GM_getValue(K_RUNNING, false)) {
    tick();
  }

  // Chạy lại tick khi tab lấy lại focus (phòng kẹt)
  window.addEventListener('visibilitychange', () => {
    if (!document.hidden && GM_getValue(K_RUNNING, false)) {
      setTimeout(tick, 800);
    }
  });
})();
