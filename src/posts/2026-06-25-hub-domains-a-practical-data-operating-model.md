---
title: 'Hub & Domains: A Practical Data Operating Model'
date: 2026-06-25 13:30:00
author: Alessio Civitillo
description: Domains bring data ownership closer to the business, but governance, access management, and shared standards remain difficult to decentralize. This article explores a Hub & Domains operating model that combines business ownership with centralized governance and platform controls.
tags:
  - Data Governance
  - Data Mesh
  - Data Architecture
  - Data Strategy
  - Data Management
internal_notes: PArt 3 of Alessio's series on data governance
---

In data, the concept of domains has become useful over the last few years.

A domain combines a business area, a team, data products, and operational responsibilities. The underlying idea is straightforward: the people closest to the business should also be closest to the data. That also means that the team that owns it is responsible for its quality, meaning, support, and evolution.

Instead of the old, hyper-centralized data warehouse model, where a single team managed a single enterprise data warehouse for the whole organization, the move was towards more decentralized, business-oriented ownership.

In theory, this makes a lot of sense.

Sales understands sales data better than the central IT team does. Finance understands margin, revenue, and cost rules better than a generic data platform team. Supply Chain understands inventory, shipments, fulfillment, and plant-level operations better than a centralized reporting function.

So the argument for domains is strong: data should be owned closer to the business context.

But the problem with domains is governance.

## From Hub & Spoke to Hub & Domains

Much of the work required to make data reliable at the enterprise level is specialized, technical, operational, and frankly, not very exciting. Managing access. Maintaining conforming facts and dimensions. Controlling production deployments. Monitoring SLAs. Running incident processes. Managing secured views. Auditing who can see the margin data. Keeping documentation up to date. Testing certified metrics. Reviewing breaking changes.

Small, analytics-focused domain teams are usually not designed for this kind of work.

They may be very good at business analysis, dashboarding, and domain-specific data modeling. But they often lack the capacity, tools, or operational discipline to manage enterprise-grade governance.

This is why I think we need to bring back some centralization into the domain model. Without this balance, organizations often end up with either excessive centralization that slows delivery or excessive decentralization that complicates governance.

Not full centralization. Not a return to the old model where one team owns everything and business teams wait months for every change.

But some centralization.

The model I recommend is the **hub & domains** model.

It takes the useful part of the domain concept (such as business ownership and proximity) and combines it with the useful part of the hub-and-spoke model ‒ centralized governance, platform control, standards, and distribution.

In a classic hub-and-spoke model, the hub handles what can be done efficiently in one place: the data platform, infrastructure, shared standards, governance rules, access patterns, monitoring, deployment processes, and shared data assets.

The spokes focus on business-specific work.

In a data organization, those spokes are domains.

So instead of thinking only in terms of data mesh or hub-and-spoke, I prefer the term **Hub** **&** **Domains.**

The hub owns the shared foundation. Domains own the business-specific extensions.

## **Why Hub & Domains Work Better Than Pure Decentralization**

The fully decentralized version of data mesh sounds attractive, but it creates a practical problem.

If every domain independently manages data access, metric definitions, dashboards, pipelines, semantic models, and data contracts, the organization quickly ends up with too many inconsistent practices.

One domain may define revenue one way. Another may define customer hierarchy differently. Over time, these differences become metric reconciliation problems. One team may have proper access controls. Another may expose sensitive data through a dashboard. One domain may have strong documentation. Another may depend on one analyst’s notebook.

Hub & Domains is a more practical compromise.

The hub centralizes the things that should be standardized:

- data platform and infrastructure;
- conformed dimensions and certified metrics;
- access management patterns and governance;
- best practices;
- security and auditability.

The domains own the things that require business proximity:

- business validation;
- domain-specific rules;
- domain-specific facts and dimensions;
- local metrics;
- domain data products.

![hub & domains operating model](/assets/images/blog/Hub%20and%20domains.png)

This is not about taking ownership away from the business. It is about separating what should be centralized from what should stay close to the business.

## **Responsibility Matrix**

The challenge with Hub & Domains is that it can become messy if responsibilities and boundaries are not clearly defined.

The usual recommendation is to create a RACI matrix.

I still recommend this.

