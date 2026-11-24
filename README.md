# elo — protótipo UX

Protótipo navegável de um organizador de candidaturas, baseado nos materiais da Equipe Fluxo Noturno. Interface em português com apresentação em scrollytelling, grids assimétricos e versão responsiva.

## Rodar localmente

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Abra o endereço indicado pelo Vite. Para gerar e conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Publicar na Vercel

1. Importe o repositório na Vercel.
2. Se esta pasta estiver dentro do repositório `2026`, selecione **prototipoux** em **Root Directory**.
3. Use o preset **Vite**, comando de build `npm run build` e saída `dist`.
4. Publique. Não são necessárias variáveis de ambiente ou backend.

O arquivo `vercel.json` configura o retorno ao `index.html` ao acessar diretamente uma rota interna.

## Telas e navegação

| Rota | Tela |
| --- | --- |
| `/` | Apresentação com scrollytelling |
| `/entrar` | Login demonstrativo |
| `/cadastro` | Criar perfil demonstrativo |
| `/recuperar-senha` | Simulação de recuperação |
| `/primeiros-passos` | Objetivos iniciais |
| `/painel` | Visão geral das candidaturas e compromissos |
| `/candidaturas` | Busca, filtros, lista, quadro e exportação CSV |
| `/candidaturas/nova` | Registro de candidatura |
| `/candidaturas/:id` | Informações, etapas, contatos, notas e histórico |
| `/candidaturas/:id/editar` | Edição de candidatura |
| `/agenda` | Calendário e gerenciamento de compromissos |
| `/historico` | Processos encerrados e reabertura |
| `/perfil` | Perfil, preferências e restauração dos exemplos |
| `/sobre` | Pesquisa, persona, mapa de empatia e mapa navegável das telas |

Fluxo sugerido: abrir a demonstração → adicionar uma candidatura → atualizar a etapa → adicionar um compromisso → consultar a agenda → encerrar a candidatura → consultar e reabrir pelo histórico.

## Escopo

- Apenas frontend: React e Vite; ícones SVG da biblioteca pessoal de Samuel Gomes.
- Os exemplos de empresas, vagas e contatos são fictícios.
- Candidaturas, agenda e perfil persistem no `localStorage` deste navegador.
- Login, cadastro e recuperação são simulados. Senhas não são armazenadas ou transmitidas.
- Não existem integrações automáticas com plataformas de emprego, autenticação real ou envio de e-mails/notificações.
- A preferência de lembretes controla o destaque interno e sua janela de antecedência.
- A opção **Restaurar demonstração** em Perfil substitui os registros locais pelos exemplos iniciais, após confirmação.
- Fonte Satoshi variável, normal e itálico, copiada diretamente de `taitatto/src/assets/fonts`, incluída localmente e aplicada como família principal. A versão normal possui preload. Família distribuída pela [Fontshare](https://www.fontshare.com/fonts/satoshi).
- Ícones originais da [biblioteca pessoal de Samuel Gomes](https://lib-icons-samuel.vercel.app/), incluídos localmente. O mapeamento dos componentes para os SVGs está em `src/assets/icons/README.md`.

## Contexto acadêmico

Equipe Fluxo Noturno · Samuel Gomes Araújo · 4º Período B · Professor José Neto.

A síntese apresentada se baseia em três entrevistas qualitativas. A persona Lucas Almeida é fictícia. Os achados orientam as hipóteses do protótipo e não constituem resultados estatísticos ou validação da solução.
