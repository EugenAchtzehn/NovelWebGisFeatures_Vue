<template>
  <div id="viewDiv" ref="viewDiv"></div>
  <div>
    <!-- <button type="button" @click="addFeatureLayer">加入 feature layer</button> -->
  </div>
</template>

<script>
// import Map from './components/Map.vue';
import { markRaw, toRaw } from 'vue';

import Map from '@arcgis/core/Map.js';
import MapView from '@arcgis/core/views/MapView.js';
import Swipe from '@arcgis/core/widgets/Swipe.js';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';

export default {
  name: 'App',
  components: {
    // Map,
  },
  data() {
    return {
      mapInstance: null,
    };
  },
  methods: {
    // addFeatureLayer() {
    //   const vm = this;
    //   const featureLayer = new FeatureLayer({
    //     url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
    //   });
    //   vm.mapInstance.add(featureLayer);
    // },
  },
  async mounted() {
    const vm = this;

    // map creation stage
    const mapInstance = new Map({
      basemap: 'streets-vector',
    });
    // setting map's view
    const mapView = new MapView({
      map: mapInstance,
      center: [-100, 42], // Longitude, latitude
      zoom: 4, // Zoom level
      container: vm.$refs.viewDiv, // Div element
    });

    const featureLayer = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0',
    });
    mapInstance.add(featureLayer);

    const geoJSONLayer = new GeoJSONLayer({
      url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
      copyright: 'USGS Earthquakes',
    });
    mapInstance.add(geoJSONLayer);

    const swipe = new Swipe({
      view: mapView,
      leadingLayers: [featureLayer],
      trailingLayers: [geoJSONLayer],
      direction: 'horizontal',
      position: 50,
    });

    mapView.ui.add(swipe);

    // await mapView.when(() => {
    //   console.log('Map Loaded...');
    // });
  },
  // async mounted() {
  //   // const webMap = new WebMap({
  //   //   portalItem: {
  //   //     id: 'aa1d3f80270146208328cf66d022e09c',
  //   //   },
  //   // });

  //   const mapView = new MapView({
  //     container: this.$el,
  //     map: webMap,
  //   });

  //   await mapView.when(() => {
  //     console.log('Map Loaded...');
  //   });
  // },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#viewDiv {
  width: 100%;
  height: 100%;
}
</style>
