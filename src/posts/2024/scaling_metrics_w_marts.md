---
title: Faster Metrics with Data Marts (overcoming Data Warehouses challenges)
date: 2024-12-23T19:23:00
author: Alessio Civitillo
description: We explain what data marts are and how they help business leaders in managing their company performance by having faster and better metrics. We start by giving a short history of data warehousing and the typical challenges, and then move over to explain data marts and how they can help companies get better metrics today.
tags:
  - data marts
internal_notes: test
---
The growing number of tools and solutions in the data ecosystem can be overwhelming for business leaders. Some data solutions are so advanced that they resemble full-scale "digital transformation" initiatives—a term often used by IT professionals.

However, one area of data analytics has remained largely unchanged for the past 30 years: business intelligence. Companies once relied on robust data warehouses with well-defined structures, paired with straightforward reporting tools that efficiently extracted insights.

Over time, data warehouses began to fade from prominence. This decline was driven by:

1. advancements in data platforms
2. shifting focus among analytics professionals toward various data ROI initiatives
3. unresolved internal challenges that persisted throughout their 30-year history.

But data warehousing played a critical role in organizations by supporting unified and standardized metrics. Today, this function is largely neglected, leaving businesses to grapple with its absence. As a result, leaders are increasingly witnessing the impact on performance, compliance, and control, compounded by challenges in effective monitoring.

![Reference Data Platform Architecture](/src/assets/images/reference_data_platform_architecture-1.png "Typical Modern Data Platform Architecture")

### Data Warehousing Challenges: A Double-Edged Sword  

#### Rigid and Slow  

Data warehouses became **the** definition of slow and rigid IT. Change requests often took months—or even years—to implement, as BI teams resisted any changes that might disrupt production systems. This inflexibility drove business functions to develop their own localized data warehouses, typically ignoring best practices, total cost of ownership (TCO), and accumulating significant technical debt.  

#### Poor Domain Understanding  

As data warehouses were centralized within IT departments, they lost connection to business domains. IT teams, by nature, lacked deep business understanding, leading to a disconnect. IT expected well-defined, scoped requirements to execute in a waterfall approach, while business professionals anticipated proactive insights and solutions from the "data people."  

#### Black Boxes: The Struggle with Compliance  

As IT departments took control of data modeling in data warehouses, business professionals began questioning the accuracy and reliability of the metrics they consumed. Compliance with policies and metric calculations became a significant concern: _If I can’t understand how a metric is calculated, how can I trust it?_

#### Multiple Sources and the "One ERP" Myth  

In the early days of data warehousing, the application landscape was relatively simple, with ERP systems dominating as the core business application. Data warehouses were often designed as extensions of these ERP systems.  

Over time, two major shifts occurred. First, mergers and acquisitions introduced multiple ERPs into the ecosystem. Second, new applications—such as CRMs, HRMs, and MES systems—entered the mix, further complicating the landscape. IT departments attempted to address these challenges by pushing for a single ERP implementation across the organization. Meanwhile, business leaders grew frustrated, questioning how many years it would take to answer even basic questions like, "How many employees do we have?"  

### Are Data Marts The Way Forward?

At first glance, a data mart might seem like a minor evolution from traditional Business Intelligence (BI) run by IT:

> A data mart is a subset of a data warehouse, focusing on a specific business area or department. It contains a curated set of data tailored to the needs of that group, making it easier and faster to access insights without navigating the entire data warehouse. This closely mirrors the structure of a typical data warehouse OLAP cube, leading to the impression that introducing data marts is just a rebranding exercise.

However, this view overlooks the fundamental shift brought about by data marts, which are driven by a new set of principles. These principles can be traced back to modern data platform architectures, which themselves evolved from the Big Data movement (remember Hadoop?). The three key principles that distinguish data marts today are:

1. **Transparency:** Data models should be open and accessible to analysts outside of IT BI teams.
2. **Flexibility:** Data models should be easy to enhance, modify, and update.
3. **Version Control:** Data models should be version-controlled in code, similar to software development practices.

The challenge today is that these principles are not universally adopted across the industry. Depending on who you speak to, you’ll encounter different perspectives on how data marts are implemented and leveraged.

## OK, but what is a data mart?

Technically, a data mart is simply a **flat table** within a SQL database. This table is usually accessed through reporting tools like Power BI, Tableau, or Cognos. Analysts can connect to the table and create typical BI reports, and as the data is updated, the connected reporting tools automatically reflect these changes.

![Reference Data Platform with Modelling Highlight](/src/assets/images/reference_data_platform_architecture_modelling_highlight.png "Models Inside a Data Platform")

In a modern data platform, the data mart is developed using SQL code within the modeling layer. This code is typically hosted in a code repository, such as GitHub or Bitbucket. By storing the code in a repository, the data mart becomes transparent, easy to contribute to, and aligns with the three principles outlined earlier.

![](/src/assets/images/data_marts_insights_architecture-5.png)

## Data Marts: How They Resolve Data Warehouse Challenges

Now, let's explore how data marts, with their transparency, flexibility, and version control principles, help address the challenges often encountered in traditional data warehouse systems.

#### Rigid and Slow

Data marts are faster to develop because they allow contributions from multiple teams. By using SQL models stored in a code repository, teams can collaborate and contribute to the code. This eliminates the bottleneck caused by a single centralized team handling all the work.

#### Poor Domain Understanding

With data marts, teams outside of IT can actively contribute to model creation and data mart definition, bridging the gap caused by limited business knowledge. When paired with good governance, this approach brings data modeling closer to the business, enhancing domain understanding.

#### Black Boxes: The Struggle with Compliance

Since data mart code is stored in verified and recognized repositories, it becomes fully transparent, addressing the issue of "black boxes" that only a few individuals understand. Additionally, implementing data catalogs can further improve transparency by providing metadata and data lineage, making these insights accessible even to less technical users.

#### Multiple Sources and the "One ERP" Myth

As part of modern data platforms, data marts can handle significantly larger datasets. This makes ingesting data from multiple applications cost-effective, allowing integration from various systems into a single, well-defined data mart through proper data modeling.

## Conclusion

Data marts represent a modern solution to many of the challenges faced by traditional data warehousing systems. By embracing transparency, flexibility, and version control, data marts empower teams across the organization to collaborate and contribute to data modeling, breaking down silos and reducing bottlenecks.

With their ability to bring data modeling closer to the business, data marts enhance domain understanding and improve compliance through transparency and clear data lineage. Moreover, the cost-effectiveness of integrating multiple data sources in a single data mart aligns with the demands of today’s complex data ecosystems.

Incorporating data marts into your data strategy can help businesses move beyond the limitations of legacy systems, enabling faster decision-making, better insights, and more agile operations.
