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
* clone repo by command git clone: git@github.com:h5radar/h5radar_app.git

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

# GPG key configuration
* gpg --full-gen-key
* gpg --list-secret-keys --keyid-format long
* gpg --armor --export "key-gen" for example gpg --armor --export 3AA5C34371567BD2
* git config --global user.signingkey "key-gen"
* git config --global commit.gpgSign true
* git config --global tag.gpgSign true

# Useful commands:
* install nvm by command: brew install nvm and make post configuration
* install nodejs by command: nvm install --lts
* run npm command to install packages: npm install --legacy-peer-deps
* run server by command: npx http-server ./dist -o -c-1
* run json-server by command: npx json-server -p 4000 application.json
* run cypress to e2e tests from cmd by command: npx cypress run
* open cypress e2e tests environment by command: npx cypress open
* run bundler analyzer by command: npx vite-bundle-visualizer
* setup tag by command: git tag -v0.1.0 && git push origin --tags
* prune tags by command: git fetch --prune --prune-tags

# Appendix: work with tokens
```bash
export access_token=$(curl -X POST http://localhost:8180/realms/h5radar/protocol/openid-connect/token \
-H 'content-type: application/x-www-form-urlencoded' -d 'client_id=app-ui' \
-d 'username=alice&password=secret&grant_type=password' | jq --raw-output '.access_token' )
  ```

```bash
curl http://localhost:8080/api/v1/technologies -H "Authorization: Bearer "$access_token
```
