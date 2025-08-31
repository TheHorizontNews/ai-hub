
(function(){
  var art = document.querySelector('.hero .hero-art');
  if(!art) return;
  function clamp(x, min, max){ return Math.max(min, Math.min(max, x)); }
  function adjust(){
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    // target ~22% viewport height
    var target = clamp(vh * 0.22, 140, 300);
    art.style.height = target.toFixed(0)+'px';
  }
  window.addEventListener('load', adjust, {once:true});
  window.addEventListener('resize', adjust, {passive:true});
})();