But honestly, maintaining a RACI is hard work. Responsibilities move over time. Teams change. People leave. New tools are introduced. Domains mature at different speeds. And there is responsibility creep everywhere.

This is why responsibilities should not only be documented. They should be designed into the operating model.

A good principle is: 

> **Design responsibilities so that they require as little manual control as possible.**

For example, if a domain does not have access to change a certified metric in the hub code repository, there is no need to monitor whether the domain changes the certified metric logic. They simply cannot do it.

If BI analysts do not have direct access to global hub tables, there is less risk of them accidentally exposing restricted columns in a dashboard.

Governance should be supported through architecture, permissions, code ownership, and deployment workflows. Documentation and RACI models remain useful, but they become significantly more effective when responsibilities are reinforced by the platform's design.

A practical split could look like this:

![hun and domains responsibility matrix](/assets/images/blog/responsibility%20matrix.png)

## **What the Hub Should Own**

A hub should not own everything. If it does, the company goes back to the old centralized model.

The hub should focus on areas where standardization improves governance, reduces risk, and simplifies support across the organization.

**1. How data is distributed, and access is managed**

This includes secured tables, secured schemas, identity groups, access reviews, and approved distribution patterns.

For example, the hub may maintain a global invoice fact:

`hub_facts.fact_invoice_line`

But **consumers should not query it directly**.

Instead, the hub may expose secured schemas such as:

- `hub_facts_nam`
- `hub_facts_sales`
- `hub_facts_finance`
- `hub_dimensions_customer_sales`
- `hub_dimensions_shared`

Each schema is mapped to identity groups such as:

- `north_america_sales`
- `global_finance`
- `powerbi_sales_analysts`
- `executive_reporting`

This gives the hub a clean way to control data access without making every access request a custom table-by-table exception.

**2. How production code is approved and deployed in the hub**

The hub should also control how production-grade data assets are added or changed.

This does not mean the hub writes all the code.

Domains may contribute code. Analysts may propose changes. Business teams may define new logic. But if the asset becomes certified and shared, it should go through the hub’s production process.

For example, if Sales creates a useful conversion model that becomes important to multiple teams, it should not remain hidden in a domain notebook or a Power BI dataset. It should be reviewed, tested, versioned, documented, and moved into the hub or into a governed domain production repository.

> **The hub should define the path from local asset to certified asset.**

## **Sharing Data**

