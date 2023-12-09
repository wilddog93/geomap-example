import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, TileWMS } from 'ol/source';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const GeoLocationMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const customIcon = "/location.png"

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      // TODO: Tambahkan kode untuk geolocation di sini
      const geolocation = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: map.getView().getProjection(),
      });
      
      const positionFeature = new Feature();
      positionFeature.setStyle(
        new Style({
          image: new Icon({
            // src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            src: customIcon,
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            rotateWithView: true,
            scale: 0.1
          }),
        })
      );
      
      geolocation.on('change:position', () => {
        const coordinates = geolocation.getPosition();
        if (coordinates) {
          positionFeature.setGeometry(new Point(coordinates));
          map.getView().setCenter(coordinates);
          map.getView().setZoom(15);
        }
      });
      
      new TileLayer({
        source: new OSM(),
      }),
      
      // map.addLayer(wmsLayer);
      map.addLayer(
        new VectorLayer({
          source: new VectorSource({
            features: [positionFeature],
          }),
        })
      );
      
      geolocation.setTracking(true);
      return () => {
        // Cleanup when the component unmounts
        map.setTarget(undefined as any);
      };
    }

  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default GeoLocationMap;
