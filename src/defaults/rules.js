export const defaultRules = [
  {
    tooltip:
      '`CommitMessageRule` checks all commits title according to a regular expression and an optional max size.',
    runnables: [],
    enabled: true,
    name: 'commitMessage',
    options: [
      { name: 'regexp', type: 'string', value: '' },
      { name: 'maxLength', type: 'number', value: '' },
      { name: 'branches', type: 'BranchesOptions', value: '' },
    ],
  },
  {
    tooltip:
      '`OneCommitPerPRRule` checks if there is only one commit in the current PR, MR or Push.',
    runnables: [],
    enabled: true,
    name: 'oneCommitPerPR',
    options: [],
  },
  {
    tooltip:
      "`BranchNameRule` checks the branch's name according to a regular expression.",
    runnables: [],
    enabled: true,
    name: 'branchName',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`IssueTitleRule` checks the issue's title according to a regular expression.",
    runnables: [],
    enabled: true,
    name: 'issueTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`PullRequestTitleRule` checks the PR or MR's title according to a regular expression.",
    runnables: [],
    enabled: true,
    name: 'pullRequestTitle',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`IssueCommentRule` checks the new issue's comment according to a regular expression.",
    runnables: [],
    enabled: true,
    name: 'issueComment',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`PullRequestCommentRule` checks the new PR or MR's comment according to a regular expression.",
    runnables: [],
    enabled: true,
    name: 'pullRequestComment',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`CheckVulnerabilitiesRule` will check if `package.json` and `package-lock.json` contain vulnerabilities thank's to `npm audit`.",
    runnables: [],
    enabled: true,
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
    enabled: true,
    name: 'checkAddedFiles',
    options: [{ name: 'regexp', type: 'string', value: '' }],
  },
  {
    tooltip:
      '`CheckPullRequestStatusRule` checks if the Pull Request event matchs.',
    runnables: [],
    enabled: true,
    name: 'checkPullRequestStatus',
    options: [{ name: 'status', type: 'string', value: '' }],
  },
  {
    tooltip:
      '`checkIssues` will return all Issues matching the filters options.',
    runnables: [],
    enabled: true,
    name: 'checkIssues',
    options: [
      { name: 'updatedWithinXDays', type: 'number', value: '' },
      { name: 'notUpdatedSinceXDays', type: 'number', value: '' },
      { name: 'state', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      '`CheckPullRequestsRule` will return all Pull Requests matching the filters options.',
    runnables: [],
    enabled: true,
    name: 'checkPullRequests',
    options: [
      { name: 'updatedWithinXDays', type: 'number', value: '' },
      { name: 'notUpdatedSinceXDays', type: 'number', value: '' },
      { name: 'state', type: 'string', value: '' },
    ],
  },
];
