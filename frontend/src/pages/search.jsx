import React from 'react';
import {createRoot} from 'react-dom/client';
import { useNavigate } from "react-router-dom";
import LinkedTable from './table';
import Axios from 'axios';
import './search.css';

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { createCustomEqual } from "fast-equals";

const render = (status) => {
  return <h1>{status}</h1>;
};

interface MapProps extends window.google.maps.MapOptions {
  style: { [key: string]: string };
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  children,
  style,
  ...options
}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a, b) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof window.google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof window.google.maps.LatLng
    ) {
      return new window.google.maps.LatLng(a).equals(new window.google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

function App() {
    const [clicks, setClicks] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);

    const navigate = useNavigate();
    const navto = (num) => {
        navigate("/apartmentDetail/" + num);
    }
    const search = async () => {
        const textb = document.getElementById("searchbar").value;

        const result = await Axios.get('http://localhost:4000/api/apartments', {
        }).catch(function (error) {
            console.log(error);
            return;
        });
        console.log(result);

        let nlist = [];

        result.data.data.forEach(el => {
            const content = [el._id, el.streetAddress,el.imgSrc,el.homeType,el.numberOfBedrooms,el.numberOfBathrooms,el.city,el.id,el.latitude,el.longitude];
            nlist.push(content);
        });


        let searchanswer = [];
        let markers = [];
        for (let i = 0; i < nlist.length; i++) {
            if (nlist[i][1].toLowerCase().includes(textb.toLowerCase())) {
                searchanswer.push(nlist[i]);
                markers.push({ lat: nlist[i][8], lng: nlist[i][9] });
            }
        }

        console.log(searchanswer);

        setClicks(markers);
        setAnswers(searchanswer);
    };
//     React.useEffect(() => {search();});
    return (
        <div>
            <div id="list">
                <div id="search">
                    <label for="searchbar" className="text">Search housing by Address:</label><br></br>
                    <input type="text" id="searchbar"></input><br></br>
                    <button onClick={search}>Search</button>
                </div>
                <div id="map">
                  <Wrapper apiKey="AIzaSyDNyBCUZSaZ1kaUNY46fEKfct7GxTjdPgY" render={render}>
                    <Map
                      center={{ lat: 40.11, lng: -88.24 }}
                      zoom={12}
                      style={{ flexGrow: "1", height: "100%" }}
                    >
                      {clicks.map((latLng, i) => (
                        <Marker key={i} position={latLng} />
                      ))}
                    </Map>
                  </Wrapper>
                </div>
                <div id="datah">
                    <LinkedTable content={answers} func={navto}/>
                </div>
            </div>
        </div>
    );
}

export default App;

