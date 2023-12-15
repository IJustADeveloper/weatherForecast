import './App.css';
import React from 'react'
import { useState, useEffect } from 'react'
import WeatherBox from "./WeatherBox";
import {YMaps, Map, Placemark} from "@pbe/react-yandex-maps";
import CityPicker from "./CityPicker";


function App() {
    const [coords, setCoords] = useState({lat: 59.9386, lon: 30.3141})
    const [width, setWidth] = React.useState(window.innerWidth);

    function getDevicePosition(){
        navigator.geolocation.getCurrentPosition((pos)=>{
            setCoords({lat: pos.coords.latitude, lon: pos.coords.longitude})
        })
    }

    function changeCoords(event){
        let event_coords = event._sourceEvent.originalEvent.coords
        setCoords({lat: event_coords[0], lon: event_coords[1]})
    }

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResizeWindow);

        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    useEffect(()=>{getDevicePosition()}, [])

    if (window.innerWidth >= 10000){ // вариант того как могла бы выглядеть разметка на большем разрешении (вместо 10000 напишите 630)
        return(
            <div className="App">
                <div className="center">
                    <CityPicker coords={coords} setCoords={setCoords}></CityPicker>
                    <div className={"flex-row"} style={{width: "90%", height: "100%"}}>
                        <YMaps>
                            <Map style={{width: "30%" ,minWidth: "200px", height: "420px"}} onClick={(event)=>{changeCoords(event)}}
                                 defaultState={{center: [coords.lat, coords.lon], zoom: 10}}
                                 state={{center: [coords.lat, coords.lon], zoom: 10}} >
                                <Placemark geometry={[coords.lat, coords.lon]}></Placemark>
                            </Map>
                        </YMaps>
                        <div style={{width: "70%"}}>
                            <WeatherBox coords={coords} is_today={true}></WeatherBox>
                            <WeatherBox coords={coords} is_today={false}></WeatherBox>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="App">
                <div className="center">
                    <CityPicker coords={coords} setCoords={setCoords}></CityPicker>

                    <YMaps>
                        <Map style={{width: "90%" ,minWidth: "200px", height: "250px"}} onClick={(event)=>{changeCoords(event)}}
                             defaultState={{center: [coords.lat, coords.lon], zoom: 10}}
                             state={{center: [coords.lat, coords.lon], zoom: 10}} >
                            <Placemark geometry={[coords.lat, coords.lon]}></Placemark>
                        </Map>
                    </YMaps>
                    <div style={{width: "90%"}}>
                        <WeatherBox coords={coords} is_today={true}></WeatherBox>
                        <WeatherBox coords={coords} is_today={false}></WeatherBox>
                    </div>

                </div>
            </div>
        );
    }

}

export default App;
