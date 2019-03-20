export const defaultRules = [
  {
    tooltip:
      '`CommitMessageRule` check all commits title according to a regular expression',
    runnables: [],
    name: 'commitMessage',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      '`OneCommitPerPRRule` check if there is only one commit in the current PR, MR or Push',
    runnables: [],
    name: 'oneCommitPerPR',
    options: [],
  },
  {
    tooltip:
      "`BranchNameRule` check the branch's name according to a regular expression",
    runnables: [],
    name: 'branchName',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`IssueTitleRule` check the issue's title according to a regular expression",
    runnables: [],
    name: 'issueTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`PullRequestTitleRule` check the PR or MR's title according to a regular expression",
    runnables: [],
    name: 'pullRequestTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
];
