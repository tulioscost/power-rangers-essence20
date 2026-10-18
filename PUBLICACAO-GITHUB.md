# Publicação no GitHub — Rangers · Essence20 v0.1.0

## Estrutura entregue

- **Pacote completo:** reúne repositório, arquivos de Release, instalação manual e este manual.
- **Arquivos para GitHub Releases:** `system.json` e `power-rangers-essence20.zip` (mais checksums). 
- **Repositório completo:** arquivos para subir à raiz do projeto GitHub, incluindo `.github/workflows/release.yml`.

## Publicação automática (recomendada)

1. Crie um **repositório GitHub** e carregue nele o conteúdo do ZIP **Repositório completo** (o `system.json` deve ficar na raiz). Para a primeira publicação, mantenha `.github/workflows/release.yml`.
2. Na configuração do repositório, confira **Settings → Actions → General → Workflow permissions**; libere a permissão para criar Releases, se necessário.
3. No terminal de um clone local, rode:

   ```bash
   git add .
   git commit -m "Rangers Essence20 v0.1.0"
   git push origin main
   git tag v0.1.0
   git push origin v0.1.0
   ```

4. O GitHub Actions executa os testes e publica automaticamente em **Releases** os arquivos `system.json`, `power-rangers-essence20.zip` e `SHA256SUMS.txt`. Ele substitui os URLs do manifesto pelas URLs verdadeiras do seu repositório.
5. A **URL de instalação no Foundry** será:

   `https://github.com/SEU_USUARIO/SEU_REPOSITORIO/releases/latest/download/system.json`

   Substitua `SEU_USUARIO/SEU_REPOSITORIO` pela identificação real do projeto. Não publique o texto ilustrativo como se fosse uma URL válida.

## Publicação manual, sem GitHub Actions

Antes de enviar os arquivos de Release, gere os dois arquivos finais com os endereços do repositório:

```bash
python3 scripts/build_release.py --repo SEU_USUARIO/SEU_REPOSITORIO --tag v0.1.0 --output dist/release
```

A saída conterá `dist/release/system.json`, `dist/release/power-rangers-essence20.zip` e `SHA256SUMS.txt`. Crie a Release `v0.1.0` e anexe **ambos** `system.json` e `.zip`. O ZIP de Release enviado nesta conversa não traz endereços do GitHub porque nenhum repositório foi identificado; não é apropriado inventá-los. O arquivo `.zip` interno deve conter `system.json` na raiz, sem uma pasta externa adicional.

## Instalação manual sem GitHub

Extraia o `power-rangers-essence20.zip` do pacote manual em `FoundryVTT/Data/systems/power-rangers-essence20/`. O diretório final deve conter o `system.json` diretamente.

## Avisos

- Versão técnica **0.1.0**, dirigida ao **Foundry 14.369**. Não é a 0.3.3 exibida na imagem de exemplo.
- Testes estáticos/automatizados executados; a inicialização num Foundry real ainda **não foi validada**.
- Projeto de fã não oficial; não contém o PDF nem imagens/licenças da franquia.
