// src/components/OpenLayersMap.tsx
import React, { useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const ArcGISMap: React.FC = () => {
  useEffect(() => {
    // Inisialisasi peta OpenLayers
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Tambahkan layer ArcGIS
    // Gantilah URL sesuai dengan layer ArcGIS yang Anda inginkan
    const arcGISLayer = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      }),
    });

    map.addLayer(arcGISLayer);

    return () => {
      // Membersihkan peta ketika komponen unmount
      map.setTarget(undefined as any);
    };
  }, []);

  return <div id="map" style={{ height: '600px' }}></div>;
};

export default ArcGISMap;
