import { ConsoleLogger, Injectable } from "@nestjs/common";
import { bgMagenta, white } from "colors";
import { appendFileSync } from "fs";

@Injectable()
export class CustomLogger extends ConsoleLogger {
    formataLog(nome: string, quantidade: number, valor: number) {
        return `LOCAL: ${this.context} - NOME: ${nome} - QUANTIDADE: ${quantidade} - PREÇO: ${valor} - TIMESTAMP ${this.getTimestamp()}`
    }

    logColorido(produto) {
        const {nome, quantidadeDisponivel, valor} = produto
        const logFormatado = this.formataLog(nome, quantidadeDisponivel, valor)
        console.log(bgMagenta(white(logFormatado)));
    }

    logEmArquivo(produto) {
        const {nome, quantidadeDisponivel, valor} = produto
        const mensagemFormatada = this.formataLog(nome, quantidadeDisponivel, valor) + '\n';
        const caminhoDoLog = './src/modulos/customLogger/arquivo.log'
        appendFileSync(caminhoDoLog, mensagemFormatada);
    }
}