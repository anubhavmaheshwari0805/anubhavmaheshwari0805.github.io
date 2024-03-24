import { useState } from 'react';
import './../styles/HomeScreenStyles.css';
import HALTitleLogo from './../assets/HALTitleLogo.png';
import HALLogo from './../assets/HALLogo.png';
import { Link } from 'react-router-dom';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function Login() {
  const [count, setCount] = useState(0)

  return (
    <>
    
       <div>
       <Map
      mapboxAccessToken="pk.eyJ1IjoiYW5udW1haGVzaHdhcmk4NSIsImEiOiJjbHN3eGJ4cDUwMHczMmptcW1wcWV4ZjN3In0.rcU8XyXEXZD6Jtw8TOdoxA"
      initialViewState={{
        longitude: 77.6933318332928,
        latitude: 12.965199797618274,
        zoom: 20
      }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/standard"
    />
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={HALLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={HALTitleLogo} className="logo" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Link to={`/dashboard`}>Login</Link>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className='globe-container'>
        <div className='globe'></div> */}

      </div>
    </>
  )
}

export default Login;
