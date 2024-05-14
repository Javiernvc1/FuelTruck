const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');// Asegúrate de que la ruta es correcta
const bcrypt = require('bcryptjs');
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function createRoles() {
  try {
    const count = await Role.count();
    if (count > 0) return;

    await Role.bulkCreate([
      { name: 'user' },
      { name: 'admin' }
    ]);

    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

async function createUsers() {
  try {
    const count = await User.count();
    if (count > 0) return;

    const roles = await Role.findAll();
    const userRole = roles.find(role => role.name === 'user').name;
    const adminRole = roles.find(role => role.name === 'admin').name;

    const userPassword = await hashPassword('user123');
    const adminPassword = await hashPassword('admin123');


    await User.bulkCreate([
      { username: 'user', email: 'user@email.com', password: userPassword, rut: '1.111.111-1', roleId: userRole },
      { username: 'admin', email: 'admin@email.com', password: adminPassword,rut: '2.222.222-2', roleId: adminRole }
    ]);

    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createRoles,
  createUsers,
};