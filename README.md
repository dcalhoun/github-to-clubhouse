# github-to-clubhouse

[![Build Status](https://travis-ci.org/dcalhoun/github-to-clubhouse.svg?branch=master)](https://travis-ci.org/dcalhoun/github-to-clubhouse)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[Clubhouse's](https://clubhouse.io) GitHub integration is great! Unfortunately,
not all of my team agreed with that assessment. With this micro-service, you can
configure Clubhouse respond to GitHub events from a subset of users rather than
every user.

* Creating a branch moves the associated ticket to "in dev".
* Opening a pull request moves the associated ticket to "awaiting code review".
* Merging a pull requests moves the associated ticket to "in QA".

## Usage

1.  Clone this repository.
1.  `cp .env.dist .env`
1.  Configure `.env` to your liking.
1.  Deploy your project to your chosen host.
1.  [Configure a GitHub webhook](https://developer.github.com/webhooks/creating/) for your repository pointing to your deployed project.
1.  Utilize the [branch names provided by Clubhouse](https://help.clubhouse.io/hc/en-us/articles/207540323-Using-The-Clubhouse-GitHub-Integration-with-Branches-and-Pull-Requests-).

## Resources

* [Securing GitHub webhooks](https://developer.github.com/webhooks/securing/)
* [Generating Clubhouse API tokens](https://clubhouse.io/api/rest/v2/#Authentication)
