const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'miloh',
      password: 'hello',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'michaeloh',
      password: 'hithere',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'mike',
      password: 'whatsup',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}


function makeSubscriptionsArray(users) {
  return [
    {
      id: 1,
      subscription_name: 'netflix',
      subscription_price: '5.99',
      category: 'Automatic',
      subscription_user_name: 'bigtree',
      subscription_password: 'waterme',
      user_id: users[0].id,
    },
    {
      id: 2,
      subscription_name: 'amazon prime',
      subscription_price: '6.99',
      category: 'Manual',
      subscription_user_name: 'chicken',
      subscription_password: 'donteatme',
      user_id: users[1].id
    },
    {
      id: 3,
      subscription_name: 'hulu',
      subscription_price: '5.99',
      category: 'Automatic',
      subscription_user_name: 'flower',
      subscription_password: 'dontsteponme',
      user_id: users[2].id
    },
  ];
}

function makeExpectedSubscription(users, subscription=[]) {
  const user = users
    .find(user => user.id === subscription.user_id)

  return {
    id: subscription.id,
    subscription_name: subscription.subscription_name,
    subscription_price: subscription.subscription_price,
    subscription_user_name: subscription.subscription_user_name,
    subscription_password: subscription_password,
    category: subscription.category,
    user: {
      id: user.id,
      user_name: user.user_name,
      date_created: user.date_created,
    },
  }
}

function makeSubscriptionsFixtures() {
  const testUsers = makeUsersArray()
  const testSubscriptions = makeSubscriptionsArray(testUsers)
  return { testUsers, testSubscriptions }
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.transaction(async trx => {
    await trx('subroom_users').insert(preppedUsers)
    await trx.raw(
      `SELECT setval('subroom_users_id_seq', ?)`,
      [users[users.length-1].id]
    )
  })
}

function seedSubscriptionsTables(db, users, subscriptions=[]) {
  return seedUsers(db, users)
    .then(() => 
      db
        .into('subscription')
        .insert(subscriptions)
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}


module.exports = {
  makeSubscriptionsArray,
  makeUsersArray,
  makeAuthHeader,
  seedUsers,
  seedSubscriptionsTables,
  makeSubscriptionsFixtures,
  makeExpectedSubscription,
}

