import React, { useEffect, useState } from "react";
import Holidays from 'date-holidays';
import './Selector.css';


const HolidaySelector = ({ country, onHolidayChange })=>{

  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState("");
  const currentYear = new Date().getFullYear();
  const currentday = new Date()

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleSelectChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const years = Array.from({length: 20}, (_, i) => currentYear + i);

  useEffect(() => {
    if (country) {
      const hd = new Holidays(country);
      
      setHolidays(hd.getHolidays(selectedYear).filter(holiday => (holiday.type === 'public'&&currentday<=holiday.start)));
    }
  }, [country, selectedYear]);

  const handleHolidayChange = (event) => {
    const holidayName = event.target.value
    const selectedDate = holidays.find(Hday => Hday.name === holidayName);
    setSelectedHoliday(selectedDate);
    
    if(onHolidayChange){
      onHolidayChange(selectedDate);
      console.log(selectedDate)
    }
  };

  return (
    <div className="Selector">
      <label>
        <select value={selectedYear} onChange={handleSelectChange}>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select onChange={handleHolidayChange}>
          <option value="">Select a holiday</option>
          {holidays.map((holiday, index) => (
            <option key={index} value={holiday.name}>
              {holiday.name} - {holiday.date}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default HolidaySelector;
