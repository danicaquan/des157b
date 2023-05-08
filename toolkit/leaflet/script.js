(function(){
    'use strict';

    // add your script here
    const map = L.map('map').setView([34.14297375653912, -118.25729057109886], 10);
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

   L.polygon([
        [34.18346161259565, -118.31218562792391],
        [34.146360506170794, -118.25282356774241],
        [34.19346161259565, -118.29218562792391]
    ]).addTo(map)
    .bindPopup('<h1>Fun Times During Spring Break: <em>Round1 Bowling & Amusement</em></h1><p>I ate some hot pot with my friend Bella and then we went to this arcade :3 We got to play some Japanese rhythm/dance games, and channel the VOCALOID and JPOP into our souls WAHOOOO ✩ We even got to play one of them for free, which was quite lucky! Bella also won a bear from the claw machine.</p><img src="images/round1.jpg">', {
        maxWidth: "auto"
    });

    var circle = L.circle([34.43043735477613, -118.40906299048342], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1000
    }).addTo(map)
    .addTo(map)
    .bindPopup('<h1>Fun Times During Spring Break: <em>Skrunklie Time!</em></h1><p>Here is a Momo in her little ducky jammies!</p><p>She is eternal. She <em>is</em> the moment.</p><img src="images/moosh.jpg">', {
        maxWidth: "auto"
    });

    L.marker([
        33.83306303687541, -117.91632872713855]).addTo(map)
    .bindPopup('<h1>Fun Times During Spring Break: <em>Requiem: Coffee, Tea, and Fantasy</em></h1><p>I had really wanted to come here and finally did! Requiem is a really cool cafe that has a lot of game themed drinks and food. It is also a very aesthetic location. They had this little grotto the looks like a wisteria forest, but it was reserved when we went so we did not get to sit there... maybe next time >:)</p><img src="images/requiem.jpg">', {
        maxWidth: "auto"
    });

    L.popup()
    .setLatLng([33.82817962834569, -118.9541941039903])
    .setContent("Hello! Feel free to click on any of the items on the map.")
    .openOn(map);

    L.marker([
        34.12817962834569, -118.0541941039903]).addTo(map)
    .bindPopup('<h1>Fun Times During Spring Break: <em>Asayoru Maid Cafe</em></h1><p>I went here with a bunch of friends. I got to have the maid cafe experience, eat some cute things, and our chosen maid decorated a polaroid we got to take home (you had to pay for it, of course). It was a fun experience (thanks Bella for bringing us here)! We also watched the D&D movie at the Universal City Center afterwards.</p><img src="images/asayoru.png">', {
        maxWidth: "auto"
    });

    
}());