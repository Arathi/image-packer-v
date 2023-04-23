import { createApp } from 'vue';

import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

import App from './App.vue';

const app = createApp(App)

// pinia
const pinia = createPinia();
app.use(pinia);

// ArcoDesign
app.use(ArcoVue);

// 挂载
app.mount(
  (() => {
    const nodeId = "image-packer";
    const node = document.createElement('div');
    node.id = nodeId;
    document.body.append(node);
    return node;
  })(),
);