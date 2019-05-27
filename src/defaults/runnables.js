export const defaultRunnables = [
  {
    tooltip:
      '`CommentIssueRunnable` comments the Issue processed by the previous rule.  @warn Be sure that the rule returned the `issueNumber` property in the `RuleResult` object.',
    name: 'CommentIssueRunnable',
    args: [{ name: 'comment', type: 'string', value: '' }],
  },
  {
    tooltip:
      '`CommentPullRequestRunnable` comments the PR or MR processed by the previous rule.   @warn Be sure that the rule returned the `pullRequestNumber` property in the `RuleResult` object.',
    name: 'CommentPullRequestRunnable',
    args: [{ name: 'comment', type: 'string', value: '' }],
  },
  {
    tooltip: '`CreatePullRequestRunnable` creates a new PR or MR.',
    name: 'CreatePullRequestRunnable',
    args: [
      { name: 'title', type: 'string', value: '' },
      { name: 'description', type: 'string', value: '' },
      { name: 'source', type: 'string', value: '' },
      { name: 'target', type: 'string', value: '' },
    ],
  },
  {
    tooltip: '`LoggerRunnable` logs informations in your terminal.',
    name: 'LoggerRunnable',
    args: [
      { name: 'type', type: 'string', value: '' },
      { name: 'message', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      '`SendEmailRunnable` allows you to send Email with the Gmail API.  @warn Be sure to have configured the Gmail API as explained in the documentation.',
    name: 'SendEmailRunnable',
    args: [
      { name: 'to', type: 'string', value: '' },
      { name: 'subject', type: 'string', value: '' },
      { name: 'message', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      "`UpdateCommitStatusRunnable` updates the commits' status processed by the previous rule.  @warn Be sure that the previous rule returned the `commits` property in the `RuleResult` object.",
    name: 'UpdateCommitStatusRunnable',
    args: [
      { name: 'successTargetUrl', type: 'string', value: '' },
      { name: 'failTargetUrl', type: 'string', value: '' },
      { name: 'successDescriptionMessage', type: 'string', value: '' },
      { name: 'failDescriptionMessage', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      '`WebhookRunnable` sends a POST request to the provided URL with custom `body` and `config`.',
    name: 'WebhookRunnable',
    args: [
      { name: 'url', type: 'string', value: '' },
      { name: 'data', type: 'object', value: '' },
      { name: 'config', type: 'object', value: '' },
    ],
  },
  {
    tooltip: '`DeleteBranchRunnable` delete a particular branch.',
    name: 'DeleteBranchRunnable',
    args: [{ name: 'branchName', type: 'string', value: '' }],
  },
  {
    tooltip:
      "`UpdateIssueRunnable` update some issue's properties.   @warn Be sure that the rule returned the `issueNumber` property in the `RuleResult` object.",
    name: 'UpdateIssueRunnable',
    args: [
      { name: 'state', type: 'string', value: '' },
      { name: 'labels', type: 'string[]', value: '' },
    ],
  },
  {
    tooltip:
      '`CreateIssueRunnable` create an issue the specified `CreateIssueArgs` params.',
    name: 'CreateIssueRunnable',
    args: [
      { name: 'title', type: 'string', value: '' },
      { name: 'description', type: 'string', value: '' },
      { name: 'assignees', type: 'string[]', value: '' },
      { name: 'labels', type: 'string[]', value: '' },
    ],
  },
  {
    tooltip: '`DeleteFilesRunnable` delete a set of files.',
    name: 'DeleteFilesRunnable',
    args: [
      { name: 'files', type: 'string[]|string', value: '' },
      { name: 'message', type: 'string', value: '' },
      { name: 'branch', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      '`MergePullRequestRunnable` merge the PR or MR processed by the previous rule.   @warn Be sure that the rule returned the `pullRequestNumber` property in the `RuleResult` object.',
    name: 'MergePullRequestRunnable',
    args: [
      { name: 'commitTitle', type: 'string', value: '' },
      { name: 'commitMessage', type: 'string', value: '' },
      { name: 'method', type: 'string', value: '' },
      { name: 'sha', type: 'string', value: '' },
    ],
  },
  {
    tooltip:
      "`UpdatePullRequestRunnable` update some PR's properties.   @warn Be sure that the rule returned the `pullRequestNumber` property in the `RuleResult` object.",
    name: 'UpdatePullRequestRunnable',
    args: [
      { name: 'target', type: 'string', value: '' },
      { name: 'title', type: 'string', value: '' },
      { name: 'state', type: 'string', value: '' },
      { name: 'description', type: 'string', value: '' },
    ],
  },
];
