
exports.up = function(knex) {
  return knex.schema.createTable('foods', function(table) {
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('price').notNullable();

      table.string('seller_id').notNullable();
      table.foreign('seller_id').references('id').inTable('sellers');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('foods');
};
