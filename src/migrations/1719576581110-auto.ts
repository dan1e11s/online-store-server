import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1719576581110 implements MigrationInterface {
    name = 'Auto1719576581110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "isNew" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "isNew" SET DEFAULT false`);
    }

}
