const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: `5f4a7acd1d5ec5b5c753066363f75211105ada43` });

module.exports = (app) => {
  // Your code here
  app.log('Yay! The app was loaded!')
  
  async function kek() {  
    const result = await octokit.request("GET /repos/:owner/:repo/contents/FOR_TERMINATION", {
      owner: "corroded",
      repo: "yolo_repo"
    });
    
    console.log(result.data)
    
    var b64string = result.data.content;
    var buf = Buffer.from('YXBwL21vZGVscy9wb29wLnJiCnNwZWMvYWxzb19raWxsX3NwZWMucmIK\n', 'base64'); // Ta-da
    
    console.log(buf.toString('utf-8'))
    
    var forTermination = buf.toString('utf-8')
    console.log(forTermination.split("\n"))
    forTermination.split("\n").forEach(function(x) {
      if (x === '') {
        return
      }
      
      console.log("yolo" + x)
    })
  }
  
  kek()

  // example of probot responding 'Hello World' to a new issue being opened
  app.on('push', async context => {
    // `context` extracts information from the event, which can be passed to
    // GitHub API calls. This will return:
    //   {owner: 'yourname', repo: 'yourrepo', number: 123, body: 'Hello World!}
    app.log(context)
    const params = context.issue({body: 'Hello World!'})

    app.log(params)
    // Post a comment on the issue
    // return context.github.issues.createComment(params)
  })
}