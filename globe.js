document.addEventListener('DOMContentLoaded', function () {
    var pingVisible = {
      usa: false,
      china: false,
      uk: false,
      russia: false,
      germany: false,
      japan: false,
      france: false,
      italy: false,
      australia: false,
      netherlands: false
    };
  
    var countryCoordinates = {
      usa: [-95.7129, 37.0902],    // USA
      china: [104.1954, 35.8617],  // China
      uk: [-3.435, 55.3781],       // UK
      russia: [105.3188, 61.5240], // Russia
      germany: [10.4515, 51.1657], // Germany
      japan: [138.2529, 36.2048],  // Japan
      france: [2.2137, 46.6034],   // France
      italy: [12.5674, 41.8719],    // Italy
      australia: [133.7751, -25.2744], // Australia
      netherlands: [5.2913, 52.1326] // Netherlands
    };
  
    function deactivateAllPings(globe) {
      for (var country in pingVisible) {
        if (pingVisible[country]) {
          globe.plugins.pings.add(countryCoordinates[country][0], countryCoordinates[country][1], { color: 'transparent', ttl: 0, radius: 0 });
          pingVisible[country] = false;
        }
      }
    }
  
    function rotateGlobeToCoordinates(globe, coordinates) {
      var rotate = [coordinates[0] * -1, -coordinates[1]];
      globe.projection.rotate(rotate);
    }
  
    function togglePing(globe, country, coordinates, button) {
      var globeElement = document.getElementById('globe');
      var navbarElement = document.getElementById('globenavbar');
  
      if (!pingVisible[country]) {
        deactivateAllPings(globe); // Deactivate all other pings
        globe.plugins.pings.add(coordinates[0], coordinates[1], { color: 'red', ttl: 0, radius: 5 });
        pingVisible[country] = true;
        rotateGlobeToCoordinates(globe, coordinates); // Rotate globe to the country
        toggleActiveClass(button); // Activate the button
  
        // Add transition classes to trigger the slide-in and slide-out animations
        globeElement.classList.add('slideIn');
        navbarElement.classList.add('slideout');
      } else {
        globe.plugins.pings.add(coordinates[0], coordinates[1], { color: 'transparent', ttl: 0, radius: 0 });
        pingVisible[country] = false;
        button.classList.remove('active');
  
        // Reset the transitions after deactivation
        globeElement.classList.remove('slideIn');
        navbarElement.classList.remove('slideout');
      }
    }
  
    function toggleActiveClass(activeButton) {
      var buttons = document.querySelectorAll('.button'); // Assumes all buttons have class "button"
      buttons.forEach(function (button) {
        button.classList.remove('active');
      });
      activeButton.classList.add('active');
    }
  
    function setupPingButtons(globe) {
    document.getElementById('usaButton').addEventListener('click', function () {
      togglePing(globe, 'usa', countryCoordinates.usa, this);
      toggleModal(usa, "USA-modalborder" , 'usaprogressbars');
    });
    
    document.getElementById('chinaButton').addEventListener('click', function () {
      togglePing(globe, 'china', countryCoordinates.china, this);
      toggleModal(china, "china-modalborder");
    });
    
    document.getElementById('ukButton').addEventListener('click', function () {
      togglePing(globe, 'uk', countryCoordinates.uk, this);
      toggleModal(uk, "uk-modalborder");
    });
    
    document.getElementById('russiaButton').addEventListener('click', function () {
      togglePing(globe, 'russia', countryCoordinates.russia, this);
      toggleModal(russia, "russia-modalborder");
    });
    
    document.getElementById('germanyButton').addEventListener('click', function () {
      togglePing(globe, 'germany', countryCoordinates.germany, this);
      toggleModal(germany, "germany-modalborder");
    });
    
    document.getElementById('japanButton').addEventListener('click', function () {
      togglePing(globe, 'japan', countryCoordinates.japan, this);
      toggleModal(japan, "japan-modalborder");
    });
    
    document.getElementById('franceButton').addEventListener('click', function () {
      togglePing(globe, 'france', countryCoordinates.france, this);
      toggleModal(france, "france-modalborder");
    });
    
    document.getElementById('italyButton').addEventListener('click', function () {
      togglePing(globe, 'italy', countryCoordinates.italy, this);
      toggleModal(italy, "italy-modalborder");
    });
    
    document.getElementById('australiaButton').addEventListener('click', function () {
      togglePing(globe, 'australia', countryCoordinates.australia, this);
      toggleModal(australia, "australia-modalborder");
    });
    
    document.getElementById('netherlandsButton').addEventListener('click', function () {
      togglePing(globe, 'netherlands', countryCoordinates.netherlands, this);
      toggleModal(netherlands, "netherlands-modalborder");
    });
  }
  
  
    function isPointVisible(globe, coordinates) {
      var rotation = globe.projection.rotate();
      var deltaLongitude = (rotation[0] + coordinates[0]) % 360;
      if (deltaLongitude > 180) deltaLongitude -= 360;
      return Math.abs(deltaLongitude) <= 90; // Point is visible if within +/- 90 degrees of rotation
    }
  
    try {
      var globe = planetaryjs.planet();
      globe.loadPlugin(planetaryjs.plugins.earth({
        topojson: { file: 'https://cdn.jsdelivr.net/npm/planetary.js@1.1.3/dist/world-110m.json' },
        // oceans: { fill: '#2B2D31' },
        // land: { fill: '#3A3D3F' },
        // borders: { stroke: '#686868' }
        oceans: { fill: '#003366 ' },
        land: { fill: '#4B8E4B  ' },
        borders: { stroke: '#A0A0A0 ' }
      }));
      globe.loadPlugin(planetaryjs.plugins.pings());
      globe.loadPlugin(planetaryjs.plugins.zoom({ scaleExtent: [100, 200] }));
      globe.loadPlugin(planetaryjs.plugins.drag({
        onDragStart: function () {
          this.plugins.autorotate.pause();
        },
        onDragEnd: function () {
          this.plugins.autorotate.resume();
        }
      }));
      globe.loadPlugin(autorotate(10));
  
      globe.projection.scale(200).translate([200, 200]);
      var canvas = document.getElementById('rotatingGlobe');
      if (canvas) {
        globe.draw(canvas);
        setupPingButtons(globe);
      } else {
        console.error('Canvas element not found.');
      }
  
      globe.onDraw(function () {
        var context = globe.context;
        var projection = globe.projection;
  
        for (const country in pingVisible) {
          if (pingVisible[country]) {
            var coordinates = countryCoordinates[country];
            if (isPointVisible(globe, coordinates)) {  // Check if ping is visible
              var pixel = projection(coordinates);
              context.beginPath();
              context.arc(pixel[0], pixel[1], 5, 0, 2 * Math.PI, false);
              context.fillStyle = 'red';
              context.fill();
            }
          }
        }
      });
  
      function autorotate(degPerSec) {
        return function (planet) {
          var lastTick = null;
          var paused = false;
          planet.plugins.autorotate = {
            pause: function () { paused = true; },
            resume: function () { paused = false; }
          };
          planet.onDraw(function () {
            if (paused || !lastTick) {
              lastTick = new Date();
            } else {
              var now = new Date();
              var delta = now - lastTick;
              var rotation = planet.projection.rotate();
              rotation[0] += degPerSec * delta / 1000;
              if (rotation[0] >= 180) rotation[0] -= 360;
              planet.projection.rotate(rotation);
              lastTick = now;
            }
          });
        };
      }
    } catch (error) {
      console.error('Error initializing globe:', error);
    }
  });
  