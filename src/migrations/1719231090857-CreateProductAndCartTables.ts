const { MigrationInterface, QueryRunner } = require('typeorm');

class CreateProductAndCartTables1719231090857 {
  async up(queryRunner) {
    await queryRunner.query(`
      CREATE TABLE product (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description TEXT NOT NULL,
        images TEXT[],
        price DECIMAL NOT NULL,
        category VARCHAR NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE cart_item (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        CONSTRAINT fk_product
          FOREIGN KEY(product_id) 
          REFERENCES product(id)
          ON DELETE CASCADE
      );
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE cart_item;`);
    await queryRunner.query(`DROP TABLE product;`);
  }
}

module.exports = CreateProductAndCartTables1719231090857;
