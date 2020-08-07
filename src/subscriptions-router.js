const express = require('express')
const SubscriptionService = require('./subscription-service')

const subscriptionsRouter = express.Router()
const { requireAuth } = require('../middleware/jwt-auth')
const jsonParser = express.json()




subscriptionsRouter
  .route('/')
  .get(requireAuth, (req, res, next) =>{
    console.log(req.user.id)
    SubscriptionService.getSubscriptions(
      req.app.get('db'), req.user.id
    )
      .then(subscription => {
        res.json(subscription.map(SubscriptionService.exampleSubscription))
      })
      .catch(next)
  })
  .post(requireAuth, jsonParser, (req, res, next) => {
    const { subscription_name, subscription_price, category, subscription_user_name, subscription_password } = req.body
    const newSubscription = { subscription_name, subscription_price, category, subscription_user_name, subscription_password }

    for (const[key, value] of Object.entries(newSubscription)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
        
        
      }
    }
    newSubscription.user_id = req.user.id

    SubscriptionService.insertSubscription(
      req.app.get('db'),
      newSubscription
    )
      .then(subscription => {
        res
          .status(201)
          .location(`/api/subscriptions/${subscription.id}`)
          .json(SubscriptionService.exampleSubscription(subscription))
      })
      .catch(next)
  })

subscriptionsRouter
  .route('/:subscription_id')
  .all(requireAuth)
  .all((req, res, next) => {
    SubscriptionService.getById(
      req.app.get('db'), 
      req.params.subscription_id
    )
      .then(subscription => {
        if(!subscription) {
          return res.status(404).json({
            error: {message: `Subscription doesn't exist`}
          })
        }
        res.subscription = subscription
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(SubscriptionService.exampleSubscription(res.subscription))
  })
  .delete((req, res, next) => {
    SubscriptionService.deleteSubscription(
      req.app.get('db'),
      req.params.subscription_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { subscription_name, subscription_price, category, subscription_user_name, subscription_password } = req.body
    const subscriptionToUpdate = { subscription_name, subscription_price, category, subscription_user_name, subscription_password }

    const numberOfValues = Object.values(subscriptionToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'subscription_name', 'subscription_price', 'category', 'subscription_user_name', or 'subscription_password`
        }
      })
    }

    SubscriptionService.updateSubscription(
      req.app.get('db'),
      req.params.subscription_id,
      subscriptionToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })



module.exports = subscriptionsRouter
  