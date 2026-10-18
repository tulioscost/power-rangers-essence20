# Rangers · Essence20 — sistema de fã para Foundry VTT 14.369

**Versão:** 0.2.1 | **Idioma da interface:** português brasileiro | **Manifesto:** `system.json`

Adaptação técnica **não oficial** para uso com o livro *Power Rangers Roleplaying Game — Core Rulebook* (Renegade Game Studios, Essence20). Não inclui ilustrações, personagens prontos, longas transcrições de regras ou material gráfico protegido. Não substitui o livro.

## Instalação manual

1. Feche o Foundry VTT ou saia do mundo.
2. Extraia o ZIP de forma que a pasta `power-rangers-essence20` contenha diretamente o arquivo `system.json`.
3. Copie a pasta para `FoundryVTT/Data/systems/` da sua pasta de dados do usuário, não para a pasta do programa.
4. Inicie o Foundry 14.369, crie um novo mundo e escolha **Rangers • Essence20 (não oficial)**.
5. Dentro do mundo, execute a macro criada automaticamente **Rangers • Gerar catálogo inicial** (Mestre), na barra lateral Macros.
6. Crie Atores Ranger / Ameaça / Zord / Megaforma / Equipe; adicione itens da pasta Itens por arrastar e soltar.

**Windows**: a pasta padrão costuma ser `%LOCALAPPDATA%\FoundryVTT\Data\systems\power-rangers-essence20` (varia conforme instalação).


## Evolução e retratos (v0.2.1)

- **Sete papéis, 140 marcos:** Preto, Azul, Verde, Rosa, Vermelho, Amarelo e Branco, do nível 1 ao 20; aumentos de Essências, capacidade de Poder Pessoal e treinamento inicial calculados automaticamente. Alterações de nível e papel são reversíveis.
- **Concessões de papel:** ao atingir um nível, o sistema insere fichas de benefícios próprios de classe, sem repetir concessões. Ao perder um nível, remove concessões automáticas indevidas.
- **Escolhas de progressão:** clique em **Evolução · nível 1–20** e escolha talento geral, Poder da Rede ou característica de Zord nos momentos apropriados. O sistema não escolhe pelos jogadores; mostra opções do índice com consulta ao livro-base.
- **Personagens da v0.1.0:** ative o botão de progressão **somente após conferir** valores registrados manualmente; o ajuste retroativo acrescenta modificadores da classe. Recomenda-se cópia do mundo.
- **Compêndios indexados:** o Mestre executa a macro **Rangers • Criar compêndios**. Sete compêndios do mundo são criados com referências a talentos, poderes, benefícios, origens, equipamentos, Zords e ameaças. Os índices não incluem o texto integral oficial, fichas estatísticas oficiais ou ilustrações; é necessário ter o livro-base.
- **Retratos:** clique em **Trocar foto** no cabeçalho; selecione ou envie imagem pelo FilePicker. **URL / caminho** permite informar o endereço manualmente. Na aba **Identidade e retratos** configure imagens civil e transformada; a imagem muda com a morfagem.
- **Efeitos automáticos específicos:** Dodgy, Harden Armor, Always Alert, Instinctual Initiative, Fast (Iniciativa), Keen Eye (Percepção), Power Heal, Faster Regeneration, Power Shield, Boost Initiative, progressão de treinamento e Essências. Outros efeitos contextuais ainda exigem aplicação do Mestre.

**Limite explícito:** esta atualização ainda não implementa a automação integral de cada efeito narrativo, gatilho, uso diário e pré-requisito de cada talento do livro, nem distribui o conteúdo editorial integral dos compêndios oficiais. Os catálogos contêm índices preparados para preenchimento e uso com o livro.

## Implementado

- **Ficha Ranger**: nome, nível, cor/papel, origem, influências, história, Essências, 21 perícias, especializações, condições, recursos, quatro Defesas.
- **Testes Essence20**: d20 + dado de perícia, dados em degraus d2/d4/d6/d8/d10/d12; especialização rola a cadeia até o maior dado e retém o maior; Edge, Snag, ausência de treinamento, bônus numéricos, deslocamentos de dado e dificuldades opcionais.
- **Resultados**: identificação de sucesso/falha, crítico por resultado máximo no dado da perícia, desastre por 1 no d20 com falha, chat com detalhes e dados 3D compatíveis com rolamentos padrão do Foundry.
- **Dificuldades**: configuráveis; indica dano sugerido conforme proporção do teste/DIF, para supervisão do Mestre.
- **Armas, armaduras e consumíveis**: fichas editáveis; atacar ou usar; equipar; consumo de cargas; custo de Poder Pessoal; armadura equipada modifica automaticamente Resistência, quando cabível; trajes não se acumulam, aplica-se a maior proteção. Rangers transformados têm Resistência +1 pelo traje padrão, mesmo sem item equipado.
- **Morfagem**: alternância, requisito de armas dependentes de transformação, proteção ligada ao traje; desmorfagem de emergência ao chegar a 0 Saúde.
- **Condicionamento**: +1 Saúde máxima por nível da perícia, ao atualizar a ficha.
- **Equipe e Pontos de História**: ator compartilhado entre jogadores; soma e consumo, ponto adicional para desastre (se tiver permissão na Equipe).
- **Zords**: ficha separada, estatísticas base sugeridas (6 Saúde, Força 6, Velocidade 4, movimento 40 pés, 1 de armadura); vinculação a piloto; combinação manual de tokens selecionados pelo Mestre.
- **Megaformas**: cria ator com IDs dos Zords, Saúde agregada, movimento definido pelo mais lento; distribui o dano por Zord ativo com arredondamento para cima e verifica derrota da maioria.
- **Iniciativa**: rolagem própria, com botão para lançar no combate ativo quando o ator participa dele.
- **Interface**: botões em português, cores de papéis, abas, rolagem vertical interna, adaptação para janelas menores.

