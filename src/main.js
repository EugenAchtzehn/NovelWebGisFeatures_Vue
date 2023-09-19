import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// 加入 local 的 CSS
import '@arcgis/core/assets/esri/themes/light/main.css';
// 加入 config 檔
// import esriConfig from '@arcgis/core/config';
// 設定 config 路徑到 ./assets
// esriConfig.assetsPath = './assets';

createApp(App).mount('#app');
