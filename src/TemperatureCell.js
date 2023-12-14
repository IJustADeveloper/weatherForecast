import React from 'react'

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август' ,'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

function TemperatureCell({temp, icon_id, feels, time, sunrise, sunset, offset}){

    time = new Date((time+offset)*1000);

    let hour = time.getUTCHours()
    let sunrise_hour = new Date((sunrise+offset)*1000).getUTCHours()
    let sunset_hour = new Date((sunset+offset)*1000).getUTCHours()

    let daytime
    if (hour + 3 > sunrise_hour){
        if (hour <= sunrise_hour){
            daytime = "dawn"
        }else if (hour + 3 <= sunset_hour){
            daytime = "day"
        }else if (hour <= sunset_hour){
            daytime = "dawn"
        }
        else{
            daytime='night'
        }
    }else {
        daytime = "night"
    }

    return (
        <div className={"weather-cell " + daytime}>
            <p className="temperature">{temp > 0 && "+"}{Math.round(temp)}&deg;</p>
            <div><img src={"https://openweathermap.org/img/wn/"+ icon_id +".png"}/></div>
            <p className="feels">ощущается как {Math.round(feels)}&deg;</p>
            <div className="time">{months[time.getUTCMonth()]}, {time.getUTCDate()}</div>
            <div className="time">{time.getUTCHours()}:{time.getUTCMinutes() < 10 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()}</div>
        </div>
    );
}

export default TemperatureCell