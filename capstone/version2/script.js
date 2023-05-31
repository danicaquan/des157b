(function(){
  'use strict';
   console.log('running js');

   
Parse.initialize(
  'cf1hEPBLxbDVrH6BUExxjngqhyWdPdk47IFTjh94', // This is your Application ID
  'cKlkpneLOfn0CQlekJ2Jygcu79yMAmsfojUpFFt6' // This is your Javascript key
);

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY

   const brickWall = document.querySelector('main');

   const halfX = document.querySelector('body').offsetWidth/2 - (window.innerWidth/2)
   const halfY = document.querySelector('body').offsetHeight/2 - (window.innerHeight/2);
   const inputs = document.querySelectorAll('form input:not([type=submit])');

   window.onload = function () {
    window.scrollTo(halfX, halfY);
   }
   window.onbeforeunload = function () {
    window.scrollTo(halfX, halfY);
  };
  console.log(halfX);
  console.log(halfY);


   document.getElementById('open-page').addEventListener('click', function(event){
    event.preventDefault();
    brickWall.style.transform = 'scale(0.75)';
    document.getElementById('title-page').className = 'hidden';
    document.querySelector('#controls').style.opacity = '1';
   })

   const innerDiv = document.querySelector('main');
    const zoominBttn = document.querySelector('#zoomin');
    const zoomoutBttn = document.querySelector('#zoomout');

    let scale = 1;

    zoominBttn.addEventListener('click', function(event){
        event.preventDefault();
        scale = scale + 0.25;
        innerDiv.style.transform = `scale(${scale})`;
    });

    zoomoutBttn.addEventListener('click', function(event){
        event.preventDefault();
        scale = scale - 0.25;
        innerDiv.style.transform = `scale(${scale})`;
    });

    const bricks = document.querySelectorAll('.brick');
    for (const brick of bricks) {
      brick.addEventListener('click', function(){
        
      document.querySelector('article').className = "showing"
       })
    }

    let _startX = 0,
    _startY = 0,
    _scrollTop = 0,
    _scrollLeft = 0;

document.onmousedown = OnMouseDown;
document.onmouseup = OnMouseUp;

function OnMouseDown(event) {
    document.onmousemove = OnMouseMove;
    _startX = event.clientX;
    _startY = event.clientY;
    _scrollTop = document.documentElement.scrollTop;
    _scrollLeft = document.documentElement.scrollLeft;
}

function OnMouseMove(event) {
    window.scrollTo({
        left: _scrollLeft + (_startX - event.clientX),
        top: _scrollTop + (_startY - event.clientY)
    });
}

function OnMouseUp() {
    document.onmousemove = null;
}

const backBtns = document.querySelectorAll(".back");
for (const btn of backBtns){
btn.addEventListener('click', function(event){
  event.preventDefault();
  document.querySelector('form').className = 'hidden';
  document.querySelector('article').className = 'hidden';
  });
}

  document.querySelector('#create').addEventListener('click', function(){

    document.querySelector('form').className = 'showing';
    });


  async function displayBricks() {
    const Submissions = Parse.Object.extend('Submissions');
  const query = new Parse.Query(Submissions);
  try {
    const results = await query.find();
    results.forEach(function(eachBrick){
      const id = eachBrick.id;
      const name = eachBrick.get('name');
      const thoughts = eachBrick.get('thoughts');

      const theListItem = document.createElement("section");
      theListItem.setAttribute("id", `r-${id}`);
      theListItem.innerHTML = `
      
      <h3>${name}</h3>
      <p>${thoughts}</p>`;

      document.querySelector('main').append(theListItem);
  })
 } catch (error) {
    console.error('Error while fetching Submissions', error);
  }
}

displayBricks();

document.querySelector('form').addEventListener("submit", function(event){
  event.preventDefault();
  addBrick();
});
  
  async function addBrick(){
      const newBrick = {};
  
      for (let i=0; i<inputs.length; i++) {
          let key = inputs[i].getAttribute('name');
          let value = inputs[i].value;
          newBrick[key] = value;
      }
      if (newBrick.name !="" && newBrick.thoughts != "") {
          
          const myNewObject = new Parse.Object('Submissions');
          myNewObject.set('name', 'A string');
          myNewObject.set('thoughts', 'A string');
          try {
            const result = await myNewObject.save();
            document.querySelector('form').className = "hidden";
                displayBricks()
            // Access the Parse Object attributes using the .GET method
            //console.log('Submissions created', result);
          } catch (error) {
            console.error('Error while creating Submissions: ', error);
          }
        }
      }
})();