"use client";

import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Loader from "@/UI/Components/Loader/Loader";

const containerStyle = {
  width: "100%",
  height: "220px",
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  zoomControl: false,
  draggable: false,
};

function DeliveryLocationMap({ address_info }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBhUqdMX-GUuJUlMuEj7oggAkLuDkVdjbU",
  });

  const [location, setLocation] = useState(null);

  const cleanAddress = (address) => {
    return address
      .replace(/\s+/g, " ") // collapse whitespace
      .replace(/\n/g, "") // remove newlines
      .trim();
  };
  const fetchLatLngFromAddress = async (address) => {
    const cleanedAddress = cleanAddress(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      cleanedAddress
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        console.error(`Geocoding failed for ${address}: No results`);
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

  if (!isLoaded) return <Loader />;

  return (
    <>
      <div className="google-map-desktop">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || { lat: 37.7749, lng: -122.4194 }}
          zoom={location ? 15 : 7}
          options={mapOptions}
        >
          {location && <Marker position={location} />}
        </GoogleMap>
      </div>
    </>
  );
}

export default DeliveryLocationMap;
