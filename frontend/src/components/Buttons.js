import * as React from 'react';


class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.hasLocation = this.hasLocation.bind(this);
        this.error = this.error.bind(this);
    };

    // ref: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
    hasLocation(pos) {
        const crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);

        console.log(`Calling backend...`);

        // ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('http://localhost:8000/')
            .then((response) => response.json())
            .then((data) => console.log(data)); // Can use the "data"
    }

    error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    click() {
        console.log('Click happened');
        navigator.geolocation.getCurrentPosition(this.hasLocation, this.error);
    }

    render() {
        return <button type="button" onClick={this.click}>Send my location</button>;
    }
}

export default Buttons;
