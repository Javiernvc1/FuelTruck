"use strict";
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");
const { handleError } = require("../utils/errorHandler");
const bcrypt = require('bcryptjs');
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function getUsers() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'apellido', 'email', 'rut', 'roleId'] 
    });

    if (!users) return [null, "No hay usuarios"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUsers");
  }
}

async function createUser(user) {
  console.log(user);
  try {
    const { nombre, apellido, email, rut, password, telefono, roleId } = user;
    console.log("CONTRASEÑA", password); // Verificar la contraseña en texto plano

    const userFound = await User.findOne({ where: { email } });
    if (userFound) return [null, "El usuario ya existe"];

    const roleFound = await Role.findOne({ where: { name: roleId } });
    if (!roleFound) return [null, "El rol no existe"];

    const encryptedPassword = await hashPassword(password);
    console.log("CONTRASEÑA HASHEADA", password, encryptedPassword); // Verificar la contraseña hasheada

    const newUser = await User.create({
      nombre,
      apellido,
      email,
      rut,
      password: encryptedPassword,
      telefono,
      roleId: roleFound.name
    });

    return [newUser, null];
  } catch (error) {
    handleError(error, "user.service -> createUser");
  }
}

async function getUserById(id) {
  console.log(id);
  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'nombre', 'apellido', 'email', 'rut', 'roleId']
    });

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserById");
  }
}

const comparePassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

async function updateUser(id, user) {
  console.log(user);
  try {
    const { nombre, apellido, email, rut, password, newPassword, telefono, roleId } = user;

    const userFound = await User.findByPk(id);
    if (!userFound) return [null, "El usuario no existe"];

    // Aquí asumimos que tienes una función para comparar contraseñas
    const matchPassword = await comparePassword(password, userFound.password);
    if (!matchPassword) return [null, "La contraseña no coincide"];

    const roleFound = await Role.findOne({ where: { name: roleId } });
    if (!roleFound) return [null, "El rol no existe"];

    // Aquí asumimos que tienes una función para encriptar contraseñas
    const encryptedPassword = await hashPassword(newPassword || password);

    await userFound.update({
      nombre,
      apellido,
      email,
      rut,
      password: encryptedPassword,
      telefono,
      roleId: roleFound.name
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

async function getUserByRut(rut) {
  try {
    const user = await User.findOne({ where: { rut } });

    if (!user) return [null, "El usuario no existe"];

    return [user, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByRut");
  }
}

async function getUserByRole(role) {
  try {
    const users = await User.findAll({
      where: {
        roleId: role
      }
    });

    if (!users) return [null, "No hay usuarios con ese rol"];

    return [users, null];
  } catch (error) {
    handleError(error, "user.service -> getUserByRole");
  }
}


module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByRut,
  getUserByRole
};