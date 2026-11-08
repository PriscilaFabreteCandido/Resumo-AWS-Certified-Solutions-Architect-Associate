---
tags: [saa-c03, iam, seguranca, identidade]
servico: AWS IAM
tipo: Identidade e acesso
dominios: [1]
atualizado: 2026-11-08
---

# AWS IAM — O que é

> [!info] Em uma frase
> O serviço que responde **"quem pode fazer o quê, em qual recurso"** na AWS. É **global**, gratuito, e nenhuma chamada de API acontece sem passar por ele.

## O que é, em palavras simples

IAM tem dois lados:

- **Identidades** — quem está chamando: **usuário**, **grupo**, **role**.
- **Políticas** — documentos JSON que dizem o que é permitido ou negado.

A regra de abertura é a mais importante: *"By default, all requests are implicitly denied with the exception of the AWS account root user, which has full access."* Tudo começa **negado**. Você precisa de um `Allow` explícito em algum lugar.

E a regra de fechamento: *"An explicit deny overrides an explicit allow."* Um `Deny` em qualquer política mata a requisição, e nada o reverte.

## As identidades

| Identidade | Para quê |
|---|---|
| **Usuário** | Pessoa ou aplicação com credencial de longo prazo. **Evite** — a AWS recomenda federação |
| **Grupo** | Coleção de usuários, para anexar políticas em bloco. Não pode ser aninhado nem ser principal |
| **Role** | Identidade **sem credencial fixa**, assumida temporariamente via **STS**. **É a resposta certa quase sempre** |
| **Root user** | A identidade de criação da conta. Guarde com MFA e **não use** |

## Os tipos de política

| Tipo | Anexada a | Função |
|---|---|---|
| **Identity-based** | usuário, grupo, role | **Concede** permissão |
| **Resource-based** | o recurso (bucket, fila, chave KMS) | Concede, e define quem **de fora** entra |
| **SCP** | raiz, OU, conta (Organizations) | **Teto.** Não concede |
| **RCP** | raiz, OU, conta | Teto **no lado do recurso** |
| **Permissions boundary** | usuário, role | **Teto** para a identidade |
| **Session policy** | passada no `AssumeRole` | **Teto** para a sessão |

> [!tip] Mnemônico: SCP, Boundary e Session policy só **subtraem**, nunca somam.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[STS]] · [[Organizations e Control Tower]] · [[IAM Identity Center]] · [[KMS]]
- [Documentação oficial do IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
