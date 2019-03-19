import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function wrapValue(type, val) {
  if (val === '') {
    return `/!\\ EMPTY /!\\`;
  }
  if (type === 'string') {
    return `'${val}'`;
  }
  return val;
}

export default new Vuex.Store({
  state: {
    optionsList: [],
    rulesList: [],
    runnablesList: [],
    optionsConf: [],
    rulesConf: [],
    groupsConf: [],
    ruleId: 0,
    runnableId: 0,
    groupId: 0,
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
      newRunnable.id = state.runnableId++;

      rule.runnables.push(newRunnable);
    },
    addRunnableToGroup(state, payload) {
      const group = payload.group;
      const runnable = payload.runnable;

      const newRunnable = JSON.parse(JSON.stringify(runnable));
      newRunnable.id = state.runnableId++;

      group.runnables.push(newRunnable);
    },
    addRule(state, payload) {
      const p_rule = payload.rule;
      const p_location = payload.location;
      const p_group = payload.group;

      const newRule = JSON.parse(JSON.stringify(p_rule));
      newRule.id = state.ruleId++;

      if (p_location === 'rule') {
        state.rulesConf.push(newRule);
      } else if (p_location === 'group') {
        const group = state.groupsConf.find(g => g.id === p_group.id);
        group.rules.push(newRule);
      }
    },
    addGroup() {
      const newGroup = {
        id: this.state.groupId++,
        name: 'default name',
        rules: [],
        runnables: [],
      };
      this.state.groupsConf.push(newGroup);
    },
    removeRule(state, payload) {
      const rule = payload.rule;
      const inGroup = payload.inGroup;
      let index = -1;

      if (!inGroup) {
        state.rulesConf.forEach((r, i) => {
          if (r.id === rule.id) {
            index = i;
          }
        });
        if (index !== -1) {
          state.rulesConf.splice(index, 1);
        }
      } else {
        state.groupsConf.forEach(g => {
          g.rules.forEach((r, i) => {
            if (r.id === rule.id) {
              index = i;
            }
          });
          if (index !== -1) {
            g.rules.splice(index, 1);
          }
        });
      }
    },
    removeGroup(state, group) {
      let index = -1;
      state.groupsConf.forEach((g, i) => {
        if (g.id === group.id) {
          index = i;
        }
      });
      if (index !== -1) {
        state.groupsConf.splice(index, 1);
      }
    },
    removeRunnable(state, payload) {
      const p_rule = payload.rule;
      const p_group = payload.group;
      const p_runnable = payload.runnable;
      let index = -1;
      let ruleOrGroup;

      if (p_rule !== undefined) {
        ruleOrGroup = state.rulesConf.find(r => r.id === p_rule.id);
      } else if (p_group !== undefined) {
        ruleOrGroup = state.groupsConf.find(g => g.id === p_group.id);
      }

      ruleOrGroup.runnables.forEach((rOg, i) => {
        if (rOg.id === p_runnable.id) {
          index = i;
        }
      });
      if (index !== -1) {
        ruleOrGroup.runnables.splice(index, 1);
      }
    },
    setRunnableEvent(state, payload) {
      const p_rule = payload.rule;
      const p_group = payload.group;
      const p_runnable = payload.runnable;
      const p_event = payload.event;

      let ruleOrGroup;

      if (p_rule !== undefined) {
        ruleOrGroup = state.rulesConf.find(r => r.id === p_rule.id);
      } else if (p_group !== undefined) {
        ruleOrGroup = state.groupsConf.find(g => g.id === p_group.id);
      }
      const runnable = ruleOrGroup.runnables.find(r => r.id === p_runnable.id);
      runnable.event = p_event;
    },
    generateFile(state) {
      let result = '';
      const options = state.optionsConf;
      const rules = state.rulesConf;
      const groups = state.groupsConf;

      // Create Options
      if (options.length > 0) {
        result += 'options:\n';

        options.map(o => {
          result += `  ${o.name}: ${o.value}\n`;
        });
      }

      // Create Rules
      if (rules.length > 0) {
        result += 'rules:\n';

        rules.map(r => {
          result += `  - name: ${r.name}\n`;
          if (r.options.length > 0) {
            result += `    options:\n`;
            r.options.map(o => {
              if (o.value !== '') {
                result += `      ${o.name}: ${wrapValue(o.type, o.value)}\n`;
              }
            });
          }
          if (r.runnables.length > 0) {
            const onSuccessRunnables = r.runnables.filter(
              r => r.event === 'onSuccess'
            );
            const onErrorRunnables = r.runnables.filter(
              r => r.event === 'onError'
            );
            const onBothRunnables = r.runnables.filter(
              r => r.event === 'onBoth'
            );

            if (onSuccessRunnables.length > 0) {
              result += `    onSuccess:\n`;
              onSuccessRunnables.map(s => {
                result += `      - callback: ${s.name}\n`;
                result += `        args:\n`;
                s.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
            if (onErrorRunnables.length > 0) {
              result += `    onError:\n`;
              onErrorRunnables.map(e => {
                result += `      - callback: ${e.name}\n`;
                result += `        args:\n`;
                e.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
            if (onBothRunnables.length > 0) {
              result += `    onBoth:\n`;
              onBothRunnables.map(b => {
                result += `      - callback: ${b.name}\n`;
                result += `        args:\n`;
                b.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
          }
        });
      }

      // Create Groups
      if (groups.length > 0) {
        result += 'groups:\n';

        groups.map(g => {
          result += `  - groupName: "${g.name}"\n`;
          if (g.rules.length > 0) {
            result += `    rules:\n`;
            g.rules.map(r => {
              result += `      - name: ${r.name}\n`;
              if (r.options.length > 0) {
                result += `        options:\n`;
                r.options.map(o => {
                  if (o.value !== '') {
                    result += `          ${o.name}: ${wrapValue(
                      o.type,
                      o.value
                    )}\n`;
                  }
                });
              }
            });
          }

          if (g.runnables.length > 0) {
            const onSuccessRunnables = g.runnables.filter(
              g => g.event === 'onSuccess'
            );
            const onErrorRunnables = g.runnables.filter(
              g => g.event === 'onError'
            );
            const onBothRunnables = g.runnables.filter(
              g => g.event === 'onBoth'
            );

            if (onSuccessRunnables.length > 0) {
              result += `    onSuccess:\n`;
              onSuccessRunnables.map(s => {
                result += `      - callback: ${s.name}\n`;
                result += `        args:\n`;
                s.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
            if (onErrorRunnables.length > 0) {
              result += `    onError:\n`;
              onErrorRunnables.map(e => {
                result += `      - callback: ${e.name}\n`;
                result += `        args:\n`;
                e.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
            if (onBothRunnables.length > 0) {
              result += `    onBoth:\n`;
              onBothRunnables.map(b => {
                result += `      - callback: ${b.name}\n`;
                result += `        args:\n`;
                b.args.map(a => {
                  if (a.value !== '') {
                    result += `          ${a.name}: ${wrapValue(
                      a.type,
                      a.value
                    )}\n`;
                  }
                });
              });
            }
          }
        });
      }

      state.configFile = result;
    },
    updateGroupName(state, payload) {
      const p_group = payload.group;
      const p_name = payload.name;

      const group = state.groupsConf.find(g => g.id === p_group.id);
      group.name = p_name;
    },
    updateRuleOption(state, payload) {
      const p_rule = payload.rule;
      const inGroup = payload.inGroup;
      const p_optionName = payload.optionName;
      const p_optionValue = payload.optionValue;

      let rule;
      let option;

      if (!inGroup) {
        rule = state.rulesConf.find(r => r.id === p_rule.id);
        option = rule.options.find(o => o.name === p_optionName);
      } else {
        state.groupsConf.forEach(g => {
          g.rules.forEach(r => {
            if (r.id === p_rule.id) {
              option = r.options.find(o => o.name === p_optionName);
            }
          });
        });
      }
      option.value = p_optionValue;
    },
    updateRunnableArg(state, payload) {
      const p_rule = payload.rule;
      const p_group = payload.group;
      const p_runnable = payload.runnable;
      const p_argName = payload.argName;
      const p_argValue = payload.argValue;

      let runnable;

      if (p_rule !== undefined) {
        const rule = state.rulesConf.find(r => r.id === p_rule.id);
        runnable = rule.runnables.find(r => r.id === p_runnable.id);
      } else if (p_runnable !== undefined) {
        const group = state.groupsConf.find(g => g.id === p_group.id);
        runnable = group.runnables.find(r => r.id === p_runnable.id);
      }
      const arg = runnable.args.find(a => a.name === p_argName);
      arg.value = p_argValue;
    },
    rulesDraggabled(state, rules) {
      state.rulesConf = rules;
    },
    groupsDraggabled(state, groups) {
      state.groupsConf = groups;
    },
    groupsRulesDraggabled(state, payload) {
      const p_group = payload.group;
      const p_rules = payload.rules;

      const group = state.groupsConf.find(g => g.id === p_group.id);
      group.rules = p_rules;
    },
  },
});
