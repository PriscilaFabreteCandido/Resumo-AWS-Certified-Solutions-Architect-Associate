---
servico: AWS CloudTrail
fonte: "[[1 - Seguranca (30%)/CloudTrail/2 - Decorar|2 - Decorar]]"
---

# CloudTrail — Flashcards

#flashcards/saa-c03/d1-seguranca/cloudtrail

Quantos dias de management events o Event history guarda, grátis?::**90 dias**, por Região

Retenção máxima do CloudTrail Lake (estendida)?::**3.653 dias** (cerca de **10 anos**)

Retenção padrão do CloudTrail Lake?::**2.557 dias** (cerca de **7 anos**)

Retenção de um trail entregue em S3?::A que **você** definir (via lifecycle)

Quais eventos são gravados por padrão no CloudTrail?::**Management events** (primeira cópia grátis)

Data events são gravados por padrão?::**Não**, e são **cobrados**

Destino do trail para criar alarme quase em tempo real?::**CloudWatch Logs** (metric filter + alarme)

Como consultar eventos do CloudTrail em SQL com retenção longa?::**CloudTrail Lake**

Como analisar logs do trail guardados em S3?::Com **Athena**

Como reagir a uma chamada de API específica?::**EventBridge**

Como auditar todas as contas da organização com um só trail?::**Organization trail**, criado na **management account**, gravando num bucket central

Combinação para trilha inviolável?::Organization trail → bucket na **Log Archive** com versionamento + **Object Lock Compliance** + MFA Delete + **SCP** negando parar/apagar trail
