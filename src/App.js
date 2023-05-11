import React, { useState } from "react";
import './App.css';
import LocationSelector from './LocationSelector';
import HolidaySelector from "./HolidaySelector";
import WeatherInfo from "./WeatherInfo";
import HotelInfo from './HotelInfo';


function App() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState('');
  const [countryCode, setCountryCode] = useState("");
  const [selectedDate, setSelectedHoliday] = useState('');
  

  return (
    <div className="App">
      <main>
        <LocationSelector 
        onCountryChange={setCountry} 
        onCountryCodeChange={setCountryCode} 
        onRegionChange={setRegion} 
        onCityChange={setCity}/>
        <HolidaySelector country={countryCode} onHolidayChange={setSelectedHoliday}/>
        <WeatherInfo city={city} holiday={selectedDate}/>
        <HotelInfo city = {city} holiday={selectedDate}/>
      </main>
    </div>
  );
}

export default App;