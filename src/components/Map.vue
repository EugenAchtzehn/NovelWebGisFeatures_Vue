<template>
  <div ref="mapViewNode" class="map-view"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { loadModules } from '@esri/arcgis-rest-es6';

export default defineComponent({
  name: 'Map',
  data() {
    return {
      mapView: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      try {
        // Load required ArcGIS modules
        const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);

        // Create a new Map
        const map = new Map({
          basemap: 'topo-vector',
        });

        // Create a new MapView
        this.mapView = new MapView({
          container: this.$refs.mapViewNode,
          map,
          center: [-118.244, 34.052],
          zoom: 12,
        });
      } catch (error) {
        console.error('Error loading ArcGIS modules:', error);
      }
    },
  },
});
</script>

<style scoped>
.map-view {
  height: 400px;
}
</style>
