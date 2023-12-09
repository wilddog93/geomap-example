// src/DisasterMap.tsx
import React, { useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const DisasterMap: React.FC = () => {
  useEffect(() => {
    // Inisialisasi peta
    const map = L.map('map').setView([0, 0], 2);

    // Tambahkan layer peta (misalnya, OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '', // Kosongkan atribusi
    }).addTo(map);

    // Tambahkan marker bencana alam
    const disasterMarker = L.marker([0, 0]).addTo(map);
    disasterMarker.bindPopup('Info Bencana Alam');

    // Update marker dengan koordinat baru
    const updateMarker = (lat: number, lng: number) => {
      disasterMarker.setLatLng([lat, lng]);
    };

    // Contoh pemanggilan fungsi updateMarker
    updateMarker(-3.745, -38.523);

    // Membersihkan peta ketika komponen unmount
    return () => {
      map.remove();
    };
  }, []); // [] menandakan bahwa efek ini hanya dijalankan saat komponen dimount

  return <div id="map" style={{ height: '100%' }}></div>;
};

export default DisasterMap;
