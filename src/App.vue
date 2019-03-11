<template>
  <div id="app">
    <v-app id="vue-config-rules">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-layout row wrap>
              <v-flex>
                <!-- Options -->
                <v-card color="light-green">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">Options</h3>
                      <div>
                        <SelectOption :items="optionsAvailable"/>
                        <v-layout row wrap>
                          <v-flex v-for="(option, i) in optionsConf" :key="`option-${i}`" xs6>
                            <Option :item="option"/>
                          </v-flex>
                        </v-layout>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>

              <!-- Config File -->
              <v-flex>
                <v-card color="yellow">
                  <v-card-title primary-title>
                    <div style="width: 100%;">
                      <h3 class="headline mb-0">
                        <vue-markdown>`rules.yml` Overview</vue-markdown>
                      </h3>
                      <div>
                        <v-btn color="warning" @click="generateFile">Generate File</v-btn>
                        <v-textarea outline :value="configFile"></v-textarea>
                      </div>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs8>
            <!-- Rules -->
            <v-card color="lime">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">Rules</h3>
                  <div>
                    <SelectRule/>
                    <v-layout row wrap>
                      <v-flex v-for="(rule, i) in rulesConf" :key="`rule-${i}`">
                        <Rule :item="rule"/>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Option from "./components/Option";
import SelectOption from "./components/SelectOption";
import Runnable from "./components/Runnable";
import VueMarkdown from "vue-markdown";
import Rule from "./components/Rule";
import SelectRule from "./components/SelectRule";

export default {
  name: "App",
  components: {
    Runnable,
    Option,
    SelectOption,
    VueMarkdown,
    Rule,
    SelectRule
  },
  created() {
    this.$store.commit("loadOptions", [
      {
        name: "executeAllRules",
        value: false
      },
      {
        name: "enableRules",
        value: true
      },
      {
        name: "enableGroups",
        value: true
      }
    ]);

    this.$store.commit("loadRunnables", [
      {
        name: "CommentIssue",
        args: [
          {
            name: "comment",
            value: ""
          }
        ]
      },
      {
        name: "CommentPullRequest",
        args: [
          {
            name: "comment",
            value: ""
          }
        ]
      },
      {
        name: "CreatePullRequest",
        args: [
          {
            name: "title",
            value: ""
          },
          {
            name: "description",
            value: ""
          },
          {
            name: "source",
            value: ""
          },
          {
            name: "target",
            value: ""
          }
        ]
      },
      {
        name: "Logger",
        args: [
          {
            name: "type",
            value: ""
          },
          {
            name: "message",
            value: ""
          }
        ]
      },
      {
        name: "SendEmail",
        args: [
          {
            name: "to",
            value: ""
          },
          {
            name: "subject",
            value: ""
          },
          {
            name: "message",
            value: ""
          }
        ]
      },
      {
        name: "UpdateCommitStatus",
        args: [
          {
            name: "successTargetUrl",
            value: ""
          },
          {
            name: "failTargetUrl",
            value: ""
          },
          {
            name: "successDescriptionMessage",
            value: ""
          },
          {
            name: "failDescriptionMessage",
            value: ""
          }
        ]
      },
      {
        name: "Webhook",
        args: [
          {
            name: "url",
            value: ""
          },
          {
            name: "data",
            value: ""
          },
          { name: "config", value: "" }
        ]
      }
    ]);

    this.$store.commit("loadRules", [
      {
        name: "branchName",
        options: [
          {
            name: "regexp",
            value: ""
          }
        ],
        runnables: []
      },
      {
        name: "commitMessage",
        options: [
          {
            name: "regexp",
            value: ""
          }
        ],
        runnables: []
      },
      {
        name: "issueTitle",
        options: [
          {
            name: "regexp",
            value: ""
          }
        ],
        runnables: []
      },
      {
        name: "oneCommitPerPR",
        options: [],
        runnables: []
      },
      {
        name: "pullRequestTitle",
        options: [
          {
            name: "regexp",
            value: ""
          }
        ],
        runnables: []
      }
    ]);
  },
  methods: {
    generateFile() {
      console.log("generation...");
      this.$store.commit("generateFile");
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
