/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'sales',
        {
          sales_id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          user_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          date: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          version: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};
