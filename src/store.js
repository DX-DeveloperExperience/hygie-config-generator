import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    optionsList: [],
    rulesList: [],
    runnablesList: [],
    optionsConf: [],
    rulesConf: [],
    configFile: '',
  },
  mutations: {
    loadOptions(state, options) {
      state.optionsList = options;
    },
    loadRunnables(state, runnables) {
      state.runnablesList = runnables;
    },
    loadRules(state, rules) {
      state.rulesList = rules;
    },
    updateOptions(state, option) {
      let index = -1;
      state.optionsConf.forEach((o, i) => {
        if (o.name === option.name) {
          index = i;
        }
      });
      if (index > -1) {
        state.optionsConf[index] = option;
      } else {
        state.optionsConf.push(option);
      }
    },
    updateRules(state, rules) {
      state.rulesConf = rules;
    },
    addRunnableToRule(state, rule, runnable) {
      const ruleToUpdate = state.rulesConf.filter(r => (r.name = rule.name))[0];
      ruleToUpdate.runnables.push(runnable.name);
    },
  },
  actions: {},
});
