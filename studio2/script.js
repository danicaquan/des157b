(function(){
    'use strict';
    console.log('running js');

    let globalData;
    const entryPoints = document.querySelectorAll('.entry');
    const infoBtn = document.getElementById('openinfo');
    const closeBtn = document.getElementById('closeinfo');

    infoBtn.addEventListener('click', function(){
        document.querySelector('#overlay').className= 'open';     
    });
    closeBtn.addEventListener('click', function(){
        document.querySelector('#overlay').className= 'closed';     
    });
    
    async function getData() {
        const getData = await fetch ('data.json');
        const data = await getData.json();
        globalData = Object.values(data);
        console.log(globalData);
        console.log(globalData[0].name)
        
        
        for (let i = 0; i<entryPoints.length; i++) {
            entryPoints[i].addEventListener('mouseover', function(data){
                entryPoints[i].style.width = '30vw';
                entryPoints[i].style.zIndex = '100';
                entryPoints[i].style.backgroundImage = `linear-gradient(transparent 50%, grey 95%), url(images/${globalData[i].image})`;
                entryPoints[i].innerHTML = outputHTML(globalData, i);
            });
            entryPoints[i].addEventListener('mouseout', function(){
                entryPoints[i].style.width = '0.5vw';
                entryPoints[i].style.zIndex = '-1';
                entryPoints[i].style.backgroundImage = 'linear-gradient(transparent 50%, grey 95%)';
                entryPoints[i].innerHTML = ``
            });
        }
    }
    
    function outputHTML(data, dataPoint) {
        let html = `<h3>${data[dataPoint].date}</h3>`;
        html += `<div><ul><li>Obtained: ${data[dataPoint].name}</li>`;
        html += `<li>Took ${data[dataPoint].pity} rolls</li>`;
        html += `<li>50/50? ${data[dataPoint].fifty_fifty}</li>`;
        html += `<li>Rolled on: ${data[dataPoint].banner} banner</li></ul></div>`;
        return html;
    }
    

    getData();
})();