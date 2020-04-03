'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => [
    await queryInterface.sequelize.query(`CREATE FUNCTION notify_realtime() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM pg_notify('addedrecord', row_to_json(NEW)::text);
    RETURN NULL;
END;
$$;`),
    await queryInterface.sequelize.query(`CREATE TRIGGER updated_realtime_trigger AFTER INSERT ON Bookings
    FOR EACH ROW EXECUTE PROCEDURE notify_realtime();`).then()

    ],

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
