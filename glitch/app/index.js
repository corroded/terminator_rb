const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `token` });

module.exports = async(app) => {
  // Your code here
  app.log('Yay! The app was loaded!')

  async function getFileContents(path) {
    const result = await octokit.request(`GET /repos/:owner/:repo/contents/${path}`, {
      owner: "corroded",
      repo: "yolo_repo"
    });

    var b64String = result.data.content;
    var buf = Buffer.from(b64String, 'base64'); // Ta-da

    console.log(buf.toString('utf-8'))
    return buf.toString('utf-8')
  }

  async function cleanup() {
    var forTermination = await getFileContents('FOR_TERMINATION')

    forTermination.split("\n").forEach(async function(fileToDelete) {
      if (fileToDelete === '') {
        return
      }

      let fileContents = await getFileContents(fileToDelete)

      console.log("-----")
      console.log(fileToDelete)
      let expiryDate = fileContents.match(/# @expire_at (?<expiryDate>.*)/).groups.expiryDate
      if (expiryDate !== undefined) {
        let expiry = new Date(Date.parse(expiryDate))

        if (expiry < Date.now()) {
          console.log(`About to delete ${fileToDelete}`)
        }
      } else {
        console.log("nothing to delete")
      }
    })
  }

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('push', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}

    await cleanup()
    // Post a comment on the issue
    // return context.github.issues.createComment(params)
  })
}
