<template>
  <div id="app">
    <v-app id="vue-config-rules">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-layout row wrap>
              <!-- Options -->
              <v-flex>
                <v-card color="pt_color p_color">
                  <div class="v-card-title p_color_dark fit-width">
                    <h1 class="headline mb-0">Options</h1>
                  </div>

                  <div class="v-card-content">
                    <SelectOption :items="optionsAvailable"/>
                    <v-layout row wrap>
                      <v-flex v-for="(option, i) in optionsConf" :key="`option-${i}`" xs6>
                        <Option :item="option"/>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-card>
              </v-flex>

              <!-- Config File -->
              <v-flex>
                <v-card color="p_color pt_color">
                  <div class="v-card-title p_color_dark fit-width">
                    <h1 class="headline mb-0">
                      <i>rules.yml</i> Overview
                    </h1>
                  </div>
                  <div class="v-card-content">
                    <v-btn color="success" @click="generateFile">Generate File</v-btn>
                    <v-btn color="accent" @click="downloadFile">Download File</v-btn>
                    <v-textarea outline :value="configFile"></v-textarea>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Rules -->
          <v-flex xs8>
            <v-card color="p_color pt_color">
              <div class="v-card-title p_color_dark fit-width">
                <h1 class="headline mb-0">Rules</h1>
              </div>
              <div class="v-card-content">
                <SelectRule/>
                <v-layout row wrap>
                  <v-flex v-for="(rule, i) in rulesConf" :key="`rule-${i}`">
                    <Rule :item="rule"/>
                  </v-flex>
                </v-layout>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<style lang="scss">
.pt_color * {
  color: #ffffff !important;
}
.st_color * {
  color: #000000 !important;
}
.tt_color * {
  color: #000000 !important;
}
.fit-width {
  width: 100%;
}
.v-card-title {
  padding-top: 5px;
  padding-bottom: 5px;
}
.v-card-content {
  padding: 10px;
}
</style>

<script>
import Option from "./components/Option";
import SelectOption from "./components/SelectOption";
import Rule from "./components/Rule";
import SelectRule from "./components/SelectRule";
import * as axios from "axios";
import { defaultRules } from "./defaults/rules";
import { defaultRunnables } from "./defaults/runnables";
import { defaultOptions } from "./defaults/options";

function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default {
  name: "App",
  components: {
    Option,
    SelectOption,
    Rule,
    SelectRule,
    axios
  },
  created() {
    const GIT_WEBHOOKS_API = process.env.VUE_APP_GIT_WEBHOOKS_API;

    axios
      .get(`${GIT_WEBHOOKS_API}/rules`)
      .then(response => {
        this.$store.commit("loadRules", response.data);
      })
      .catch(err => {
        console.log("No API founded, loading defaut rules...", err);
        this.$store.commit("loadRules", defaultRules);
      });

    axios
      .get(`${GIT_WEBHOOKS_API}/runnables`)
      .then(response => {
        this.$store.commit("loadRunnables", response.data);
      })
      .catch(err => {
        console.log("No API founded, loading defaut runnables...", err);
        this.$store.commit("loadRunnables", defaultRunnables);
      });

    axios
      .get(`${GIT_WEBHOOKS_API}/options`)
      .then(response => {
        this.$store.commit("loadOptions", response.data);
      })
      .catch(err => {
        console.log("No API founded, loading defaut options...", err);
        this.$store.commit("loadOptions", defaultOptions);
      });
  },
  methods: {
    generateFile() {
      this.$store.commit("generateFile");
    },
    downloadFile() {
      this.generateFile();
      download("rules.yml", this.configFile);
    }
  },
  computed: {
    optionsList() {
      return this.$store.state.optionsList;
    },
    runnablesList() {
      return this.$store.state.runnablesList;
    },
    rulesList() {
      return this.$store.state.rulesList;
    },
    optionsListNames() {
      return this.optionsList.map(o => {
        return o.name;
      });
    },
    optionsConf() {
      return this.$store.state.optionsConf;
    },
    rulesConf() {
      return this.$store.state.rulesConf;
    },
    optionsAvailable() {
      return this.optionsList.filter(
        option =>
          this.optionsConf.length === 0 ||
          !this.optionsConf.some(o => o === option)
      );
    },
    configFile() {
      return this.$store.state.configFile;
    }
  }
};
</script>
