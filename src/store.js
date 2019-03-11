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
    ruleId: 0,
    runnableId: 0,
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
    addRunnableToRule(state, payload) {
      const rule = payload.rule;
      const runnable = payload.runnable;

      const newRunnable = JSON.parse(JSON.stringify(runnable));
      newRunnable.id = this.state.runnableId++;

      rule.runnables.push(newRunnable);
    },
    addRule(state, rule) {
      const newRule = JSON.parse(JSON.stringify(rule));
      newRule.id = this.state.ruleId++;
      state.rulesConf.push(newRule);
    },
    removeRule(state, rule) {
      let index = -1;
      state.rulesConf.forEach((r, i) => {
        if (r.id === rule.id) {
          index = i;
        }
      });
      if (index !== -1) {
        state.rulesConf.splice(index, 1);
      }
    },
    removeRunnable(state, payload) {
      const p_rule = payload.rule;
      const p_runnable = payload.runnable;
      let index = -1;
      const rule = state.rulesConf.filter(r => r.id === p_rule.id)[0];
      rule.runnables.forEach((r, i) => {
        if (r.id === p_runnable.id) {
          index = i;
        }
      });
      if (index !== -1) {
        rule.runnables.splice(index, 1);
      }
    },
    generateFile(state) {
      state.configFile += 'toto\n';
    },
    updateRuleOption(state, payload) {
      const p_rule = payload.rule;
      const p_optionName = payload.optionName;
      const p_optionValue = payload.optionValue;

      const rule = state.rulesConf.filter(r => r.id === p_rule.id)[0];
      const option = rule.options.filter(o => o.name === p_optionName)[0];
      option.value = p_optionValue;
    },
    updateRunnableArg(state, payload) {
      const p_rule = payload.rule;
      const p_runnable = payload.runnable;
      const p_argName = payload.argName;
      const p_argValue = payload.argValue;

      const rule = state.rulesConf.filter(r => r.id === p_rule.id)[0];
      const runnable = rule.runnables.filter(r => r.id === p_runnable.id)[0];
      const arg = runnable.args.filter(a => a.name === p_argName)[0];
      arg.value = p_argValue;
    },
  },
  actions: {},
});
