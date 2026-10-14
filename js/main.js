(function () {
  "use strict";
  var C = window.SPECIYAL;
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Nama tamu dari ?to= ---------- */
  var params = new URLSearchParams(location.search);
  var guest = params.get("to");
  if (guest) $("guestName").textContent = guest.trim().slice(0, 80);

  /* ---------- Isi konten dari config ---------- */
  var H = C.honoree, E = C.event;
  $("tagline").innerHTML = C.tagline.map(esc).join("<br>");
  $("heroDate").textContent = E.dateLabel.toUpperCase();
  $("honoreePhoto").src = H.photo;
  $("honoreeName").textContent = H.name;
  $("honoreeNick").textContent = "“" + H.nickname + "”";
  $("honoreePos").textContent = H.position;
  $("birth").textContent = H.birth;
  $("retire").textContent = H.retire;
  $("quote").textContent = H.quote;
  $("bio").innerHTML = H.bio.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  $("facts").innerHTML = H.facts.map(function (f) {
    return "<div><b>" + esc(f.value) + "</b><span>" + esc(f.label) + "</span></div>";
  }).join("");

  $("timeline").innerHTML = C.journey.map(function (j) {
    return '<li class="reveal"><div class="tl-card"><span class="tl-year">' + esc(j.year) +
      '</span><p class="tl-place">' + esc(j.place) + '</p><p class="tl-desc">' + esc(j.desc) + "</p></div></li>";
  }).join("");

  $("eventName").textContent = E.name;
  $("evDay").textContent = E.dayLabel;
  $("evDate").textContent = E.dateLabel;
  $("evTime").textContent = E.timeLabel;
  $("evVenue").textContent = E.venue;
  $("evAddr").textContent = E.address;
  $("evDress").textContent = E.dressCode;
  $("mapFrame").src = "https://maps.google.com/maps?q=" + encodeURIComponent(E.mapsQuery) + "&z=16&output=embed";
  $("mapBtn").href = E.mapsLink || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(E.mapsQuery));

  $("rundownList").innerHTML = C.rundown.map(function (r) {
    return '<div class="rd-item reveal"><div class="rd-time">' + esc(r.time) + '</div><div><p class="rd-title">' +
      esc(r.title) + '</p><p class="rd-desc">' + esc(r.desc) + "</p></div></div>";
  }).join("");

  $("gallery").innerHTML = C.gallery.map(function (g) {
    return '<figure class="reveal"><img loading="lazy" src="' + esc(g.src) + '" alt="' + esc(g.caption) +
      '"><figcaption>' + esc(g.caption) + "</figcaption></figure>";
  }).join("");

  $("closing").textContent = C.closing;
  $("office").textContent = C.office;

  /* ---------- Kalender ---------- */
  var gcal = function (iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
  $("calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(E.name + " — " + H.nickname) +
    "&dates=" + gcal(E.start) + "/" + gcal(E.end) +
    "&location=" + encodeURIComponent(E.venue + ", " + E.address) +
    "&details=" + encodeURIComponent("Speciyal Journey · " + location.href.split("?")[0]);

  /* ---------- Hitung mundur ---------- */
  var target = new Date(E.start).getTime();
  var DAY = 864e5, WIB = 7 * 36e5;
  function tick() {
    var now = Date.now(), diff = Math.max(0, target - now);
    $("cdD").textContent = Math.floor(diff / DAY);
    $("cdH").textContent = Math.floor(diff / 36e5) % 24;
    $("cdM").textContent = Math.floor(diff / 6e4) % 60;
    $("cdS").textContent = Math.floor(diff / 1e3) % 60;
    // H-n dihitung per tanggal kalender WIB
    var hDays = Math.floor((target + WIB) / DAY) - Math.floor((now + WIB) / DAY);
    $("hCount").textContent = hDays > 0 ? "H-" + hDays : hDays === 0 ? "HARI-H" : "TERIMA KASIH";
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Musik ---------- */
  var audio = $("bgm"), btn = $("musicBtn"), playing = false, synth = null;

  // Melodi kotak musik bawaan (dipakai jika file lagu belum tersedia)
  function MusicBox() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    var ctx = new Ctx(), master = ctx.createGain(), timer = null, step = 0, next = 0;
    master.gain.value = 0.18; master.connect(ctx.destination);
    var hz = function (m) { return 440 * Math.pow(2, (m - 69) / 12); };
    // Progresi I–vi–IV–V di C mayor, arpeggio lembut
    var chords = [[60, 64, 67, 72], [57, 60, 64, 69], [53, 57, 60, 65], [55, 59, 62, 67]];
    var melody = [76, 74, 72, 74, 76, 76, 76, null, 74, 74, 74, null, 76, 79, 79, null,
                  76, 74, 72, 74, 76, 76, 76, 76, 74, 74, 76, 74, 72, null, null, null];
    var beat = 0.42;
    function note(m, t, len, vol, type) {
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type; o.frequency.value = hz(m);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + len + 0.05);
    }
    function schedule() {
      while (next < ctx.currentTime + 0.6) {
        var chord = chords[Math.floor(step / 8) % 4];
        note(chord[step % 4] - 12, next, beat * 2.2, 0.22, "sine");
        if (step % 8 === 0) note(chord[0] - 24, next, beat * 7, 0.3, "sine");
        var m = melody[step % melody.length];
        if (m) note(m, next, beat * 2.5, 0.25, "triangle");
        next += beat; step++;
      }
    }
    return {
      play: function () { ctx.resume(); next = ctx.currentTime + 0.1; schedule(); timer = setInterval(schedule, 150); },
      pause: function () { clearInterval(timer); ctx.suspend(); },
    };
  }

  function setState(on) {
    playing = on;
    btn.classList.toggle("playing", on);
    btn.classList.toggle("paused", !on);
  }
  function useSynth() {
    if (synth && playing) return;
    if (!synth) { try { synth = MusicBox(); } catch (e) { return; } }
    synth.play(); setState(true);
  }
  function startMusic() {
    if (synth) return useSynth();
    if (!C.music) return useSynth();
    audio.src = C.music;
    var p = audio.play();
    if (p && p.then) p.then(function () { setState(true); }, useSynth);
    else setState(true);
  }
  audio.addEventListener("error", function () { if (!synth) useSynth(); });
  btn.addEventListener("click", function () {
    if (playing) { synth ? synth.pause() : audio.pause(); setState(false); }
    else if (synth) { synth.play(); setState(true); }
    else { audio.play().then(function () { setState(true); }, useSynth); }
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden && playing) { synth ? synth.pause() : audio.pause(); setState(false); }
  });

  /* ---------- Buka leaflet ---------- */
  $("openBtn").addEventListener("click", function () {
    $("cover").classList.add("opened");
    document.body.classList.remove("locked");
    $("main").setAttribute("aria-hidden", "false");
    $("bottomNav").classList.add("show");
    btn.classList.add("show");
    startMusic();
    window.scrollTo(0, 0);
  });

  /* ---------- Animasi muncul saat scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Navigasi aktif ---------- */
  var links = document.querySelectorAll(".bottom-nav a");
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "profil", "journey", "acara", "rundown"].forEach(function (id) { spy.observe($(id)); });

  /* ---------- Lightbox galeri ---------- */
  var lb = $("lightbox");
  $("gallery").addEventListener("click", function (e) {
    var fig = e.target.closest("figure"); if (!fig) return;
    var img = fig.querySelector("img");
    lb.querySelector("img").src = img.src;
    lb.querySelector("p").textContent = img.alt;
    lb.hidden = false;
  });
  lb.addEventListener("click", function () { lb.hidden = true; });
})();
