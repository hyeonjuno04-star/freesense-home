// 컴퓨터에서 전화 링크를 누르면 「앱 선택」 창 대신 번호를 크게 보여 주고 복사한다. 휴대폰은 그대로 전화가 걸린다.
(function(){
  var phone = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && !matchMedia('(pointer:fine)').matches);
  if (phone) return;
  function show(num){
    var old=document.getElementById('telbox'); if(old) old.remove();
    var bg=document.createElement('div'); bg.id='telbox';
    bg.style.cssText='position:fixed;inset:0;background:rgba(20,16,30,.45);display:flex;align-items:center;justify-content:center;z-index:9999';
    bg.innerHTML='<div style="background:#fff;border-radius:16px;padding:28px 34px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.2);font-family:inherit;min-width:300px">'+
      '<div style="font-size:16px;color:#615A70;margin-bottom:6px">전화 문의</div>'+
      '<div style="font-size:34px;font-weight:800;color:#5D4A8E;letter-spacing:1px">'+num+'</div>'+
      '<div id="telmsg" style="font-size:15px;color:#615A70;margin:10px 0 18px">휴대폰으로 이 번호에 전화 주세요</div>'+
      '<a href="https://pf.kakao.com/_mDcnX/chat" target="_blank" rel="noopener" style="display:block;background:#FEE500;color:#191919;border-radius:8px;padding:12px 20px;font-size:17px;font-weight:800;text-decoration:none;margin-bottom:10px">카카오톡으로 바로 문의</a>'+
      '<button type="button" style="background:#EEEAF5;color:#5D4A8E;border:0;border-radius:8px;padding:9px 26px;font-size:15px;font-weight:700;cursor:pointer">닫기</button></div>';
    bg.addEventListener('click',function(e){ if(e.target===bg||e.target.tagName==='BUTTON') bg.remove(); });
    document.body.appendChild(bg);
    try{ navigator.clipboard.writeText(num.replace(/-/g,'')).then(function(){ var m=document.getElementById('telmsg'); if(m) m.textContent='번호를 복사했어요 · 휴대폰으로 전화 주세요'; }); }catch(e){}
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest && e.target.closest('a[href^="tel:"]'); if(!a) return;
    e.preventDefault();
    var d=a.getAttribute('href').slice(4).replace(/\D/g,'');
    show(d.length===11 ? d.replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3') : d);
  });
})();
