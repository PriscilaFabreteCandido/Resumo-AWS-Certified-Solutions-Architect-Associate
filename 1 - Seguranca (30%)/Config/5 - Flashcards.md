---
servico: AWS Config
fonte: "[[1 - Seguranca (30%)/Config/2 - Decorar|2 - Decorar]]"
---

# AWS Config — Flashcards

#flashcards/saa-c03/d1-seguranca/config

Para impedir que uma ação aconteça, qual serviço?::**SCP** (Organizations) ou **IAM policy**

Para detectar desvio e remediar, qual serviço?::**AWS Config**

Como os controles do Security Hub são executados?::Via **service-linked rules do Config**

Para que o Firewall Manager usa o Config?::Para o **inventário** de recursos

Que tipo de control do Control Tower é Config rule?::Os controls **detective**

O que acontece com Security Hub e Firewall Manager sem Config habilitado?::Ficam **cegos** (Config é pré-requisito)

Dois tipos de Config rules?::**Managed** (prontas da AWS) e **custom** (Lambda ou Guard)

Dois modos de avaliação das Config rules?::**Change-triggered** (quando o recurso muda) e **periodic**

O que executa a remediation action do Config?::Um documento do **SSM Automation**

Como ver a conformidade de várias contas e regiões num lugar só?::**Config aggregator**

Exemplo de managed rule para SSH aberto?::`restricted-ssh`
