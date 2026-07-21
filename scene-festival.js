registerScene('festival', function renderFestival(state = {}, showHighlight = false) {
  const s = {
    lanternCount:5, balloon:true, goldfishCount:1, maskType:'fox',
    cottonCandy:true, yukataColor:'#79b7f2', fan:false, appleCandy:true,
    signColor:'#fff0cc', starCount:3, ...state
  };
  const lanterns=Array.from({length:s.lanternCount},(_,i)=>`<g transform="translate(${220+i*245} 150)"><path d="M0-70V-15" stroke="#594840" stroke-width="8"/><rect x="-42" y="-15" width="84" height="110" rx="35" fill="${i%2?'#ffd06a':'#f58d82'}" stroke="#8f5b4e" stroke-width="7"/></g>`).join('');
  const fish=Array.from({length:s.goldfishCount},(_,i)=>`<g transform="translate(${1120+i*86} 680)"><ellipse rx="34" ry="22" fill="#ef765d"/><path d="M-30 0l-34-22v44z" fill="#f6a06c"/><circle cx="16" cy="-5" r="4"/></g>`).join('');
  const stars=Array.from({length:s.starCount},(_,i)=>`<circle cx="${180+i*330}" cy="${85+(i%2)*30}" r="6" fill="#fff8d7"/>`).join('');
  return `<svg viewBox="0 0 1600 900" role="img" aria-label="お祭りの場面">
    <defs><linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#354b79"/><stop offset="1" stop-color="#7c6b87"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#fSky)"/>${stars}<circle cx="1430" cy="105" r="62" fill="#fff1aa"/><path d="M80 145H1510" stroke="#594840" stroke-width="12"/>${lanterns}
    <path d="M0 770Q350 700 700 770T1400 750T1600 765V900H0Z" fill="#755f4c"/>
    <g transform="translate(90 360)"><rect width="470" height="330" rx="16" fill="#d86d5f"/><rect x="18" y="20" width="434" height="78" fill="${s.signColor}"/><rect x="35" y="215" width="400" height="100" fill="#f0bd72"/><g transform="translate(385 410)">${s.maskType==='cat'?'<path d="M-65-45l18-55 35 40M65-45l-18-55-35 40" fill="#fff7eb" stroke="#765f55" stroke-width="7"/><ellipse rx="80" ry="70" fill="#fff7eb" stroke="#765f55" stroke-width="8"/><path d="M-33-8q15-18 30 0M33-8q-15-18-30 0" fill="none" stroke="#765f55" stroke-width="8"/>':'<path d="M-68-35l20-72 42 55M68-35l-20-72-42 55" fill="#fff7eb" stroke="#765f55" stroke-width="7"/><ellipse rx="80" ry="70" fill="#fff7eb" stroke="#765f55" stroke-width="8"/><path d="M-42-5l26-12M42-5L16-17M0 0v30" stroke="#d45e5e" stroke-width="8"/>'}</g></g>
    <g transform="translate(610 355)"><rect width="350" height="355" rx="16" fill="#75a9b7"/><rect x="18" y="18" width="314" height="78" fill="${s.signColor}"/><rect x="40" y="240" width="270" height="95" fill="#e7bd76"/>${s.cottonCandy?'<path d="M175 205v105" stroke="#d4ad79" stroke-width="12"/><circle cx="175" cy="165" r="65" fill="#f6c9dc"/>':''}${s.appleCandy?'<g transform="translate(70 210)"><path d="M0-60v90" stroke="#c39a68" stroke-width="10"/><circle cy="-70" r="36" fill="#ef5555"/></g>':''}</g>
    <g transform="translate(1015 385)"><rect width="475" height="325" rx="16" fill="#628ca4"/><rect x="20" y="20" width="435" height="76" fill="${s.signColor}"/><ellipse cx="235" cy="270" rx="180" ry="65" fill="#9ad3de" stroke="#446c78" stroke-width="12"/>${fish}</g>
    <g transform="translate(800 620)"><circle r="52" fill="#ffd2b8"/><path d="M-45-12q45-60 90 0" fill="#4f3b35"/><rect x="-58" y="50" width="116" height="170" rx="36" fill="${s.yukataColor}"/><path d="M-58 90l116 85M58 90L-58 175" stroke="#fff3d4" stroke-width="12"/>${s.fan?'<path d="M85 85q75-55 110 20q-55 55-110 0z" fill="#ffd966" stroke="#8d6d55" stroke-width="7"/>':''}</g>
    ${s.balloon?'<g><ellipse cx="1320" cy="340" rx="60" ry="76" fill="#f58aaa"/><path d="M1320 416q-28 80 12 160" fill="none" stroke="#75656a" stroke-width="7"/></g>':''}
    ${showHighlight?'<rect x="20" y="20" width="1560" height="860" rx="30" fill="none" stroke="#ffea62" stroke-width="18" stroke-dasharray="30 20"/>':''}
  </svg>`;
});