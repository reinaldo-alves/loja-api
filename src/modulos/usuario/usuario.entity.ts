import { Exclude } from "class-transformer";
import { PedidoEntity } from "../pedido/pedido.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;
    @Column({ name: 'email', length: 70, nullable: false })
    email: string;
    @Exclude()
    @Column({ name: 'senha', length: 255, nullable: false })
    senha: string;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;
    @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
    pedidos: PedidoEntity[];
}