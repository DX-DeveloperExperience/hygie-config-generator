<template>
  <div id="app">
    <v-app id="vue-config-rules">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="p_color">
              <div class="v-card-title p_color_dark fit-width">
                <h1 class="headline mb-0">
                  Git-Webhooks-Config-Generator
                  <i class="material-icons">build</i>
                </h1>
              </div>

              <div class="v-card-content justify">
                <p>
                  This SPA allows you to generate the
                  <a>rules.yml</a> config file for your
                  <a
                    href="https://github.com/DX-DeveloperExperience/git-webhooks"
                  >Git-Webhooks API</a>
                  with a friendly user-interface.
                </p>
                <p>
                  This application will source every Rules and Runnables you've
                  created in your Git-Webhooks project, and display all of them
                  in the UI. If Git-Webhooks project it's not running, the
                  configurator come with default values.
                </p>
              </div>
            </v-card>
          </v-flex>

          <v-flex xs6>
            <v-layout row wrap>
              <!-- Options -->
              <v-flex class="fit-width" id="options">
                <v-card color="p_color">
                  <div class="v-card-title p_color_dark fit-width">
                    <h1 class="headline mb-0">
                      Options
                      <i class="material-icons">settings</i>
                    </h1>
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

              <!-- Rules -->
              <v-flex class="fit-width" id="rules">
                <v-card color="p_color">
                  <div class="v-card-title p_color_dark fit-width">
                    <h1 class="headline mb-0">
                      Rules
                      <i class="material-icons">apps</i>
                    </h1>
                  </div>
                  <div class="v-card-content">
                    <SelectRule location="rule"/>
                    <draggable @start="drag=true" @end="drag=false" v-model="rulesConf">
                      <Rule
                        v-for="(rule, i) in rulesConf"
                        :key="`rule-${i}`"
                        :item="rule"
                        :displayRunnable="true"
                      />
                    </draggable>
                  </div>
                </v-card>
              </v-flex>

              <!-- Groups -->
              <v-flex class="fit-width" id="groups">
                <v-card color="p_color">
                  <div class="v-card-title p_color_dark fit-width">
                    <h1 class="headline mb-0">
                      Groups
                      <i class="material-icons">apps</i>
                    </h1>
                  </div>
                  <div class="v-card-content">
                    <v-btn @click="addGroup">
                      New Group
                      <i class="material-icons">add</i>
                    </v-btn>

                    <draggable @start="drag=true" @end="drag=false" v-model="groupsConf">
                      <Group v-for="(group, i) in groupsConf" :key="`group-${i}`" :item="group"/>
                    </draggable>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Config File -->
          <v-flex xs6 id="config_file">
            <v-card color="p_color">
              <div class="v-card-title p_color_dark fit-width">
                <h1 class="headline mb-0">
                  <em>rules.yml</em>&nbsp;
                  <i class="material-icons">code</i>
                </h1>
              </div>
              <div class="v-card-content">
                <v-btn color="success" @click="generateFile">Generate File</v-btn>
                <v-btn color="accent" @click="downloadFile">Download File</v-btn>
                <v-textarea outline :value="configFile" rows="20"></v-textarea>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<style lang="scss">
.material-icons {
  vertical-align: sub;
}
.fit-width {
  width: 100%;
}
.v-card-title {
  padding-top: 5px;
  padding-bottom: 5px;
  color: #ffffff !important;
}
.draggable :hover {
  cursor: move;
}
.v-card-content {
  padding: 10px;
}
.v-card-content * {
  color: #000000 !important;
}
.justify {
  text-align: justify;
}
.v-card-content a {
  text-decoration: none;
  color: #ff8f00 !important;
}
.align-cross {
  float: right;
  margin-top: 4px;
  margin-right: 4px;
}
.select_tooltip {
  font-size: 0.7em;
}
.select_name {
  margin-bottom: 0px;
}
.rule_tooltip {
  margin: 0px;
  color: #333 !important;
  font-size: 0.9em;
}

.alert {
  position: relative;
  padding-top: 5px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.alert p {
  margin-bottom: 5px;
}
.alert-info {
  background-color: #d1ecf1;
  border-color: #bee5eb;
}
.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeeba;
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
import Group from "./components/Group";
import draggable from "vuedraggable";

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
    Group,
    draggable
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
    },
    addGroup() {
      this.$store.commit("addGroup");
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
    rulesConf: {
      get() {
        return this.$store.state.rulesConf;
      },
      set(rules) {
        this.$store.commit("rulesDraggabled", rules);
      }
    },
    groupsConf: {
      get() {
        return this.$store.state.groupsConf;
      },
      set(groups) {
        this.$store.commit("groupsDraggabled", groups);
      }
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
