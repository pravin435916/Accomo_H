// components/OwnerList.js
'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/owner"); // Adjust the API route as needed
        console.log(response.data)
        setOwners(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-3xl text-center">Owner List</h2>
      <ul>
        {owners.map((owner) => (
          <li key={owner._id} className="mt-5 bg-gray-200">
            <h3>{owner.name}</h3>
            {/* <p>Email: {owner.email}</p>
            <p>Mobile Number: {owner.mobileNumber}</p>
            <p>Room Type: {owner.roomType}</p>
            <p>Total Rooms: {owner.totalRooms}</p>
            <p>Vacant Seats: {owner.vacantSeats}</p>
            <p>Price: {owner.price}</p> */}
            <p>Location: ({owner.latitude}, {owner.longitude})</p>
            {owner.images.length > 0 && (
              <div>
                <h4>Images:</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {owner.images.map((url, index) => (
                    <img key={index} src={url} alt={`Owner Image ${index + 1}`} style={{ width: '100px', margin: '5px' }} />
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerList;
