// src/components/MapComponent.tsx

import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

// import './MapComponent.css';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && popupRef.current) {
      // Inisialisasi peta
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        }),
      });

      // Tambahkan overlay popup
      const popup = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -50],
      });
      map.addOverlay(popup);

      // Tambahkan layer ikon gambar
      const iconLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(fromLonLat([0, 0])),
            }),
          ],
        }),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: 'path/to/your/icon.png', // Ganti dengan path ke ikon Anda
          }),
        }),
      });
      map.addLayer(iconLayer);

      // Tambahkan event untuk menampilkan popup saat ikon diklik
      map.on('click', (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
        if (feature) {
          const coordinate = feature?.getGeometry()?.get("coordinate");
          popup.setPosition(coordinate);
        } else {
          popup.setPosition(undefined);
        }
      });
    }
  }, []);

  return (
    <div>
      <div ref={mapRef} className="map" />
      <div ref={popupRef} id="popup" className="ol-popup">
        <div>This is a popup!</div>
      </div>
    </div>
  );
};

export default MapComponent;
