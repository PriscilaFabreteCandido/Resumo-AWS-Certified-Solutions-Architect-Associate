---
servico: Ferramentas de custo
fonte: "[[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/2 - Decorar|2 - Decorar]]"
---

# Ferramentas de custo — Flashcards

#flashcards/saa-c03/d4-custo/ferramentas-custo

Cost Explorer: quanto de histórico e quanto de forecast?::Histórico de **13 meses**; forecast de **18 meses**

Com que frequência o Cost Explorer atualiza os dados de custo?::Pelo menos **uma vez a cada 24 horas**

Quanto custa usar o Cost Explorer?::Console **grátis**; cada requisição paginada da API custa **US$ 0,01**

Quais são os 6 tipos de AWS Budgets?::**Cost**, **usage**, **RI utilization**, **RI coverage**, **Savings Plans utilization** e **Savings Plans coverage**

Para onde o AWS Budgets envia notificações?::Tópico **SNS**, **e-mail** ou ambos

Que tipos de alerta o Budgets dispara?::**Real** e **previsto** (forecast)

Com que frequência o Budgets atualiza?::Até **três vezes por dia**

O que uma budget action pode fazer?::Aplicar uma **policy IAM**

Para onde vai o Cost and Usage Report (CUR) e em que formato?::Para um **bucket S3 seu**, em **CSV**

Quais granularidades o CUR oferece?::**Hora, dia ou mês**

Com quais serviços o CUR se integra para análise?::**Athena**, **Redshift** ou **Quick**

Quem paga a fatura consolidada no Organizations, e quanto custa o serviço?::O dono da **conta de gerenciamento**; o Organizations é **sem custo adicional**

Aplicar a tag no recurso basta para usar como cost allocation tag?::**Não.** Precisa **ativar** no console de **Billing**, e a ativação **não é retroativa**

Qual ferramenta alerta ao passar de US$ X, e qual só mostra e prevê gasto?::Alerta: **AWS Budgets**; mostra e prevê: **Cost Explorer**
