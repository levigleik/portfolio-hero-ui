# Portfólio Pessoal – Next.js & HeroUI

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-blue?logo=nextdotjs" alt="Next.js" />
  <img src="https://img.shields.io/badge/HeroUI-v2-purple?logo=react" alt="HeroUI" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-11.13-0055FF?logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/View_Transition_API-%F0%9F%9A%80-blue" alt="View Transition API" />
  <img src="https://img.shields.io/badge/next--intl-3.10.0-orange?logo=translate" alt="next-intl" />
</p>

Este é um projeto de portfólio moderno desenvolvido com Next.js 14, HeroUI v2 e Tailwind CSS. Ideal para apresentar seus trabalhos, experiências e habilidades de forma profissional e responsiva.

## Demonstração

Acesse uma versão de demonstração (caso publicada) ou rode localmente seguindo as instruções abaixo.

## Tecnologias Utilizadas

- ![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=nextdotjs) [Next.js 14](https://nextjs.org/docs/getting-started) – Framework React para aplicações modernas
- ![HeroUI](https://img.shields.io/badge/HeroUI-v2-purple?logo=react) [HeroUI v2](https://heroui.com/) – Biblioteca de componentes UI premium
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white) [Tailwind CSS](https://tailwindcss.com/) – Utilitários para estilização rápida
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white) [TypeScript](https://www.typescriptlang.org/) – Tipagem estática para maior robustez
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.13-0055FF?logo=framer) [Framer Motion](https://www.framer.com/motion/) – Animações modernas
- ![next-intl](https://img.shields.io/badge/next--intl-3.10.0-orange?logo=translate) [next-intl](https://next-intl.js.org/) – Internacionalização (Português e Inglês)
- ![View Transition API](https://img.shields.io/badge/View_Transition_API-%F0%9F%9A%80-blue) [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) – Transições suaves de página usando a nova API nativa do navegador
- [next-themes](https://github.com/pacocoursey/next-themes) – Suporte a temas (dark/light)

## Estrutura do Projeto

- `src/app` – Páginas e rotas principais
- `src/components` – Componentes reutilizáveis do portfólio
- `src/assets` – Imagens e arquivos estáticos
- `src/styles` – Estilos globais e customizações
- `src/config` – Configurações e constantes
- `src/lib` – Funções utilitárias

## Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repo>
   cd portfolio-hero-ui
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou yarn dev, pnpm dev, bun run dev
   ```
4. Acesse `http://localhost:3005` no navegador.

## Personalização

- Altere conteúdos em `src/app` e `src/components` para adicionar seus projetos, experiências e informações pessoais.
- O portfólio já vem pronto para múltiplos idiomas (Português e Inglês) usando o pacote `next-intl`.
- Aproveite transições de página suaves com a nova [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API).

## Deploy

Este projeto pode ser facilmente publicado no Vercel, Netlify ou qualquer serviço compatível com Next.js.

## CI/CD e Qualidade de Código

Este projeto utiliza Husky para garantir a qualidade do código através de hooks de Git:

- **Pre-commit Hook**: Executa automaticamente lint antes de cada commit
  - Verifica erros de sintaxe e formatação
  - Previne commits com código que não segue os padrões de código

- **Pre-push Hook**: Executa o build antes de cada push
  - Impede pushes para o repositório remoto se o build falhar
  - Garante que apenas código funcional seja enviado para o repositório remoto
  - Reduz problemas em ambientes de integração contínua

Para pular a verificação em casos excepcionais (não recomendado):
```bash
git commit -m "mensagem" --no-verify
git push --no-verify
```

### Configuração

A configuração do Husky está nos arquivos:
- `.husky/pre-commit`: Hook executado antes de cada commit
- `.husky/pre-push`: Hook executado antes de cada push
- `package.json`: Configuração do lint-staged

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
