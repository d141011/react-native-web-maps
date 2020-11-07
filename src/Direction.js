import React, { Component } from 'react';
import { DirectionsRenderer } from 'react-google-maps';

class MapViewDirection extends Component {

    state={
        directions: []
    }
  componentDidMount(){
    const { origin, destination, travelMode="DRIVING", ...rest } = this.props;
    if(origin && destination){
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
        origin: new google.maps.LatLng(origin.latitude, origin.longitude),
        destination: new google.maps.LatLng(destination.latitude, destination.longitude),
        travelMode: google.maps.TravelMode[travelMode],
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  }
  render() {
      const {directions}=this.state
    return (
     <DirectionsRenderer directions={directions} />
    );
  }
}

export default MapViewDirection;
