# Green Data

Code for the Green Data project, containing:

- Computer Vision wrapper
- Website
- I/O
- DB

## INSTRUCTIONS

Tutorial for this web's setup: https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9

It is preferable to create a new virtual environment to avoid dependency errors.
To do this create a new environment called "venv" on the top directory with the packages in "requirements.txt", in linux:

 - cd gcedpe
 - python3 -m venv venv
 - source venv/bin/activate
 - pip install -r requirements.txt

### HOW TO RUN SOME OF THE API SCRIPTS

 - cd gcdepe
 - source venv/bin/activate
 - cd api
 - python

From here you can run whatever module you need, to run main for example:

```
>> from calculadora.calculadora import main
>> main()
```

To train a new model do:

 - cd gcedpe
 - python -m api.model.modelo

### HOW TO RUN WEB LOCALLY

You will need to run two terminals, one for backend and one for frontend.

To run backend on linux:
 - cd gcedpe
 - source venv/bin/activate
 - flask run

To check it works open http://localhost:5000/flask/hello on a browser.

To run frontend:
 - cd gcedpe/frontend
 - npm start

A window with the webpage on localhost:3000 should open after a while.

It's possible the code has been set up for a heroku deploy. If this is the case you will need to uncomment the CORS lines in app.py as specified in the comments there, and change the web api calls from http://greendata.herokuapp.com to http://localhost:5000.
