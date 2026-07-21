registerScene('festival', function renderFestival(state = {}, showHighlight = false) {
  const s = {
    lanternCount: 5,
    balloon: true,
    goldfishCount: 2,
    maskType: 'fox',
    cottonCandy: true,
    childYukataColor: '#79b7f2',
    ...state
  };

  const lanterns = Array.from({ length: Math.max(0, s.lanternCount) }, (_, index) => {
    const x = 250 + index * 260;
    return `
      <g class="change-target" transform="translate(${x} 145)">
        <path d="M0-70V-15" stroke="#5f4a42" stroke-width="8"/>
        <rect x="-42" y="-15" width="84" height="110" rx="35" fill="${index % 2 === 0 ? '#f59a8b' : '#ffd06a'}" stroke="#8f5b4e" stroke-width="7"/>
        <path d="M-35 18h70M-35 62h70" stroke="#fff4d6" stroke-width="8" opacity=".8"/>
      </g>`;
  }).join('');

  const balloon = s.balloon
    ? `<g class="change-target"><ellipse cx="1310" cy="375" rx="62" ry="78" fill="#f58aaa"/><path d="M1310 452q-28 80 12 160" fill="none" stroke="#75656a" stroke-width="7"/></g>`
    : '';

  const goldfish = Array.from({ length: Math.max(0, s.goldfishCount) }, (_, index) => {
    const x = 1125 + index * 92;
    return `<g class="change-target" transform="translate(${x} 675)"><ellipse cx="0" cy="0" rx="38" ry="24" fill="#ef765d"/><path d="M-35 0l-35-25v50z" fill="#f6a06c"/><circle cx="18" cy="-6" r="4" fill="#333"/></g>`;
  }).join('');

  const mask = s.maskType === 'cat'
    ? `<g class="change-target" transform="translate(385 410)"><path d="M-65-45l18-55 35 40M65-45l-18-55-35 40" fill="#f7efe1" stroke="#765f55" stroke-width="7"/><ellipse cx="0" cy="0" rx="80" ry="70" fill="#fff7eb" stroke="#765f55" stroke-width="8"/><path d="M-33-8q15-18 30 0M33-8q-15-18-30 0" fill="none" stroke="#765f55" stroke-width="8"/><path d="M0 8v18M-18 33q18 15 36 0" fill="none" stroke="#d98181" stroke-width="6"/></g>`
    : `<g class="change-target" transform="translate(385 410)"><path d="M-68-35l20-72 42 55M68-35l-20-72-42 55" fill="#fff7eb" stroke="#765f55" stroke-width="7"/><ellipse cx="0" cy="0" rx="80" ry="70" fill="#fff7eb" stroke="#765f55" stroke-width="8"/><path d="M-42-5l26-12M42-5L16-17M0 0v30" stroke="#d45e5e" stroke-width="8" stroke-linecap="round"/><circle cx="-28" cy="-5" r="5" fill="#333"/><circle cx="28" cy="-5" r="5" fill="#333"/></g>`;

  const cottonCandy = s.cottonCandy
    ? `<g class="change-target"><path d="M770 590v170" stroke="#d4ad79" stroke-width="13"/><circle cx="770" cy="555" r="70" fill="#f6c9dc"/><circle cx="720" cy="570" r="45" fill="#f6c9dc"/><circle cx="820" cy="575" r="45" fill="#f6c9dc"/></g>`
    : '';

  return `
  <svg viewBox="0 0 1600 900" role="img" aria-label="お祭りの場面">
    <defs>
      <linearGradient id="festivalSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#354b79"/>
        <stop offset="1" stop-color="#7c6b87"/>
      </linearGradient>
      <filter id="festivalGlow">
        <feGaussianBlur stdDeviation="12" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1600" height="900" fill="url(#festivalSky)"/>
    <circle cx="1430" cy="110" r="62" fill="#fff1aa"/>
    <circle cx="170" cy="100" r="5" fill="#fff8d7"/>
    <circle cx="530" cy="80" r="6" fill="#fff8d7"/>
    <circle cx="920" cy="110" r="5" fill="#fff8d7"/>
    <path d="M0 760Q300 700 600 760T1200 740T1600 760V900H0Z" fill="#76624e"/>
    <path d="M80 145H1510" stroke="#594840" stroke-width="12"/>
    ${lanterns}

    <g transform="translate(100 355)">
      <rect x="0" y="0" width="470" height="330" rx="16" fill="#d86d5f"/>
      <rect x="18" y="20" width="434" height="78" fill="#fff0cc"/>
      <path d="M18 98h434" stroke="#8f5046" stroke-width="12"/>
      <rect x="35" y="215" width="400" height="100" fill="#f0bd72"/>
      <path d="M35 215h400" stroke="#8a5a45" stroke-width="14"/>
      ${mask}
    </g>

    <g transform="translate(610 350)">
      <rect x="0" y="0" width="350" height="360" rx="16" fill="#75a9b7"/>
      <rect x="18" y="18" width="314" height="78" fill="#fff0cc"/>
      <path d="M18 96h314" stroke="#4f7a84" stroke-width="12"/>
      <rect x="40" y="240" width="270" height="95" fill="#e7bd76"/>
      ${cottonCandy}
    </g>

    <g transform="translate(1020 380)">
      <rect x="0" y="0" width="470" height="330" rx="16" fill="#628ca4"/>
      <rect x="20" y="22" width="430" height="76" fill="#fff0cc"/>
      <path d="M20 98h430" stroke="#466977" stroke-width="12"/>
      <ellipse cx="230" cy="275" rx="180" ry="65" fill="#9ad3de" stroke="#446c78" stroke-width="12"/>
      ${goldfish}
    </g>

    <g transform="translate(810 610)">
      <circle cx="0" cy="0" r="52" fill="#ffd2b8"/>
      <path d="M-45-12q45-60 90 0" fill="#4f3b35"/>
      <rect x="-58" y="50" width="116" height="170" rx="36" fill="${s.childYukataColor}"/>
      <path d="M-58 90l116 85M58 90L-58 175" stroke="#fff3d4" stroke-width="12"/>
      <path d="M-35 220l-20 100M35 220l20 100" stroke="#4d596c" stroke-width="24" stroke-linecap="round"/>
      <circle cx="-17" cy="0" r="5" fill="#333"/>
      <circle cx="17" cy="0" r="5" fill="#333"/>
    </g>

    ${balloon}
    ${showHighlight ? `<rect x="20" y="20" width="1560" height="860" rx="30" fill="none" stroke="#ffea62" stroke-width="18" stroke-dasharray="30 20" filter="url(#festivalGlow)"/>` : ''}
  </svg>`;
});
