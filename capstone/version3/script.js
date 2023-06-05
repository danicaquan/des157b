(function(){
  'use strict';
   console.log('running js');

   
  Parse.initialize(
    'cf1hEPBLxbDVrH6BUExxjngqhyWdPdk47IFTjh94',
    'cKlkpneLOfn0CQlekJ2Jygcu79yMAmsfojUpFFt6'
  );
  Parse.serverURL = 'https://parseapi.back4app.com'; 
  const brickWall = document.querySelector('main');
  const inputs = document.querySelectorAll('form input:not([type=submit])');

  alert("To preface: I am very well aware that this is lacking visually and as a result, usability will be a little impacted. I am still working on formatting and making it look nicer -- I have been focusing more on making the functions instead.")

  window.onload = function () {
    displayBricks()
  }

  document.getElementById('open-page').addEventListener('click', function(event){
    event.preventDefault();
    brickWall.style.transform = 'scale(0.75)';
    document.getElementById('title-page').className = 'hidden';
    document.querySelector('#controls').style.opacity = '1';
    document.querySelector('body').style.overflow = 'visible';
    document.querySelector('aside').className= 'showing';
    dragAround();
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

      

  let _startX = 0,
  _startY = 0,
  _scrollTop = 0,
  _scrollLeft = 0;


  function dragAround(){

  document.onmousedown = OnMouseDown;
  document.onmouseup = OnMouseUp;
      }

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

  function findCenter() {
    const halfX = document.querySelector('#center-seal').offsetLeft - document.querySelector('#center-seal').offsetWidth/2.5;
    const halfY = document.querySelector('#center-seal').offsetTop ;
    window.scrollTo(halfX, halfY);
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
        theListItem.setAttribute("class", `brick`);
        theListItem.innerHTML = `
        
        <h3>${name}</h3>
        <p>${thoughts}</p>`;

        document.querySelector('main').append(theListItem);
    })

    const brickNum = document.querySelectorAll('section');
    const gridColumns = Math.round(Math.sqrt(brickNum.length));
    //console.log(gridColumns);

    document.querySelector('main').style.gridTemplateColumns = `repeat(${gridColumns}, 50em)`;

    const gridCenter = Math.round(gridColumns/2);

    document.querySelector('#center-seal').style.gridColumn = `${gridCenter} / span 1`;
    document.querySelector('#center-seal').style.gridRow = `${gridCenter} / span 2`;

    findCenter();

    const bricks = document.querySelectorAll('.brick');
      for (const brick of bricks) {
          brick.addEventListener('click', function(event){
            const brickId = event.currentTarget.id;
            console.log(brickId);
            const brickName = document.querySelector(`#${brickId} h3`).innerText;
            const brickThoughts = document.querySelector(`#${brickId} p`).innerText;
            document.querySelector("#submission-container h2").innerHTML = brickName;
            document.querySelector("#submission-container p").innerHTML = brickThoughts;
            document.querySelector('article').className = "showing"
        })
      }

  } catch (error) {
      console.error('Error while fetching Submissions', error);
    }
  }

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
      const newBrickData = new Parse.Object('Submissions');
      newBrickData.set('name', newBrick.name);
      newBrickData.set('thoughts', newBrick.thoughts);
      try {
        const result = await newBrickData.save();
        document.querySelector('form').className = "hidden";
        displayNewBrick()
        //console.log('Submissions created', result);
      } 
      catch (error) {
        console.error('Error while creating Submissions: ', error);
      }
      document.querySelector('#thanks').className = "showing"
    }
    //console.log (inputs)
    else {
      showErrors();
    }
  }

  function showErrors () {
    const errorText = document.createElement("p");
    errorText.setAttribute("id", `error`);
    document.querySelector('#write-submission').append(errorText);
    writeError(); 
  }

  function writeError() {
    const warning = `Please fill out all empty fields.`
    document.querySelector('#error').innerHTML = `${warning}`;
  }

  async function displayNewBrick() {
  const Submissions = Parse.Object.extend('Submissions');
  const query = new Parse.Query(Submissions);
  try {
    const results = await query.find();
    const id = results.at(-1).id;
    const name = results.at(-1).get('name');
    const thoughts = results.at(-1).get('thoughts');

    const theListItem = document.createElement("section");
    theListItem.setAttribute("id", `r-${id}`);
    theListItem.setAttribute("class", `brick`);

    theListItem.innerHTML = `
      <h3>${name}</h3>
      <p>${thoughts}</p>`;

    document.querySelector('main').append(theListItem);
    theListItem.addEventListener('click', function(){
        document.querySelector('article').className = "showing"
    })
    }
    catch (error) {
        console.error('Error while fetching Submissions', error);
    }
  }

  let navShow = false;
  document.querySelector('i').addEventListener("click", function(){
    if (navShow==false){
      document.querySelector('nav').className = "nav-showing"
      navShow=true;
    }
    else {
      document.querySelector('nav').className = "nav-hidden"
      navShow=false;
    }
      })
})();