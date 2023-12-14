import React from 'react'
import { useState, useEffect } from 'react'

import TemperatureCell from "./TemperatureCell";
import $ from "jquery";
import WeatherNow from "./WeatherNow";

let api_key = "ffbf2644696320c093e8fb7126d926e9"
let days5_url = "https://api.openweathermap.org/data/2.5/forecast?appid="
    + api_key +"&units=metric&lang=ru"

let today_url = "https://api.openweathermap.org/data/2.5/weather?appid="
    + api_key + "&units=metric&lang=ru"

function WeatherBox({coords, is_today}) {
    let [data, setData] = useState(null)

    function get_data(is_today){
        let url

        if (is_today) url = today_url
        else url = days5_url

        $.ajax({
            method: "GET",
            url: url,
            data: coords,
            dataType: 'json',
            success: function(response){
                //console.log(response)
                setData(response)
            },
            error: function(response){
                console.log(response)
            }
        });
    }

    useEffect(()=>{get_data(is_today)}, [coords])

    if (data === null){
        return null;
    }else if (is_today) {
        return (
            <div className="weather-box">
                <WeatherNow main={data.main} weather={data.weather[0]}
                            time={data.dt} offset={data.timezone}
                            wind={data.wind} sys={data.sys}></WeatherNow>
            </div>
        );
    } else {
        let list = data.list
        return (
            <div className="weather-box">
                {list.map((item, index) => {
                    return (<TemperatureCell key={index} temp={item.main.temp} feels={item.main.feels_like}
                                         icon_id={item.weather[0].icon} time={item.dt}
                                         sunrise={data.city.sunrise} sunset={data.city.sunset}
                                         offset={data.city.timezone}></TemperatureCell>);})
                }
            </div>
        );
    }
}

export default WeatherBox