<template>
  <div id="app">
    <v-app id="vue-config-rules">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex>
                <!-- Options -->
                <v-card>
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
              <v-flex>
                <Rule v-for="(rule, i) in rulesList" :key="`rule-${i}`" :item="rule"/>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Rules.yml overview -->
          <v-flex xs6>
            <vue-markdown># `rules.yml` Overview</vue-markdown>
            <vue-markdown>{{ configFile }}</vue-markdown>
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

export default {
  name: "App",
  components: {
    Runnable,
    Option,
    SelectOption,
    VueMarkdown,
    Rule
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
        args: ["comment"]
      },
      {
        name: "CommentPullRequest",
        args: ["comment"]
      },
      {
        name: "CreatePullRequest",
        args: ["title", "description", "source", "target"]
      },
      {
        name: "Logger",
        args: ["type", "message"]
      },
      {
        name: "SendEmail",
        args: ["to", "subject", "message"]
      },
      {
        name: "UpdateCommitStatus",
        args: [
          "successTargetUrl",
          "failTargetUrl",
          "successDescriptionMessage",
          "failDescriptionMessage"
        ]
      },
      {
        name: "Webhook",
        args: ["url", "data", "config"]
      }
    ]);

    this.$store.commit("loadRules", [
      {
        name: "branchName",
        options: ["regexp"],
        runnables: []
      },
      {
        name: "commitMessage",
        options: ["regexp"],
        runnables: []
      },
      {
        name: "issueTitle",
        options: ["regexp"],
        runnables: []
      },
      {
        name: "oneCommitPerPR",
        options: [],
        runnables: []
      },
      {
        name: "pullRequestTitle",
        options: ["regexp"],
        runnables: []
      }
    ]);
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
