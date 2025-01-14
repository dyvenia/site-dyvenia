---
title: A Simple Approach to Master Data Management to Unify Metrics and Insights
date: 2025-01-14T11:33:00
author: Alessio Civitillo
description: Discover the role of master data management (MDM) in achieving consistent and accurate business metrics. This article explains the concept of master data, outlines key challenges organizations face, and introduces two accessible approaches to MDM. By focusing on practical steps and avoiding common pitfalls, we show how businesses can enhance data quality without large budgets or complex systems.
tags:
  - data management
internal_notes: |-
  **Audience:**

  - Business leaders and IT. These leaders are wanting to understand how to improve the quality of the dimensions in their data. They usually have problems with dimensions such as Customer, Product, Sales Territories, Key Accounts and others.

  **Purpose:**

  - To educate on 
      - What is a master data management and how it works
      - The two approaches to data management we think are important to consider

  **Outline:** 

  - Introduction
  - What is master data management
  - The Collaborative Master Data
      - Great for lookup data and data that is used to create custom groupings, the collaborative approach consists of an application as user interface. On this interface users can collaborate via approval workflows to change lookups and master data
  - The Consolidated Master Data
      - Great for application data, it works well when source data in applications is kept of good quality. In this approach data is just consolidated from applications and users are not allowed to modify it, they can only modify it in the original application.
---
Master data management (MDM) often sparks debate. It's a frequently proposed budget item that rarely gets approved, yet it's a fundamental reason business leaders struggle to achieve granular and unified metrics. This article aims to demystify MDM by showing that it doesn't always have to involve big budgets or complex tools. Instead, we will define master data and explore two straightforward approaches to MDM that can be implemented without lengthy multi-year technology roadmaps. While the complexity of MDM varies by case, we believe most organizations can achieve significant improvements by following a few practical steps.

### **What is Master Data Management?**

Master data management is the process of creating and maintaining a single source of truth for critical business data. It ensures consistency, accuracy, and accessibility across an organization’s operations. By harmonizing data, MDM eliminates discrepancies, supports better reporting, and improves decision-making processes.

The most commonly used dimensions in manufacturing company metrics include:

- Product Hierarchies
- Territory Hierarchies
- Key Account Management Groupings
- Industry Codes
- Legal Entities
- Regions and Countries
- Fiscal Time Dimensions

### **Typical pitfalls of master data management projects**

Many master data management projects fail to achieve their intended goals. In some cases, these projects never even get off the ground because they fail to clearly communicate their value to business leaders. Based on our observations, there are three common pitfalls when companies approach master data:

- **Boiling the Ocean**: Attempting to solve all data problems at once instead of prioritizing critical areas often leads to overwhelming complexity and project delays.
- **Overemphasis on Tools**: Focusing too much on selecting and implementing expensive tools can distract from addressing foundational issues like data quality and governance.
- **Neglecting Data Ownership**: Failing to establish clear accountability for different aspects of master data leads to fragmented efforts and inconsistent results. For example, defining which teams are responsible for maintaining specific data dimensions is often overlooked but important for success.

### **Avoiding pitfalls in data management projects**

To avoid common pitfalls in data management, it is essential to break down the project into two distinct approaches: a collaborative approach and a consolidated approach. While this framework is not our own invention, it has been a reliable methodology we have employed successfully for many years.

By dividing master data management work into these two approaches, organizations can tackle tasks more effectively. This structured method allows for a clearer focus on priorities and better resource allocation. Moreover, starting with small, incremental steps—rather than attempting a large, comprehensive project—is often a more practical and achievable way to ensure success in master data management.

### **The Collaborative Master Data Approach**

The collaborative approach to MDM is ideal for managing lookup data and creating custom groupings. This method relies on an application with a user-friendly interface that enables teams to collaborate effectively on master data management tasks. Key features include:

- **Approval Workflows**: Changes to lookups and master data are managed through structured approval processes, ensuring accuracy and accountability.
- **Real-Time Collaboration**: Teams can work together to refine and update master data in real-time, promoting consistency across departments and improving alignment.

**Advantages**

