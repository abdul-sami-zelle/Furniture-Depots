import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function DeliveryLocationMap({ address_info, mapWidth, storesData, selectedLocation }) {

  const containerStyle = {
    height: "100%",
  };

  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: false,
    draggable: false,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBhUqdMX-GUuJUlMuEj7oggAkLuDkVdjbU",
  });

  const [location, setLocation] = useState(null);

  const fetchLatLngFromAddress = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyBhUqdMX-GUuJUlMuEj7oggAkLuDkVdjbU`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      } else {
        console.error(`Geocoding failed for ${address}:`, data.status);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching geocode for ${address}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (address_info) {
        const result = await fetchLatLngFromAddress(address_info);
        setLocation(result);
      }
    };

    fetchLocation();
  }, [address_info]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="google-map-desktop" style={{width: '100%'}}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={(selectedLocation.lat === null || selectedLocation.lng === null) ? { lat: 39.9526, lng: -75.1652 } : selectedLocation} // Default center
          zoom={(selectedLocation.lat === null || selectedLocation.lng === null) ? 8.6 : 18} // Adjust zoom on selection
          options={mapOptions}
        >
          {storesData?.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
                  />
                ))}
        </GoogleMap>
      </div>
    </>
  );
}

export default DeliveryLocationMap;
