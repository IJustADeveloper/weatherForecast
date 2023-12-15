import React from 'react'

function WHP_line ({wind, main}){
    const hpa_mult = 0.750064
    if (window.innerWidth >= 420){
        return(<div className={"flex-row"}>
            <i className={"wind icon"}></i>
            <p className={"icon-text"}>{wind.speed}м/с</p>
            <i className={"humidity icon"}></i>
            <p className={"icon-text"}>{main.humidity}%</p>
            <i className={"pressure icon"}></i>
            <p className={"icon-text"}>{Math.round(main.pressure*hpa_mult)} мм. рт. ст.</p>
        </div>);
    }else{
        return(<div className={"flex-column"}>
            <div className={"flex-row"} style={{marginBottom: "5px"}}>
                <i className={"wind icon"}></i>
                <p className={"icon-text"}>{wind.speed}м/с</p>
                <i className={"humidity icon"}></i>
                <p className={"icon-text"}>{main.humidity}%</p>
            </div>
            <div className={"flex-row"}>
                <i className={"pressure icon"}></i>
                <p className={"icon-text"}>{Math.round(main.pressure*hpa_mult)} мм. рт. ст.</p>
            </div>
        </div>);
    }
}

function WeatherNow({time, main, wind, weather, offset, sys}){

    const date = new Date(new Date().getTime() + offset*1000)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    time = new Date((time+offset)*1000)
    const data_hours = time.getUTCHours()
    const data_minutes = time.getUTCMinutes()

    let sunrise_hour = new Date((sys.sunrise+offset)*1000).getUTCHours()
    let sunset_hour = new Date((sys.sunset+offset)*1000).getUTCHours()

    let daytime
    if (hours + 3 > sunrise_hour){
        if (hours <= sunrise_hour){
            daytime = "dawn"
        }else if (hours + 3 <= sunset_hour){
            daytime = "day"
        }else if (hours <= sunset_hour){
            daytime = "dawn"
        }
        else{
            daytime='night'
        }
    }else {
        daytime = "night"
    }

    return(
        <div className={"weather-cell "+daytime}>
            <p>Сейчас {hours}:{minutes < 10 ? "0" + minutes : minutes}.
                Данные на: {data_hours}:{data_minutes < 10 ? "0" + data_minutes : data_minutes}</p>
            <div className={"flex-row"}>
                <p className={"temperature"} style={{margin: "0 10px 0 0"}}>{main.temp > 0 && "+"}{Math.round(main.temp)}&deg;</p>
                <div><img src={"https://openweathermap.org/img/wn/"+ weather.icon +".png"}/></div>
                <div className={"flex-column"}>
                    <p className={"weather-desc"}>{weather.description}</p>
                    <p className={"feels"}>ощущается как {Math.round(main.feels_like)}&deg;</p>
                </div>
            </div>
            <WHP_line wind={wind} main={main}></WHP_line>
        </div>
    );
}

export default WeatherNow