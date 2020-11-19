#!/bin/bash

# FILE="web_local.version"

# if [ -f "$FILE" ];
# then
#    echo "File $FILE exist."
#    if diff ./web_server.version ./web_local.version > /dev/null;
#    then
#       echo "model version up to date :)"
#    else
#       echo "model updated!!"
#       python backend/manage.py migrate
#       cp ./web_server.version ./$FILE
#   fi
# else

# echo "File $FILE does not exist"
/wait-for-it.sh db:5432 -t 10 
#   cp ./web_server.version ./$FILE

# check migration > migrate
python backend/manage.py makemigrations
python backend/manage.py migrate

# load sample data
python backend/manage.py loaddata backend/init.json

# run server
python backend/manage.py runserver 0:8000