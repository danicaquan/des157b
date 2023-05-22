
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
      const shardInfo = document.querySelectorAll('.about-info')
      const returnBtns = document.querySelectorAll('button')
      for (const shard of shards) {
      shard.addEventListener('mouseover', function(){
        shard.style.filter = 'invert(75%)';
      })
      shard.addEventListener('mouseout', function(){
        shard.style.filter = 'none';
      })
    }
for (let i = 0; i<shardInfo.length; i++){
    shards[i].addEventListener('click', function(){
      shardInfo[i].className = 'showing about-info';
    })
    returnBtns[i].addEventListener('click', function(event){
      event.preventDefault();
      shardInfo[i].style.animation = 'square-out-center 1s';
      shardInfo[i].addEventListener("animationend", (event) => event.target.style.animation = '');
      setTimeout(function(){
        shardInfo[i].className = 'hidden about-info';
      }, 1000);
    })
  }
})();