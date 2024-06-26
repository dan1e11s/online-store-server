const { MigrationInterface, QueryRunner } = require('typeorm');

class UpdateProductAndCartTables1719251630601 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE product (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description TEXT NOT NULL,
        images TEXT[],
        price DECIMAL NOT NULL,
        category VARCHAR NOT NULL,
        createdat TIMESTAMP DEFAULT NOW(),
        updatedat TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
        CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "productId" INT NOT NULL,
        quantity INT NOT NULL,
        CONSTRAINT fk_product FOREIGN KEY ("productId") REFERENCES product(id) ON DELETE CASCADE
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE cart;`);
    await queryRunner.query(`DROP TABLE product;`);
  }
}

module.exports = UpdateProductAndCartTables1719251630601;