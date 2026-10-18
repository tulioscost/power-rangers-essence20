# Rangers · Essence20 — sistema de fã para Foundry VTT 14.369

**Versão:** 0.1.0 | **Idioma da interface:** português brasileiro | **Manifesto:** `system.json`

Adaptação técnica **não oficial** para uso com o livro *Power Rangers Roleplaying Game — Core Rulebook* (Renegade Game Studios, Essence20). Não inclui ilustrações, personagens prontos, longas transcrições de regras ou material gráfico protegido. Não substitui o livro.

## Instalação manual

1. Feche o Foundry VTT ou saia do mundo.
2. Extraia o ZIP de forma que a pasta `power-rangers-essence20` contenha diretamente o arquivo `system.json`.
3. Copie a pasta para `FoundryVTT/Data/systems/` da sua pasta de dados do usuário, não para a pasta do programa.
4. Inicie o Foundry 14.369, crie um novo mundo e escolha **Rangers • Essence20 (não oficial)**.
5. Dentro do mundo, execute a macro criada automaticamente **Rangers • Gerar catálogo inicial** (Mestre), na barra lateral Macros.
6. Crie Atores Ranger / Ameaça / Zord / Megaforma / Equipe; adicione itens da pasta Itens por arrastar e soltar.

**Windows**: a pasta padrão costuma ser `%LOCALAPPDATA%\FoundryVTT\Data\systems\power-rangers-essence20` (varia conforme instalação).

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

## Limites importantes (v0.1.0)

- **Compatibilidade-alvo:** Foundry 14.369. Os arquivos passaram por validação estática e testes unitários das fórmulas; **não foram executados num servidor Foundry 14.369**. O manifesto não declara uma versão `verified`, pois ainda não houve teste de execução na instalação Foundry 14.369.
- Não inclui uma transcrição da progressão de níveis de cada papel; o Mestre registra talentos/perks manualmente. A criação do personagem utiliza dados livres, sem assistente de validação rígido para as 12 Essências iniciais.
- Recursos de Zord, dano múltiplo, combinações e ações em combate não representam automação completa de todas as exceções do livro.
- **Não há sincronia entre a reserva de Poder do Zord e o piloto**; o Mestre ajusta a reserva quando apropriado.
- O ataque lê automaticamente a Defesa do token-alvo selecionado se a DIF estiver vazia. O dano aparece como **sugestão** no chat; opcionalmente, o Mestre pode ativar, nas Configurações do Sistema, a aplicação automática contra alvos que possa editar. Esse modo não considera todas as resistências e efeitos situacionais.
- Não há compêndio de ameaças oficiais nem arquivo de imagem do PDF.
- Este sistema **não pode ser ativado simultaneamente com outro sistema no mesmo mundo**; módulos compatíveis podem ser adicionados separadamente.

## Integração com módulos de dados

As rolagens utilizam `Roll.toMessage()` do núcleo, aceitas pelo ecossistema de dados do Foundry. **Dice So Nice** pode ser instalado opcionalmente; nenhum módulo é necessário para o sistema funcionar.

## GitHub (para distribuição posterior)

Publique todo o conteúdo do diretório como raiz do repositório e adicione, **somente após publicar os arquivos reais**, os campos `manifest` e `download` em `system.json` usando links para `raw.githubusercontent.com` e o release ZIP no GitHub. Crie um Release com o arquivo ZIP. Não use URLs fictícias no manifesto.

## Direitos e atribuição

Power Rangers é propriedade de seus titulares; o sistema e seu livro são de terceiros. Esta obra técnica de fã não implica autorização, certificação ou vínculo com Hasbro, SCG Power Rangers LLC, Renegade Game Studios ou Foundry Gaming LLC. Respeite licenças e direitos antes de distribuir conteúdo do livro ou assets da franquia.
