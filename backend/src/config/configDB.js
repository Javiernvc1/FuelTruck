// configDB.js
"use strict";

const Sequelize = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_NAME, HOST, PORT } = require("./configEnv.js");
const { handleError } = require("../utils/errorHandler");
const User = require('../models/user.model.js');
const Role = require('../models/role.model.js');
const Camion = require('../models/camion.model.js');
const Servicentro = require('../models/Servicentro.model.js');
const Ciudad = require('../models/Ciudad.model.js');
const Empresa = require('../models/Empresa.model.js');
const Factura = require('../models/factura.model.js');
const Region = require('../models/region.model.js');
const tipocarga = require('../models/tipocarga.model.js');
const Viaje = require('../models/viajes.model.js');


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: HOST,
  dialect: 'postgres',
});

async function setupDB() {
  try {
    await sequelize.authenticate();
    console.log("=> Conectado a la base de datos");

    // Sincroniza los modelos con la base de datos
    await User.sync();
    await Role.sync();
    await Camion.sync();
    await Servicentro.sync();
    await Ciudad.sync();
    await Empresa.sync();
    await Factura.sync();
    await Viaje.sync();
    await Region.sync();
    await tipocarga.sync();
    
    
    console.log('Database synced');
  } catch (err) {
    handleError(err, "/configDB.js -> setupDB");
  }
}

module.exports = { setupDB, sequelize };