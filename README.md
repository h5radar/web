# H5Radar
Technical and business radar. Demo available at https://app.h5radar.com.

# Release application
* add release notes file to docs
* update version at antora.yml file
* run command mvn release:prepare and mvn release:perform
* create archive by command: tar -zcvf Binaries.tar.gz h5radar*.jar
* setup version at antora.yml file at latest value
* create and publish the new release at GitHub

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
* run json-server by command: npx json-server -p 4000 application.json
* run cypress to e2e tests from cmd by command: npx cypress run
* open cypress e2e tests environment by command: npx cypress open
* run bundler analyzer by command: npx vite-bundle-visualizer
