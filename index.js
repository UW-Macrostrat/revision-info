const GitRevisionPlugin = require("git-revision-webpack-plugin");

module.exports = function(pkg, githubLink) {

  const gitRevisionPlugin = new GitRevisionPlugin({
    lightweightTags: true,
    commithashCommand: "rev-parse --short HEAD",
  });

  let env = {
    GIT_VERSION: JSON.stringify(gitRevisionPlugin.version()),
    GIT_COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
    COMPILE_DATE: JSON.stringify(
      new Date().toLocaleString("en-US", { month: "long", year: "numeric" })
    ),
  }

  if (pkg != null) {
    env.NPM_VERSION =  JSON.stringify(pkg.version)
  }

  if (githubLink != null) {
    env.GITHUB_LINK = JSON.stringify(githubLink)
    env.GITHUB_REV_LINK = JSON.stringify(
      githubLink + "/tree/" + gitRevisionPlugin.commithash()
    )
  }

  return env
}
