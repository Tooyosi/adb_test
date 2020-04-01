'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'room_categories',
    [
      {
        name: 'Mixed Dorm',
        description: "Male and Female",
        no_of_beds: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mixed Dorm',
        description: "All female",
        no_of_beds: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mixed Dorm',
        description: "Male and female",
        no_of_beds: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Deluxe ',
        description: "King-sized bed",
        no_of_beds: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Standard',
        description: "Double room",
        no_of_beds: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('room_categories', null, {})
};
