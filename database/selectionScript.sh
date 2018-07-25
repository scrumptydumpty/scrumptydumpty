#!/bin/bash

echo "Select which database to reset"

PS3="Your choice: "
QUIT="QUIT THIS PROGRAM - I feel safe now."
touch "$QUIT"

select FILENAME in ${BASH_SOURCE%/*}/schemas/*;
do
  case $FILENAME in
        "$QUIT")
          echo "Exiting."
          break
          ;;
        *)
          echo "Resetting schema using - $FILENAME"
	  mysql -u $1 -p$2 < $FILENAME
          break
          ;;
  esac
done
rm "$QUIT"