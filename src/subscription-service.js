const SubscriptionService = {
  getAllSubscriptions(db, id) {
    return db
      .from('subscription AS sub')
      .select(
        'sub.id',
        'sub.subscription_name',
        'sub.subscription_price',
        'sub.subscription_user_name',
        'sub.subscription_password',
        'sub.category',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'date_created', usr.date_created
            )
          ) AS "user"`
        ),
      )
      .leftJoin(
        'subroom_users AS usr',
        'sub.user_id',
        'usr.id'
      )
      .groupBy('sub.id', 'usr.id')
  },

  getSubscriptions(db, id) {
    return db
      .from('subscription AS sub')
      .select(
        'sub.id',
        'sub.subscription_name',
        'sub.subscription_price',
        'sub.subscription_user_name',
        'sub.subscription_password',
        'sub.category',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'date_created', usr.date_created
            )
          ) AS "user"`
        ),
      )
      .leftJoin(
        'subroom_users AS usr',
        'sub.user_id',
        'usr.id'
      )
      .where('usr.id', id)
  },



  getByIdPost(db, id) {
    return db
      .from('subscription AS sub')
      .select(
        'sub.id',
        'sub.subscription_name',
        'sub.subscription_price',
        'sub.subscription_user_name',
        'sub.subscription_password',
        'sub.category',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.date_created,
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'subroom_users AS usr',
        'sub.user_id',
        'usr.id',
      )
      .where('sub.id', id)
      .first()
  },
  
  getById(db, id) {
    return SubscriptionService.getAllSubscriptions(db)
      .where('sub.id', id)
      .first()
  },

  exampleSubscription(subscription) {
    const { user } = subscription
    return {
      id: subscription.id,
      subscription_name: subscription.subscription_name,
      subscription_price: subscription.subscription_price,
      subscription_user_name: subscription.subscription_user_name,
      subscription_password: subscription.subscription_password,
      category: subscription.category,
      user: {
        id: user.id,
        user_name: user.user_name,
        date_created: new Date(user.date_created),
      }
    }
  },
  
  insertSubscription(db, newSubscription) {
    return db
      .insert(newSubscription)
      .into('subscription')
      .returning('*')
      .then(([row]) => row)
      .then(row =>
        SubscriptionService.getById(db, row.id)
        )
  },
  
  updateSubscription(knex, id, newFields) {
    return knex('subscription')
      .where({ id })
      .update(newFields);
  },
  
  deleteSubscription(knex, id,) {
    return knex('subscription')
      .where({ id })
      .delete()
  },
};

 

  
module.exports = SubscriptionService;