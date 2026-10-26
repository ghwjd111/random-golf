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

  const GIRAFFE_SVG = `
    <svg viewBox="0 0 120 130" role="img" aria-label="기린 캐릭터">
      <path d="M34 95C25 93 21 99 21 106" fill="none" stroke="#3a2415" stroke-width="5" stroke-linecap="round"/>
      <path d="M21 106l-2 7M21 106l7 3" fill="none" stroke="#3a2415" stroke-width="3" stroke-linecap="round"/>
      <rect x="35" y="104" width="10" height="21" rx="5" fill="#ffd05e" stroke="#3a2415" stroke-width="4.5"/>
      <rect x="53" y="105" width="10" height="20" rx="5" fill="#ffd05e" stroke="#3a2415" stroke-width="4.5"/>
      <path d="M36 122h12M55 122h10" fill="none" stroke="#6f4121" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="48" cy="93" rx="24" ry="21" fill="#ffd05e" stroke="#3a2415" stroke-width="5"/>
      <path d="M52 86c3-22 11-41 20-52l17 5c-8 13-13 35-17 57Z" fill="#ffd05e" stroke="#3a2415" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="65" cy="70" rx="5.2" ry="7" transform="rotate(-24 65 70)" fill="#f59a3d"/>
      <ellipse cx="58" cy="82" rx="4.2" ry="5.7" transform="rotate(-24 58 82)" fill="#f59a3d"/>
      <ellipse cx="74" cy="54" rx="4.7" ry="6.2" transform="rotate(-24 74 54)" fill="#f59a3d"/>
      <path d="M73 35C68 23 77 12 89 13c10 1 16 8 15 17 0 8-6 13-15 12l-12-1Z" fill="#ffd05e" stroke="#3a2415" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="69" cy="19" rx="8" ry="4.5" transform="rotate(-34 69 19)" fill="#ffd05e" stroke="#3a2415" stroke-width="3.5"/>
      <ellipse cx="99" cy="20" rx="8" ry="4.5" transform="rotate(26 99 20)" fill="#ffd05e" stroke="#3a2415" stroke-width="3.5"/>
      <path d="M80 13V5M90 12l1-7" fill="none" stroke="#3a2415" stroke-width="4" stroke-linecap="round"/>
      <circle cx="80" cy="4" r="3.4" fill="#f59a3d" stroke="#3a2415" stroke-width="2.5"/>
      <circle cx="91" cy="4" r="3.4" fill="#f59a3d" stroke="#3a2415" stroke-width="2.5"/>
      <ellipse cx="101" cy="35" rx="10" ry="8" fill="#ffe9ae" stroke="#3a2415" stroke-width="4"/>
      <circle cx="104" cy="33" r="1.3" fill="#3a2415"/>
      <path d="M98 39q4 2 7-1" fill="none" stroke="#3a2415" stroke-width="2" stroke-linecap="round"/>
      <g class="eyes">
        <circle cx="89" cy="25" r="2.8" fill="#24160f"/>
        <circle cx="89.9" cy="24.1" r="0.9" fill="#fff"/>
      </g>
      <circle cx="84" cy="33" r="4" fill="#ff9b9b" opacity=".62"/>
      <path d="M57 82q7 2 12 8" fill="none" stroke="#3a2415" stroke-width="9" stroke-linecap="round"/>
      <path d="M57 82q7 2 12 8" fill="none" stroke="#ffd05e" stroke-width="4" stroke-linecap="round"/>
      <circle cx="71" cy="89" r="5.5" fill="#ffd05e" stroke="#3a2415" stroke-width="3"/>
      <g class="club" style="transform-origin:71px 89px">
        <path d="M71 89 99 49" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M98 48c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m99 52 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;

  const RYUNG_SVG = `
    <svg viewBox="0 0 120 130" role="img" aria-label="륭 캐릭터">
      <path d="M35 101C21 106 14 97 20 90" fill="none" stroke="#5a2346" stroke-width="12" stroke-linecap="round"/>
      <path d="M35 101C21 106 14 97 20 90" fill="none" stroke="#ff9ecb" stroke-width="7" stroke-linecap="round"/>
      <path d="M17 93l-6-4 2 9" fill="#ffd05e" stroke="#5a2346" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M38 77C24 63 12 68 15 83c-7 0-2 14 11 14 5-6 8-13 12-20Z" fill="#ffc7df" stroke="#5a2346" stroke-width="4" stroke-linejoin="round"/>
      <path d="M24 80c4 1 7 3 9 6" fill="none" stroke="#e982af" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="39" y="111" width="14" height="12" rx="6" fill="#ff9ecb" stroke="#5a2346" stroke-width="4.5"/>
      <rect x="62" y="111" width="14" height="12" rx="6" fill="#ff9ecb" stroke="#5a2346" stroke-width="4.5"/>
      <path d="M39 123h15M62 123h15" fill="none" stroke="#b84c7c" stroke-width="4" stroke-linecap="round"/>
      <ellipse cx="56" cy="94" rx="26" ry="22" fill="#ff9ecb" stroke="#5a2346" stroke-width="5"/>
      <ellipse cx="59" cy="100" rx="14" ry="13" fill="#ffe8b7" stroke="#d77e9f" stroke-width="2.5"/>
      <path d="M34 83l-9-2 6 9ZM30 94l-8 2 7 5Z" fill="#ffd05e" stroke="#5a2346" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M65 55c-4-15 6-26 20-24 14 2 20 15 16 26-3 9-14 14-25 10-6-3-9-7-11-12Z" fill="#ff9ecb" stroke="#5a2346" stroke-width="5" stroke-linejoin="round"/>
      <ellipse cx="99" cy="54" rx="9" ry="8" fill="#ffe8d6" stroke="#5a2346" stroke-width="4"/>
      <circle cx="102" cy="52" r="1.2" fill="#5a2346"/>
      <path d="M97 59q4 2 7-1" fill="none" stroke="#5a2346" stroke-width="2" stroke-linecap="round"/>
      <path d="m80 31-3-11 8 7Z" fill="#ffe08b" stroke="#5a2346" stroke-width="3" stroke-linejoin="round"/>
      <path d="m93 30 5-11 2 12Z" fill="#ffe08b" stroke="#5a2346" stroke-width="3" stroke-linejoin="round"/>
      <path d="M73 37 62 33l7 11Z" fill="#ffb15e" stroke="#5a2346" stroke-width="3" stroke-linejoin="round"/>
      <g class="eyes">
        <ellipse cx="82" cy="48" rx="6.8" ry="8" fill="#fffdf1" stroke="#5a2346" stroke-width="2.3"/>
        <ellipse cx="94" cy="48" rx="5.8" ry="7" fill="#fffdf1" stroke="#5a2346" stroke-width="2.3"/>
        <circle cx="83.5" cy="49" r="3.3" fill="#45213a"/>
        <circle cx="95.3" cy="49" r="2.9" fill="#45213a"/>
        <circle cx="84.5" cy="47.8" r="1.1" fill="#fff"/>
        <circle cx="96.1" cy="47.8" r=".95" fill="#fff"/>
      </g>
      <circle cx="77" cy="58" r="3.5" fill="#ff6f9f" opacity=".5"/>
      <path d="M57 83q7 1 12 8" fill="none" stroke="#5a2346" stroke-width="9" stroke-linecap="round"/>
      <path d="M57 83q7 1 12 8" fill="none" stroke="#ff9ecb" stroke-width="4" stroke-linecap="round"/>
      <circle cx="70" cy="92" r="5.5" fill="#ff9ecb" stroke="#5a2346" stroke-width="3"/>
      <g class="club" style="transform-origin:70px 92px">
        <path d="M70 92 99 52" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M98 51c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m99 55 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;

  const RICE_SVG = `
    <svg viewBox="0 0 120 130" role="img" aria-label="발아현미 캐릭터">
      <path d="M58 22C54 12 47 7 40 8c3 8 8 13 16 16Z" fill="#7fd36a" stroke="#2f6b3d" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 22c1-8 7-13 14-14-1 8-5 13-11 16Z" fill="#9ae17d" stroke="#2f6b3d" stroke-width="3" stroke-linejoin="round"/>
      <path d="M59 24v-9" fill="none" stroke="#2f6b3d" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="42" cy="121" rx="9" ry="5" fill="#c28b47" stroke="#523b24" stroke-width="3.5"/>
      <ellipse cx="69" cy="121" rx="9" ry="5" fill="#c28b47" stroke="#523b24" stroke-width="3.5"/>
      <path d="M59 17c21 1 33 26 30 57-2 29-16 47-31 47S28 103 26 74C23 43 38 18 59 17Z" fill="#d9a15c" stroke="#4a3624" stroke-width="5"/>
      <path d="M46 30c-9 11-13 28-10 43" fill="none" stroke="#f3ce91" stroke-width="5" stroke-linecap="round" opacity=".82"/>
      <path d="M30 82c4 21 15 33 28 35 12-1 24-12 28-30-9 10-19 15-29 15-11 0-20-7-27-20Z" fill="#b9783b" opacity=".9"/>
      <ellipse cx="42" cy="91" rx="3.2" ry="4.4" fill="#f0c887" opacity=".36"/>
      <ellipse cx="69" cy="98" rx="2.7" ry="3.7" fill="#f0c887" opacity=".3"/>
      <ellipse cx="77" cy="83" rx="2" ry="2.8" fill="#f0c887" opacity=".32"/>
      <g class="eyes">
        <ellipse cx="47" cy="58" rx="4.2" ry="6.1" fill="#382312"/>
        <ellipse cx="68" cy="58" rx="4.2" ry="6.1" fill="#382312"/>
        <circle cx="48.3" cy="56" r="1.3" fill="#fff"/>
        <circle cx="69.3" cy="56" r="1.3" fill="#fff"/>
      </g>
      <circle cx="38" cy="69" r="5" fill="#ff8f8f" opacity=".48"/>
      <circle cx="77" cy="69" r="5" fill="#ff8f8f" opacity=".48"/>
      <path d="M54 70q4 4 9 0" fill="none" stroke="#4a3624" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M84 84q4 5 1 10" fill="none" stroke="#4a3624" stroke-width="7" stroke-linecap="round"/>
      <path d="M84 84q4 5 1 10" fill="none" stroke="#d9a15c" stroke-width="3" stroke-linecap="round"/>
      <circle cx="84" cy="95" r="5.3" fill="#d9a15c" stroke="#4a3624" stroke-width="3"/>
      <g class="club" style="transform-origin:84px 95px">
        <path d="M84 95 103 54" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M102 53c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m103 57 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;

  const IJEUNG_SVG = `
    <svg viewBox="0 0 120 130" role="img" aria-label="이즹 캐릭터">
      <path d="M28 51c0-22 13-35 31-35s31 13 31 35v24c0 10-10 14-15 6l-3-20H46l-3 20c-5 8-15 4-15-6Z" fill="#4a3047" stroke="#2b2033" stroke-width="4.5" stroke-linejoin="round"/>
      <rect x="46" y="103" width="10" height="18" rx="5" fill="#3c3554" stroke="#251d36" stroke-width="3.5"/>
      <rect x="64" y="103" width="10" height="18" rx="5" fill="#3c3554" stroke="#251d36" stroke-width="3.5"/>
      <ellipse cx="46" cy="122" rx="10" ry="5" fill="#8e5c3c" stroke="#382219" stroke-width="3.5"/>
      <ellipse cx="70" cy="122" rx="10" ry="5" fill="#8e5c3c" stroke="#382219" stroke-width="3.5"/>
      <path d="M35 91c0-13 11-20 24-20s24 7 24 20v20c0 7-5 11-12 11H47c-7 0-12-4-12-11Z" fill="#55b8a3" stroke="#27342d" stroke-width="5" stroke-linejoin="round"/>
      <path d="M40 91h38M46 79l24 37M70 79 46 116" fill="none" stroke="#9be6d3" stroke-width="2" opacity=".55"/>
      <path d="M37 88c-8 2-11 8-9 14 2 5 6 7 10 5" fill="none" stroke="#27342d" stroke-width="9" stroke-linecap="round"/>
      <path d="M37 88c-8 2-11 8-9 14 2 5 6 7 10 5" fill="none" stroke="#55b8a3" stroke-width="4" stroke-linecap="round"/>
      <path d="M83 87q9 2 10 9" fill="none" stroke="#27342d" stroke-width="9" stroke-linecap="round"/>
      <path d="M83 87q9 2 10 9" fill="none" stroke="#55b8a3" stroke-width="4" stroke-linecap="round"/>
      <circle cx="33" cy="102" r="5" fill="#ffd7a4" stroke="#27342d" stroke-width="3"/>
      <circle cx="93" cy="96" r="5" fill="#ffd7a4" stroke="#27342d" stroke-width="3"/>
      <circle cx="59" cy="52" r="28" fill="#ffd7a4" stroke="#2b2033" stroke-width="5"/>
      <circle cx="31" cy="54" r="5.5" fill="#ffd7a4" stroke="#2b2033" stroke-width="3.5"/>
      <circle cx="87" cy="54" r="5.5" fill="#ffd7a4" stroke="#2b2033" stroke-width="3.5"/>
      <path d="M31 47c1-19 12-29 28-29 17 0 28 10 29 29-8-5-16-6-24-3l-4 7-3-8c-8 0-17 1-26 4Z" fill="#4a3047" stroke="#2b2033" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="M30 48c-5 11-5 26-2 36 2 5 8 4 10-1l3-23Z" fill="#4a3047" stroke="#2b2033" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M88 48c5 11 5 26 2 36-2 5-8 4-10-1l-3-23Z" fill="#4a3047" stroke="#2b2033" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M38 40c4-5 9-7 14-6M68 34c6-1 11 1 15 6" fill="none" stroke="#6b5472" stroke-width="3" stroke-linecap="round"/>
      <circle cx="47" cy="55" r="11.5" fill="#bdefff" fill-opacity=".48" stroke="#312438" stroke-width="4"/>
      <circle cx="71" cy="55" r="11.5" fill="#bdefff" fill-opacity=".48" stroke="#312438" stroke-width="4"/>
      <path d="M58.5 54h1.5M35.5 53l-6 1M82.5 53l6 1" fill="none" stroke="#312438" stroke-width="3" stroke-linecap="round"/>
      <path d="m40 47 4-4M64 47l4-4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>
      <g class="eyes">
        <circle cx="48" cy="56" r="2.3" fill="#302638"/>
        <circle cx="70" cy="56" r="2.3" fill="#302638"/>
        <circle cx="48.8" cy="55.1" r=".8" fill="#fff"/>
        <circle cx="70.8" cy="55.1" r=".8" fill="#fff"/>
      </g>
      <circle cx="38" cy="68" r="3.5" fill="#ff9b9b" opacity=".52"/>
      <circle cx="80" cy="68" r="3.5" fill="#ff9b9b" opacity=".52"/>
      <path d="M53 72q6 5 12 0" fill="none" stroke="#6d412a" stroke-width="2.4" stroke-linecap="round"/>
      <rect x="57" y="73" width="5" height="4.5" rx="1" fill="#fffdf0" stroke="#6d412a" stroke-width="1.3"/>
      <g class="club" style="transform-origin:93px 96px">
        <path d="M93 96 106 52" fill="none" stroke="#6b4a2b" stroke-width="5" stroke-linecap="round"/>
        <path d="M105 51c7-4 11-1 10 5l-9 2Z" fill="#d9e7f2" stroke="#2d3540" stroke-width="3" stroke-linejoin="round"/>
        <path d="m106 55 8 1" fill="none" stroke="#9ab2c4" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>`;

  const ACCESSORIES = {
    giraffe: {
      female: { x: 84, y: 15, scale: 0.78, rotate: -14 },
      male: { x: 84, y: 13, scale: 0.82 },
    },
    ryung: {
      female: { x: 82, y: 30, scale: 0.78, rotate: 12 },
      male: { x: 84, y: 30, scale: 0.82 },
    },
    rice: {
      female: { x: 77, y: 33, scale: 0.7, rotate: 16 },
      male: { x: 59, y: 27, scale: 0.88 },
    },
    ijeung: {
      female: { x: 85, y: 33, scale: 0.72, rotate: 18 },
      male: { x: 59, y: 23, scale: 0.88 },
    },
  };

  const MALE_RECOLOR = {
    ryung: {
      "#ff9ecb": "#7fc4ff",
      "#ffc7df": "#b7e2ff",
      "#ffe8b7": "#e6f5ff",
      "#ff6f9f": "#54a6e6",
      "#b84c7c": "#2f6a95",
      "#e982af": "#5c9cc9",
      "#5a2346": "#1f3a52",
      "#d77e9f": "#6b9fc4",
      "#45213a": "#1f2c42",
    },
    ijeung: {
      "#4a3047": "#2f4869",
      "#6b5472": "#56759c",
      "#55b8a3": "#4fa6d9",
      "#9be6d3": "#a9dbf5",
      "#27342d": "#1d3145",
      "#312438": "#1f2c42",
      "#302638": "#1f2c42",
    },
  };

  const BOW_SVG = (point) => `
    <g class="gender-mark" transform="translate(${point.x} ${point.y}) rotate(${point.rotate || 0}) scale(${point.scale})">
      <path d="M-1 5c-7-8-17-7-18 2-1 9 10 12 18 4Z" fill="#ff86b0" stroke="#5a2346" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M1 5c7-8 17-7 18 2 1 9-10 12-18 4Z" fill="#ff86b0" stroke="#5a2346" stroke-width="2.6" stroke-linejoin="round"/>
      <circle cx="0" cy="5" r="3.2" fill="#ffd34d" stroke="#5a2346" stroke-width="1.8"/>
    </g>`;

  const CAP_SVG = (point) => `
    <g class="gender-mark" transform="translate(${point.x} ${point.y}) scale(${point.scale})">
      <path d="M-19 3c0-13 8-21 19-21s19 8 19 21Z" fill="#54b8e6" stroke="#1d3c52" stroke-width="2.6" stroke-linejoin="round"/>
      <path d="M19 3c10 0 16 3 16 6 0 3-6 5-16 5Z" fill="#2f93c0" stroke="#1d3c52" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="0" cy="-18" r="2.3" fill="#ffd34d" stroke="#1d3c52" stroke-width="1.3"/>
    </g>`;

  function decorateSprite(svg, gender, character) {
    let decorated = svg;

    if (gender === "male" && MALE_RECOLOR[character.id]) {
      const colorMap = MALE_RECOLOR[character.id];
      Object.keys(colorMap).forEach((from) => {
        decorated = decorated.split(from).join(colorMap[from]);
      });
    }

    const point = ACCESSORIES[character.id][gender];
    const mark = gender === "male" ? CAP_SVG(point) : BOW_SVG(point);
    return decorated.replace("</svg>", `${mark}\n    </svg>`);
  }

  const BASE_CHARACTERS = [
    {
      id: "giraffe",
      name: "기린",
      accent: "#ffd34d",
      accentDark: "#bb6e1e",
      maleAccent: "#ffd34d",
      maleAccentDark: "#bb6e1e",
      svg: GIRAFFE_SVG,
    },
    {
      id: "ryung",
      name: "륭",
      accent: "#ff9ecb",
      accentDark: "#a73567",
      maleAccent: "#8ecbff",
      maleAccentDark: "#2b6796",
      svg: RYUNG_SVG,
    },
    {
      id: "rice",
      name: "발아현미",
      accent: "#f0be72",
      accentDark: "#8a5a26",
      maleAccent: "#f0be72",
      maleAccentDark: "#8a5a26",
      svg: RICE_SVG,
    },
    {
      id: "ijeung",
      name: "이즹",
      accent: "#8ed6ff",
      accentDark: "#2f6c96",
      maleAccent: "#8ed6ff",
      maleAccentDark: "#2f6c96",
      svg: IJEUNG_SVG,
    },
  ];

  const CHARACTERS = BASE_CHARACTERS.map((character) => ({
    ...character,
    sprites: {
      female: decorateSprite(character.svg, "female", character),
      male: decorateSprite(character.svg, "male", character),
    },
    accents: {
      female: { accent: character.accent, accentDark: character.accentDark },
      male: {
        accent: character.maleAccent || character.accent,
        accentDark: character.maleAccentDark || character.accentDark,
      },
    },
  }));

  function getRoster(gender, count) {
    return CHARACTERS.slice(0, count).map((character) => ({
      id: character.id,
      name: character.name,
      accent: character.accents[gender].accent,
      accentDark: character.accents[gender].accentDark,
      svg: character.sprites[gender],
    }));
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
  const rosterPreview = document.getElementById("rosterPreview");
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
  let activeCharacters = getRoster(selectedGender, playerCount);

  if (params.get("gender") === "male") selectedGender = "male";
  const countParam = Number(params.get("players"));
  if (countParam >= 2 && countParam <= 4) playerCount = countParam;

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
          <div class="char-name">${character.name}</div>
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

  function updateRosterPreview() {
    activeCharacters = getRoster(selectedGender, playerCount);
    rosterPreview.innerHTML = activeCharacters
      .map(
        (character) => `
      <div class="roster-chip" style="--accent:${character.accent}">
        <span class="roster-sprite">${character.svg}</span>
        <span class="roster-name">${character.name}</span>
      </div>`,
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
    message.textContent = "캐릭터 성별과 인원을 선택하세요!";
    syncSetupControls();
    updateRosterPreview();
  }

  function startRound() {
    state = "idle";
    setup.hidden = true;
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
      updateRosterPreview();
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
      updateRosterPreview();
    });
  });

  startBtn.addEventListener("click", () => {
    ensureAudio();
    playBlip();
    startRound();
  });

  window.addEventListener("keydown", (event) => {
    if (event.repeat) return;
    if (event.target.closest("button")) return;

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
