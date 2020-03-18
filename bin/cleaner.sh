#!/usr/bin/env sh

MY_DATES=$(git grep -irz '@expires \w\{4\}-\w\{2\}-\w\{2\}' | awk -F ' ' '{print $1}')

for row in $MY_DATES
do
  echo $row
done
