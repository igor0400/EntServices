'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('text_waiters', {
      id: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      chatId: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      messageId: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      extraData: {
        type: Sequelize.STRING(100),
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('text_waiters');
  },
};
