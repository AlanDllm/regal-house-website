const menu=document.getElementById('menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'關閉選單':'開啟選單')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','開啟選單')}));document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('quote').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const message=`你好，名窩居！我想查詢免費報價。\n稱呼：${data.get('name')}\n單位／屋苑：${data.get('property')||'稍後提供'}\n服務：${data.get('service')}\n想法與需要：${data.get('message')||'希望與設計師詳談'}`;window.open('https://wa.me/85294496699?text='+encodeURIComponent(message),'_blank','noopener,noreferrer')});

// Load one third-party panorama at a time, only after a visitor chooses to view it.
const tourStage=document.getElementById('tour-stage');
if(tourStage){
 const tourButtons=Array.from(document.querySelectorAll('.tour-select'));
 const tourHeading=document.getElementById('tour-heading');
 const tourExternal=document.getElementById('tour-external');
 const tourStatus=document.getElementById('tour-status');
 let tourTimer;
 function showTour(button,scroll){
  const url=new URL(button.dataset.tour);
  if(url.origin!=='https://720.3vjia.com')return;
  clearTimeout(tourTimer);
  tourButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  tourHeading.textContent=button.dataset.title;
  tourExternal.href=url.href;
  tourStatus.textContent='全景載入中，請稍候。';
  const frame=document.createElement('iframe');
  frame.title=button.dataset.title+' 3D 全景';
  frame.allow='fullscreen; gyroscope; accelerometer; xr-spatial-tracking';
  frame.allowFullscreen=true;
  frame.addEventListener('load',()=>{clearTimeout(tourTimer);tourStatus.textContent='可拖曳畫面觀看；若未能顯示，請在新分頁開啟全景。';},{once:true});
  frame.src=url.href;
  tourStage.replaceChildren(frame);
  tourTimer=setTimeout(()=>{tourStatus.textContent='載入需時，可嘗試上方「在新分頁開啟全景」。';},15000);
  if(scroll)document.getElementById('tour-viewer').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 }
 tourButtons.forEach(button=>button.addEventListener('click',()=>showTour(button,true)));
 document.getElementById('tour-start').addEventListener('click',()=>showTour(tourButtons[0],false));
}

