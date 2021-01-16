$(function () {
    var cityHistory = [];

    $("#submitBtn").on("click", function (event) {
        event.preventDefault()
        cityName = $("#cityName").val().trim()

        displayCity()
        returnHistory() 
        
    })

    $(".historyBtn").on("click", function (event) {
        event.preventDefault()
        cityName = $(this).val()

        displayCity()
    })

    function displayCity() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=18687cf1c7c1d78e93e8472d225dee33&units=imperial"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $("#city-title").text(response.name)
            $("#date").text(moment().format("MMM Do YYYY"));
            $("#temp").text("Temperature: " + response.main.temp + " °F");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");
            $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
            cityHistory.push(response.name);
            localStorage.setItem("oldCities", JSON.stringify(cityHistory))

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var UVquery = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=18687cf1c7c1d78e93e8472d225dee33&units=imperial"

            $.ajax({
                url: UVquery,
                method: "GET"
            }).then(function (boogers) {
                console.log(boogers)
                $("#UV").text("UV Index: " + boogers.current.uvi);

                for (let i = 0; i < 5; i++) {
                    $("#day" + i).text(moment().add((i + 1), 'days').format("MMM Do"));
                    var icon = boogers.daily[(0 + i)].weather[0].icon;
                    var dailyicon = "https://openweathermap.org/img/w/" + icon + ".png";
                    $("#day" + i + "icon").attr("src", dailyicon);
                    var dailytemp = boogers.daily[(0 + i)].temp.day;
                    $("#day" + i + "temp").text("Temp: " + dailytemp + " °F");
                    var dailyhumid = boogers.daily[(0 + i)].humidity;
                    $("#day" + i + "humid").text("Humidity: " + dailyhumid + " %");
                }
            });
        });
    }

    function returnHistory() {
        cityHistory = JSON.parse((localStorage.getItem("oldCities"))) || []
        for (let index = 0; index < 6; index++) {
            var result = cityHistory[cityHistory.length - index];
            if (result) {
                var recentCities = $("#recentCities");
                var recent = $("<button>").attr({id: "recent" + index, class: "historyBtn w3-button w3-block w3-dark-grey"});
                recent.text(result);
                recentCities.append(recent);

            }


        }
    }

    

});    