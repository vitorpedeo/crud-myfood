
exports.up = function(knex) {
  return knex.schema.createTable('sellers', function(table) {
      table.string('id').primary().notNullable();
      table.string('name').notNullable();
      table.string('cnpj').notNullable();
      table.string('foodType').notNullable();
      table.string('whatsapp').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('uf').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sellers');
};
