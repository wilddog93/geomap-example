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
import { convertDMS } from "@/utils/useFunction";

const MapComponent: React.FC = () => {
  const overlayRef = useRef<Overlay | null>(null);
  const [overlayContent, setOverlayContent] = useState<string | any>("");
  const popupRef = useRef<HTMLDivElement>(null);

  const coordinates = convertDMS("0°22'05.7\"N", "109°07'07.2\"E");

  console.log(coordinates, 'convert coordinates')

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
        // extent: [13164840.120333597, -191866.6366120975],
        center: [13164840.120333597, -191866.6366120975],
        zoom: 4,
        maxZoom: 10,
        minZoom: 4,
        constrainOnlyCenter: true,
      }),
    });

    const iconFeature = [
      new Feature({
        geometry: new Point([11886463.76, -697838.04]),
        name: "Jakarta Selatan",
        category: "Oil Palm",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([11178245.135473102, -111678.44319488533]),
        name: "Padang",
        category: "Secondary Forest",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([11629259.353076728, 119001.71560729994]),
        name: "Kepulauan Riau",
        category: "Shrubs",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([11293214.772411833, 53536.545708957245]),
        name: "Pekanbaru",
        category: "Secondary Forest",
        population: 4000,
        rainfall: 500,
      }),
      new Feature({
        geometry: new Point([12702275.599202517, 19263.569483857485]),
        name: "Kalimantan Tengah",
        category: "Oil Palm",
        population: 4000,
        rainfall: 500,
      }),
    ];
    
    const featureStyleFunction = (feature: any) => {
      const category = feature.get("category");
      let iconSrc = "";
      // Tentukan ikon berdasarkan kategori
      switch (category) {
        case "Oil Palm":
          iconSrc = "/icons/icon-palm-tree.png";
          break;
        case "Secondary Forest":
          iconSrc = "/icons/icon-forest.png";
          break;
        default:
          iconSrc = "/icons/icon-shrub.png";
          break;
      }
      console.log(iconSrc, 'icon')

      return new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: iconSrc,
          scale: 0.6,
        }),
      });
    };


    iconFeature.forEach((feature) => {
      const newIcon = featureStyleFunction(feature)
      feature.setStyle(newIcon);
    });

    const vectorSource = new VectorSource({
      features: iconFeature,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      // style: featureStyleFunction,
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

      <div ref={popupRef} id="popup" className="ol-popup flex flex-col gap-2 transform duration-300 animate-appearance-in">
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
