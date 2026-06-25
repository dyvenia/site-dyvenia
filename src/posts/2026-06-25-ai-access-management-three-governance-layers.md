---
title: 'AI Access Management: Three Governance Layers'
date: 2026-06-25 15:41:00
author: Alessio Civitillo
description: 'AI introduces a new access management challenge: what the user can see, what the agent can see, and what the LLM can see are not the same thing. This article explores how AI governance can be integrated into an existing hub-and-domain data architecture through identity groups, secured schemas, and governed AI harnesses.'
tags:
  - AI Governance
  - AI Agents
  - Data Governance
  - Data Architecture
  - Access Management
internal_notes: 4th part of the data governance series
---

As described in the previous articles in this data governance series, effective enterprise data governance requires combining the useful parts of hub-and-spoke with the useful parts of data mesh domains.

The hub provides shared governance, certified facts and dimensions, secured schemas, access control, best practices, and production standards.

Domains provide business context, domain-specific logic, and ownership close to the business.

AI introduces an additional governance question:

> **How should we govern the data access of AI agents?**

This challenge is more complex than typical BI access management because AI serves as both a reasoning and a consumption layer.

With a dashboard, the access pattern is usually clearer. A user opens a Power BI report, the report connects to a semantic model or database, and the user sees whatever the report is allowed to show.

With AI agents, the flow is less obvious. The user asks a question. The agent may call tools, query databases, inspect metadata, generate SQL, run Python, summarize results, use memory, or send part of the context to an LLM.

This introduces a governance challenge that does not exist in traditional BI environments.

There is no point in building a careful data access model with secured tables, secured schemas, and identity groups if a GenBI agent can then answer questions about any data in the organization.

AI access management must be layered.

There are three different questions:

1. What the LLM can see;
2. What the user can see;
3. What the agent can see.

These are not the same thing.

![llm layer vs user layer vs agent layer](/assets/images/blog/llm_user_agent_layers.png)

These layers sit atop the governance model discussed in previous articles. Certified facts, certified metrics, secured schemas, identity groups, and domain ownership remain the foundation. AI introduces an additional execution layer, but it should not replace the existing governance model.

If we confuse them, AI governance becomes either too loose or too restrictive. Too loose, and sensitive data leaks through the agent. Too restrictive, and the AI system becomes useless because it cannot do meaningful work.

Effective AI governance depends on keeping these layers separate.

## **Agent vs LLM**

Before going further, it is important to clarify the difference between the agent and the LLM.

For governance purposes, it is useful to treat them separately.

The **LLM** is the model endpoint. It receives prompts, reasons over context, and generates responses. In most enterprise setups, this endpoint is provided by an external vendor or by a model deployed in a controlled environment.

The **agent** is the broader system around the LLM. It may include deterministic code, tools, permissions, memory, database connections, SQL execution, Python execution, logging, observability, and workflow logic.

For example, an agent may:

- receive a user question;
- check the user’s identity groups;
- inspect the catalog;
- generate SQL through the LLM;
- validate the SQL;
- run the SQL inside the company infrastructure;
- summarize the result;
- and return only the approved output to the user.

In that case, the LLM is only one component of the agent.

This distinction matters because deterministic agent code can be audited and controlled more easily than the LLM itself.

If the agent runs within the company infrastructure, under a controlled harness, it can safely perform tasks that should not be delegated directly to the LLM.

For example, the agent can query secured schemas, apply permission checks, execute SQL, enforce row limits, filter columns, log access, and reject unsafe requests.

The LLM should not be treated as the place where all governance happens. It should be treated as a reasoning component inside a governed system.

## **The Harness and AI Supervisor**

Harness engineering is becoming increasingly important.

A harness is the controlled environment in which AI agents run. It is the sandbox, container, or execution layer that surrounds the LLM, making the agent safe enough to use in enterprise settings.

Within the harness sits an **AI Supervisor**. 

The supervisor acts as the orchestration layer. When a user submits a request, the supervisor evaluates the user's intent and determines which AI agent is best suited to handle the task.

For example:

- a BI agent may answer analytical questions;
- a SQL agent may generate and validate queries;
- a catalog agent may search metadata and lineage;
- a forecasting agent may perform predictive analysis.

The supervisor routes the request to the appropriate agent rather than allowing every agent to respond to every question.

Once selected, the AI agent does not operate independently. Instead, it relies on services provided by the harness. The agent can call the harness for:

- permission checks;
- authentication and authorization;
- memory retrieval;
- tool execution;
- logging and audit trails;
- policy validation;
- SQL execution;
- result filtering;
- and other governance controls.

