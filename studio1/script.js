
    (function() {
        'use strict';
        console.log('reading');
        
    //the things that are blocked out is how i previously coded it before we got the new video example
        const myVideo = document.querySelector('#myVideo');
        const fs = document.querySelector('.fa-expand');
        const loading = document.querySelector('.loading');
        const line0 = document.querySelector('#line0');
        const line1 = document.querySelector('#line1');
        const line2 = document.querySelector('#line2');
        const line3 = document.querySelector('#line3');
        const line4 = document.querySelector('#line4');
        const line5 = document.querySelector('#line5');
        const line6 = document.querySelector('#line6');
       /* const text = {
            start: [12, 15, 18, 21, 27],
            stop: [13, 16, 19, 22, 28],
        } */
        let escape = 'off';
        const popup = document.querySelector('#popup');
        const escapeScreen = document.querySelector('#escape');
        const escapeLines = document.querySelectorAll('#escape p');

        

        myVideo.addEventListener('playing', function(){
            loading.style.display = 'none';
            myVideo.className = 'showing'
        });

        setTimeout(function(){
            myVideo.play();
        }, 3000);

       /*  const intervalID = setInterval(checkTime, 1000);

        function checkTime() {
            console.log(myVideo.currentTime);
            for (let i = 0; i < text.start.length; i++) {
                if (text.start[i] < myVideo.currentTime && myVideo.currentTime < text.stop[i]) {    
                    darken();    
                    text.line[i].className = "showing";
                        myVideo.pause();
                        resume();
                        
                } else {
                        text.line[i].className = "hidden";
                        
                }
            }
        } */

        let timeIndex = 0;
        let timeChange = 0;

        myVideo.ontimeupdate = function(){
            //console.log(myVideo.currentTime);
            timeIndex = Math.floor(myVideo.currentTime);
            //console.log(timeIndex);
            if(timeIndex != timeChange){
                timeChange = timeIndex;
                console.log(timeChange);
                switch(timeChange){
                    case 2: line0.className = "showing"; 
                            myVideo.pause();
                            darken(); 
                            setTimeout(function() {
                                line0.className = "hidden";
                            }, 3000); 
                            resume();
                    break; 

                    case 11: line1.className = "showing"; 
                             myVideo.pause();
                             darken(); 
                             setTimeout(function() {
                                 line1.className = "hidden";
                             }, 3000); 
                             resume();
                    break; 
                    
                    case 15: line2.className = "showing"; 
                             myVideo.pause();
                             darken(); 
                             setTimeout(function() {
                                 line2.className = "hidden";
                            }, 3000), 
                            resume();
                     break; 

                    case 17: line3.className = "showing"; 
                             myVideo.pause();
                             darken(); 
                             setTimeout(function() {
                                 line3.className = "hidden";
                             }, 3000), 
                             resume();
                    break;

                    case 21: line4.className = "showing"; 
                             myVideo.pause();
                             darken(); 
                             setTimeout(function() {
                                 line4.className = "hidden";
                             }, 3000), 
                             resume();
                    break; 

                    case 27: line5.className = "showing"; 
                             myVideo.pause();
                             darken(); setTimeout(function() {
                                 line5.className = "hidden";
                             }, 3000), 
                             resume();
                     break;

                    case 28: line6.className = "showing"; 
                             myVideo.pause();
                             darken(); setTimeout(function() {
                                 line6.className = "hidden";
                            }, 3000), 
                            resume();
                    break; 

                    case 0: myVideo.pause(); 
                            setTimeout(function() {
                                myVideo.play();
                            }, 1000);;
                    break;
                }
            }   
        }

        function resume(){
            setTimeout(function() {
                myVideo.play();
                document.querySelector('#text').className = 'hidden';
            }, 3000);
        }

        function darken(){
            document.querySelector('#text').className = 'showing';
        }


        fs.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        document.addEventListener('keydown', function(event){
            if (event.key == 'Escape') {
                
                if (escape == 'off') {
                    escapeScreen.style.visibility = 'visible';
                    escapeLines[0].className = 'showing';
                    setTimeout(function(){
                        escapeLines[1].className = 'showing';
                    },1500);
                    setTimeout(function(){
                        escapeLines[2].className = 'showing';
                    },3000);
                    setTimeout(function(){
                        escapeLines[3].className = 'showing';
                    },4500);
                    myVideo.pause();
                    escape = 'on';
                }

                else if (escape == 'on') {
                    escapeScreen.style.visibility = 'hidden';
                    escape = 'off';
                    myVideo.play();
                    console.log(escape)
                }
            }
        });

        window.addEventListener('mousemove', function(event){
            popup.style.left = event.pageX + 'px'; 
            popup.style.top = event.pageY + 'px';
        });

        window.addEventListener('click', function(event){
            popup.style.color = 'rgb(231, 0, 0)'; 
            setTimeout(function(){
                popup.style.color = 'whitesmoke';
            },2000);
        });
})();