# Subroom

LIVE LINK: https://subroom.vercel.app



![Alt text](https://github.com/thinkful-ei-panda/subroom-client/blob/master/Readmeimg/LangingPage.png)

- subroom is an app that allows user to make a secure account to store all of their subscription information in one place


![Alt text](https://github.com/thinkful-ei-panda/subroom-client/blob/master/Readmeimg/Login.png)


- The login and register forms require a password with at least one uppercase and lowercase letter as well as a number and a special character.
- passwords must but at least 5 characters long

![Alt text](https://github.com/thinkful-ei-panda/subroom-client/blob/master/Readmeimg/Dashboard.png)

- Your dashboard is where you can see the subscriptions you have added and where you can also add more subscriptions

![Alt text](https://github.com/thinkful-ei-panda/subroom-client/blob/master/Readmeimg/AddSubscription.png)

- the add subscription form allows you to input your subscription information
- entering password and usernames are not required

## API Endpoints
### Auth Endpoints
#### Post

/api/auth/login

Returning users can login 

Uses JWT Authentication

### Users Endpoints
#### Post

/api/users

Create a new account

### Subscription Endpoints
#### Get

/api/subscriptions

Fetches all of user's subscription data

#### Post

/api/subscriptions

Creates new subscription for user's account

#### Get

/api/subscriptions/:subscription_id

Fetched specific subscription

#### Delete

/api/subscription/:subscription_id

Deletes selected subscription

#### Patch

/api/subscription/:subscription_id

Updates the selected subscription with new information provided by user

Client Repo: https://github.com/thinkful-ei-panda/subroom-client



### TECHNOLOGIES USED
React
Express
CSS3
Javascript
Node
PostgreSQL
