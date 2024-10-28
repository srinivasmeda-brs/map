import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './index.css'; // Import custom CSS file for styling

mapboxgl.accessToken = "pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw";

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.5, 40], // Starting position [lng, lat]
      zoom: 9, // Starting zoom level
    });

    // Add navigation controls (zoom and rotation)
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Add geolocation control to track user location
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
    }));

    // Add a search control
    map.current.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }));

    // Clean up on unmount
    return () => map.current.remove();
  }, []);

  return (
    <div className="map-wrapper">
      <h2 className="map-title">Interactive Map</h2>
      <div ref={mapContainer} className="map-container" />
      <div className="map-footer">
        <p>Explore locations and get precise geolocation information.</p>
      </div>
    </div>
  );
};

export default MapComponent;
