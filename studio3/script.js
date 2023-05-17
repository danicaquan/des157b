
(function(){
    'use strict';
    console.log ('running js');

    setTimeout(function(){
        document.querySelector('#title').style.opacity="0%";
    }, 5000);

    setTimeout(function(){
      document.querySelector('#title').style.display="none";
    }, 6000);

    anime({
        targets: 'svg path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: false
      });

      var scene = document.querySelector('.main-image');
      var parallax = new Parallax(scene, {
      pointerEvents : true });
      

      const shards = document.querySelectorAll('.shards');
      for (const shard of shards) {
      shard.addEventListener('mouseover', function(){
        shard.style.filter = 'invert(75%)';
      })
      shard.addEventListener('mouseout', function(){
        shard.style.filter = 'none';
      })
    }
})();