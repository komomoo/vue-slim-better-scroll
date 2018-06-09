git checkout master

#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  VERSION=$VERSION

  # build
  yarn build
  yarn build:page
  yarn build:docs

  # commit
  npm version $VERSION --no-git-tag-version
  git add -A
  git commit -m "build: release $VERSION"
  git tag v$VERSION
  git push origin master

  # merge
  git checkout gh-pages
  git rebase master
  git push origin gh-pages
  git checkout master

  # publish
  npm publish
fi
