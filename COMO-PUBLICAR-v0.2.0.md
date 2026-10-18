# Rangers Essence20 — Publicação v0.2.0

Conta: **tulioscost**  
Repositório: **power-rangers-essence20**  
Versão: **0.2.0**  
Tag para a nova Release: **v0.2.0**

## Substituição correta no GitHub

1. Extraia o arquivo **Repositório completo** e envie seus arquivos para a raiz da branch `main` do repositório existente. Preserve a pasta `.github/workflows/` e as pastas `module`, `templates`, `styles`, `lang`, `tests`.
2. No GitHub, crie uma nova tag **v0.2.0** apontando para o commit atualizado. Se o Actions estiver habilitado, o fluxo em `.github/workflows/release.yml` executa os testes e publica automaticamente os arquivos.
3. Se preferir publicar manualmente, abra **Releases → Draft a new release**, escolha `v0.2.0`, e anexe o `system.json`, `power-rangers-essence20.zip` e `SHA256SUMS.txt` da pasta **Arquivos para GitHub Releases**.
4. **Não anexe o ZIP de código-fonte como instalador**. O arquivo correto para Foundry é `power-rangers-essence20.zip`.
5. Após publicar a Release, instale com este manifesto:

`https://github.com/tulioscost/power-rangers-essence20/releases/latest/download/system.json`

Se não publicar v0.2.0, a URL `/latest/download/system.json` continuará apontando para a última Release existente.

## Testes manuais importantes no Foundry VTT 14.369

1. Instale o sistema pelo manifesto atualizado; crie um **novo mundo de teste** e crie um Ranger Vermelho.
2. Confirme que o Ranger começa no nível 1 e que sua ficha mostra Força +2, Social +1 e capacidade de Poder 2 (os 12 pontos iniciais de Essência do personagem continuam a ser distribuídos pelo jogador).
3. Suba ao nível 5 e confira novos aumentos e talentos. Retorne ao nível 2 para verificar a reversão.
4. Teste troca de classe, escolha de talentos e macro **Rangers • Criar compêndios**.
5. Clique na foto para selecionar a imagem e teste a opção **URL / caminho**.
6. Cadastre retrato civil e retrato transformado e teste a opção **MORFAR!**.
7. Arraste um Poder da Rede do compêndio gerado para o Ranger e teste seu uso.

**Atenção à migração:** em personagens criados em v0.1.0, verificar a existência de Essências, capacidade de Poder e perícias já lançadas manualmente. O botão **Ativar evolução automática** acrescenta os benefícios retroativos até o nível atual, e poderá duplicar bônus anteriormente lançados manualmente. Faça cópia do mundo antes de atualizar.

## Conteúdo e direitos

Os catálogos criados são **índices de referência**, com títulos, metadados e espaços para mecânicas que exigem decisão do Mestre. Não são os compêndios oficiais da Renegade Game Studios. Para as regras completas é necessário possuir o livro-base. Não se incluiu texto editorial longo nem arte oficial nos ZIPs públicos.

## Estado de validação

- Testes automatizados de progressão, esquema de dados e rolagens executados localmente.
- Pacote ZIP, manifestos e endereços conferidos.
- **Não testado executando o Foundry VTT 14.369**: configurações particulares podem exigir ajustes futuros.
