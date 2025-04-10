---
title: 'Driving Sustainability with Data: Improving CO₂ Emissions Reporting Across Supply Chains'
date: 2025-04-10 13:20:00
author: Agata Kawalec
description: Accurate CO₂ emissions reporting is vital for meeting sustainability goals and regulatory requirements. This article delves into the challenges of Scope 3 emissions, the importance of clean data, and how structured data systems like sustainability marts can improve reporting, ensure compliance, and support better decision-making for businesses.
tags:
  - sustainability
  - data mart
  - metrics
  - supply chains
internal_notes: |-
  **Audience:**

  - Sustainability & ESG Managers who need accurate, structured emissions data for reporting and compliance
  - Operations & Supply Chain Executives who seek insights into CO₂ emissions from logistics and materials to optimize processes
  - Compliance Managers who want to ensure the company meets regulatory requirements 

  **Purpose:**

  - In this article, we showcase our expertise in handling sustainability data, specifically focusing on reporting material and logistics-related CO₂ emissions. We present our experience in helping organizations structure their data effectively to meet reporting standards and drive sustainability initiatives.
---
According to [KPMG’s 2024 Survey of Sustainability Reporting](https://kpmg.com/dk/en/home/insights/2024/11/survey-of-sustainability-reporting-2024.html), **80% of the 5,800 surveyed companies have established carbon reduction targets**. This number highlights the increasing focus on sustainability but also the critical need for accurate emissions tracking. While setting targets is the first step, high-quality, reliable data is essential for consistent and accurate reporting across all areas of a business, particularly in supply chains.

## Understanding the Greenhouse Gas Protocol

The Greenhouse Gas (GHG) Protocol categorizes emissions into three scopes, each representing different sources of emissions within a company’s operations:

- **Scope 1:** Direct emissions from company-owned or controlled sources, such as fuel combustion in company vehicles or on-site manufacturing processes.
- **Scope 2:** Indirect emissions from purchased electricity, steam, heating, and cooling used by the company.
- **Scope 3:** Indirect emissions from the company’s broader value chain, including logistics, procurement, and material sourcing. 

While Scope 1 and 2 emissions are relatively easier to track, **Scope 3** emissions are more complex and often represent the largest share of a company’s total carbon footprint. For many manufacturing companies, the biggest portion of Scope 3 emissions comes from **supply chain operations**, which will be the focus of this article. We’ll explore the challenges of Scope 3 reporting and how improved data can support compliance and better decision-making.

## Why Sustainability Compliance Matters

Companies track their carbon footprint for various reasons, including **environmental responsibility, corporate social responsibility** (CSR), and good **brand perception**. Additionally, regulatory requirements play a key role in driving sustainability reporting. Accurate emissions data is crucial to maintaining compliance and meeting corporate sustainability goals.

### Regulatory Requirements for Emissions Reporting 

Regulations surrounding emissions reporting are becoming increasingly strict globally. In the European Union, the [Corporate Sustainability Reporting Directive (CSRD)](https://alignedincentives.com/corporate-sustainability-regulations-a-roadmap-for-2025-and-beyond/) requires large companies to disclose detailed environmental, social, and governance (ESG) data, including greenhouse gas emissions. This mandate took effect in 2024 and requires reports published in 2025 to include this data. As a result, nearly [50,000 EU companies](https://normative.io/insight/csrd-explained/) now need to report their Scope 3 emissions. 

Similar regulations exist in the UK ([SECR](https://energy.drax.com/insights/streamlined-energy-and-carbon-reporting-framework/)) and in over [40 other countries](https://www.ecohedge.com/blog/emissions-reporting-navigating-the-essentials/), including the US, Canada, and Japan (alongside EU countries), all of which have implemented or are planning to implement corporate emissions disclosure requirements for greenhouse gases (GHG). 

## Challenges of Supply Chain Sustainability Reporting 

Effective Scope 3 emissions reporting comes with a number of obstacles, including data complexity, the frequent need for updates, and ensuring accuracy across a diverse range of 
sources. Some of the key challenges are: 

### **Poor data quality**

One of the biggest challenges in Scope 3 emissions reporting is poor data quality, which can significantly impact the accuracy of sustainability metrics. Companies often deal with incomplete, inconsistent, or outdated data from multiple sources.

Examples of Poor Data Quality Issues include:

- Inconsistent material weights or classifications: If different systems use different units (kg vs. tons), this can lead to miscalculations in material emissions.
- Duplicate records in master data: Multiple entries for the same supplier or product cause redundancy, leading to errors in reporting.
- Data silos and manual entries: Sustainability data is often scattered across ERP systems, spreadsheets, and supplier databases, leading to high risks of human error and inefficiency.

### **Lack of a Solid Data Foundation**

The **poor data quality, complexity, and diversity** of data required for Scope 3 emissions reporting make it challenging to get a full and accurate picture. To track emissions properly, companies need to collect a wide range of information, including: 

- **Vendor master data** (such as LFA1 table in SAP)
- **Material master data** (such as MARA table in SAP)
- **Plant master data** to be able to track shipping routes
- **Purchasing data** on the Purchase Order document level

Many sources of data make data foundations extremely difficult to establish. Not all the data comes from the organization’s internal sources but also requires collaboration with other parties (e.g., vendors).

Another major challenge arises from geographical data. Vendor and Plant locations change frequently, leading to potential errors in emissions calculations. For example, if a vendor relocates its plant, this change must be automatically reflected in **route calculations** to maintain accurate CO₂ estimates.

Solid data foundations aren’t just about collecting the right inputs - they also require clearly defined, well-structured metrics. The way data is organized should support easy and consistent metric implementation later on. Without this, even the best-quality data can become difficult to interpret or apply reliably across reports, especially when calculating Scope 3 emissions that rely on complex, multi-source inputs.

![](/assets/images/blog/good_bad_metric.png)

### **Collecting Industry Carbon Factors**

A common approach in logistics is estimating emissions using a simple emissions factor model based on CO₂ emitted per kilometer traveled for different transport modes. However, **material-related** emissions are far more complex. This requires gathering and applying carbon factors from multiple sources, such as:

- **EPD (Environmental Product Declarations):** product-specific, 3rd party-verified environmental data per product category
- **CDP (Carbon Disclosure Project):** vendor-specific CO₂ footprints
- **EPA (Environmental Protection Agency):** standardized US-based emission factors for industries (e.g., transport, energy, waste)
- **Industry average data:** generic emission benchmarks based on sector-wide studies for certain materials that lack specific CO₂ data

These carbon factors need to be regularly updated, mapped to specific materials, and often collected manually, making the process cumbersome and prone to errors.

### **Shortage of Experts Who Understand Both Data and Sustainability**

Only a few specialists can bridge the gap between **sustainability regulations** and **data analytics**. Applying the correct emission factors (particularly for specific materials) requires deep domain knowledge and industry-specific expertise. This skills gap makes it difficult for many organizations to ensure accurate emissions reporting. To accurately report emissions, professionals need a blend of sustainability knowledge and data expertise. The challenge is that few people have both skill sets - they either specialize in environmental science or in data analytics, but not both.

## How to Improve CO₂ Reporting with Structured Data

The challenges around Scope 3 emissions reporting show just how complicated it can get ‒ different sources, frequent updates, and a lot of moving parts. Without a reliable data foundation, companies risk inaccurate reporting, which can lead to poor decisions and compliance issues. 

This is where a structured system like a **sustainability mart** can help.

When it comes to structuring such a mart, there are two common approaches:

1. **Flat Table Approach:** This method consolidates all necessary data into a single, denormalized table. It ensures consistency, simplifies development, and is tool-agnostic - making it a favorite among data teams. However, it can become harder to manage at scale, with potential performance and storage challenges depending on dataset size and architecture.
2. **Snowflake Schema Approach in BI Tools** (e.g., Power BI): In this approach, data is organized into fact and dimension tables, which are related through keys. While it’s more efficient for large datasets and complex queries, it introduces tool dependency and leads to inconsistent KPIs if governance isn't tightly controlled.

Personally, I would opt for a flat table approach rather than creating a semantic model inside a BI tool. I’ve explained this choice further in [another article](https://site-dyvenia.netlify.app/insights/flat-tables-vs-snowflake-semantic-models-the-ultimate-bi-data-debate/), but with sustainability data, the choice between these two approaches is even clearer. Master data plays a crucial role in metric calculations, which makes it almost impossible to keep it outside the mart. A sustainability mart integrates critical data sources into one system, enabling accurate calculations and reporting of ESG metrics. Such a mart can include a variety of relevant components, for example:

![](/assets/images/blog/sustainability_mart.png)

With these data points in one integrated system, companies can accurately calculate material and logistics-related emissions. By leveraging a sustainability mart, companies can:

- **Generate standardized reports for Sustainability Management** to ensure consistent and comparable reporting across departments and reporting periods, simplifying compliance with regulatory requirements
- **Monitor trends through historical snapshots** to help businesses track emission reduction progress, identify inefficiencies, and make data-driven sustainability decisions
- **Automatically track and apply changes in master data** (e.g., updates to vendor or material information) to prevent outdated or incorrect sustainability data

## Conclusion: The Path to Better Sustainability Reporting

Accurate sustainability reporting starts with **clean, structured data**. For companies, mistakes in emissions reporting can result in both regulatory risks and growing stakeholder scrutiny. While domain knowledge remains crucial, planning and implementing a data-driven strategy is the key to long-term success. Ultimately, a well-designed sustainability data system can transform reporting from a compliance burden into a strategic asset, providing companies with valuable insights into their operations and sustainability performance.
