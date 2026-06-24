---
title: 'Distributing Facts and Dimensions: Governance, Access & Ownership'
date: 2026-06-24 10:00:00
author: Alessio Civitillo
description: Building facts and dimensions is only part of the challenge. This article explores how certified data should be distributed across the organization through controlled access paths, ownership models, governance processes, and support structures.
tags:
  - Data Governance
  - Data Architecture
  - Data Warehouse
  - Data Modeling
  - Business Intelligence
internal_notes: Alessio's article on distributing facts and dimensions
---

Modern data platforms often focus on ingestion, modeling, orchestration, and reporting. However, once [facts and dimensions](https://dimensional-modelling.dyvenia.com/) have been built, a different challenge emerges: how should those assets be distributed across the organization? 

This is not only a security question. It is also a question of governance, ownership, and operating models.

A central data hub may own certified facts and dimensions, but those assets should not automatically be exposed to every analyst, dashboard, domain team, or application. A sales invoice fact may contain revenue, discounts, cost, margin, customer, business unit, and geography. A customer dimension may contain commercial assignments, payment terms, credit attributes, or sensitive identifiers.

The challenge is to keep authoritative data centralized while exposing only the data required by each audience. Access management should therefore be designed in layers.

## **The Five Access Layers**

A practical distribution model can be organized through five layers:

1. certified facts and dimensions;
2. secured tables;
3. secured schemas;
4. identity groups;
5. consumption applications.

Each layer has a different responsibility.

![five facts and dimensions access layers](/assets/images/blog/5%20layers.png)

### **Layer 1: Certified Facts and Dimensions**

The first layer is the underlying certified data asset.

For example, the hub may maintain a global invoice fact:

`hub_facts.fact_invoice_line`

This table is the authoritative source. It contains the complete dataset and is owned by the data hub.

This does not mean every consumer should access it directly. In fact, direct access is rarely required.

The global table may contain data for all regions, legal entities, business units, and commercial attributes. It may also include sensitive fields such as cost, margin, discounts, credit exposure, or customer-level details.

The role of Layer 1 is to provide the trusted foundation. It is not necessarily the consumption layer.

A good rule is:

> Certified facts and dimensions should be built once in the hub but exposed through controlled-access layers.

### **Layer 2: Secured Tables**

The second layer is the secured table.

If the source table is too broad to expose directly, the hub can publish a narrower SQL view that filters rows, removes sensitive columns, or applies business-specific restrictions.

For example:

`hub_facts_nam.invoice_lines`

This view may expose only North America transactions and exclude restricted columns such as cost or margin.

The secured table controls **what data** a consumer can see. It becomes the first layer of distribution between the certified fact and the consuming audience. 

For example, the global fact may contain:

`hub_facts.fact_invoice_line`

But the hub may expose different secured versions:

- `hub_facts_nam.invoice_lines`
- `hub_facts_europe.invoice_lines`
- `hub_facts_sales.invoice_lines`
- `hub_facts_finance.invoice_lines`

Each secured table can represent a different approved view of the same underlying fact.

For example:

- Finance may see revenue, cost, and margin.
- Sales may see revenue and discounts, but not cost or margin.
- Regional teams may only see records for their geography.
- Executive reporting may receive aggregated facts instead of transaction-level data.

This keeps the global fact centralized while still allowing different audiences to consume safe, approved versions of it.

![secure table view](/assets/images/blog/secure%20table%20view.png)

### **Layer 3: Secured Schemas**

The third layer is the secured schema.

A secured schema groups related secured tables together and provides a logical access boundary.

Examples include:

- `hub_facts_nam`
- `hub_facts_europe`
- `hub_facts_apac`
- `hub_facts_sales`
- `hub_facts_finance`
- `hub_dimensions_customer_sales`
- `hub_dimensions_finance`
- `hub_dimensions_shared`

Consumers should normally be granted access to schemas, not directly to individual source tables.

The secured schema controls **which collection of data products** a consumer can access.

For example, the `hub_facts_nam` schema may contain the approved North America facts. The `hub_dimensions_customer_sales` schema may contain the customer attributes approved for sales reporting. The `hub_dimensions_shared` schema may contain broadly reusable dimensions such as calendar, currency, and material.

This gives the hub a clean access boundary. Instead of granting permissions table by table across the entire platform, the hub can package approved data products into schemas and grant access to those schemas.

### **Layer 4: Identity Groups**

The fourth layer is the identity group.

Identity groups represent the people or teams who are allowed to access a secured schema.

Examples include:

- `north_america_sales`
- `europe_sales`
- `global_finance`
- `commercial_leadership`
- `sales_operations`
- `powerbi_sales_analysts`

Access is granted by mapping identity groups to secured schemas.

For example:

| **Identity Group** | **Secured Schema** |
| --- | --- |
| north_america_sales | hub_facts_nam |
| europe_sales | hub_facts_europe |
| global_finance | hub_facts_finance |
| commercial_leadership | hub_facts_sales |
| powerbi_sales_analysts | hub_facts_sales, hub_dimensions_customer_sales, hub_dimensions_shared |

This creates a simple model:

- secured tables control **what data is exposed**;
- secured schemas control **how data is packaged**;
- identity groups control **who can access it**.

Access should normally be granted to groups, not directly to individuals. Individual access becomes difficult to maintain and audit over time. People change roles, move teams, leave the company, or join temporary projects. If access is managed on a person-by-person basis, it quickly becomes difficult to control.

A group-based model is easier to govern, review, and explain.

### **Layer 5: Consumption Applications**

The fifth layer is the consumption application.

This includes tools such as Power BI, Tableau, Looker, Excel, notebooks, APIs, embedded analytics, and AI agents.

These tools may apply additional security. For example, Power BI supports row-level security, which can filter rows based on the user viewing a report. A semantic model may also restrict measures, hide columns, or expose different report pages to different audiences.

This layer is useful, but it should not be the only access control layer.

Application-level security is often closely tied to the user experience, but it can be inconsistent when different tools access the same data in different ways. A Power BI report may enforce row-level security, while a notebook, SQL endpoint, API, or AI agent may access the same data through a different path. Unless the control exists closer to the data, consistent enforcement becomes difficult. 

For this reason, consumption-layer security should be treated as an additional control, not the foundation of the access model.

The hub should first control access through secured tables, secured schemas, and identity groups. Consumption applications can then add more specific restrictions where needed.

## **Data Access Matrix**

Once the five layers are defined, the access model should be documented in a simple matrix.

The purpose of the matrix is not to describe every permission in the platform. It is to make the main access paths visible and auditable: which identity groups have access to which secured schemas, and which secured tables are available inside those schemas.

The data access matrix has these columns:

- Identity Group
- Members of the Group
- Secured Schemas
- Secured Tables
- Dashboards (optional)

The data access matrix gives the hub a simple control document. It also provides visibility into how certified data is distributed across the organization and helps ensure access remains aligned with ownership and governance policies. It can be used during access approvals, audits, onboarding, access reviews, and design discussions with domains or BI teams.

A simplified version of the matrix below: 

![data access matrix](/assets/images/blog/data_access_matrix.png)

## **Fact Layered Governance**

Facts are often the most sensitive assets on a data platform because they capture measurable business activity: revenue, costs, margins, inventory values, payments, production quantities, operational performance metrics, and financial transactions.

For this reason, facts should normally be exposed through the secured table, secured schema, and identity group model.

A single global fact may exist internally:

`hub_facts.fact_invoice_line`

But different audiences may consume different secured versions of that fact.

For example:

- Finance may access a secured table that includes cost and margin.
- Sales may access a secured table that excludes cost and margin.
- Regional teams may access secured tables filtered to their geography.
- Executive reporting may access aggregated facts rather than transaction-level details.

These secured tables can then be grouped into schemas such as:

- `hub_facts_nam`
- `hub_facts_sales`
- `hub_facts_finance`

Identity groups are then mapped to the appropriate schema.

This allows the hub to maintain a single authoritative fact while exposing audience-specific versions through a controlled-access model.

The important principle is:

> Do not duplicate ownership of the fact. Duplicate only the controlled access paths.

The hub still owns the certified fact. The secured tables and schemas are distribution mechanisms.

## **Dimension Layered  Governance**

Dimensions are usually less sensitive than facts, but they still require access controls.

Some dimensions can often be shared broadly:

- `dim_calendar`
- `dim_currency`
- `dim_plant`
- `dim_warehouse`
- `dim_material`
- `dim_profit_center`
- `dim_cost_center`

These dimensions provide a common context for reporting and analytics. In many companies, broad access is acceptable.

But this should not be assumed for every dimension.

Dimensions such as customers, suppliers, employees, vendors, products, or patients may contain sensitive, commercial, financial, or personal information.

For example, a customer dimension may contain:

- customer name;
- address;
- tax ID;
- payment terms;
- credit attributes;
- sales assignments;
- segmentation;
- pricing group;
- legal identifiers.

Not every user who needs customer reporting needs all of these attributes.

The hub can therefore publish secured versions such as:

- `dim_customer_public`
- `dim_customer_sales`
- `dim_customer_finance`
- `dim_customer_sensitive`

Each secured table exposes only the attributes appropriate for a specific audience. These secured tables can then be grouped into schemas and assigned to identity groups.

Dimension access should also align with fact access.

For example, a user with access to North America sales facts will usually need compatible access to customer, material, calendar, and legal entity dimensions. The secured schemas assigned to that user should contain both the facts and dimensions required for analysis.

The practical rule is simple:

> Use the secured table, secured schema, and identity group model whenever dimensions contain information that should not be universally accessible.

## **Practical Access Management Rule**

For many organizations, a practical access model follows a simple principle:

Build global facts and dimensions once. Expose them through secured tables and secured schemas. Map those schemas to identity groups. Give domains and BI analysts only the schemas they need. Let consumption tools add extra security where appropriate.

This model is not perfect for every scenario, but it is simple, transparent, and easier to operate than highly personalized table-by-table permissions or row-level security everywhere.

Row-level security still has a place. It may be appropriate when access rules are highly dynamic, when users need personalized data scopes, or when the organization has mature identity and policy management.

But it should be a deliberate design choice, not the default.

Most companies should start with the simpler model:

- certified facts and dimensions;
- secured tables;
- secured schemas;
- identity groups;
- controlled consumption applications;
- regular access reviews.

That is usually enough to make facts and dimensions safe to distribute without turning access management into an unmaintainable system.
