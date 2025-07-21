# H5Radar Web UI

This repository contains the web interface for the H5Radar platform, providing interactive visualization of the technology radar and license compliance data.

H5Radar application consists of several modules. For an overview of the entire platform and its repositories, please see the [organization-level README](https://github.com/h5radar).

## Features

- Interactive technology radar charts
- License compliance dashboards
- User-friendly interface for browsing and filtering technologies
- Integration with backend APIs

## Getting Started

To run the web UI locally or in production, please follow the installation and deployment instructions provided in the [documentation](https://docs.h5radar.com/).

## Contributing

Contributions and issues are welcome. Please open pull requests or issues in this repository. For general discussions, roadmap input, and questions, please join our [organization Discussions](https://github.com/orgs/h5radar/discussions). We appreciate community involvement in shaping H5Radar!

## License

This repository is part of the H5Radar project and is licensed under the MIT License.

# Setup environment
## Windows environment
* download and setup nodeJS, at least v22.14.0
* install all npm packages by command: npm install
* setup GitHub account and add ssh keys to GitHub profile

## Idea configuration
### JavaScript checkstyle
* setup ident 2 at JavaScript code style

### HTML checkstyle
* setup ident 2 at html code style
* remove all items from "do not indent child of" field

# Conventions
## Git conventions
* the first letter of the commit should be written in upper case
* the simple perfect should be used for commit message
* the title and description should be provided, for example by command: git commit -m "title" -m "description"

# Keycloak configuration
* download keycloack, uppack it and start by command: kc.sh start-dev --http-port=8180
* login to console at http://127.0.0.1:8180 and click create realm button
* select json file realm.json at docker folder to create a new realm

# Useful commands:
* run server by command: npx http-server ./dist -o -c-1
* run cypress to e2e tests from cmd by command: npx cypress run
* open cypress e2e tests environment by command: npx cypress open
* run bundler analyzer by command: npx vite-bundle-visualizer
* list package to update by command: npx npm-check-updates
