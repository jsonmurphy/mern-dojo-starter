import React from 'react';
import { connect } from 'react-redux';

// esri
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import FeatureLayer from 'esri/layers/FeatureLayer'


class MapPage extends React.Component {
    componentDidMount(){
        const map = new Map({
            basemap: "streets"
        })

        const view = new MapView({
            container: "map-area",
            map: map,
            extent: {
                xmin: -9750570.120025571,
                ymin: 2804790.668097761,
                xmax: -8904554.00511744,
                ymax: 3653588.0232405,
                spatialReference: {
                    wkid: 102100,
                    latestWkid: 3857
                }
            }
            // extent: { // autocasts as new Extent()
            //     xmin: -9177811,
            //     ymin: 4247000,
            //     xmax: -9176791,
            //     ymax: 4247784,
            //     spatialReference: 102100
            // }
        })
        var featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Florida_Annual_Average_Daily_Traffic/FeatureServer/0"
        });

        map.add(featureLayer);
    }

    render(){
        return (
            <div id="map-area"></div>
        );
    }

}

MapPage.need = [];

// Retrieve data from store as props
function mapStateToProps(store) {
    return {
    };
}

export default connect(mapStateToProps)(MapPage);
