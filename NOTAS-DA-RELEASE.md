# Rangers · Essence20 — v0.2.1 — Correção de compatibilidade no Foundry VTT 14

## Problema investigado

A versão 0.2.0 apresentava `Compatibility Unknown` no seletor de sistemas, pois o manifesto não declarava `compatibility.verified`. A versão 0.2.1 configura `minimum: 14.369`, `verified: 14.369` e `maximum: 14` (limite por geração), segundo o formato documentado pelo Foundry VTT. Isso corrige o metadado exibido no Setup, mas não constitui, por si só, garantia de que qualquer problema de criação de mundo esteja resolvido.

## Ajustes

- Manifesto atualizado de 0.2.0 para 0.2.1 e compatibilidade declarada explicitamente.
- URL de download do ZIP fixa na tag `v0.2.1`; URL do manifesto aponta à Release mais recente.
- Novo teste de inicialização com APIs simuladas que exercita o hook `init`, o registro de dados e o registro de fichas. Total de 27 testes automatizados aprovados.
- Não há migração dos dados de personagens nem alteração das regras mecânicas em relação à v0.2.0.

**Status de teste:** testes unitários e de inicialização simulada, sem execução no aplicativo Foundry VTT 14.369 licenciado. Se houver erro ao iniciar mundo, obter a primeira mensagem em vermelho no F12 > Console e os logs do servidor.
