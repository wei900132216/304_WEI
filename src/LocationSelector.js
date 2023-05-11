import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import countryRegionData from 'country-region-data/data.json';
import { Country, State, City } from 'country-state-city';
import './Selector.css';


const LocationSelector = ({ onCountryChange, onCountryCodeChange, onRegionChange, onCityChange}) => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [cities, setCities] = useState([]);
  const [countryCode, setCountryCode] = useState('');
  const [regionCode, setRegionCode] = useState('');
  const [selectedCity, setCity] = useState('');

  const getCountryCodes = (countryName) => {
    const countryData = countryRegionData.find(
      (country) => country.countryName === countryName
    );
  
    if (countryData) {
      const countryShortCode = countryData.countryShortCode;
  
      return countryShortCode;
    }
  
    return null;
  };
  
  const getRegionCodes = (countryName, regionName) => {
    const countryData = countryRegionData.find(
      (country) => country.countryName === countryName
    );
  
    if (countryData) {
      const regionData = countryData.regions.find(
        (region) => region.name === regionName
      );
  
      if (regionData) {
        const countryShortCode = countryData.countryShortCode;
        const regionShortCode = regionData.shortCode;
  
        return { countryShortCode, regionShortCode };
      }
    }
  
    return null;
  };
  const fetchCities = (countryCode, regionCode) => {
    const citiesList = City.getCitiesOfState(countryCode, regionCode);
    return citiesList;
  };


  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setRegion('');
    setCities([]);
    const countryShortCode = getCountryCodes(selectedCountry);
    
    if (onCountryChange) {
      onCountryChange(selectedCountry);
    }
    if(onCountryCodeChange){
      onCountryCodeChange(countryShortCode)
    }
  };

  const handleRegionChange = (selectedRegion) => {
    setRegion(selectedRegion);
    const countryShortCode = getCountryCodes(country);
    const { regionShortCode } = getRegionCodes(country, selectedRegion);
    

    if (countryShortCode && regionShortCode) {
      setCountryCode(countryShortCode);
      setRegionCode(regionShortCode);
      const fetchedCities = fetchCities(countryShortCode, regionShortCode);
      console.log(fetchedCities.length)
      setCities(fetchedCities);
    }

    if (onRegionChange) {
      onRegionChange(selectedRegion);
    }
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    const selectedCity = cities.find(city => city.name === cityName);
    setCity(selectedCity);
    if(onCityChange){
      onCityChange(selectedCity)
    }
  };

  return (
    <div className="Selector">
      <div>
        <CountryDropdown
          value={country}
          onChange={handleCountryChange}
          style={{
            width: '50%',
            height: '40px',
            fontSize: '16px',
            padding: '0 8px',
            margin: '8px 0',
            borderRadius: '4px'
          }}
        />
      </div>
      <div>
        <RegionDropdown
          country={country}
          value={region}
          onChange={handleRegionChange}
          style={{
            width: '50%',
            height: '40px',
            fontSize: '16px',
            padding: '0 8px',
            margin: '8px 0',
            borderRadius: '4px'
          }}
          defaultValue="Select Region"
        />
      </div>
        <select onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
            
          ))}
        </select>
      <div>
        
      </div>
    </div>
  );
};

export default LocationSelector;
