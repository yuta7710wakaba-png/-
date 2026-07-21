registerScene('park', function renderPark(state = {}, showHighlight = false) {
  const s = {
    ball: true, flower: true, birdCount: 1, shirtColor: '#79b7f2',
    cup: false, flowerSide: 'left', kite: false, hat: true,
    cloudCount: 2, benchBag: false, ...state
  };
  const birds = Array.from({length:s.birdCount},(_,i)=>`<path d="M${1040+i*150} ${210+i*45}q35-40 70 0q35-40 70 0" fill="none" stroke="#405e78" stroke-width="13" stroke-linecap="round"/>`).join('');
  const clouds = Array.from({length:s.cloudCount},(_,i)=>`<g transform="translate(${260+i*390} ${150+i*35})" fill="#fff" opacity=".9"><circle cx="0" cy="20" r="38"/><circle cx="48" cy="0" r="52"/><circle cx="100" cy="22" r="38"/><rect x="0" y="18" width="100" height="42" rx="20"/></g>`).join('');
  const fx = s.flowerSide === 'right' ? 1360 : 330;
  return `<svg viewBox="0 0 1600 900" role="img" aria-label="公園の場面">
    <defs><linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bfeaff"/><stop offset="1" stop-color="#eefbff"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#pSky)"/>${clouds}<circle cx="1430" cy="110" r="66" fill="#ffe27a"/>
    <path d="M0 610Q300 535 600 620T1200 600T1600 610V900H0Z" fill="#8bd17f"/>
    <path d="M0 730Q320 650 640 725T1280 710T1600 720V900H0Z" fill="#66b967"/>
    <g transform="translate(130 265)"><rect x="110" y="250" width="38" height="315" fill="#875a3c"/><circle cx="128" cy="190" r="120" fill="#5db36c"/><circle cx="35" cy="250" r="92" fill="#6bc27a"/><circle cx="210" cy="250" r="92" fill="#68bd73"/></g>
    <g transform="translate(690 430)"><path d="M0 250h330" stroke="#617484" stroke-width="24"/><path d="M25 250V60M305 250V60" stroke="#617484" stroke-width="22"/><path d="M25 70h280" stroke="#ef8b67" stroke-width="34"/><path d="M60 70l90 180M270 70l-90 180" stroke="#ef8b67" stroke-width="28"/><rect x="130" y="190" width="70" height="35" rx="8" fill="#6b5d4e"/></g>
    <g transform="translate(1080 420)"><rect y="130" width="230" height="38" rx="10" fill="#9a6745"/><rect x="25" y="168" width="26" height="115" fill="#6d4b38"/><rect x="178" y="168" width="26" height="115" fill="#6d4b38"/>${s.benchBag?'<path d="M72 90h85l18 65H55z" fill="#965f9e" stroke="#fff" stroke-width="7"/>':''}${s.cup?'<rect x="185" y="75" width="38" height="55" rx="7" fill="#fff4dc" stroke="#d98a55" stroke-width="7"/>':''}</g>
    <g transform="translate(520 555)"><circle r="55" fill="#ffd2b8"/><path d="M-48-15q48-65 96 0" fill="#704e3c"/>${s.hat?'<path d="M-58-27q58-75 116 0z" fill="#ffd55f"/><rect x="-72" y="-25" width="144" height="18" rx="9" fill="#e6a948"/>':''}<rect x="-55" y="52" width="110" height="155" rx="42" fill="${s.shirtColor}"/><path d="M-35 205l-25 115M35 205l25 115" stroke="#536c82" stroke-width="25" stroke-linecap="round"/><path d="M-50 95l-85 65M50 95l85 65" stroke="#ffd2b8" stroke-width="24" stroke-linecap="round"/><circle cx="-18" r="5"/><circle cx="18" r="5"/><path d="M-18 24q18 16 36 0" fill="none" stroke="#d36f6f" stroke-width="5"/></g>
    ${s.ball?'<g><circle cx="1220" cy="725" r="52" fill="#ffcf4a" stroke="#fff" stroke-width="10"/><path d="M1170 725h100M1220 675v100" stroke="#ef7c57" stroke-width="16"/></g>':''}
    ${s.flower?`<g><circle cx="${fx}" cy="735" r="18" fill="#ffd84f"/><g fill="#ff8fb1"><circle cx="${fx}" cy="700" r="23"/><circle cx="${fx+34}" cy="735" r="23"/><circle cx="${fx}" cy="770" r="23"/><circle cx="${fx-34}" cy="735" r="23"/></g><path d="M${fx} 775v65" stroke="#4ca66b" stroke-width="13"/></g>`:''}
    <g>${birds}</g>
    ${s.kite?'<g transform="translate(1270 260)"><path d="M0-65l65 65-65 65-65-65z" fill="#ef6f6c" stroke="#fff" stroke-width="8"/><path d="M0 65q80 70 25 150" fill="none" stroke="#685c61" stroke-width="7"/></g>':''}
    ${showHighlight?'<rect x="20" y="20" width="1560" height="860" rx="30" fill="none" stroke="#ff5e5e" stroke-width="18" stroke-dasharray="30 20"/>':''}
  </svg>`;
});