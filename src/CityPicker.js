import React, {useEffect, useState} from 'react'

let cities_coords = [
    ["Санкт-Петербург", {lat: 59.9386, lon: 30.3141}],
    ["Москва", {lat: 55.757059922030585, lon: 37.616236388503744}],
    ["Вашингтон", {lat: 38.90912702571123, lon: -77.03202446683645}],
    ["Лондон", {lat: 51.57096555383436, lon: -0.13404121800102364}],
    ["Токио", {lat: 35.67995733561264, lon: 139.777259911125}],
]

function CityPicker({coords, setCoords}){
    const [value, setValue] = useState(-1)
    useEffect(()=>{
        if (value !== -1 && coords !== cities_coords[value][1]){
            setValue(-1);
        }
    }, [coords])
    return (
        <select value={value} onChange={(e)=>{if (e.target.value !== "-1") {setCoords(cities_coords[e.target.value][1]); setValue(e.target.value)}}} size={1}>
            <option key={-1} value={-1} selected>-</option>
            {cities_coords.map((item, index)=>{
                return(<option key={index} value={index}>{item[0]}</option>);
            })}
        </select>
    );
}

export default CityPicker