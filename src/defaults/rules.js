export const defaultRules = [
  {
    tooltip:
      '`CommitMessageRule` checks all commits title according to a regular expression and an optional max size.',
    runnables: [],
    name: 'commitMessage',
    options: [
      { name: 'regexp', type: 'string', value: '' },
      { name: 'maxLength', type: 'number', value: '' },
    ],
  },
  {
    tooltip:
      '`OneCommitPerPRRule` checks if there is only one commit in the current PR, MR or Push.',
    runnables: [],
    name: 'oneCommitPerPR',
    options: [],
  },
  {
    tooltip:
      "`BranchNameRule` checks the branch's name according to a regular expression.",
    runnables: [],
    name: 'branchName',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`IssueTitleRule` checks the issue's title according to a regular expression.",
    runnables: [],
    name: 'issueTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`PullRequestTitleRule` checks the PR or MR's title according to a regular expression.",
    runnables: [],
    name: 'pullRequestTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
];