This separation is important. The supervisor decides which agent should run. The agent performs the task. The harness provides the governed services that the agent depends on.

The harness should be primarily deterministic code.

This is important for two reasons.

First, deterministic code can be audited. You can inspect it, test it, version it, and explain how it behaves.

Second, deterministic code gives you a way to control the more unpredictable behavior of LLMs.

An LLM may misunderstand a request, generate incorrect SQL, or attempt to answer with incomplete context. The harness should prevent these mistakes from becoming data governance issues.

A good harness typically includes:

- an AI supervisor;
- permission systems;
- authentication and authorization;
- tool execution controls;
- memory systems;
- logging and audit trails;
- SQL validation;
- result filtering;
- row and column limits;
- policy checks;
- and escalation rules.

For example, if a user asks:

> Show me customer profitability by region.

The supervisor first determines which agent should handle the request. The agent should then verify:

- who the user is;
- which identity groups the user belongs to;
- whether the user can access profitability data;
- which secured schemas the user can query;
- whether customer-level data is allowed;
- whether margin or cost fields are restricted;
- and whether the result should be aggregated.

Only then should the query be executed.

The harness is where AI governance becomes operational.

![harness engineering](/assets/images/blog/harness%20engineering.png)

## **Layer 1: What the LLM Can See**

The first layer is what the LLM can see.

As a rule, do not send company hub data directly to the LLM unless there is a strong reason and the environment is trusted for that level of data.

This is especially important for sensitive facts, customer data, employee data, margin data, cost data, legal data, supplier data, and anything that could create commercial or regulatory exposure.

There are two reasons for this.

The first reason is security and confidentiality. Even when vendors provide enterprise protections, the safest pattern is still to minimize what is sent outside the controlled environment. The LLM should receive only the context it needs to perform the task.

The second reason is cost and performance. Data analytics is data-heavy. Sending large datasets into the LLM context is usually expensive, slow, and unnecessary. It can also reduce answer quality because the context window gets filled with raw data rather than useful instructions, schema information, or query results.

LLMs are usually better used for:

- generating SQL;
- explaining SQL;
- creating Python code;
- interpreting metadata;
- proposing joins;
- summarizing small approved result sets;
- explaining errors;
- and helping fix failed queries.

For example, instead of sending one million invoice rows to the LLM, the agent can send:

- the user question;
- the approved schema names;
- the relevant table metadata;
- the available columns;
- the metric definitions;
- and the permission context.

The LLM can generate a SQL query.

The harness can validate and execute the query inside the company environment.

Then the LLM can receive only a small approved result set or summary.

This is a much safer pattern.

The practical rule is:

> **The LLM should reason over metadata, instructions, and approved summaries, not raw enterprise data by default.**

## **Layer 2: What the User Can See**

The second layer is what the user can see.

This should be kept as simple as possible.

The best pattern is to use the same identity groups that already govern access to secured schemas.

For example, a user may belong to:

- `north_america_sales`
- `global_finance`
- `powerbi_sales_analysts`
- `executive_reporting_builders`

The AI agent should use these groups to determine what data the user can access.

If the user belongs to `north_america_sales`, the agent may allow access to:

- `hub_facts_nam`
- `hub_dimensions_customer_sales`
- `hub_dimensions_shared`

If the user is not in a finance group, the agent should not answer questions that require cost or margin fields.

For example, if a Sales user asks:

> What is the margin by customer for North America?

The agent should not simply answer because the question is analytically valid.

The agent should check whether the user is allowed to see margin data. If not, it should refuse or redirect to an approved metric such as revenue or discount.

The important point is that the AI agent should not create a parallel access model.

It should reuse the enterprise access model.

This requires a permission system inside the AI harness.

Ideally, this permission system is global. All agents should call the same permission service rather than each agent implementing its own rules.

This makes governance simpler.

It also makes auditability easier because the organization can answer questions such as:

- Which users can access which secured schemas through AI?
- Which identity groups can query margin-related data?
- Which agents can access customer-level data?
- Which requests were denied?
- Which users asked for restricted data?

The practical rule is:

> The user should only be able to access data through the agent, as they can through approved enterprise access paths.

AI should not become a shortcut around the data access model.

## **Layer 3: What the Agent Can See**

The third layer is what the agent can see.

This is different from what the user can see.

An agent may need access to more context than the user sees in the final answer. For example, the agent may need metadata, lineage, table descriptions, column definitions, sample values, metric definitions, query logs, or error messages to perform its work.

