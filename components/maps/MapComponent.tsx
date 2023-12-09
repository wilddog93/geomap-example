// components/MapContainer.tsx
import React, { Fragment, useEffect, useRef, useState } from "react";
import "ol/ol.css";
import WebGLPointsLayer from "ol/layer/WebGLPoints";
import TileLayer from "ol/layer/Tile";
import { Feature, Map, Overlay, View } from "ol";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import MVT from "ol/format/MVT";
import { Icon, Style } from "ol/style";
import { Point } from "ol/geom";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import { XYZ } from "ol/source";

const MapComponent: React.FC = () => {
  const overlayRef = useRef<Overlay | null>(null);
  const [overlayContent, setOverlayContent] = useState<string | any>("");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the map
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          source: new XYZ({
            attributions:
              'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
              'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
            url:
              "https://server.arcgisonline.com/ArcGIS/rest/services/" +
              "World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
      ],
      view: new View({
        center: [11886429.74, -697879.89],
        zoom: 4,
      }),
    });

    // add icon
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "/location.png",
        scale: 0.06,
      }),
    });

    const iconFeature = [
      new Feature({
        geometry: new Point([11886463.76, -697838.04]),
        name: "Jakarta Selatan",
        ccategory: "Oil Palm",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([11286429.69, -7.447661]),
        name: "Pekanbaru",
        category: "Secondary Forest",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([11586429.66, -8.459556]),
        name: "Kepulauan Riau",
        category: "Shrubs",
        population: 4000,
        rainfall: 500,
      }),
      // new Feature({
      //   geometry: new Point([10686429.85, -6.168329]),
      //   name: "Kepulauan Mentawai",
      //   population: 4000,
      //   rainfall: 500,
      // }),
    ];

    iconFeature.forEach((feature) => {
      feature.setStyle(iconStyle);
    });
    // iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: iconFeature,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    if (popupRef?.current) {
      const popup = new Overlay({
        element: popupRef.current,
        autoPan: true,
        positioning: "top-center",
      });
      map.addOverlay(popup);

      map.on("click", (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (f) => f);
        console.log(event.coordinate, "event click map");
        const coordinate = event.coordinate;
        if (feature) {
          const data = feature.getGeometry()?.getExtent();
          console.log(feature.getProperties(), "event click map 2");
          popup.setPosition(data);
          let items = feature.getProperties();
          if (data) {
            items = {
              ...items,
              longLat: data,
            };
            setOverlayContent(items);
          }
        } else {
          popup.setPosition(undefined);
        }
      });
    }

    return () => {
      // Cleanup when the component unmounts
      map.setTarget(undefined);
    };
  }, []); // Empty dependency array ensures useEffect runs once after the initial render

  console.log(overlayContent, "pop-ref");

  return (
    <Fragment>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>

      <div className="search">
        <input
          className="absolute z-10 top-5 inset-x-1/3 px-1 py-1.5 rounded-md"
          id="geocode-input"
          type="text"
          placeholder="Enter an address or place e.g. 1 York St"
        />
        <button id="geocode-button">Geocode</button>
      </div>

      {/* <div ref={overlayRef} id="overlay" style={{ display: overlayContent ? 'block' : 'none' }}>
        {overlayContent}
      </div> */}

      <div ref={popupRef} id="popup" className="ol-popup flex flex-col gap-2">
        {/* <a href="#" id="popup-closer" className="ol-popup-closer"></a> */}
        <div id="popup-content">
          <h3>{overlayContent?.name}</h3>
          <div className="border border-b-2 border-gray-5 w-full"></div>
          <div className="flex flex-wrap gap-1 items-center">
            <p>Populasi : </p>
            <span>{overlayContent?.population}</span>
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <p>Curah Hujan : </p>
            <span>{overlayContent?.rainfall}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MapComponent;
