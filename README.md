# Sistema de Notas Fiscais Automático

Sistema para geração automática de páginas de Nota Fiscal Eletrônica a partir de PDFs.

## 📂 Estrutura

```
/docs/notas/
├── dados/           # Arquivos JSON com dados extraídos das NF-e
├── geradas/         # Páginas HTML geradas automaticamente
├── template.html    # Template base para geração
├── preencher.js     # Script de preenchimento automático
├── styles.css       # Estilos CSS
└── index.html       # Página inicial com lista de notas
```

## 🚀 Como Funciona

1. **Envie um PDF** de Nota Fiscal
2. Os dados são **extraídos automaticamente**
3. Um **JSON** é criado em `/notas/dados/CHAVE.json`
4. Uma **página HTML** é gerada em `/notas/geradas/CHAVE.html`
5. A página fica **online automaticamente** via GitHub Pages

## 📊 Formato do JSON

```json
{
  "numero": "66843918",
  "serie": "1",
  "chave_acesso": "31250803007331001032550010668439181851126592",
  "data_emissao": "11/08/2025 15:53:30",
  
  "emitente_nome": "Empresa LTDA",
  "emitente_cnpj": "03007331001032",
  "emitente_ie": "0038450760305",
  "emitente_uf": "MG",
  
  "dest_nome": "Nome do Cliente",
  "dest_cpf": "11411334663",
  "dest_endereco": "Rua das Opalas, 123",
  "dest_bairro": "Centro",
  "dest_cidade": "São Paulo",
  "dest_uf": "SP",
  "dest_cep": "01234-567",
  
  "produto_descricao": "Produto Exemplo",
  "produto_qtd": "1",
  "produto_unidade": "UN",
  "produto_valor_unit": "599.00",
  "produto_valor": "599.00",
  
  "base_icms": "599.00",
  "icms": "41.93",
  "difal_destino": "71.88",
  "pis": "9.19",
  "cofins": "42.34",
  "valor_total": "599.00",
  
  "forma_pagamento": "PIX",
  "valor_pagamento": "599.00",
  
  "info_adicional": "Informações adicionais da nota",
  "protocolo": "Protocolo: 131256849402429"
}
```

## 💻 Acesso Online

Após configurar o GitHub Pages:

- **Índice**: `https://seuusuario.github.io/repo/notas/`
- **Nota**: `https://seuusuario.github.io/repo/notas/geradas/CHAVE.html`

## ⚙️ Configurar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` | Pasta: `/docs`
4. Clique em **Save**

---

*Sistema desenvolvido para automatização de NF-e*