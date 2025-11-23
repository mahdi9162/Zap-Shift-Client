import React, { useRef } from 'react';
import Container from '../../components/Container/Container';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);

  const handleSearchForm = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) => c.district.toLowerCase().includes(location.toLowerCase()));
    if (district) {
      const coord = [district.latitude, district.longitude];
    //   Go to the location
      mapRef.current.flyTo(coord, 14);
    }
  };

  return (
    <Container>
      <section className="my-24">
        <div>
          <h3 className="text-5xl font-bold text-[#03373D] mb-12">We are available in 64 districts</h3>
          <form onSubmit={handleSearchForm}>
            <label className="input w-64">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search Here" name="location" />
            </label>
            <button className=" btn bg-[#caeb66] px-8 py-4 ">Search</button>
          </form>
        </div>
        <div className="divider my-12"></div>

        {/* Map */}
        <div className="w-full h-[800px]">
          <h3 className="text-3xl font-bold text-[#03373D] mb-12">We deliver almost all over Bangladesh</h3>
          <MapContainer center={position} zoom={8} scrollWheelZoom={false} className="h-full" ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center, index) => (
              <Marker key={index} position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.district}</strong> <br /> Service Area: {center.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </Container>
  );
};

export default Coverage;
