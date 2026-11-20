---
servico: AWS Systems Manager (e Parameter Store)
fonte: "[[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/2 - Decorar|2 - Decorar]]"
---

# Systems Manager — Flashcards

#flashcards/saa-c03/d1-seguranca/systems-manager

Quantidade máxima de parâmetros por conta/região no Standard e no Advanced?::Standard **10.000**; Advanced **100.000**

Tamanho máximo do valor no Standard e no Advanced?::Standard **4 KB**; Advanced **8 KB**

Que tier do Parameter Store suporta parameter policies e compartilhamento cross-account?::**Advanced**

Dá para voltar de Advanced para Standard?::**Não** (não é downgradeable)

Qual tier do Parameter Store é grátis?::**Standard**

Quantas versões de um parâmetro o Parameter Store guarda?::As **100** mais recentes

Rotação de credencial no Parameter Store?::**Nenhuma**; para isso, **Secrets Manager**

Quantas portas de entrada o Session Manager exige?::**Nenhuma** (sem bastion e sem chave SSH)

Criptografia da sessão do Session Manager?::**TLS 1.2** (+ chave KMS opcional)

Quando o Session Manager não registra log da sessão?::Em sessões por **port forwarding** ou **SSH**

Como usar Session Manager em nó sem IP público?::Via **PrivateLink**

Dois modos de operação do Patch Manager?::**Scan** (só relatório) e **Scan and install**

Patch Manager faz upgrade de versão maior do SO?::**Não**

O que define a conformidade no Patch Manager?::O **patch baseline** (não a AWS)

Método do Patch Manager recomendado pela doc?::**Patch policy** (via Quick Setup)
