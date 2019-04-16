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
  {
    tooltip:
      "`IssueCommentRule` checks the new issue's comment according to a regular expression.",
    runnables: [],
    name: 'issueComment',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`PullRequestCommentRule` checks the new PR or MR's comment according to a regular expression.",
    runnables: [],
    name: 'pullRequestComment',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`CheckVulnerabilitiesRule` will check if `package.json` and `package-lock.json` contain vulnerabilities thank's to `npm audit`.",
    runnables: [],
    name: 'checkVulnerabilities',
    options: [
      { name: 'packageUrl', type: 'string', value: '' },
      { name: 'packageLockUrl', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      '`CheckAddedFilesRule` checks all added filenames in commits according to a regular expression.',
    runnables: [],
    name: 'checkAddedFiles',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      '`CheckPullRequestStatusRule` checks if the Pull Request event matchs.',
    runnables: [],
    name: 'checkPullRequestStatus',
    options: [{ name: 'status', type: 'string', value: '' }],
  },
];
