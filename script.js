(function(){
    'use strict';
    console.log('running js');

    const body = document.querySelector('body');
    const btn = document.querySelector('#btn');
    const h2 = document.querySelector('header h2');
    const moo = document.querySelector('#moom');
    let mode = 'krad';

    document.querySelector('#btn').addEventListener('click', function(){
        if (mode === 'krad') {
            body.className = 'switch';
            btn.className = 'diamond';
            h2.innerHTML = "⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯des 157b - interactive media lll - spring 2023⎯";
            moo.className= 'turn';
            moo.addEventListener('animationend', function(){
                moo.className = 'wiggle';
            });
            mode = 'moonie';
        } else {
            body.removeAttribute('class');
            btn.className = 'moon';
            h2.innerHTML = "⎯des 157b - interactive media lll - spring 2023⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯";
            moo.className= 'turn';
            moo.addEventListener('animationend', function(){
                moo.className = 'wiggle';
            });
            mode = 'krad'
        }
    });
})();