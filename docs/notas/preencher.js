/**
 * Sistema de Preenchimento Automático de NF-e
 * Este script carrega dados JSON e preenche o template HTML
 */

(function() {
    'use strict';

    // Obtém o nome do arquivo atual (sem extensão)
    function getChaveFromURL() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }

    // Formata valores monetários
    function formatarMoeda(valor) {
        if (!valor && valor !== 0) return '';
        const num = parseFloat(valor);
        if (isNaN(num)) return valor;
        return num.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // Formata CNPJ
    function formatarCNPJ(cnpj) {
        if (!cnpj) return '';
        const numeros = cnpj.replace(/\D/g, '');
        if (numeros.length !== 14) return cnpj;
        return numeros.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            '$1.$2.$3/$4-$5'
        );
    }

    // Formata CPF
    function formatarCPF(cpf) {
        if (!cpf) return '';
        const numeros = cpf.replace(/\D/g, '');
        if (numeros.length !== 11) return cpf;
        return numeros.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );
    }

    // Formata Chave de Acesso (grupos de 4 dígitos)
    function formatarChave(chave) {
        if (!chave) return '';
        const numeros = chave.replace(/\D/g, '');
        return numeros.match(/.{1,4}/g)?.join(' ') || chave;
    }

    // Preenche os campos do template
    function preencherCampos(dados) {
        const elementos = document.querySelectorAll('[data-field]');
        
        elementos.forEach(el => {
            const campo = el.getAttribute('data-field');
            let valor = dados[campo];
            
            if (valor === undefined || valor === null) {
                valor = '';
            }
            
            // Formatações especiais
            switch(campo) {
                case 'chave_acesso':
                    valor = formatarChave(valor);
                    break;
                case 'emitente_cnpj':
                    valor = formatarCNPJ(valor);
                    break;
                case 'dest_cpf':
                    // Verifica se é CPF ou CNPJ
                    const numeros = valor.toString().replace(/\D/g, '');
                    valor = numeros.length === 11 ? formatarCPF(valor) : formatarCNPJ(valor);
                    break;
                case 'valor_total':
                case 'produto_valor':
                case 'produto_valor_unit':
                case 'icms':
                case 'difal_destino':
                case 'pis':
                case 'cofins':
                case 'base_icms':
                case 'valor_pagamento':
                    valor = formatarMoeda(valor);
                    break;
            }
            
            el.textContent = valor;
        });
        
        // Atualiza o título da página
        if (dados.chave_acesso) {
            document.title = `NF-e - ${dados.numero || dados.chave_acesso}`;
        }
    }

    // Carrega o JSON e preenche o template
    async function carregarDados() {
        try {
            const chave = getChaveFromURL();
            
            // Tenta carregar da pasta dados
            const jsonPath = `../dados/${chave}.json`;
            
            const response = await fetch(jsonPath);
            
            if (!response.ok) {
                throw new Error(`Arquivo não encontrado: ${jsonPath}`);
            }
            
            const dados = await response.json();
            preencherCampos(dados);
            
            console.log('NF-e carregada com sucesso:', chave);
            
        } catch (error) {
            console.error('Erro ao carregar dados da NF-e:', error);
            
            // Mostra mensagem de erro amigável
            const container = document.querySelector('.container');
            if (container) {
                container.innerHTML = `
                    <div style="padding: 50px; text-align: center;">
                        <h2 style="color: #dc2626;">⚠️ Erro ao carregar NF-e</h2>
                        <p style="margin-top: 20px; color: #6b7280;">
                            Não foi possível carregar os dados desta nota fiscal.
                        </p>
                        <p style="margin-top: 10px; color: #9ca3af; font-size: 0.9rem;">
                            Detalhes: ${error.message}
                        </p>
                    </div>
                `;
            }
        }
    }

    // Inicia quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', carregarDados);
    } else {
        carregarDados();
    }

})();