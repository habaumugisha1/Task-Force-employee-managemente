module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        default: Sequelize.fn('uuid_generate_v4'),
        primaryKey: true,
        type: Sequelize.UUID
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      position: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Manager'
      },
      
      status: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: 'INACTIVE'
      },
      phone: { 
        type: Sequelize.STRING,
         allowNull: false 
        },
      national_id: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true 
      },
      date_of_birth: { type: Sequelize.DATE },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};