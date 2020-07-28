const SubscriptionService = {
  getAllServices(db) {
    return db('subscription')
      .select('*');
  },
  
  getServicesByID(db, id) {
    return db('subscription')
      .select('*')
      .where({id})
      .first();
  },
  
  insertNewService(db, newNote) {
    return db('subscription')
      .insert(newNote, ['*']);
  },
  
  updateService(db, id, noteUpdate) {
    return db('subscription')
      .where({id})
      .update(noteUpdate);
  },
  
  deleteService(db, id) {
    return db('subscription')
      .where({id})
      .del();
  },
};
  
module.exports = SubscriptionService;