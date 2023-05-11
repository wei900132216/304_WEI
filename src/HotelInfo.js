import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDate(date) {
    let yyyy = date.getFullYear();
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let dd = String(date.getDate()).padStart(2, '0'); 

    return `${yyyy}-${mm}-${dd}`;
}

const HotelInfo = ({city, holiday})=>{
    
    const [hotelList, setHotelList] = useState(null);
    const [msg, setMsg] = useState('')
    
    useEffect( () => {
        if(city&&holiday){
            console.log(115554)
            const latitude = city.latitude;
            const longitude = city.longitude;
            const checkIn = formatDate(holiday.start);
            const checkOut = formatDate(holiday.end);
            console.log(latitude)
            console.log(longitude)
            const options = {
                method: 'GET',
                url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
                params: {
                units: 'metric',
                room_number: '1',
                longitude: longitude,
                latitude: latitude,
                filter_by_currency: 'USD',
                order_by: 'popularity',
                locale: 'en-gb',
                checkout_date: checkOut,
                adults_number: '2',
                checkin_date: checkIn,
                children_ages: '5,0',
                include_adjacency: 'true',
                children_number: '2',
                page_number: '0',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1'
                },
                headers: {
                'X-RapidAPI-Key': '8d4e08d99fmsh7a7eaae840e2e47p161497jsn68bcef9b54d4',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }
            };
            
            axios.request(options).then(response => {
                if (response.data.result != []){
                    setHotelList(response.data.result)
                }else{
                    return(
                        <div><h2>No hotel information.</h2></div>
                    )
                }})
            .catch(error => console.error('Error:', error));
           
        }
    }, [city,holiday]);
    if (!hotelList) {
        return <div><h2>Hotel list Loading...</h2></div>;
    }
    const currentDate = new Date();

    if(currentDate>holiday.start){
        return(
            <div>
                <h2>Time has passed.</h2>
            </div>
        )
    }
    return(
        <div>
            <h1>Hotel list</h1>
      {hotelList.map((hotel, index) => (
        <div key={index}> 
          <h2>{hotel.hotel_name}</h2>
          <p>Class: {hotel.class}</p>
          <p>Address: {hotel.address}</p>
          <p>Min Total Price: {hotel.min_total_price} {hotel.currencycode}</p>
          <p>Contact: {hotel.main_photo_id}</p>
          <a href={hotel.url}>More Details</a>
        </div>
      ))}
    </div>
    )
}
export default HotelInfo;