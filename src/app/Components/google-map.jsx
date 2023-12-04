'use client';
import GoogleMapReact from 'google-map-react';

const GoogleMapComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap() {
    const defaultProps = {
        center: {
            lat: 23.810331,
            lng: 90.412521,
        },
        zoom: 11,
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '75vh', width: '100%' }}>
            <GoogleMapReact bootstrapURLKeys={{ key: '' }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
                <GoogleMapComponent lat={defaultProps.center.lat} lng={defaultProps.center.lng} text="My Marker" />
            </GoogleMapReact>
        </div>
    );
}
