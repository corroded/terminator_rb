# TODO:

1. continue with glitch
2. make function to delete files
3. make function to create branch
4. make function to create PR
5. clean up
6. tests?

-------------------

Some graph QL stuff to automate Github PR creation:

### Get repo Id:

```
{
  repository(name: "terminator_rb", owner: "corroded") {
    id
  }
}
```

### Create blank PR:

```
mutation {
  createPullRequest(input: {
    baseRefName: "test_branch",
    headRefName: "master",
    body: "test",
    title: "another test",
    repositoryId: repositoryId
  }) {
    clientMutationId
  }
}
```