## Utilização rápida

### Testes

Na aba **Atributos e testes**, informe opcionalmente a DIF. Selecione Edge ou Snag, o número de deslocamentos e marque **Esp.** na perícia com especialização. Clique no nome da perícia ou ícone do d20. O número de graduações da perícia vai de 0 a 6. **Condicionamento** tem regra própria e não é usado como rolagem de dado comum.

### Equipamentos

Na aba **Itens e poderes**, crie ou arraste um item. Configure perícia, dado, defesa alvo, dano base, cargas, bônus, se exige morfagem e se é consumível. Marque **Equipar** para armas/armaduras. A Defesa de Resistência usa bônus da armadura equipada; trajes definidos como exclusivos da forma morfada só protegem enquanto morfados.

### Zords / Megaformas

Na aba **Zord / Combate**, Mestre pode gerar Zord vinculado. Arraste 2 ou mais Zords para a cena, selecione seus tokens e clique **Combinar Zords selecionados** na ficha de Zord. Esse comando faz a fusão administrativa das estatísticas; **o Mestre valida os pré-requisitos temporais e narrativos** e escolhe os traços da Megaforma conforme o livro.

### Equipe

Ao executar a macro de catálogo, cria-se um ator de Equipe com permissão de Proprietário para todos. Ajuste os Pontos de História iniciais conforme a composição do grupo. Desastres de Rangers aumentam a reserva se a ficha de Equipe for editável por quem rolou.

## Regras de referência no PDF (numeração impressa)

- Criação: páginas 13–19; origens: 20–27; papéis: 28–63; influências: 64–76.
- Essências e perícias: 77–91; poderes e talentos: 92–101.
- Equipamentos e armaduras: 102–130; Zords e combinações: 131–154.
- Combate, Defesas, dano, recuperação: 155–177.

## Limites importantes (v0.2.1)

- **Compatibilidade-alvo:** Foundry 14.369. Os arquivos passaram por validação estática e testes unitários das fórmulas; **não foram executados num servidor Foundry 14.369**. O manifesto declara `verified: 14.369` para permitir avaliação de compatibilidade no instalador. Isso é uma configuração declarativa; **não comprova execução em um servidor Foundry 14.369**. Recomenda-se manter cópia de segurança do mundo.
- A progressão numérica é automática; escolhas de benefícios são explicitamente concedidas pelo jogador. A criação do personagem ainda não inclui validação rígida da distribuição das 12 Essências iniciais.
- Recursos de Zord, dano múltiplo, combinações e ações em combate não representam automação completa de todas as exceções do livro.
- **Não há sincronia entre a reserva de Poder do Zord e o piloto**; o Mestre ajusta a reserva quando apropriado.
- O ataque lê automaticamente a Defesa do token-alvo selecionado se a DIF estiver vazia. O dano aparece como **sugestão** no chat; opcionalmente, o Mestre pode ativar, nas Configurações do Sistema, a aplicação automática contra alvos que possa editar. Esse modo não considera todas as resistências e efeitos situacionais.
- Não há compêndio de ameaças oficiais nem arquivo de imagem do PDF.
- Este sistema **não pode ser ativado simultaneamente com outro sistema no mesmo mundo**; módulos compatíveis podem ser adicionados separadamente.

## Integração com módulos de dados

As rolagens utilizam `Roll.toMessage()` do núcleo, aceitas pelo ecossistema de dados do Foundry. **Dice So Nice** pode ser instalado opcionalmente; nenhum módulo é necessário para o sistema funcionar.

## GitHub (para distribuição posterior)

O arquivo `system.json` está configurado para a conta `tulioscost` e a versão `v0.2.1`. Os endereços do manifesto e ZIP tornam-se operacionais após publicação da nova Release. Consulte `COMO-PUBLICAR-v0.2.1.md`.

## Direitos e atribuição

Power Rangers é propriedade de seus titulares; o sistema e seu livro são de terceiros. Esta obra técnica de fã não implica autorização, certificação ou vínculo com Hasbro, SCG Power Rangers LLC, Renegade Game Studios ou Foundry Gaming LLC. Respeite licenças e direitos antes de distribuir conteúdo do livro ou assets da franquia.