To understand Hub & Domains, it helps to remember the [five access layers](https://dyvenia.com/insights/distributing-facts-and-dimensions-governance-access-and-ownership/):

1. the fact or dimension table;
2. the secured table or SQL view;
3. the secured schema;
4. the identity group;
5. the consumption layer.

The hub should control layers 1-4. 

The fifth layer (the consumption layer) is different. This is where Power BI, Tableau, Excel, notebooks, AI agents, semantic models, and dashboards live.

**The hub cannot be fully responsible for how BI analysts distribute data** inside the consumption layer.

The hub can provide secure schemas. It can provide certified facts and dimensions. It can define approved metrics. It can enforce access at the database or lakehouse level.

But once a BI analyst builds a dashboard, creates a semantic model, exports data, adds row-level security in Power BI, or shares a report with users, accountability must move to the consumption owner.

This does not mean the hub has no interest in the consumption layer. The hub should provide standards and may audit critical reports.

But ownership must be clear.

The hub handoff point is the secured schema. After that, the dashboard, semantic model, and final distribution are owned by the BI team, domain, or reporting owner.

## **Hub to Domain**

The most important sharing pattern is hub-to-domain.

The hub should share data with domains via secure schemas, not via direct access to every underlying table. The exact technical implementation depends on the database or lakehouse architecture.

If the company uses one database per domain, the hub can share secured views into the domain database. The domain team then finds approved hub data inside its own workspace.

![hub to domains](/assets/images/blog/hub%20to%20domains.png)

For example, the Supply Chain domain may receive:

- `hub_facts_supply_chain`
- `hub_dimensions_material`
- `hub_dimensions_plant`
- `hub_dimensions_shared`

The Sales domain may receive:

- `hub_facts_sales`
- `hub_dimensions_customer_sales`
- `hub_dimensions_material_sales`
- `hub_dimensions_shared`

The Finance domain may receive:

- `hub_facts_finance`
- `hub_dimensions_finance`
- `hub_dimensions_legal_entity`
- `hub_dimensions_profit_center`

If the company uses a single database with multiple schemas, the same concept still applies. The hub creates secure schemas and grants access to the domain identity groups.

If the company uses a data-sharing mechanism, the hub shares the secure data products within the domain workspace.

The architecture can vary. The principle should not.

The hub:

- creates the certified facts and dimensions;
- creates secured tables or secured views;
- groups them into secured schemas;
- maps schemas to identity groups;
- shares the schemas with domains.

The domain then uses those approved assets to build its own domain-specific products.

For example, Supply Chain may build an availability-to-promise model. Sales may build a pipeline conversion model. Finance may build a management reporting model.

But the domain does not need uncontrolled access to all hub tables to do this.

## **Domain to Hub**

In the data mesh world, domains often share data directly with other domains. They publish a data product, define a data contract, and other domains consume it.

This can work in theory.

But in many enterprises, point-to-point domain sharing becomes dependency hell.

Sales depend on the Supply Chain. Finance depends on Sales. Operations depend on Finance. Then the definition changes in one domain, and nobody knows which downstream model broke. Access policies differ by domain. Quality checks are inconsistent. Documentation is incomplete. Nobody has a full view of the dependency graph.

Auditability becomes difficult. Data quality becomes difficult. Change management becomes difficult.

So in Hub & Domains, I recommend a different pattern: 

> **Domains should uplift reusable data assets to the hub.**

This means that if a domain creates a data asset that becomes useful beyond that domain, the next step should not be uncontrolled point-to-point sharing. The next step should be a conversation with the hub.

For example, suppose the Sales domain creates a sales conversion model.

At first, this may be a domain-level product. It supports Sales management and is maintained by the Sales analytics team.

But over time, Finance wants to use it for forecasting. Marketing wants to use it for campaign attribution. Leadership wants it in executive reporting.

At that point, the model is no longer only a Sales domain asset. It has become an enterprise dependency.

The Sales domain should then work with the hub to uplift the asset.

This may mean:

- moving the code into the hub repository;
- applying hub testing standards;
- documenting the grain and business rules;
- aligning dimensions;
- defining ownership;
- creating secured schemas;
- defining access groups;
- publishing it as a certified or domain-validated data product.

Once uplifted, the hub can distribute the asset using the same hub-to-domain or hub-to-BI patterns.

## **Hub to BI Analysts**

Not every team belongs to a domain, and not every analyst needs a domain.

A domain is needed when a team produces and maintains reusable data assets: facts, dimensions, transformations, data products, or domain-specific models.

But if the goal is mostly reporting, like for example Power BI dashboards, Tableau dashboards, Excel analysis, or management packs, it is usually simpler to treat the team as a consumer group.

For BI analysts, the hub should provide conformed, secure facts and dimensions.

For example, a Power BI sales analyst may receive access to:

- `hub_facts_sales`
- `hub_dimensions_customer_sales`
- `hub_dimensions_material_sales`
- `hub_dimensions_shared`

The analyst can then build dashboards and semantic models on top of those assets.

But the analyst should not receive direct access to:

`hub_facts.fact_invoice_line`

unless there is a very strong reason.

This keeps the model cleaner.

![hub to business intelligence analysts diagram](/assets/images/blog/Hub%20to%20BI%20analysts.png)

The hub owns the certified facts and dimensions. The BI analyst owns the dashboard and consumption logic.

## **Conclusion**

Domains are useful because they bring data ownership closer to the business.

But domains alone are not enough.

Enterprise data still needs shared standards, access management, certified facts, conformed dimensions, deployment processes, monitoring, and governance. This work is difficult to decentralize well.

That is why Hub & Domains is a better operating model for many companies.

The hub centralizes what should be consistent. The domains own what requires business proximity. BI teams consume certified assets and own the reporting layer.

The goal is not to return to a fully centralized data warehouse model. The goal is to avoid the opposite problem: every domain building its own isolated version of the truth.

A good Hub & Domains model allows organizations to maintain governance and consistency without moving decision-making too far away from the business. The hub makes data safe, certified, and reusable. The domains make data relevant to the business.

Together, they make data distribution easier to govern without slowing everything down.
