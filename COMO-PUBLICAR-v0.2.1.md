# Instalação e publicação — Rangers Essence20 v0.2.1

## Para o proprietário do GitHub `tulioscost`

1. Extraia o arquivo **Repositório completo** e envie os arquivos para a raiz do repositório `tulioscost/power-rangers-essence20` na branch `main`.
2. Crie e envie a tag `v0.2.1` para o commit correspondente. O workflow em `.github/workflows/release.yml` gera a Release e anexa `system.json`, `power-rangers-essence20.zip` e `SHA256SUMS.txt`.
3. Alternativa sem Actions: crie manualmente a Release `v0.2.1` e anexe os três arquivos fornecidos em **Arquivos para GitHub Releases**. Eles já estão preparados para a tag correta.
4. Confira se ambos `system.json` e `power-rangers-essence20.zip` aparecem entre os anexos. É obrigatório publicar os dois.

### Link para instalar depois da publicação

`https://github.com/tulioscost/power-rangers-essence20/releases/latest/download/system.json`

### Atualização no Foundry 14.369

1. No Setup, abra **Sistemas de Jogo**. Atualize **Rangers • Essence20** para `0.2.1`.
2. Se a atualização não aparecer, encerre o Foundry, remova **somente** a pasta instalada `Data/systems/power-rangers-essence20` (não apague os mundos) e instale novamente pelo URL acima ou usando o ZIP de instalação manual.
3. Reinicie o Foundry, confirme que o cartão mostra `0.2.1`, depois escolha **Criar Mundo** e selecione o sistema.
4. Se ainda não conseguir criar/abrir o mundo, abra **F12 > Console**, tente novamente e copie a primeira mensagem de erro vermelho. Junte a versão completa de Foundry mostrada no Setup, por exemplo `14.369`.

**Atenção:** `Compatibility Unknown` é um aviso de metadados, não prova da causa da falha ao criar o mundo. A correção do manifesto elimina o campo ausente; erros posteriores exigem o console ou log do servidor. Não foi realizado teste em uma instalação real de Foundry 14.369.
