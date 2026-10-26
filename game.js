(() => {
  "use strict";

  const MAX_DISTANCE = 300;
  const HAZARD_START = 100;
  const HAZARD_END = 150;
  const BUNKER_START = 195;
  const BUNKER_END = 226;
  const TEE_PCT = 0.132;
  const END_PCT = 0.91;

  const CROWN_SVG = `
    <svg class="crown" viewBox="0 0 38 28" aria-hidden="true">
      <path d="M4 23 2 7l8.5 6L19 3l8.5 10L36 7l-2 16Z" fill="#ffd34d" stroke="#4d2b0d" stroke-width="3" stroke-linejoin="round"/>
      <path d="M5 22h28v4H5z" fill="#ffb12e" stroke="#4d2b0d" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="19" cy="12" r="2.3" fill="#ff6b8a" stroke="#4d2b0d" stroke-width="1.2"/>
      <circle cx="9" cy="14" r="1.8" fill="#73e0ff" stroke="#4d2b0d" stroke-width="1"/>
      <circle cx="29" cy="14" r="1.8" fill="#73e0ff" stroke="#4d2b0d" stroke-width="1"/>
    </svg>`;

  const FEMALE_STYLES = [
    { accent: "#ff7fa8", accentDark: "#a73567", hair: "#4a2a1e", skin: "#ffd7a4", bow: "#ff5f96" },
    { accent: "#55c9a4", accentDark: "#2b7d63", hair: "#2f2438", skin: "#f2c08a", bow: "#ffd34d" },
    { accent: "#b48cff", accentDark: "#6a4ab5", hair: "#6b3f24", skin: "#ffd7a4", bow: "#ff86b0" },
    { accent: "#ffb347", accentDark: "#a35f1e", hair: "#1f2430", skin: "#c98a5a", bow: "#ff6b8a" },
  ];

  const MALE_STYLES = [
    { accent: "#4f9de0", accentDark: "#2b6796", hair: "#2a1e18", skin: "#ffd7a4", pants: "#2f3b5c" },
    { accent: "#5fbf6a", accentDark: "#2d713d", hair: "#4a2a1e", skin: "#f2c08a", pants: "#3a2b45" },
    { accent: "#ff9a4d", accentDark: "#a35f1e", hair: "#1f2430", skin: "#c98a5a", pants: "#2d3a4f" },
    { accent: "#8f7bdd", accentDark: "#4f3f96", hair: "#6b3f24", skin: "#ffd7a4", pants: "#2f3b5c" },
  ];

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[character];
    });
  }

  function humanMaleSprite(style, name) {
    return `
    <svg viewBox="0 0 120 130" role="img" aria-label="${escapeHtml(name)} 남자 골퍼">
      <ellipse cx="60" cy="125" rx="25" ry="4" fill="rgba(18, 35, 20, 0.28)" />
      <rect x="46" y="95" width="11" height="20" rx="5.5" fill="${style.pants}" stroke="#2a1a12" stroke-width="3.5"/>
      <rect x="63" y="95" width="11" height="20" rx="5.5" fill="${style.pants}" stroke="#2a1a12" stroke-width="3.5"/>
      <ellipse cx="48" cy="121" rx="12" ry="5.5" fill="#fffdf1" stroke="#2a1a12" stroke-width="3"/>
      <ellipse cx="72" cy="121" rx="12" ry="5.5" fill="#fffdf1" stroke="#2a1a12" stroke-width="3"/>
      <path d="M38 121h20M62 121h20" fill="none" stroke="${style.accent}" stroke-width="3" stroke-linecap="round"/>

      <path d="M43 84h34v12c0 3-2 5-5 5H48c-3 0-5-2-5-5Z" fill="${style.pants}" stroke="#2a1a12" stroke-width="4" stroke-linejoin="round"/>

      <path d="M42 67c0-7 5-11 12-12h12c7 1 12 5 12 12v17c0 5-3 7-7 7H49c-4 0-7-2-7-7Z" fill="${style.accent}" stroke="#2a1a12" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M52 56l8 7 8-7" fill="none" stroke="#fffdf1" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 56v25" fill="none" stroke="${style.accentDark}" stroke-width="2.6"/>
      <circle cx="60" cy="72" r="1.7" fill="#fffdf1"/>
      <circle cx="60" cy="79" r="1.7" fill="#fffdf1"/>

      <path d="M42 72c-6 1-9 6-8 12" fill="none" stroke="#2a1a12" stroke-width="9" stroke-linecap="round"/>
      <path d="M42 72c-6 1-9 6-8 12" fill="none" stroke="${style.skin}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="34" cy="88" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>

      <path d="M78 72c8 4 12 10 15 17" fill="none" stroke="#2a1a12" stroke-width="9" stroke-linecap="round"/>
      <path d="M78 72c8 4 12 10 15 17" fill="none" stroke="${style.skin}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="94" cy="91" r="5.5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <g class="club" style="transform-origin:94px 91px">
        <path d="M94 91 107 48" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M106 47c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m107 51 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>

      <circle cx="36" cy="43" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <circle cx="84" cy="43" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <circle cx="60" cy="41" r="24" fill="${style.skin}" stroke="#2a1a12" stroke-width="4.5"/>

      <path d="M36 39c1-14 10-23 24-23s23 9 24 23c-7-6-14-8-22-8-9 0-17 3-26 8Z" fill="${style.hair}" stroke="#2a1a12" stroke-width="4" stroke-linejoin="round"/>
      <path d="M34 34c1-13 11-21 26-21 16 0 26 8 27 21Z" fill="${style.accent}" stroke="#232323" stroke-width="4" stroke-linejoin="round"/>
      <path d="M87 32c9 0 15 3 15 6 0 3-6 5-15 5Z" fill="${style.accentDark}" stroke="#232323" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="60" cy="13" r="2.6" fill="#ffd34d" stroke="#232323" stroke-width="1.4"/>

      <path d="M45 42c3-2 6-2 9 0M66 42c3-2 6-2 9 0" fill="none" stroke="#2a1a12" stroke-width="2.4" stroke-linecap="round"/>
      <g class="eyes">
        <ellipse cx="50" cy="49" rx="3.2" ry="4.4" fill="#2a1a12"/>
        <ellipse cx="70" cy="49" rx="3.2" ry="4.4" fill="#2a1a12"/>
        <circle cx="51.2" cy="47.7" r="1.1" fill="#fff"/>
        <circle cx="71.2" cy="47.7" r="1.1" fill="#fff"/>
      </g>
      <circle cx="42" cy="56" r="3.4" fill="#ff8f8f" opacity=".45"/>
      <circle cx="78" cy="56" r="3.4" fill="#ff8f8f" opacity=".45"/>
      <path d="M56 57q4 3 8 0" fill="none" stroke="#2a1a12" stroke-width="2.4" stroke-linecap="round"/>
    </svg>`;
  }

  function humanFemaleSprite(style, name) {
    return `
    <svg viewBox="0 0 120 130" role="img" aria-label="${escapeHtml(name)} 여자 골퍼">
      <ellipse cx="60" cy="125" rx="25" ry="4" fill="rgba(18, 35, 20, 0.28)" />

      <path d="M34 40c-5 14-6 30-2 43 2 8 9 11 16 8l-3-51Z" fill="${style.hair}" stroke="#2a1a12" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M86 40c5 14 6 30 2 43-2 8-9 11-16 8l3-51Z" fill="${style.hair}" stroke="#2a1a12" stroke-width="3.5" stroke-linejoin="round"/>

      <rect x="46" y="95" width="11" height="20" rx="5.5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3.5"/>
      <rect x="63" y="95" width="11" height="20" rx="5.5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3.5"/>
      <ellipse cx="48" cy="121" rx="12" ry="5.5" fill="#fffdf1" stroke="#2a1a12" stroke-width="3"/>
      <ellipse cx="72" cy="121" rx="12" ry="5.5" fill="#fffdf1" stroke="#2a1a12" stroke-width="3"/>
      <path d="M38 121h20M62 121h20" fill="none" stroke="${style.accent}" stroke-width="3" stroke-linecap="round"/>

      <path d="M41 86h38l8 20c1 4-2 7-6 7H39c-4 0-7-3-6-7Z" fill="${style.accent}" stroke="#2a1a12" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M51 88v23M60 88v24M69 88v23" fill="none" stroke="${style.accentDark}" stroke-width="2.4" opacity=".6"/>

      <path d="M43 66c0-6 5-10 11-11h12c6 1 11 5 11 11v19c0 4-3 7-7 7H50c-4 0-7-3-7-7Z" fill="${style.accent}" stroke="#2a1a12" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M52 55l8 7 8-7" fill="none" stroke="#fffdf1" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 55v24" fill="none" stroke="${style.accentDark}" stroke-width="2.5"/>
      <circle cx="60" cy="71" r="1.6" fill="#fffdf1"/>
      <circle cx="60" cy="78" r="1.6" fill="#fffdf1"/>

      <path d="M43 71c-6 1-9 6-8 12" fill="none" stroke="#2a1a12" stroke-width="9" stroke-linecap="round"/>
      <path d="M43 71c-6 1-9 6-8 12" fill="none" stroke="${style.skin}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="35" cy="87" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>

      <path d="M77 71c8 4 12 10 15 17" fill="none" stroke="#2a1a12" stroke-width="9" stroke-linecap="round"/>
      <path d="M77 71c8 4 12 10 15 17" fill="none" stroke="${style.skin}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="94" cy="90" r="5.5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <g class="club" style="transform-origin:94px 90px">
        <path d="M94 90 107 47" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M106 46c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m107 50 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>

      <circle cx="36" cy="44" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <circle cx="84" cy="44" r="5" fill="${style.skin}" stroke="#2a1a12" stroke-width="3"/>
      <circle cx="60" cy="41" r="24" fill="${style.skin}" stroke="#2a1a12" stroke-width="4.5"/>

      <path d="M35 40c0-15 11-25 25-25s25 10 25 25c-4-3-8-8-10-13-4 7-9 11-14 12-3-4-4-8-4-8s-6 7-12 9c-3-7-7-10-10-9Z" fill="${style.hair}" stroke="#2a1a12" stroke-width="4" stroke-linejoin="round"/>

      <path d="M84 32c10 4 14 13 11 23-3 9-10 14-18 12" fill="none" stroke="#2a1a12" stroke-width="12" stroke-linecap="round"/>
      <path d="M84 32c10 4 14 13 11 23-3 9-10 14-18 12" fill="none" stroke="${style.hair}" stroke-width="7" stroke-linecap="round"/>

      <g transform="translate(87 31) rotate(18)">
        <path d="M-1 1c-8-6-15-2-14 6 1 8 10 9 16 3Z" fill="${style.bow}" stroke="#5a2346" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M1 1c8-6 15-2 14 6-1 8-10 9-16 3Z" fill="${style.bow}" stroke="#5a2346" stroke-width="2.4" stroke-linejoin="round"/>
        <circle cx="0" cy="5" r="3" fill="#ffd34d" stroke="#5a2346" stroke-width="1.6"/>
      </g>

      <path d="M46 42c3-2 6-2 9 0M65 42c3-2 6-2 9 0" fill="none" stroke="#2a1a12" stroke-width="2.4" stroke-linecap="round"/>
      <g class="eyes">
        <ellipse cx="50" cy="49" rx="3.6" ry="4.8" fill="#2a1a12"/>
        <ellipse cx="70" cy="49" rx="3.6" ry="4.8" fill="#2a1a12"/>
        <circle cx="51.2" cy="47.6" r="1.15" fill="#fff"/>
        <circle cx="71.2" cy="47.6" r="1.15" fill="#fff"/>
      </g>
      <path d="M44 45l-4-2M76 45l4-2" fill="none" stroke="#2a1a12" stroke-width="2" stroke-linecap="round"/>
      <circle cx="42" cy="57" r="3.6" fill="#ff8f8f" opacity=".5"/>
      <circle cx="78" cy="57" r="3.6" fill="#ff8f8f" opacity=".5"/>
      <path d="M56 57q4 2 8 0" fill="none" stroke="#c25b7c" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M57 60q3 2 6 0" fill="none" stroke="#c25b7c" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>
    </svg>`;
  }

  function createGolfer(gender, index, name) {
    const styles = gender === "male" ? MALE_STYLES : FEMALE_STYLES;
    const style = styles[index % styles.length];
    const safeName = String(name || "").trim() || `골퍼 ${index + 1}`;

    return {
      id: `golfer-${index + 1}`,
      name: safeName,
      accent: style.accent,
      accentDark: style.accentDark,
      svg:
        gender === "male"
          ? humanMaleSprite(style, safeName)
          : humanFemaleSprite(style, safeName),
    };
  }

  function getRoster(gender, count, names) {
    return Array.from({ length: count }, (_, index) =>
      createGolfer(gender, index, names[index]),
    );
  }

  const gameFrame = document.getElementById("gameFrame");
  const course = document.getElementById("course");
  const laneZone = document.getElementById("laneZone");
  const tapHint = document.getElementById("tapHint");
  const message = document.getElementById("message");
  const replayBtn = document.getElementById("replayBtn");
  const setupBtn = document.getElementById("setupBtn");
  const setup = document.getElementById("setup");
  const startBtn = document.getElementById("startBtn");
  const playerList = document.getElementById("playerList");
  const genderBtns = Array.from(document.querySelectorAll(".gender-btn"));
  const countBtns = Array.from(document.querySelectorAll(".count-btn"));
  const soundBtn = document.getElementById("soundBtn");
  const soundLabel = document.getElementById("soundLabel");
  const luckFlash = document.getElementById("luckFlash");
  const confettiLayer = document.getElementById("confettiLayer");

  const params = new URLSearchParams(window.location.search);
  const demoMode = params.has("demo");

  let lanes = [];
  let state = "setup";
  let results = [];
  let audioCtx = null;
  let muted = false;
  let selectedGender = "female";
  let playerCount = 4;
  let playerNames = ["골퍼 1", "골퍼 2", "골퍼 3", "골퍼 4"];

  if (params.get("gender") === "male") selectedGender = "male";
  const countParam = Number(params.get("players"));
  if (countParam >= 2 && countParam <= 4) playerCount = countParam;

  let activeCharacters = getRoster(selectedGender, playerCount, playerNames);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeShot() {
    const luck = Math.random();
    let distance;
    let hazard = null;

    if (luck < 0.16) {
      distance = randomInt(HAZARD_START + 3, HAZARD_END - 4);
      hazard = "water";
    } else if (luck < 0.29) {
      distance = randomInt(BUNKER_START + 3, BUNKER_END - 3);
      hazard = "bunker";
    } else {
      do {
        distance = randomInt(54, 295);
      } while (
        (distance >= HAZARD_START && distance <= HAZARD_END) ||
        (distance >= BUNKER_START && distance <= BUNKER_END)
      );
    }

    return {
      distance,
      hazard,
      isForcedHazard: hazard !== null,
    };
  }

  function distanceFraction(distance) {
    return (
      TEE_PCT +
      (Math.min(distance, MAX_DISTANCE) / MAX_DISTANCE) * (END_PCT - TEE_PCT)
    );
  }

  function laneMarkup(character, index) {
    const bunkerA = 23 + (index % 2) * 4;
    const bunkerB = 76 + index * 3;
    const flowerA = 59 + index * 2;
    const flowerB = 84 - index * 2;
    const bobDelay = -(index * 0.58).toFixed(2);
    const eyeDelay = (index * 0.73).toFixed(2);

    return `
      <div class="lane" data-char="${character.id}" style="--accent:${character.accent};--accent-dark:${character.accentDark};--bob-delay:${bobDelay}s;--eye-delay:${eyeDelay}s">
        <div class="tee-box" aria-hidden="true"></div>
        <span class="bunker bunker-a" style="left:${bunkerA}%" aria-hidden="true"></span>
        <span class="bunker bunker-b" style="left:${bunkerB}%" aria-hidden="true"></span>
        <span class="flower" style="left:${flowerA}%;bottom:16%" aria-hidden="true"></span>
        <span class="flower" style="left:${flowerB}%;bottom:10%" aria-hidden="true"></span>
        <span class="lane-label" aria-hidden="true">TEE</span>
        <div class="green-flag" aria-hidden="true">
          <span class="hole"></span>
          <span class="flag-pole"></span>
          <span class="flag-cloth"></span>
        </div>
        <div class="char-stack">
          <div class="char-name">${escapeHtml(character.name)}</div>
          <div class="char-sprite">${character.svg}</div>
          <div class="char-distance"><span class="distance-value">---</span><em>m</em></div>
          ${CROWN_SVG}
        </div>
        <div class="ball" aria-hidden="true"></div>
        <div class="shot-tag" aria-hidden="true"></div>
      </div>`;
  }

  function buildLanes() {
    laneZone.innerHTML = activeCharacters.map(laneMarkup).join("");
    lanes = Array.from(laneZone.querySelectorAll(".lane"));
  }

  function updatePlayerList() {
    activeCharacters = getRoster(selectedGender, playerCount, playerNames);
    playerList.innerHTML = activeCharacters
      .map(
        (character, index) => `
      <label class="player-chip" style="--accent:${character.accent}">
        <span class="player-sprite">${character.svg}</span>
        <input class="player-name" type="text" maxlength="10" value="${escapeHtml(playerNames[index])}" placeholder="이름 입력" data-index="${index}" aria-label="${index + 1}번 플레이어 이름" />
      </label>`,
      )
      .join("");
  }

  function syncSetupControls() {
    genderBtns.forEach((button) => {
      const active = button.dataset.gender === selectedGender;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", String(active));
    });

    countBtns.forEach((button) => {
      const active = Number(button.dataset.count) === playerCount;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", String(active));
    });
  }

  function openSetup() {
    state = "setup";
    results = [];
    lanes = [];
    laneZone.innerHTML = "";
    setup.hidden = false;
    tapHint.classList.add("is-hidden");
    replayBtn.hidden = true;
    setupBtn.hidden = true;
    confettiLayer.innerHTML = "";
    luckFlash.classList.remove("is-on");
    course.classList.remove("shake");
    message.classList.remove("is-win");
    message.textContent = "성별, 인원, 이름을 선택하세요!";
    syncSetupControls();
    updatePlayerList();
  }

  function startRound() {
    state = "idle";
    setup.hidden = true;
    activeCharacters = getRoster(selectedGender, playerCount, playerNames);
    buildLanes();
    tapHint.classList.remove("is-hidden");
    message.classList.remove("is-win");
    message.textContent = `${playerCount}명이 동시에 샷!`;
    replayBtn.hidden = true;
    setupBtn.hidden = true;
    confettiLayer.innerHTML = "";
    luckFlash.classList.remove("is-on");
    course.classList.remove("shake");
    startBtn.blur();
  }

  function resetGame() {
    state = "idle";
    results = [];
    buildLanes();
    tapHint.classList.remove("is-hidden");
    message.textContent = `${playerCount}명이 동시에 샷!`;
    message.classList.remove("is-win");
    replayBtn.hidden = true;
    setupBtn.hidden = true;
    confettiLayer.innerHTML = "";
    luckFlash.classList.remove("is-on");
    course.classList.remove("shake");
    soundBtn.blur();
    replayBtn.blur();
    setupBtn.blur();
  }

  function startGame() {
    if (state !== "idle") return;

    state = "shooting";
    results = [];
    tapHint.classList.add("is-hidden");
    replayBtn.hidden = true;
    setupBtn.hidden = true;
    message.classList.remove("is-win");
    message.textContent = "운명의 드라이버 샷!";
    playSwing();
    flashLuck();
    replayBtn.blur();

    course.classList.remove("shake");
    void course.offsetWidth;
    course.classList.add("shake");
    window.setTimeout(() => course.classList.remove("shake"), 300);

    const shots = activeCharacters.map((character) => ({
      char: character,
      ...makeShot(),
    }));
    results = shots;

    lanes.forEach((lane, index) => {
      const stack = lane.querySelector(".char-stack");
      stack.classList.add("is-swinging");
      window.setTimeout(() => stack.classList.remove("is-swinging"), 700);

      if (index === 1) {
        playSwingCrack();
      }
    });

    window.setTimeout(() => {
      if (state !== "shooting") return;
      message.textContent = "공이 어디로 날아갈까?!";
      playLaunch();

      const flights = shots.map((shot, index) =>
        launchShot(lanes[index], shot),
      );

      Promise.all(flights).then(() => {
        if (state === "shooting") finalize(shots);
      });
    }, 250);
  }

  function launchShot(lane, shot) {
    return new Promise((resolve) => {
      const ball = lane.querySelector(".ball");
      const tag = lane.querySelector(".shot-tag");
      const stack = lane.querySelector(".char-stack");
      const distanceEl = lane.querySelector(".char-distance");
      const distanceValue = lane.querySelector(".distance-value");

      const laneWidth = lane.clientWidth;
      const laneHeight = lane.clientHeight;
      const startX = laneWidth * TEE_PCT;
      const endX = laneWidth * distanceFraction(shot.distance);
      const startY = laneHeight * 0.6;
      const endY = laneHeight * 0.63;
      const arcHeight = laneHeight * (0.24 + (shot.distance / MAX_DISTANCE) * 0.12) + 7;
      const duration = 1080 + shot.distance * 2.5 + Math.random() * 180;

      ball.style.left = `${startX}px`;
      ball.style.top = `${startY}px`;
      ball.classList.add("is-live");
      tag.classList.add("is-visible");

      const started = performance.now();
      let lastTrailAt = 0;

      function frame(now) {
        const elapsed = now - started;
        const t = Math.min(elapsed / duration, 1);
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t - Math.sin(Math.PI * t) * arcHeight;

        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
        tag.style.left = `${x}px`;
        tag.style.top = `${y}px`;
        tag.textContent = `${Math.round(shot.distance * t)}m`;

        if (t > 0.035 && t < 0.94 && now - lastTrailAt > 42) {
          lastTrailAt = now;
          makeTrailDot(lane, x, y);
        }

        if (t < 1) {
          window.requestAnimationFrame(frame);
          return;
        }

        ball.style.left = `${endX}px`;
        ball.style.top = `${endY}px`;
        tag.style.left = `${endX}px`;
        tag.style.top = `${endY}px`;
        tag.textContent = `${shot.distance}m`;

        if (shot.hazard === "water") {
          tag.classList.add("is-hazard");
          ball.classList.add("is-sunk");
          stack.classList.add("is-hazard", "is-water");
          distanceEl.classList.add("is-hazard", "is-water");
          makeSplash(lane, endX, endY);
          playSplash();
        } else if (shot.hazard === "bunker") {
          tag.classList.add("is-bunker");
          ball.classList.add("is-buried");
          stack.classList.add("is-hazard", "is-bunker");
          distanceEl.classList.add("is-hazard", "is-bunker");
          makeBunkerBurst(lane, endX, endY);
          playBunker();
        } else {
          ball.classList.add("is-resting");
          makeLandingPuff(lane, endX, endY);
          playLand(shot.distance);
        }

        animateDistance(distanceValue, shot.distance);

        window.setTimeout(() => {
          resolve();
        }, 600);
      }

      window.requestAnimationFrame(frame);
    });
  }

  function animateDistance(element, target) {
    const duration = 520;
    const started = performance.now();

    function frame(now) {
      const t = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(target * eased);
      element.textContent = String(value).padStart(3, "0");

      if (t < 1) {
        window.requestAnimationFrame(frame);
      } else {
        element.textContent = String(target).padStart(3, "0");
      }
    }

    window.requestAnimationFrame(frame);
  }

  function makeTrailDot(lane, x, y) {
    const dot = document.createElement("span");
    dot.className = "trail-dot";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    lane.appendChild(dot);
    window.setTimeout(() => dot.remove(), 500);
  }

  function makeSplash(lane, x, y) {
    const splash = document.createElement("span");
    splash.className = "splash";
    splash.style.left = `${x}px`;
    splash.style.top = `${y}px`;
    lane.appendChild(splash);

    const text = document.createElement("span");
    text.className = "splash-text";
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
    text.textContent = "첨벙!";
    lane.appendChild(text);

    window.setTimeout(() => {
      splash.remove();
      text.remove();
    }, 1150);
  }

  function makeBunkerBurst(lane, x, y) {
    const text = document.createElement("span");
    text.className = "splash-text is-bunker";
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
    text.textContent = "벙커!";
    lane.appendChild(text);

    for (let i = 0; i < 9; i += 1) {
      const sand = document.createElement("span");
      sand.className = "sand-puff";
      sand.style.left = `${x + randomInt(-11, 11)}px`;
      sand.style.top = `${y + randomInt(-8, 4)}px`;
      sand.style.setProperty("--sand-x", `${randomInt(-22, 22)}px`);
      sand.style.setProperty("--sand-y", `${randomInt(10, 28)}px`);
      sand.style.animationDelay = `${i * 16}ms`;
      lane.appendChild(sand);
      window.setTimeout(() => sand.remove(), 720);
    }

    const mound = document.createElement("span");
    mound.className = "bunker-mound";
    mound.style.left = `${x}px`;
    mound.style.top = `${y + 4}px`;
    lane.appendChild(mound);
    window.setTimeout(() => mound.remove(), 1300);

    window.setTimeout(() => text.remove(), 1150);
  }

  function makeLandingPuff(lane, x, y) {
    for (let i = 0; i < 5; i += 1) {
      const puff = document.createElement("span");
      puff.className = "land-puff";
      puff.style.left = `${x + randomInt(-8, 8)}px`;
      puff.style.top = `${y + randomInt(-4, 5)}px`;
      puff.style.animationDelay = `${i * 18}ms`;
      lane.appendChild(puff);
      window.setTimeout(() => puff.remove(), 650);
    }
  }

  function finalize(shots) {
    state = "result";
    message.classList.remove("is-win");

    const qualified = shots.filter((shot) => !shot.hazard);

    if (qualified.length === 0) {
      message.textContent = "전원 함정행! 이번 라운드는 무승부...";
      playLose();
    } else {
      const best = Math.max(...qualified.map((shot) => shot.distance));
      const winners = qualified.filter((shot) => shot.distance === best);
      const winnerNames = winners.map((shot) => shot.char.name).join(" · ");

      if (winners.length > 1) {
        message.textContent = `공동 우승! ${winnerNames} · ${best}m`;
      } else {
        message.textContent = `우승! ${winnerNames} · ${best}m`;
      }

      message.classList.add("is-win");
      winners.forEach((winner) => {
        const lane = lanes[shots.indexOf(winner)];
        if (!lane) return;
        lane.classList.add("winner");
        lane.querySelector(".char-stack").classList.add("is-winner");
      });

      playWin();
      spawnConfetti();
    }

    replayBtn.hidden = false;
    setupBtn.hidden = false;
    window.setTimeout(() => replayBtn.focus({ preventScroll: true }), 160);
  }

  function spawnConfetti() {
    confettiLayer.innerHTML = "";
    const colors = ["#ffd34d", "#ff8b3d", "#ff76a9", "#70e5cf", "#8ed6ff", "#fff8dc"];

    for (let i = 0; i < 43; i += 1) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${randomInt(1, 99)}%`;
      piece.style.setProperty("--confetti-color", colors[i % colors.length]);
      piece.style.setProperty("--confetti-drift", `${randomInt(-70, 70)}px`);
      piece.style.setProperty("--confetti-duration", `${1.8 + Math.random() * 1.6}s`);
      piece.style.setProperty("--confetti-delay", `${Math.random() * 0.7}s`);
      confettiLayer.appendChild(piece);
    }

    window.setTimeout(() => {
      if (state === "result") confettiLayer.innerHTML = "";
    }, 4300);
  }

  function flashLuck() {
    luckFlash.classList.remove("is-on");
    void luckFlash.offsetWidth;
    luckFlash.classList.add("is-on");
  }

  function ensureAudio() {
    if (audioCtx) {
      if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {});
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      audioCtx = new AudioContextClass();
    } catch {
      audioCtx = null;
    }
  }

  function tone({ freq, to, duration = 0.12, type = "square", volume = 0.035, delay = 0 }) {
    if (muted) return;
    ensureAudio();
    if (!audioCtx) return;

    const start = audioCtx.currentTime + delay;
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);
    if (to) oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, to), start + duration);

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function noiseBurst({ duration = 0.24, volume = 0.045, cutoff = 1200, delay = 0 }) {
    if (muted) return;
    ensureAudio();
    if (!audioCtx) return;

    const sampleRate = audioCtx.sampleRate;
    const frameCount = Math.max(1, Math.floor(sampleRate * duration));
    const buffer = audioCtx.createBuffer(1, frameCount, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < frameCount; i += 1) {
      const fade = 1 - i / frameCount;
      data[i] = (Math.random() * 2 - 1) * fade;
    }

    const source = audioCtx.createBufferSource();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();
    const start = audioCtx.currentTime + delay;

    source.buffer = buffer;
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(cutoff, start);
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    source.start(start);
  }

  function playSwing() {
    tone({ freq: 190, to: 80, duration: 0.2, type: "sawtooth", volume: 0.025 });
    noiseBurst({ duration: 0.18, volume: 0.018, cutoff: 850 });
  }

  function playSwingCrack() {
    tone({ freq: 520, to: 180, duration: 0.08, type: "square", volume: 0.018, delay: 0.08 });
  }

  function playLaunch() {
    tone({ freq: 740, to: 980, duration: 0.09, type: "square", volume: 0.026 });
    tone({ freq: 980, to: 1310, duration: 0.08, type: "square", volume: 0.02, delay: 0.08 });
  }

  function playLand(distance) {
    const base = 120 + (distance / MAX_DISTANCE) * 80;
    tone({ freq: base, to: base * 0.65, duration: 0.08, type: "triangle", volume: 0.022 });
  }

  function playSplash() {
    noiseBurst({ duration: 0.38, volume: 0.055, cutoff: 1500 });
    tone({ freq: 420, to: 90, duration: 0.28, type: "sine", volume: 0.03 });
  }

  function playBunker() {
    noiseBurst({ duration: 0.25, volume: 0.045, cutoff: 620 });
    tone({ freq: 150, to: 62, duration: 0.2, type: "triangle", volume: 0.035 });
    tone({ freq: 92, to: 54, duration: 0.18, type: "sine", volume: 0.025, delay: 0.05 });
  }

  function playWin() {
    const notes = [523, 659, 784, 1046];
    notes.forEach((freq, index) => {
      tone({
        freq,
        duration: index === notes.length - 1 ? 0.3 : 0.12,
        type: "square",
        volume: 0.03,
        delay: index * 0.11,
      });
    });
    tone({ freq: 1568, duration: 0.22, type: "triangle", volume: 0.018, delay: 0.45 });
  }

  function playLose() {
    [330, 294, 247, 196].forEach((freq, index) => {
      tone({
        freq,
        duration: 0.14,
        type: "triangle",
        volume: 0.026,
        delay: index * 0.14,
      });
    });
  }

  function playBlip() {
    tone({ freq: 880, to: 1180, duration: 0.07, type: "square", volume: 0.02 });
  }

  function toggleSound() {
    muted = !muted;
    soundBtn.classList.toggle("is-muted", muted);
    soundBtn.setAttribute("aria-pressed", String(muted));
    soundBtn.setAttribute("aria-label", muted ? "효과음 켜기" : "효과음 끄기");
    soundLabel.textContent = muted ? "SFX OFF" : "SFX ON";

    if (!muted) {
      ensureAudio();
      playBlip();
    }
  }

  gameFrame.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    if (state === "idle") startGame();
  });

  soundBtn.addEventListener("click", toggleSound);
  replayBtn.addEventListener("click", resetGame);
  setupBtn.addEventListener("click", () => {
    ensureAudio();
    playBlip();
    openSetup();
  });

  genderBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (state !== "setup" || button.dataset.gender === selectedGender) return;
      selectedGender = button.dataset.gender;
      genderBtns.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-checked", String(active));
      });
      ensureAudio();
      playBlip();
      updatePlayerList();
    });
  });

  countBtns.forEach((button) => {
    button.addEventListener("click", () => {
      const count = Number(button.dataset.count);
      if (state !== "setup" || count === playerCount) return;
      playerCount = count;
      countBtns.forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-checked", String(active));
      });
      ensureAudio();
      playBlip();
      updatePlayerList();
    });
  });

  playerList.addEventListener("input", (event) => {
    const input = event.target.closest(".player-name");
    if (!input) return;
    const index = Number(input.dataset.index);
    playerNames[index] = input.value;
  });

  startBtn.addEventListener("click", () => {
    ensureAudio();
    playBlip();
    startRound();
  });

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.target.closest("button")) return;
    if (event.target.matches("input, textarea")) return;

    if ((event.code === "Space" || event.code === "Enter") && state === "idle") {
      event.preventDefault();
      startGame();
    } else if (event.code === "KeyR" && state === "result") {
      event.preventDefault();
      resetGame();
    }
  });

  openSetup();

  if (demoMode) {
    window.setTimeout(() => {
      startRound();
      window.setTimeout(() => {
        if (state === "idle") startGame();
      }, 300);
    }, 400);
  }
})();
