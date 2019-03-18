export const defaultRules = [
  {
    runnables: [],
    name: "commitMessage",
    options: [{ name: "regexp", type: "string", value: "" }]
  },
  { runnables: [], name: "oneCommitPerPR", options: [] },
  {
    runnables: [],
    name: "branchName",
    options: [{ name: "regexp", type: "string", value: "" }]
  },
  {
    runnables: [],
    name: "issueTitle",
    options: [{ name: "regexp", type: "string", value: "" }]
  },
  {
    runnables: [],
    name: "pullRequestTitle",
    options: [{ name: "regexp", type: "string", value: "" }]
  }
];
