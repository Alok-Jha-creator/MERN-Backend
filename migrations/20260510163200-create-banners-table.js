'use strict';

//npm i sequelize pg pg-hstore  
//npm install --save-dev sequelize-cli
//npx sequelize-cli migration:generate --name create-banners-table
   //after all of this
//npx sequelize-cli db:migrate

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("banners", {
      _id:{
        type: Sequelize.UUID,
        require: true,
        unique: true,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4 
      },
      title: {
        type: Sequelize.STRING(100),
        require: true,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["active", "inactive"]),
        defaultValue: "active",
      },
      image: {
        type: Sequelize.JSON,
        require: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        //allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        //allowNull: false,
        onUpdate: Sequelize.fn("NOW"),
        defaultValue: Sequelize.fn("NOW"),

      },
    });
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("banners");
  }
};
