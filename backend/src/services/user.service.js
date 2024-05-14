"use strict";
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");
const { handleError } = require("../utils/errorHandler");

async function getUsers() {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        attributes: ['name']
      }
    });

    if (!users) return [null, "No hay usuarios"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function createUser(user) {
  try {
    const { username, email, password, roles } = user;

    const userFound = await User.findOne({ where: { email } });
    if (userFound) return [null, "El usuario ya existe"];

    const roleFound = await Role.findOne({ where: { name: roles } });
    if (!roleFound) return [null, "El rol no existe"];

    // Aquí asumimos que tienes una función para encriptar contraseñas
    const encryptedPassword = await encryptPassword(password);

    await User.create({
      username,
      email,
      password: encryptedPassword,
      roleId: roleFound.id
    });

    return [null, "Usuario creado exitosamente"];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

async function getUserById(id) {
  try {
    const user = await User.findByPk(id, {
      include: {
        model: Role,
        attributes: ['name']
      }
    });

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

async function updateUser(id, user) {
  try {
    const { username, email, password, newPassword, roles } = user;

    const userFound = await User.findByPk(id);
    if (!userFound) return [null, "El usuario no existe"];

    // Aquí asumimos que tienes una función para comparar contraseñas
    const matchPassword = await comparePassword(password, userFound.password);
    if (!matchPassword) return [null, "La contraseña no coincide"];

    const roleFound = await Role.findOne({ where: { name: roles } });
    if (!roleFound) return [null, "El rol no existe"];

    // Aquí asumimos que tienes una función para encriptar contraseñas
    const encryptedPassword = await encryptPassword(newPassword || password);

    await userFound.update({
      username,
      email,
      password: encryptedPassword,
      roleId: roleFound.id
    });

    return [null, "Usuario actualizado exitosamente"];
  } catch (error) {
    handleError(error, "user.service -> updateUser");
  }
}

async function deleteUser(id) {
  try {
    await User.destroy({ where: { id } });
    return [null, "Usuario eliminado exitosamente"];
  } catch (error) {
    handleError(error, "user.service -> deleteUser");
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};