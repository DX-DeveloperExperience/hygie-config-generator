import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#3f51b5',
    secondary: '#ffc107',
    accent: '#ff9800',
    error: '#f44336',
    warning: '#ff5722',
    info: '#2196f3',
    success: '#4caf50',
  },
});
