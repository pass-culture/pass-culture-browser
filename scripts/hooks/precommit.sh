#!/bin/bash

# ------
# ESLint Checking using script
#
# If git is reporting that your prettified files are still modified
# after committing, you may need to add a post-commit script
# to update git's index as described in this issue.

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep "js$")
if [[ "$STAGED_FILES" = "" ]]; then
    exit 0
fi

for FILE in $STAGED_FILES
do
  $(yarn bin)/eslint --quiet --max-warnings 0 "$FILE"
  if [[ "$?" == 0 ]]; then
    echo -e "\t\033[32mESLint Passed: $FILE\033[0m"
  else
    echo -e "\t\033[41mESLint Failed: $FILE\033[0m"
    exit 1
  fi
done

# get spec files from staged files if exists
TESTS_FILES=()
for FILE in $STAGED_FILES
do
  BASENAME=${FILE%/*}
  FILENAME=${FILE##*/}
  FILENAME=${FILENAME%%.*}
  TESTFILE="$BASENAME/tests/$FILENAME.spec.js"
  if [ -f $TESTFILE ]; then
    TESTS_FILES+=($TESTFILE)
  fi
done

# pass tests
$(yarn bin)/jest --env=jsdom --bail ${TESTS_FILES[@]}
if [[ "$?" == 0 ]]; then
  echo -e "\t\033[32mJest Tests Passed\033[0m"
else
  echo -e "\t\033[41mJest Tests Failed\033[0m"
  exit 1
fi

# Prettify all staged .js files
echo "$STAGED_FILES" | xargs ./node_modules/.bin/prettier-eslint --eslint-config-path ./.eslintrc.json --config ./.prettierrc.json --list-different --write

# Add back the modified/prettified files to staging
echo "$STAGED_FILES" | xargs git add

exit 0
