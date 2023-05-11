import React, { useState, useEffect } from 'react';
import axios from 'axios';


function formatDate(date) {
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0'); 

    return `${yyyy}-${mm}-${dd}`;
}


const WeatherInfo = ({city, holiday})=>{
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "CZHL68H7GRSRD4A64QP7Z7GQG";
    
    
    useEffect(() => {

    if(city && holiday){
        const location = city.latitude + ',' + city.longitude;
        const startDate = formatDate(holiday.start);
        const endDate = formatDate(holiday.end);
        
        axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=${apiKey}&contentType=json`)
            .then(response => setWeatherData(response.data.days))
            .catch(error => console.error('Error:', error));
    }
    }, [city,holiday]);

    if (!weatherData) {
        return <div><h2>Weather information Loading...</h2></div>;
    }

    return (
    <ul>
        <h1>Weather information(weathrs over 15 days are historical.)</h1>
        {weatherData.map((day, index) => (
        <li key={index}>
            
            <h2>Date: {day.datetime}</h2>
            <p>Max Temperature: {day.tempmax}</p>
            <p>Min Temperature: {day.tempmin}</p>
            <p>Feels Like: {day.feelslike}</p>
            <p>Humidity: {day.humidity}</p>
            <p>Conditions: {day.conditions}</p>
        </li>
        ))}
    </ul>
    );
}
export default WeatherInfo;