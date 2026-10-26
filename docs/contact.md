# Formulário de contato

O formulário usa HeroUI v2 (`Input` e `Textarea`), a rota `/api/contact`, Resend e Arcjet. Nome, email e mensagem são obrigatórios. Telefone é opcional. Todos os seis idiomas do portfólio têm rótulos, erros e confirmação de envio.

## Configurar as duas chaves

Copie `.env.example` para `.env.local` para desenvolvimento. Na hospedagem, cadastre as mesmas variáveis nas configurações do projeto e faça um novo deploy. Nunca use o prefixo `NEXT_PUBLIC_` nessas chaves.

1. **Resend:** acesse [Domains](https://resend.com/domains) e adicione **envio.gleiksoft.dev**. Cadastre no seu DNS exatamente os registros apresentados pelo painel e aguarde a verificação. Use os registros de envio; não habilite recebimento nem substitua os registros MX de `gleiksoft.dev` usados pelo encaminhamento existente. Depois, em [API Keys](https://resend.com/api-keys), crie uma chave com acesso de envio, de preferência restrita ao domínio, e coloque em `RESEND_API_KEY`.
2. **Arcjet:** crie uma conta/projeto no [painel](https://app.arcjet.com/), copie a chave emitida para o projeto e coloque em `ARCJET_KEY`. A chave pode ter o prefixo `aj_prj_key`; o aplicativo não deduz sua validade pelo prefixo. As regras são definidas no código e operam em modo `LIVE`.

O formulário compara a origem do POST com a URL da própria requisição. Isso funciona no domínio principal, em `www` e nos previews sem cadastrar uma URL por ambiente.

O remetente padrão é `Portfólio Levi Gleik <formulario@envio.gleiksoft.dev>`. O destinatário é `contato@gleiksoft.dev`, que já encaminha para `levigleik@gmail.com`. O campo `replyTo` contém o endereço original do visitante, para que o botão Responder use esse endereço. Não é necessário criar uma caixa postal no subdomínio de envio.

O encaminhamento de emails e a autorização de envio são configurações distintas. A verificação do subdomínio permite enviar pelo Resend e mantém o encaminhamento do domínio principal separado. A confirmação DNS deve ser feita no painel: este projeto não altera registros nem configura contas externas.

## Testar no ambiente local

O `GET /api/contact` deve devolver um token quando as duas chaves estiverem configuradas. Um `503` nesse GET indica uma chave ausente. A validade da chave Arcjet é verificada quando o serviço processa o envio; o prefixo não é uma validação confiável. A rota não envia email no GET.

Este projeto pode ter `.env` e `.env.development`. O Next.js carrega `.env.local` antes desses arquivos; para evitar conflito entre valores, coloque as variáveis locais em `.env.local`, que tem prioridade. Copie para `ARCJET_KEY` a chave real obtida no [console do Arcjet](https://console.arcjet.com/) e mantenha `RESEND_API_KEY` com sua chave de envio do Resend. `CONTACT_SITE_URL` não é mais necessária e pode ser removida dos ambientes. Não coloque chaves no navegador nem nesta conversa.

Depois de editar as variáveis, pare e reinicie o servidor de desenvolvimento (`bun run dev`) e recarregue a página. Abra `http://localhost:3005/#contact`, preencha com seu nome, um email real seu e uma mensagem de pelo menos 20 caracteres, aguarde três segundos após focar o primeiro campo e envie. O email deve chegar a `contato@gleiksoft.dev` e ser encaminhado para `levigleik@gmail.com`. Confirme também que Resend marcou `envio.gleiksoft.dev` como verificado. Em testes consecutivos, espere ao menos 30 segundos e mude o texto da mensagem; os limites e a detecção de duplicidade também valem localmente.

## Proteções

- Validação no servidor: nome de 2–100 caracteres, email de até 254, telefone opcional com 7–15 dígitos e mensagem de 20–5.000 caracteres. Corpo JSON limitado a 32 KiB, inclusive quando `Content-Length` está ausente ou incorreto.
- Origem do POST deve coincidir com a origem da URL da requisição. Sem chave configurada, indisponibilidade do Arcjet ou erro em qualquer regra, o envio é recusado. Não existe modo de produção que ignore as proteções.
- Arcjet verifica bots, emails descartáveis, sintaxe e registros MX do domínio. Isso não comprova a existência da caixa nem a posse do endereço; não há confirmação por link/código.
- Limites compartilhados entre instâncias: 3 tentativas por IP em 15 minutos; 1 por IP em 30 segundos; 3 por email normalizado em 1 hora; 90 tentativas para todo o formulário em uma janela de 24 horas; 1 mensagem repetida por email em 10 minutos. O limite global dá margem à cota gratuita de 100 emails/dia do Resend, mas também inclui tentativas que depois falhem; considere outros envios da mesma conta ao ajustar esse valor.
- Normalização de aliases do Gmail (`+tag`, pontos e `googlemail.com`) apenas para contar limites e reconhecer mensagens repetidas. O original é preservado no corpo e no `replyTo`. Regras de Gmail não são aplicadas a domínios arbitrários.
- Campo honeypot e token assinado pelo servidor: mínimo de 3 segundos para preenchimento e validade de 1 hora. O HMAC deriva da `ARCJET_KEY` com separação por finalidade; não há terceira chave a cadastrar. Trocar a chave invalida tokens abertos, que podem ser renovados no formulário. Esse tempo é um sinal complementar e pode ser contornado por automações que esperem.
- Idempotência do Resend evita repetir um mesmo envio em tentativas de rede. Conteúdo é enviado como texto simples; não é interpretado como HTML.
- Email e mensagem usados como características de limite são enviados como HMAC. Arcjet recebe o email original para validar o endereço e metadados da requisição para detectar bots. O aplicativo não grava mensagens em banco nem imprime dados do formulário/chaves em logs.

Os contadores do Arcjet medem tentativas válidas que chegam à proteção, não apenas emails entregues. Respostas `429` incluem `Retry-After`; o formulário respeita a pausa, mantém os campos após erros e permite contato pelo email publicado se o serviço estiver indisponível. O deploy deve preservar cabeçalhos de IP confiáveis da plataforma. Em infraestrutura própria com proxy, configure a confiança no proxy conforme a [documentação do SDK](https://docs.arcjet.com/sdk/next/).

## Bibliotecas

- [`resend`](https://resend.com/docs/send-with-nextjs): envio, `replyTo` e idempotência.
- [`@arcjet/next`](https://docs.arcjet.com/sdk/next/signup-protection/reference/): proteção de bots, limites distribuídos, emails temporários e MX.
- [`validator`](https://github.com/validatorjs/validator.js): formato e normalização específica por provedor.
- `server-only`: impede importar o módulo de credenciais no navegador.

Alternativas: [`@upstash/ratelimit`](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview) para limites usando Redis e [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) como desafio antibot adicional. Não foram instaladas porque a implementação atual usa Arcjet.

## Verificar

Execute `bun test tests/contact.test.js` e `bun run build`. Os testes usam serviços simulados e não enviam emails reais. Depois de configurar as contas e o DNS, faça um envio manual pelo formulário e confirme o recebimento, o encaminhamento e o endereço usado ao responder. Sem credenciais reais, não é possível confirmar entrega ou as decisões do serviço externo em produção.
