
module.exports = (sequelize, DataTypes) => {
 const Users = sequelize.define('Users',
  {
    id:{
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    code: {type: DataTypes.STRING, unique: true},
    position: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Manager' },
    status: { type: DataTypes.STRING, defaultValue: 'INACTIVE' },
    phone: { type: DataTypes.STRING, allowNull: false },
    national_id: { type: DataTypes.STRING, allowNull: false, unique: true },
    date_of_birth: { type: DataTypes.DATE },
  }, {});
  return Users;
};