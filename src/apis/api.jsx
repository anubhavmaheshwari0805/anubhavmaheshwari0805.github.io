import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThingSpeakAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const channelId = '1375484';
  const field = 'feeds'; // Replace with the field number you want to retrieve

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.thingspeak.com/channels/${channelId}/${field}.json?results=1`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [channelId, field]); // Re-fetch data if channelId or field changes

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Access and display retrieved data here
  return (
    <div>
      <h2>ThingSpeak Data</h2>
      <p>Temperature : {data.feeds[0].field1}</p>
      <p>Humidity : {data.feeds[0].field2}</p>
      <p>Latitude : {data.feeds[0].field3}</p>
      <p>Longitude : {data.feeds[0].field4}</p>
      {/* Display other data points as needed */}
    </div>
  );
};

export default ThingSpeakAPI;