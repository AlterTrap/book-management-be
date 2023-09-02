'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('examples', {
    id: { type: 'bigint', primaryKey: true, autoIncrement: true },
    name: 'string',
    createdAt: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'datetime',
      defaultValue: 'CURRENT_TIMESTAMP',
    },
  });
};

exports.down = function (db) {
  return db.dropTable('examples');
};

exports._meta = {
  version: 1,
};