- **Enhanced Flexibility**: This approach is particularly beneficial for organizations that need adaptable and active user involvement in managing dimensions.
- **Simplicity**: Many teams already utilize this approach informally by maintaining lookup tables in spreadsheets. At its core, this method can be as simple as sharing a spreadsheet via tools like SharePoint.

**Disadvantages**

- **Increased Manual Effort**: This approach requires manual intervention, including manual approval processes, which means at least two users must be involved in managing the master data.
- **Reduced Auditability**: If changes are not properly tracked—such as when data is stored in untracked spreadsheets—it becomes challenging to trace historical changes and reconstruct how master data appeared at earlier points in time.

This type of setup has proven effective for defining dimensions critical to measuring business unit or sales performance. For instance, teams managing sales territories have achieved significant success by aligning their territory dimension reporting with their sales organization structures, ensuring consistency with sales incentive plan reporting.

### **The Consolidated Master Data Approach**

In contrast, the consolidated approach is tailored for application data that is maintained directly at the source. This method involves aggregating data from multiple applications into a central repository without making any modifications. Its key characteristics include:

**Advantages:**

- **Data Integrity Preserved:** Data remains unchanged in its original source, ensuring that users can only modify it within the application of origin. This preserves the accuracy and reliability of the master data.
- **Reduced Manual Intervention:** By consolidating data from trusted sources, this approach minimizes the need for manual adjustments, thereby reducing errors and enhancing efficiency.

**Disadvantages:**

- **Complex Decentralization:** Because master data is distributed across multiple applications, coordinating updates and maintaining consistency can be challenging. This issue is particularly acute in organizations with multiple ERP systems managed by diverse local IT teams.
- **Restricted Modifications:** Business leaders often require minor adjustments or recoding of dimensions. In this approach, such changes must be negotiated with the production system of record, which can slow down responsiveness and adaptability.

The consolidated approach is most effective when source data from applications is of high quality and does not require frequent adjustments by users. It is ideal for organizations seeking streamlined operations where data reliability and minimal intervention are priorities.

### **The Hybrid Approach: Combining both the Collaborative and Consolidated Approach**

Considering that both collaborative and consolidated master data approaches have their own unique advantages and disadvantages, a hybrid strategy can often be the most effective. By using these approaches together:

- **Maintain Complex Master Data Within Applications**: Organizations can retain more complex master data within applications, potentially avoiding the need for a costly and intricate MDM system altogether.
- **Enable Business Flexibility**: Business leaders gain the flexibility to add their own local dimensions, improving the visibility of custom dimensions in reporting and enhancing auditability and change management processes.
- **Clarify Ownership Roles**: A hybrid approach facilitates clear ownership of master data. For example, Customer data quality in the ERP can be managed by the Customer Service team, while the Sales organization takes responsibility for Sales Territory structures, ensuring accountability and streamlined operations.

**If You Want Real Change in Master Data Quality, You Need Visibility**

Once, I was in a meeting with the CEO of a Business Unit discussing the sales funnel. The conversation was not going well because the data was, quite simply, poor. However, the CEO said that he would be willing to continue reviewing the sales funnel reports even if the data was flawed, as long as it was clear which data was problematic and why.

The CEO made a smart move here. Instead of insisting that everything be flawless, he told his leadership team that he was willing to work with imperfect data, provided it was clear why the data was flawed and who was responsible for addressing the issues.

Data quality metrics might seem like a dull report that no business leader would bother opening. However, imagine a business report on key metrics like orders, sales, or inventory that includes a data quality score. Such a report would undoubtedly capture attention. This kind of visibility not only ensures the report gets reviewed but also drives accountability. It motivates people to address data issues, whether in the source system (consolidated master data) or within the application (collaborative master data).

### **Conclusion**

Master data management plays a pivotal role in unifying metrics and insights for informed decision-making. By understanding the collaborative and consolidated approaches, organizations can select the strategy that best aligns with their needs and data quality standards. Whether fostering collaboration for lookup data or consolidating application data for streamlined efficiency, effective MDM can transform how businesses leverage their data assets.
