# github-to-clubhouse

[![Build Status](https://travis-ci.org/dcalhoun/github-to-clubhouse.svg?branch=master)](https://travis-ci.org/dcalhoun/github-to-clubhouse)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Configure Clubhouse to respond to GitHub events by specific users.

* Creating a branch moves the associated ticket to "in dev".
* Opening a pull request moves the associated ticket to "awaiting code review".
* Merging a pull requests moves the associated ticket to "in QA".

## Usage

1.  `cp .env.dist .env`
1.  Configure `.env` to match your required environment.
1.  Deploy your project.
1.  [Configure a GitHub webhook](https://developer.github.com/webhooks/creating/#setting-up-a-webhook) for your repository pointing to your deployed project.
1.  Utilize the [branch names provided by Clubhouse](https://help.clubhouse.io/hc/en-us/articles/207540323-Using-The-Clubhouse-GitHub-Integration-with-Branches-and-Pull-Requests-).

## Resources

* [Generating a Clubhouse API token](https://clubhouse.io/api/rest/v2/#Authentication)
