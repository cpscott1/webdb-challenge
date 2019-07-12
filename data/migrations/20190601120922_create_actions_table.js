
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('actions', tbl => {
      tbl.increments();

      tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

      tbl
      .string('description', 255)
      .notNullable();

      tbl
      .string('notes', 255)
      .notNullable();

      tbl
      .boolean('completed')
      .notNullable();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('actions');
};
