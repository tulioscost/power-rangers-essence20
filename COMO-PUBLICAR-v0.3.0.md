# Instalação e publicação — v0.3.0

1. Na página https://github.com/tulioscost/power-rangers-essence20/releases crie uma Release com a tag `v0.3.0`.
2. Anexe **os três arquivos** de `GitHub-Release/`: `system.json`, `power-rangers-essence20.zip`, `SHA256SUMS.txt`.
3. Envie os arquivos do ZIP de Repositório Completo para a branch `main` e crie uma tag `v0.3.0` (opção recomendada: use somente o workflow para gerar os anexos ao criar a tag).
4. Em Foundry VTT 14.369: Sistemas -> Instalar sistema -> `https://github.com/tulioscost/power-rangers-essence20/releases/latest/download/system.json`.
5. Reinicie o Foundry, entre como GM e aguarde a primeira instalação de compêndios. Abra um Ranger e confira cinco abas; se a ficha genérica persistir, execute a macro `Rangers • Reparar ficha completa`.
6. Faça backup do mundo antes da atualização, especialmente caso existam fichas das versões 0.1 e 0.2.

### Diagnóstico se a janela ainda for genérica
Abra F12 -> Console, execute `game.system.api.openRangerSheet(game.actors.find(a=>a.type==='ranger'))` com um Ranger existente. Se aparecer a ficha correta, há preferência antiga salva; rode `game.system.api.repairActorSheets()`. Se ocorrer erro, copie o primeiro erro vermelho, sem dados privados da mesa.

### Verificação de assets
- Manifesto `system.json` deve conter `"version": "0.3.0"` e `"download"` com o ZIP da tag `v0.3.0`.
- A URL não fica utilizável **antes** de publicar a Release no GitHub.
