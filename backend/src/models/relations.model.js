
const Role = require('./role.model');
const User = require('./user.model');
const Camion = require('./camion.model');
const Region = require('./region.model');
const Ciudad = require('./Ciudad.model');
const Empresa = require('./Empresa.model');
const Viaje = require('./viajes.model');
const TipoCarga = require('./tipocarga.model');
const Factura = require('./factura.model');
const Servicentro = require('./Servicentro.model');

Role.hasMany(User, {
  foreignKey: 'roleId',
  as: 'users'
});

User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role'
});

User.hasOne(Camion, {
    foreignKey: 'userId',
    as: 'camion'
  });
  
Camion.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
  });

Region.hasMany(Ciudad, {
  foreignKey: 'regionId',
  as: 'ciudades'
});

Ciudad.belongsTo(Region, {
  foreignKey: 'regionId',
  as: 'region'
});

Ciudad.hasMany (Empresa, {
  foreignKey: 'ciudadId',
  as: 'empresas'
});

Empresa.belongsTo(Ciudad, {
  foreignKey: 'ciudadId',
  as: 'ciudad'
});

Empresa.hasMany(Viaje, {
  foreignKey: 'empresaId',
  as: 'viajes'
});

Viaje.belongsTo(Empresa, {
  foreignKey: 'empresaId',
  as: 'empresa'
});

User.hasMany(Viaje, {
  foreignKey: 'userId',
  as: 'viajes'
});

Viaje.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Camion.hasMany(Viaje, {
  foreignKey: 'camionId',
  as: 'viajes'
});

Viaje.belongsTo(Camion, {
  foreignKey: 'camionId',
  as: 'camion'
});

TipoCarga.hasMany(Viaje, {
  foreignKey: 'tipo_carga',
  as: 'viajes'
});

Viaje.belongsTo(TipoCarga, {
  foreignKey: 'tipo_carga',
  as: 'tipocarga'
});

Camion.hasMany(Factura, {
  foreignKey: 'camionId',
  as: 'facturas'
});

Factura.belongsTo(Camion, {
  foreignKey: 'camionId',
  as: 'camion'
});

User.hasMany(Factura, {
  foreignKey: 'userId',
  as: 'facturas'
});

Factura.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Servicentro.hasMany(Factura, {
  foreignKey: 'servicentroId',
  as: 'facturas'
});

Factura.belongsTo(Servicentro, {
  foreignKey: 'servicentroId',
  as: 'servicentro'
});




module.exports = {
  Role,
  User,
  Camion,
  Region,
  Ciudad,
  Empresa,
  Viaje,
  TipoCarga
};