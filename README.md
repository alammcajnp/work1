# How to run quantlab project
run command 
npm start

# Make build command
npm rum build:dev //dev Environment (Not in use)
npm rum build:test //test Environment (Not in use)
npm rum build:prod //prod Environment (Currently Using for live build)

# To run build command	
npm rum serve 

# Environment Files Name
.env (Common Environment variables )
.env.dev (dev Environment variables )
.env.test (test Environment variables )
.env.prod (prod Environment variables )

# Usage of these variables
# Eg. .env.prod
REACT_APP_ENVIRONMENT=production (Set Environment Name)
REACT_APP_APP_URL=https://bigpondemailhelpdesk.com/quantlab (Set App Url)
REACT_APP_API_URL=http://ec2-3-14-147-42.us-east-2.compute.amazonaws.com:8000 (Set App Api Url)
REACT_APP_IMAGE_URL=https://bigpondemailhelpdesk.com/quantlab (Set App Image Url)
REACT_APP_API_IMAGE_URL=http://ec2-3-14-147-42.us-east-2.compute.amazonaws.com:8000 (Set Api Image Url)


# Environment Files Path
root folder



email: 'admin@wargames.com',
password: 'admin@1234'



