'use client';
import GoogleMapReact from 'google-map-react';
const GoogleMap_API_Key = 'AIzaSyBz3qUDbh4rOVsUI29NNABnwFvFS1O_Gbw';

const GoogleMapComponent = ({ text }) => (
    <div>
        <p>{text}</p>
    </div>
);

export default function GoogleMap({ latitude, longitude }) {
    const defaultProps = {
        center: {
            lat: 43.653225,
            lng: -79.383186,
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '75vh', width: '100%' }}>
            <GoogleMapReact bootstrapURLKeys={{ key: GoogleMap_API_Key }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                <GoogleMapComponent lat={defaultProps.center.lat} lng={defaultProps.center.lng} text="📌" />
            </GoogleMapReact>
        </div>
    );
}
