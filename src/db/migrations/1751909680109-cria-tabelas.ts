import { MigrationInterface, QueryRunner } from "typeorm";

export class CriaTabelas1751909680109 implements MigrationInterface {
    name = 'CriaTabelas1751909680109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produto_caracteristicas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(255) NOT NULL, "produtoId" uuid, CONSTRAINT "PK_132816ff55e30a6bf554c9e2545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" ADD CONSTRAINT "FK_67339e59ab4b3ed091cf318f426" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produto_caracteristicas" DROP CONSTRAINT "FK_67339e59ab4b3ed091cf318f426"`);
        await queryRunner.query(`DROP TABLE "produto_caracteristicas"`);
    }

}
