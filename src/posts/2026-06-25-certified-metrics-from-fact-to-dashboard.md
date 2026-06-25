---
title: 'Certified Metrics: From Fact to Dashboard'
date: 2026-06-25 11:00:00
author: Alessio Civitillo
description: Certified metrics require more than documented formulas. Learn how facts, measures, dimensions, aggregate metrics, and dashboards work together to create trusted and reusable business metrics.
tags:
  - Metrics
  - Data Governance
  - Business Intelligence
  - Analytics
internal_notes: Part 2 of Alessio's article on Distributing data (Facts & Dimensions)
---

Most companies do not struggle with metrics because no one has created a formula. They struggle because the formulas are not governed, the underlying facts are not certified, the dimensions are not conformed, and the same number is recreated in too many places.

As organizations invest more in reporting, analytics, and AI, the importance of metric governance continues to grow. When business functions rely on different definitions, calculations, or dimensions, trust in the numbers quickly erodes. 

In a [previous article](https://dyvenia.com/insights/distributing-facts-and-dimensions-governance-access-and-ownership/), we discussed the governance and distribution of certified facts and dimensions. Metric certification builds on that foundation. If facts and dimensions are not governed consistently, different teams will inevitably produce different versions of the same metric, even when they believe they are answering the same business question.

A metric is not certified simply because it appears in a dashboard. A metric is certified when the organization understands:

- which fact table it comes from;
- which measures it uses;
- which dimensions it depends on;
- where the formula is calculated;
- who owns the definition;
- who approved it;
- where it can be reused;
- and how changes are controlled.

This distinction matters because metric governance is often discussed too late. Companies first build dashboards, then notice that numbers do not match, and then start debating definitions. At that point, the problem is harder to fix because the logic is already spread across reports, extracts, semantic models, spreadsheets, and local analyst code.![access model vs metric certified model](/assets/images/blog/access%20model%20vs%20metrics%20certification%20model.png)

A better approach is to certify metrics from the bottom up.

The order matters.

You cannot reliably certify a dashboard if the aggregate metric is not certified. You cannot certify an aggregate metric if the underlying measures and dimensions are not certified. And you cannot certify measures if the fact table itself is not trusted.

The certification model should therefore follow the chain:

1. certified fact;
2. certified measures;
3. certified dimensions;
4. certified aggregate metric;
5. certified dashboard.

Only then can users trust the number.

## **Certification Model**

Certification is more than writing down a formula.

A certified metric should answer a wider set of questions:

- What is the business definition?
- What is the calculation?
- Is it an additive measure or an aggregate metric?
- Which fact table does it use?
- Which base measures does it depend on?
- Which dimensions are approved for slicing it?
- Who owns the metric?
- Who approved it?
- Is access restricted?
- Where is the metric allowed to be used?
- What happens when the definition changes?

Certification should make the metric operational. It should be clear how the number is calculated, where it is calculated, who owns it, and when it can be trusted.

### Order Matters: From Fact to Dashboard

A common mistake is to certify the dashboard first.

A dashboard may look official because it is used by leadership, published in Power BI, or included in a recurring management meeting. But that does not mean the numbers inside it are certified.

A dashboard is only as trustworthy as the chain underneath it.

If the fact table is wrong, the dashboard is wrong.

If the measures are inconsistent, the dashboard is inconsistent.

If the dimensions are not conformed, users may see different numbers even when the metric formula is correct.

If the aggregate metric is calculated differently across reports, the dashboard becomes another version of the truth.

This is why certification should move from data foundation to consumption:

> Certify the fact. Certify the measures. Certify the dimensions. Certify the aggregate metric. Then certify the dashboard.

![data certification flow](/assets/images/blog/certification_flow.png)

This order prevents a common failure mode: companies certify reports without certifying the data structures that feed them.

## **Certified Fact**

The first step is the certified fact.

A fact table represents a business event, transaction, or measurable state. Examples include invoice lines, sales order lines, purchase order lines, inventory snapshots, shipments, payments, production confirmations, or general ledger postings.

For example:

`fact_invoice_line`

A certified fact should define the business process and the grain.

For example, is the fact one row per invoice line? One row per order line? One row per shipment? One row per inventory snapshot by material, plant, and date?

This matters because all metrics built on top of the fact depend on the grain.

A certified fact should define:

- the business event or process;
- the grain of the table;
- the source system;
- the primary business keys;
- the available measures;
- the connected dimensions;
- the refresh frequency;
- the owner;
- the quality checks;
- and the known limitations.

For example, a certified invoice fact may be documented as:

**Fact:** `fact_invoice_line`
**Grain:** one row per invoice line
**Source:** ERP billing document
**Owner:** Finance / Data Hub
**Measures:** sales amount, discount amount, cost amount, quantity invoiced
**Dimensions:** customer, material, legal entity, sales organization, calendar

This is the foundation. If the fact is not certified, the metrics built on top of it are already unstable.

The practical rule is:

> Do not certify important metrics on top of uncertified facts.

## **Certified Measures**

The second step is certified measures.

Measures are the numeric fields available inside the fact table. In the Kimball language, these are usually called **measures**. Sometimes they are also called derived measures when they are calculated during transformation.

These are usually additive measures such as:

- sales amount;
- cost amount;
- discount amount;
- margin amount;
- quantity sold;
- quantity shipped;
- inventory value;
- invoice amount;
- payment amount;
- open order quantity;
- production quantity.

These measures can usually be summed across dimensions.

For example:

`sales_amount`

can be summed by customer, product, region, month, legal entity, or sales channel.

This is why additive measures are the easiest metrics to certify from the hub. The hub can calculate them once, store them in the fact table, test them, document them, and expose them consistently to downstream users.

For example, a certified invoice fact may contain:

- `sales_amount`
- `discount_amount`
- `cost_amount`
- `margin_amount`
- `quantity_invoiced`
- `net_revenue_amount`

These measures are part of the fact table itself. They should not be recreated in every dashboard.

The practical rule is:

> If a metric is additive and belongs to the grain of the fact table, calculate it in the data warehouse.

For example, if `net_revenue_amount` is always defined as gross revenue minus discounts, then that calculation should not be repeated in Power BI, Excel, SQL notebooks, and multiple semantic models. It should be calculated once in the certified fact.

This does not remove all business debate. The business still needs to agree on the definition. But once the definition is agreed, the hub is usually the right place to implement it.

## **Certified Dimensions**

The third step is certified dimensions.

This is where many metric programs fail.

Sometimes numbers do not match because the metric definition is wrong. But very often, the metric is fine. The real problem is the dimension.

For example, two analysts may both use the same certified metric:

`sales_amount`

But one analyst groups sales using one version of the region dimension, while another analyst uses a different version.

One report uses:

`dim_customer_sales_region`

Another report uses:

`dim_management_region`

Both reports calculate sales correctly, but they group sales differently. The numbers do not match because “EMEA” does not mean the same thing in both reports.

This is not a metric problem. It is a dimension problem.

In my experience, this is one of the biggest causes of reporting disagreement. Companies spend a lot of time debating metric formulas, but the real issue is often that dimensions are not conforming.

Examples include:

- different customer hierarchies;
- different product hierarchies;
- different region mappings;
- different business unit definitions;
- different cost center groupings;
- different rules for active versus inactive customers;
- different calendar definitions;
- different legal entity mappings;
- different currency conversion rules.

If dimensions are not conformed, certified measures will still produce inconsistent reports.

For example, a certified `sales_amount` measure does not solve the problem if Sales, Finance, and Operations each use a different customer hierarchy.

This is why metric certification and dimension governance must be handled together.

A certified metric should document not only the formula, but also the approved dimensions that can be used with it.

For example:

**Certified measure:** `sales_amount`
**Certified fact:** `fact_invoice_line`
**Approved dimensions:** `dim_customer, dim_material, dim_calendar, dim_legal_entity, dim_sales_organization`

If an analyst uses a local spreadsheet mapping instead of the certified customer dimension, the result may be useful for exploration, but it should not be treated as certified reporting.

The practical rule is:

> Do not certify formulas without certifying the dimensions used to slice them.

## **Certified Aggregate Metric**

The fourth step is the certified aggregate metric.

Not all metrics can be calculated row by row inside the fact table. Some only make sense after aggregation.

A common example is sales margin percentage:

`(sales - cost) / sales`

This looks simple, but it should not usually be calculated at the invoice-line level and then summed or averaged.

The correct calculation is usually:

`SUM(sales_amount - cost_amount) / SUM(sales_amount)`

or:

`SUM(margin_amount) / SUM(sales_amount)`

This means the metric must be calculated after the relevant rows have been aggregated.

These are aggregate metrics. They are the type of metrics you would normally calculate with a pivot table formula in Excel: first aggregate the base measures, then calculate the ratio.

Examples include:

- margin percentage;
- conversion rate;
- on-time delivery percentage;
- average selling price;
- average order value;
- return rate;
- fill rate;
- forecast accuracy;
- inventory turnover;
- days sales outstanding;
- utilization percentage.

These metrics depend on the aggregation context.

For example, margin percentage can be calculated by customer, product, month, region, business unit, or sales representative. The formula may be the same, but the grouping changes the result.

This is why aggregate metrics usually belong in a semantic model, a BI model, a metrics layer, or a carefully controlled reporting layer.

The important point is that they still need certification.

A certified aggregate metric should define:

- the formula;
- the base measures used;
- the required fact table;
- the approved dimensions;
- the aggregation behavior;
- the handling of nulls and zero denominators;
- the expected grain;
- and the owner.

For example, a certified margin percentage metric should specify whether it is:

`SUM(sales_amount - cost_amount) / SUM(sales_amount)`

or:

`SUM(margin_amount) / SUM(net_revenue_amount)`

Those are not always the same thing.

Small formula differences create significant trust and reconciliation problems.

The practical rule is:

> Store additive components in facts. Certify aggregate formulas separately.

## **Certified Dashboards**

The fifth step is the certified dashboard.

A dashboard should be certified only when the full chain underneath it is certified.

That means:

- the source fact is certified;
- the measures are certified;
- the dimensions are approved;
- the aggregate metrics are defined and governed;
- the semantic model or BI model is controlled;
- access rules are understood;
- and the business owner has approved the dashboard for use.

A dashboard should not be certified simply because it is popular, polished, or used by senior management. Certified dashboards should consume certified metrics, not recreate them. Otherwise, every dashboards becomes a potential source of new business logic and metric variation. 

For example, a Power BI dashboard may show:

- Sales Amount;
- Margin Amount;
- Margin %;
- Average Selling Price;
- Sales by Customer;
- Sales by Region;
- Sales by Product Group.

If the dashboard defines these measures locally, and another dashboard defines them differently, the company still has multiple versions of the truth.

A better model is for the dashboard to consume metrics from a governed semantic model or metric layer built on certified facts and dimensions.

Semantic models can be useful here. They may exist inside tools such as Power BI, Tableau, or Looker. They may also exist as a separate semantic layer or metrics service.

A semantic model can define:

- measures;
- aggregate metrics;
- relationships;
- hierarchies;
- approved filters;
- row-level security;
- and reusable business definitions.

This is useful, but it should not hide weak foundations. 

If the underlying facts are not certified, the semantic model becomes a thin layer over unstable data. If the dimensions are not conformed, the semantic model may produce consistent formulas but inconsistent business cuts. If every department creates its own semantic model, the company ends up with many versions of the truth again, just at a higher layer.

The clean model is:

> Facts and additive measures belong in the data warehouse. Aggregate metrics may live in a semantic model. Dimensions must conform. Dashboards should consume certified metrics, not redefine them.

## **Certification Levels**

Not all metrics need the same level of governance. A practical certification process should align the level of control with the metric's importance and sensitivity. 

![metrcis certification levels](/assets/images/blog/certification_levels.png)

### **Experimental**

Used for analysis or exploration. No formal approval. No SLA. Logic may change. Not recommended for official reporting.

This is useful when analysts are still testing ideas.

For example, a Sales analyst may create a temporary pipeline quality score to explore whether certain opportunity attributes predict conversion. That metric may be useful, but it should not immediately become an enterprise KPI.

### **Domain Validated**

Validated by a business domain. Suitable for domain-level reporting, but not necessarily approved across the whole enterprise.

For example, Sales may define a pipeline quality score that is useful for sales management but not used by Finance.

This level is useful when a metric is real and governed inside a domain, but not yet accepted as an enterprise standard.

### **Hub Certified**

Approved for enterprise reporting. The definition is documented, tested, owned, and built on certified facts and dimensions.

Examples include:

- net sales;
- gross margin;
- inventory value;
- on-time delivery percentage;
- sales order backlog;
- working capital;
- production quantity.

These metrics can be reused across domains, dashboards, semantic models, and management reporting.

### **Restricted Certified**

Certified, but access is restricted because the metric depends on sensitive data.

Examples include:

- margin percentage;
- customer profitability;
- employee productivity;
- vendor payment risk;
- credit exposure;
- cost-to-serve.

The metric is trusted, but not universally available.

This distinction is important because not every metric should be enterprise-certified. Some metrics are local, temporary, sensitive, or domain-specific.

The goal is not to certify everything. The goal is to prevent important metrics from being recreated without control.

## **Metrics Catalog**

It is not enough to define certified metrics in documentation, semantic models, SQL files, or BI reports. Users need a place to discover which metrics exist, what they mean, where they come from, and whether they are approved for use.

This is the role of the metrics catalog.

A metric catalog provides visibility into certified metrics, ownership, definitions, approved dimensions, and certification status. It becomes a reference point for analysts, business users, and reporting teams seeking to understand which metrics to use and which definitions are considered authoritative. 

![metrics catalog](/assets/images/blog/metritcs_catalog.png)

## **Conclusion**

Certified metrics are not only formulas.

A metric becomes trustworthy when the organization controls the full chain from fact to dashboard.

The sequence matters:

1. certify the fact;
2. certify the measures;
3. certify the dimensions;
4. certify the aggregate metric;
5. certify the dashboard.

This is where many metric programs fail. They document formulas but ignore dimensions. They create semantic models but leave facts unstable. They certify dashboards but do not certify the underlying data.

A better certification model connects the full chain:

- certified fact;
- certified measures;
- certified dimensions;
- certified aggregate metric;
- certified dashboard.

Only then can organizations build reporting, analytics, and AI initiatives on a trusted foundation. 

The practical goal is not to certify every number in the company. The goal is to make the important numbers reliable, reusable, and explainable.

That is what certified metrics are really about.
