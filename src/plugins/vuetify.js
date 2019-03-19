import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: "#3f51b5",
    secondary: "#ffc107",
    accent: "#ff9800",
    error: "#f44336",
    warning: "#ff5722",
    info: "#2196f3",
    success: "#4caf50",
    p_color_dark: "#1a237e",
    p_color: "#eceff1",
    p_color_light: "#534bae",
    s_color_dark: "#ff8f00",
    s_color: "#f5f5f5",
    s_color_light: "#ffc046",
    t_color_dark: "#c7c7c7",
    t_color: "#fafafa",
    t_color_light: "#ffffff"
  }
});
