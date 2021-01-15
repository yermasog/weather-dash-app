$(function () {
    // console.log("ready!");
    var cityHistory = [];
    var cityName = ""
    var queryURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=18687cf1c7c1d78e93e8472d225dee33&units=imperial"

    $("#submitBtn").on("click", function () {
        cityName = $("#submitBtn").val().trim()
        // console.log(cityName)
    })

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        // console.log(response.name)

        $("#city-title").text(response.name);
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
            // console.log(boogers)
            $("#UV").text("UV Index: " + boogers.current.uvi);

            //DATE
            var dailyicon = "https://openweathermap.org/img/w/04d.png"
            $("#todayicon").attr("src", dailyicon)
            // console.log(dailyicon)

            var dailytemp = boogers.daily[0].temp.day
            $("#todaytemp").text("Temp: " + dailytemp + " °F")

            var dailyhumid = boogers.daily[0].humidity
            $("#todayhumid").text("Humidity: " + dailyhumid + " %")




        });
    });
    function returnHistory() {
        cityHistory = JSON.parse((localStorage.getItem("oldCities"))) || []
        for (let index = 0; index < 6; index++) {
            var result = cityHistory[cityHistory.length - index];
            if (result) {
                $(".recent-cities").text(result)
            }


        }
    }

    returnHistory()

});    