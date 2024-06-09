const { exec } = require('child_process');
const token = process.env.GITHUB_TOKEN;

const repoUrl = `https://${token}:x-oauth-basic@github.com/allyelvis/server.aenzbi.bi.git`;

exec(`git clone ${repoUrl}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error cloning repository: ${err.message}`);
    return;
  }
  console.log(`Repository cloned successfully: ${stdout}`);
});