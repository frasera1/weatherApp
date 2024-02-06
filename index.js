//const weatherstack = require("api.weatherstack.com");

$(document).ready(function(){
  $('.short').hide();
  if(navigator.geolocation) {
    var currentPosition = '';
    navigator.geolocation.getCurrentPosition(function(position) {
      currentPosition = position;
      //set latitude and longitude
      var latitude = currentPosition.coords.latitude;
      var longitude = currentPosition.coords.longitude;

      var getdata = function(url, latitude,longitude){
          return $.getJSON(url + latitude + ',' + longitude, function(data){
            //JSON.stringyy turns a javascript object into
            //JSON text and stores that JSON text in a string.
            var data = JSON.stringify(data);
            //JSON.Parse turns a string of JSON text into a Javascript object
            var json = JSON.parse(data);
            console.log(json)
    
            var country = json.location.country;
            var city = json.location.name;
            var state = json.location.region;
            var temp = json.current.temperature;
            //var temp = 80;
            var last_updated = json.current.observation_time;

            var mode = json.request.unit;
            var wind_speed_unit = ''
            var weather_description = json.current.weather_descriptions;
            var temperature_unit = ''
            if (mode == 'm') {
              wind_speed_unit = ' kph'
              temperature_unit = ' C'
            } else {
              wind_speed_unit = ' mph'
              temperature_unit = ' F'
            }

            var wind = json.current.wind_speed;
            var humidity = json.current.humidity;
            var time = json.location.localtime.split(' '[1]);
            var cloud = json.current.cloud;
            //var bgimage = json.current.weather_icons;
            var bgimage = '/waves-3879331_1280.jpg'
            var bgimage_hot = '/pngtree_clouds sunny day photography map_6577315.png'
            
            $('#weather').html(city + ', ' + state + ', ' + country);
            if ( mode == "m" && temp < 18 || mode == "f" || temp < 64){
              $('.grey-jumbo').css({
                backgroundImage: 'url(' + bgimage + ')'
              })
              $('#temp').html("<h1>It's a pretty cold day today... <hr></h1>");
            } else {
              $('.grey-jumbo').css({
                backgroundImage: 'url(' + bgimage_hot + ')'
              })
              $('#temp').html("<h1>It's a sunny day today... <hr></h1>");
            }
    
            $('#info1').html(time);
            $('#info2').html('Wind ' + wind + wind_speed_unit);
            $('#info3').html(temp + temperature_unit);
            $('#info5').html(weather_description);
            $('#info6').html('Humidity ' + humidity + '%');
            $('.short').show();
          })
      }

      //var url = 'https://api.meteomatics.com/2024-02-04T03:25:00.000-05:00/t_2m:F/38.8051095,-77.0470229/json?model=mix';
      //var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + ',&longitude=' + longitude + ',&daily=temperature_2m_max,&forecast_days=1';

      var url = 'http://api.weatherstack.com/current?units=m&access_key=ecb45726141bb69a7e786d6bfc7b5e09&query=';
      getdata(url, latitude, longitude);

      var yes = true;
        $('#switch').on('click', function(){
          if(yes) {
            url = 'http://api.weatherstack.com/current?units=f&access_key=ecb45726141bb69a7e786d6bfc7b5e09&query=';
            getdata(url, latitude, longitude);
            $('#switch').html('Show in Celcius')
            yes = false;
          } else {
            url = 'http://api.weatherstack.com/current?units=m&access_key=ecb45726141bb69a7e786d6bfc7b5e09&query=';
            getdata(url, latitude, longitude);
            $('#switch').html('Show in Farenheight')
            yes = true;
          }
        });

      
      

        

     
      
    })
  }
})