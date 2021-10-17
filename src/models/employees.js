
module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees',
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
     code: {type: DataTypes.STRING, unique: true},
     position: { type: DataTypes.STRING, allowNull: false },
     status: { type: DataTypes.STRING, defaultValue: 'INACTIVE' },
     phone: { type: DataTypes.NUMBER, allowNull: false },
     national_id: { type: DataTypes.NUMBER, allowNull: false, unique: true },
     date_of_birth: { type: DataTypes.DATE },
   }, {});
   return Employees;
 };