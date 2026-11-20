---
servico: AWS WAF
fonte: "[[1 - Seguranca (30%)/WAF/2 - Decorar|2 - Decorar]]"
---

# WAF — Flashcards

#flashcards/saa-c03/d1-seguranca/waf

Quatro ações de uma regra do WAF?::**Allow**, **Block**, **Count**, **CAPTCHA/Challenge**

Código HTTP devolvido pela ação Block?::**403 Forbidden** (ou resposta customizada)

Avaliar o impacto de uma regra antes de ativar: qual ação?::**Count**

Janelas de avaliação da rate-based rule?::**1 minuto** ou **5 minutos** (não por segundo)

Quatro recursos principais suportados pelo WAF?::**CloudFront**, **API Gateway REST API**, **ALB**, **Cognito user pool**

Recursos não suportados pelo WAF?::**NLB**, **GWLB**, **EC2** direto e API Gateway **HTTP API**

Contêiner de regras do WAF associado ao recurso?::**Web ACL**

Regras prontas da AWS ou de parceiros (OWASP Top 10, bots)?::**Managed rule groups**

Unidade de capacidade da web ACL?::**WCU** (web ACL capacity unit)

Destinos de log do WAF?::**CloudWatch Logs**, **S3** ou **Firehose**

Quanto de WAF a assinatura do Shield Advanced cobre?::Até **1.500 WCUs** e **50 bilhões** de requisições/mês
