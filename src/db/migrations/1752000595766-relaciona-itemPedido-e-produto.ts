import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1752000595766 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1752000595766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD "produtoId" uuid`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" ADD CONSTRAINT "FK_d07fbe9a1faab330529824f7fea" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP CONSTRAINT "FK_d07fbe9a1faab330529824f7fea"`);
        await queryRunner.query(`ALTER TABLE "itens_pedidos" DROP COLUMN "produtoId"`);
    }

}