But this does not mean the agent should have unlimited access to all data.

An agent is a combination of LLM calls, tools, deterministic code, permissions, memory, and execution logic. In some frameworks, an agent may appear to be a skill. In others, such as Python-based systems, the agent may be a program running inside the company's infrastructure.

If the agent runs inside the harness, it is safer than sending everything directly to the LLM. But it still needs access boundaries.

For example, a SQL-generating agent may need to inspect:

- table names;
- column names;
- relationships;
- metric definitions;
- allowed schemas;
- and previous query errors.

But it does not necessarily need unrestricted access to every row in every table.

The agent should receive the minimum access required to complete the task.

This is especially important because agents can accidentally surface internal information to users.

For example, suppose the agent has access to global financial data, enabling it to answer questions for Finance users. If the same agent is used by Sales users, the harness must ensure that the agent does not leak finance-only information into a Sales answer.

This can happen in subtle ways.

The agent might:

- generate SQL against the wrong schema;
- join to a restricted table;
- use a restricted metric in an explanation;
- summarize data from memory that the user cannot access;
- or expose a column name that reveals sensitive logic.

So the agent’s access should be controlled at multiple levels:

- tool access;
- schema access;
- metadata access;
- memory access;
- execution access;
- and response filtering.

The practical rule is:

> The agent may need more operational context than the user, but it should never be allowed to return data the user is not authorized to see.

## **Example: Sales User Asking About Margin**

Consider a Sales user asking an AI agent:

> Which customers have the lowest margin in North America?

This question touches all three layers.

At the user layer, the system checks whether the user belongs to a group that can see margin data. If the user belongs only to `north_america_sales`, they may be allowed to view revenue but not costs or margins.

At the agent layer, the agent may know that margin metrics exist and that Finance users can access them. But the agent must not use those metrics for this user.

At the LLM layer, the LLM should not receive raw margin data. It may receive a policy-aware instruction such as:

> The user does not have access to margin metrics. Do not generate SQL using cost or margin columns. Offer an approved alternative such as revenue, discount, or sales volume.

A good response might be:

> I cannot analyze customer margin with your current access. I can help you analyze revenue, discount, order volume, or sales performance by customer for North America.

This is the right behavior.

The agent is useful, but it respects the existing access model.

***

## **Example: Finance User Asking About Margin**

Now consider a Finance user asking the same question.

The user belongs to `global_finance`.

The harness checks that this group has access to:

- `hub_facts_finance`
- `hub_dimensions_finance`
- `hub_dimensions_customer_finance`
- `hub_dimensions_shared`

The agent can then generate SQL against the approved finance schemas.

The LLM may generate the query, but the harness validates it before execution. The query runs inside the company infrastructure. The result is aggregated, filtered, and returned to the user.

The LLM may receive only the final approved result set for summarization.

This is the clean pattern:

- User access is checked through identity groups;
- Agent execution is controlled by the harness;
- LLM exposure is minimized;
- Results are returned only if the user is authorized.

## **The Clean AI Governance Model**

The cleanest approach is to place AI inside the existing governance architecture, not beside it.

The hub still owns certified facts, dimensions, secured schemas, access patterns, and certified metrics.

Domains still own business meaning, domain-specific data products, and validation.

BI teams still own reports and semantic models.

AI agents should consume these governed assets through the same access paths as other consumers.

The only difference is that AI adds a new execution layer: the harness.

The harness should enforce:

- who the user is;
- what the user can access;
- what tools the agent can call;
- what data the LLM can see;
- what can be stored in memory;
- what queries can be executed;
- and what results can be returned.

This keeps AI governance aligned with the rest of the data platform.

## **Conclusion**

AI governance is not only about model risk or prompt safety. For enterprise data, it is also about access management.

The key is to recognize that AI access is layered.

The LLM can see one thing. The agent can see another thing. The user can see another thing.

These layers must be governed separately.

The LLM should receive as little internal data as possible. It should reason over metadata, instructions, code, and approved summaries rather than raw enterprise data by default.

The user should only see data they are authorized to access through identity groups and secured schemas.

The agent should run inside a controlled harness that enforces permissions, executes tools, validates queries, manages memory, logs actions, and prevents leakage.

This is how AI can fit into a governed data platform.

Not by bypassing the hub-and-domain model, but by extending it.

The hub provides the certified data foundation. Domains provide business meaning. The AI harness provides controlled execution. The LLM provides reasoning.

Only when these layers are separated can AI agents safely answer business questions without becoming a new uncontrolled access path.
