git init
git add .
git commit -am "We're deploying our GifMachine to Heroku. So exciting!"

heroku create
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
heroku addons:create mongolab
heroku config:set ROOT_URL=$(heroku info -s | grep web-url | cut -d= -f2)

git push heroku master

heroku config:get ROOT_URL
echo "NICE! Je GifMachine staat nu online! Ga naar de bovenstaande link om je app te bekijken."
