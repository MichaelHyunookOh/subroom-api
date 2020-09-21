const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const supertest = require('supertest');

describe('Subscriptions endpoints', function () {
  let db;

  const { testUsers, testSubscriptions } = helpers.makeSubscriptionsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnected from db', () => db.destroy());

  before('clean the table', () =>
    db.raw('TRUNCATE subscription, subroom_users RESTART IDENTITY CASCADE')
  );

  afterEach('clean the table', () =>
    db.raw('TRUNCATE subscription, subroom_users RESTART IDENTITY CASCADE')
  );

  describe(`GET /api/subscriptions`, () => {
    context(`Given no subscriptions`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      console.log(testUsers[0]);
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/subscriptions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, []);
      });
    });

    context('Given there are subscriptions in the database', () => {
      beforeEach('insert subscriptions', () =>
        helpers.seedSubscriptionsTables(db, testUsers, testSubscriptions)
      );

      it('responds with 200 and all the subscriptions', () => {
        const expectedSubscriptions = testSubscriptions.map((subscription) =>
          helpers.makeExpectedSubscription(testUsers, subscription)
        );
        return supertest(app)
          .get('/api/subscriptions')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);
      });
    });
  });

  describe(`GET /api/subscriptions/:subscription_id`, () => {
    context(`Given no subscriptions`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it(`responds with 404`, () => {
        const subscriptionId = 123456;
        return supertest(app)
          .get(`/api/subscriptions/${subscriptionId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: { message: `Subscription doesn't exist` } });
      });
    });
    context('Given there are subscriptions in the database', () => {
      beforeEach('insert subscriptions', () => {
        helpers.seedSubscriptionsTables(db, testUsers, testSubscriptions);
      });

      it('responds with 200 and the specified article', () => {
        const subscriptionId = 2;
        const expectedSubscription = helpers.makeExpectedSubscription(
          testUsers,
          testSubscriptions[subscriptionId - 1]
        );

        return supertest(app)
          .get(`/api/subscriptions/${subscriptionId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedSubscription);
      });
    });
  });

  describe(`POST /api/subscriptions`, () => {
    beforeEach('insert subscriptions', () =>
      helpers.seedSubscriptionsTables(db, testUsers)
    );
    it(`creates a subscription, responding with 201 and the new subscription`, () => {
      const testUser = testUsers[0];
      const newSubscription = {
        subscription_name: 'Android',
        subscription_price: '12.99',
        category: 'Automatic',
        subscription_user_name: 'appletree',
        subscription_password: 'Apples123!',
        user_id: testUser.id,
      };

      return supertest(app)
        .post('/api/subscriptions')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newSubscription)
        .expect(201);
    });

    const requiredFields = [
      'subscription_name',
      'subscription_price',
      'category',
    ];

    requiredFields.forEach((field) => {
      const testUser = testUsers[0];
      const newSubscription = {
        subscription_name: 'Android',
        subscription_price: '12.99',
        category: 'Automatic',
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newSubscription[field];

        return supertest(app)
          .post('/api/subscriptions')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .send(newSubscription)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });

  describe(`DELETE /api/subscriptions/:subscription_id`, () => {
    context(`Given no subscriptions`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it(`responds with 404`, () => {
        const subscriptionId = 123456;
        return supertest(app)
          .delete(`/api/subscriptions/${subscriptionId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: { message: `Subscription doesn't exist` } });
      });
    });
    context('Given there are no subscriptions in the database', () => {
      beforeEach('insert subscriptions', () => {
        return db
          .into('subroom_users')
          .insert(testUsers)
          .then(() => {
            return db.into('subscription').insert(testSubscriptions);
          });
      });

      it('responds with 204 and removes the subscription', () => {
        const idToRemove = 2;
        const expectedSubscriptions = testSubscriptions.filter(
          (subscription) => subscription.id !== idToRemove
        );
        return supertest(app)
          .delete(`/api/subscriptions/${idToRemove}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
    });
  });

  describe(`PATCH /api/subscriptions/:subscription_id`, () => {
    context(`Given no subscriptions`, () => {
      beforeEach(() => helpers.seedUsers(db, testUsers));
      it(`responds with 404`, () => {
        const subscriptionId = 123456;
        return supertest(app)
          .patch(`/api/subscriptions/${subscriptionId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: { message: `Subscription doesn't exist` } });
      });
    });

    context('Given there are subscriptions in the database', () => {
      beforeEach('insert subscriptions', () => {
        return db
          .into('subroom_users')
          .insert(testUsers)
          .then(() => {
            return db.into('subscription').insert(testSubscriptions);
          });
      });

      it('responds with 204 and updates the subscription', () => {
        const idToUpdate = 2;
        const updateSubscription = {
          subscription_name: 'Youtube',
          subscription_price: '10.99',
          subscription_user_name: 'chicken',
          subscription_password: 'donteatme',
          category: 'Manual',
        };
        const expectedSubscription = {
          ...testSubscriptions[idToUpdate - 1],
          ...updateSubscription,
        };
        return supertest(app)
          .patch(`/api/subscriptions/${idToUpdate}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(updateSubscription)
          .expect(204);
      });

      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2;
        return supertest(app)
          .patch(`/api/subscriptions/${idToUpdate}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({ irrelevantField: 'foo' })
          .expect(400);
      });

      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2;
        const updateSubscription = {
          subscription_name: 'updated name',
        };

        return supertest(app)
          .patch(`/api/subscriptions/${idToUpdate}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send({
            ...updateSubscription,
            fieldToIgnore: 'should not be in GET response',
          })
          .expect(204);
      });
    });
  });
});
