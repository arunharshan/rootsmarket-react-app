# RootsMarket Project

A full-stack, data-driven e-commerce web application using React, Strapi a headless CMS, MongoDB, SendGrid email, credit card payments and placing an order with Stripe, Cloudinary image asset api. Hosted in Heroku app.

Demo url for RootsMarket App: http://rootsmarket.herokuapp.com/

#### CMS/ Data base related topics are covered under

Strapi CMS/MongoDb git url: https://github.com/arunharshan/rootsmarket-strapi-cms

#### Cloudinary Image Asset Api covered under heroku deployment in:

git url: https://github.com/arunharshan/rootsmarket-strapi-cms

Demo url for Strapi CMS : https://rootsmarket-strapi-cms.herokuapp.com/admin/ (username / password required)

## Project Setup

git clone https://github.com/arunharshan/rootsmarket-react-app.git to a  desired location in your local. cd to the folder.

```bash
npm install
```

```bash
npm run start
```

Goto http://localhost:3000

### Push code to Git

Step 1: Add package-lock.json to .gitignore at the very bottom

step 2: change the database(strapi) production url in the utils/index.html file

```
// for database
export const baseUrl =
  process.env.NODE_ENV == 'production'
    ? 'https://rootsmarket-strapi-cms.herokuapp.com'
    : 'http://localhost:1337';

//for react app
export const baseUrlApp =
  process.env.NODE_ENV == 'production'
    ? 'http://rootsmarket.herokuapp.com'
    : 'http://localhost:3000';
```

```

I'm using Cloudinary Image API since heroku app has issue with local caching.

```

**From command line**

```
git add .
git commit -m “ first commit”
git push origin
```

# Heroku Deployment

(heroku in arun.webdev account)

Step 1: You need to install heroku cli.
Step 2: make sure **package-lock.json** is added to the gitignore file

From command line type: heroku login
This will open the heroku login page. Provide login credentials and then close the browser on success.

If you already have a heroku app-name then ( I have already created an app- **rootsmarket**)

```
heroku git:remote [NAME-OF-YOUR-APP]
```

Then execute the deployment code:

```
git push heroku master
heroku open
```

#### Or you can deploy directly from the heroku app:

Step 1: go to your app in the heroku for me its "rootsmarket"

Step 2: Got to Deploy tab, ->deploy method as gitHub and connect your repo. ("**rootsmarket-react-app**")

Step 3: Deploy
