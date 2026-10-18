# Rangers • Essence20 — v0.3.0 (não oficial)

Adaptação de fã para **Foundry VTT 14.369**. Testes automatizados fora do Foundry não garantem execução dentro do programa; mantenha uma cópia do mundo.

## Principais correções

- Registro da ficha de **Ator e Item usando `DocumentSheetConfig.registerSheet` no hook `init`**, tornando-a padrão para todos os tipos e removendo o candidato Core legado (conforme a API v14).
- Identificação traduzida de tipos (`TYPES.Actor.*` e `TYPES.Item.*`) para evitar títulos de ficha sem tradução.
- Macro **Rangers • Reparar ficha completa** para reparar preferência de ficha antiga e abrir diretamente o novo formulário quando a seleção do Foundry falhar.
- Retratos editáveis através do FilePicker do Foundry ou URL/caminho. Formas civil e morfada com retratos independentes.
- Ficha responsiva por abas, Defesa derivada de Essência/armadura, ações de teste e dano, Zords, equipamentos e transformação.
- **Pontos de perícia livres** por Essência obtida; botões `+1` e `★` para gastar pontos em treino e especialização. Alterações manuais nos campos continuam autorizadas ao Mestre.
- Tabelas de evolução dos sete Papéis, níveis 1 a 20; concessões numéricas automáticas e seleção de benefícios condicionais.
- Criação automática de **8 compêndios de mundo** no primeiro acesso de um GM: 7 catálogos de classes/talentos/poderes/origens/itens/Zords/ameaças + manual PT-BR em formato JournalEntry, contendo **15 capítulos/entradas**.
- [Guia de referência em PT-BR](docs/GUIA-ESSENCE20-PTBR.md) acessível pela ficha e pelos Compêndios.

## Compêndio do livro-base em português

O compêndio **Essence20 · Guia de Regras em Português (resumo, não integral)** contém explicações originais e referências às páginas do PDF disponibilizado. **Não é a tradução integral do livro nem traz blocos oficiais completos, ilustrações ou material licenciado republicado**. Talentos, poderes e adversários incluem índices pesquisáveis; várias regras situacionais ainda exigem leitura do livro original.

## Instalação e correção da ficha

1. Instale pelo manifesto `https://github.com/tulioscost/power-rangers-essence20/releases/latest/download/system.json` depois de publicar a Release `v0.3.0`.
2. Reinicie completamente o Foundry, entre no mundo como GM e aguarde a instalação dos 8 compêndios.
3. Abra um Ranger existente. A ficha personalizada deve mostrar retrato grande, recursos e **cinco abas**.
4. Se ainda aparecer uma ficha contendo apenas nome, execute a macro **Rangers • Reparar ficha completa** (a macro abre a ficha correta diretamente). Alternativamente, escolha **Rangers · Ficha Completa v0.3** em Configuração de Ficha, quando disponível.
5. Para abrir o guia, clique em **Manual PT-BR** na ficha ou use a macro **Rangers • Abrir guia PT-BR**.

Para informar um problema não resolvido, abra **F12 → Console** e envie a primeira mensagem de erro vermelha juntamente com a versão exata do Foundry.

## Uso de perícias e progressão

- Defina Essências iniciais (12 pontos de distribuição, mais benefícios do Papel e Origem).
- Cada aumento de Essência registrado através da ficha adiciona um ponto de treinamento livre na categoria correspondente. O jogador pode aplicar o ponto ao treino (`+1`) ou à especialização (`★`).
- O recálculo dos pontos por Essência é **incremental**, não redistribui retroativamente os pontos de perícias de personagens criados em versões antigas. Confira o saldo nesses casos.
- A progressão por nível aplica diferenças entre o nível anterior e o novo, para evitar duplicações quando um nível é alterado repetidamente. Faça backup antes de trocar Papéis em fichas antigas.

## Limitações

- O autor não dispõe de instância gráfica do Foundry 14.369 neste ambiente; os testes desta versão simulam APIs, dados e geração de compêndios, mas **não são teste de interface dentro do Foundry**.
- Efeitos situacionais de certos talentos, veículos e ameaças exigem arbitragem do Mestre.
- Os compêndios são gerados no **mundo** no primeiro acesso de GM, não são pacotes oficiais de conteúdo comercial; podem ser recriados pela macro `Rangers • Criar compêndios`.

## Publicação

O workflow `.github/workflows/release.yml` executa `node --test tests/*.test.mjs` e empacota o sistema ao receber a tag `v0.3.0`. Na Release devem aparecer exatamente `system.json`, `power-rangers-essence20.zip` e `SHA256SUMS.txt`.
