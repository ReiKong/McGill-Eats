import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { fetchPosts, fetchItins } from "../../actions/postActions";
import PropTypes from "prop-types";

export class MapContainer extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  componentDidMount() {}

  toggleWindow() {
    if (this.state.showingInfoWindow) {
    } else if (!this.state.showingInfoWindow) {
    }
  }

  render() {
    console.log(this.props.posts);
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAfpKoor5CLGg-HbDwdKHq9mGij2JA-YzE" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

MapContainer.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  // newPost: PropTypes.object
};
const mapStateToProps = (state) => ({
  posts: state.posts.items,
  // newPost: state.posts.item
});

export default connect(mapStateToProps, { fetchPosts })(MapContainer);