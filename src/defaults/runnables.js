export const defaultRunnables = [
  {
    name: "CommentIssueRunnable",
    args: [{ name: "comment", type: "string", value: "" }]
  },
  {
    name: "CommentPullRequestRunnable",
    args: [{ name: "comment", type: "string", value: "" }]
  },
  {
    name: "CreatePullRequestRunnable",
    args: [
      { name: "title", type: "string", value: "" },
      { name: "description", type: "string", value: "" },
      { name: "source", type: "string", value: "" },
      { name: "target", type: "string", value: "" }
    ]
  },
  {
    name: "LoggerRunnable",
    args: [
      { name: "type", type: "string", value: "" },
      { name: "message", type: "string", value: "" }
    ]
  },
  {
    name: "SendEmailRunnable",
    args: [
      { name: "to", type: "string", value: "" },
      { name: "subject", type: "string", value: "" },
      { name: "message", type: "string", value: "" }
    ]
  },
  {
    name: "UpdateCommitStatusRunnable",
    args: [
      { name: "successTargetUrl", type: "string", value: "" },
      { name: "failTargetUrl", type: "string", value: "" },
      { name: "successDescriptionMessage", type: "string", value: "" },
      { name: "failDescriptionMessage", type: "string", value: "" }
    ]
  },
  {
    name: "WebhookRunnable",
    args: [
      { name: "url", type: "string", value: "" },
      { name: "data", type: "object", value: "" },
      { name: "config", type: "object", value: "" }
    ]
  }
];
