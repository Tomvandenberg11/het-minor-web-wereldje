const express = require('express')
const app = express()
const port = process.env.PORT || 8000

require('dotenv').config({path: '.env'})

const { graphql } = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.API_KEY },
})

app.set('view engine', 'ejs')

app.set('views', 'views')

app.use(express.static('static'))

const readableProject = (project) => {
  if (project === 'web-app-from-scratch-2122') {
    project = 'Web apps from scratch'
  }
  if (project === 'css-to-the-rescue-2122') {
    project = 'CSS to the rescue'
  }
  if (project === 'project-1-2122') {
    project = 'Project OBA'
  }
  if (project === 'progressive-web-apps-2122') {
    project = 'Progressive web apps'
  }
  if (project === 'browser-technologies-2122') {
    project = 'Browser Technologies'
  }
  if (project === 'project-2-2122') {
    project = 'Project GitHub'
  }
  return project
}

app.get("/", (req, res) => {
  const formProject = req.query.project
  const project = formProject ? formProject : 'web-app-from-scratch-2122'

  graphqlAuth(`query {
  repositoryOwner(login: "cmda-minor-web") {
    repository(name: "${project}") {
      forkCount
      forks(first: 60) {
        edges {
          node {
            primaryLanguage {
              id
              name
            }
            owner {
              avatarUrl
              login
              ... on User {
                url
              }
            }
            stargazerCount
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`).then((data) => {
    res.render('index', {
      projects: data.repositoryOwner.repository.forks.edges,
      currentProject: readableProject(project)

    })
  })
})

// Offline page
app.get('/offline', (req, res) => {
  res.render("offline", {
    title: "You are offline"
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})