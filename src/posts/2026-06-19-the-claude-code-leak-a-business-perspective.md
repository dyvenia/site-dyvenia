---
title: 'The Claude Code Leak: A Business Perspective'
date: 2026-06-19 12:20:00
author: Alessio Civitillo
description: The Claude Code leak provides a practical look at AI architecture and where value is created in enterprise AI applications. This article explores why governance, workflows, and deterministic logic often matter more than AI itself when building reliable, cost-effective solutions.
tags:
  - AI Strategy
  - AI Governance
  - Enterprise AI
  - AI Agents
  - Software Architecture
internal_notes: Article by AC on a recent Claude Code Leak
---

The recent [leak of the Claude Code source code](https://www.axios.com/2026/03/31/anthropic-leaked-source-code-ai) provided a rare view of high-level AI development. A significant finding: the application dedicates only **1.6% of its codebase to core decision logic**. The remaining 98.4% consists of standard development code: a layer now frequently referred to as "harness engineering."

While technical circles have focused on the code itself, there has been limited discussion regarding its business implications. Specifically, there is a need to address ROI, direct P&L impact, and how AI initiatives should be structured to provide measurable value on a balance sheet.

While many companies are rushing to build sophisticated agents, a significant portion of the value still comes from writing solid, deterministic code. **The challenge is not pushing every task to an AI but breaking down complex business processes into smaller, manageable steps**. In most cases, these steps can be executed as deterministic functions: the equivalent of an Excel formula. In this paradigm, the Large Language Model (LLM) acts as a specialized orchestrator that delegates tasks to deterministic functions, rather than performing every step itself. [![Claude Code structure](/assets/images/blog/Claude_Code_Structure.png "Source: Dive into Claude Code: The Design Space of Today’s and Future AI Agent Systems; Liu, J., Zhao, X., Shang, X., & Shen, Z. (2026).")](https://arxiv.org/pdf/2604.14228)

## Governance and Cost Control

The Claude Code codebase reveals a significant investment in a complex permission system that governs access, ownership, and responsibilities. This mirrors enterprise governance. And interesting enough, this system is entirely deterministic. It demonstrates that the most successful AI tools handle high-stakes governance through traditional, rule-based code rather than relying on probabilistic models.

This architectural choice highlights an important design principle: use LLMs where reasoning is required, but avoid using them for operational logic that can be implemented through deterministic code. **Over-reliance on probabilistic models for every task introduces two risks: cost volatility and vendor dependency**. 

The solution is a "deterministic-first" architecture. By handling simple business tasks through traditional code, you minimize the number of tokens required for orchestration. Deterministic code is predictable, cost-effective, and auditable. When structural heavy lifting (process execution and governance) is handled by your code, the LLM is freed to focus on reasoning and decision support. This reduces token consumption while making the overall solution easier to govern and operate. 

A useful excerpt from the Claude Code leak paper:

_The safety-by-default principle is implemented through seven independent layers. A request must pass through all applicable layers, and any single layer can block it:_

1. _Tool pre-filtering (tools.ts): Blanket-denied tools are removed from the model’s view before any call, preventing the model from attempting to invoke them._
2. _Deny-first rule evaluation (permissions.ts): Deny rules always take precedence over allow rules, even when the allow rule is more specific._
3. _Permission mode constraints (types/permissions.ts): The active mode determines the baseline handling for requests that match no explicit rule._
4. _Auto-mode classifier: An ML-based classifier evaluates tool safety and may deny requests that the rule system would allow._
5. _Shell sandboxing (shouldUseSandbox.ts): Approved shell commands may still execute inside a sandbox, restricting filesystem and network access._
6. _Not restoring permissions on resume (conversationRecovery.ts): Session-scoped permissions are not restored on resume or fork._
7. _Hook-based interception (types/hooks.ts): PreToolUse hooks can modify permission decisions; PermissionRequest hooks can resolve decisions asynchronously alongside the user dialog (or before it, in coordinator mode)._

## Process Before Tools

Value is built through productivity gains. Consider a simple lemonade stand: if you are squeezing lemons by hand, you manage one lemon per minute. You create significant value by investing in a citrus juicer, which increases output to five lemons per minute.

Productivity improvements stem from either better equipment or process optimization. If you pre-squeeze lemons before a rush, you can serve more customers with the same amount of manual labor by optimizing the workflow.

The underlying economics of productivity are the same regardless of the technology being implemented. Whether you are purchasing heavy machinery or implementing generative AI, the goal remains the same: a process must produce more output per unit of cost. **AI is a tool that must fit into a logical process design, not a substitute for it.**

## From Leak to Strategy

To ensure AI implementations generate measurable business value, follow a structured operational approach:

- **Deconstruct:** Map existing processes to understand exactly how work is performed.
- **Define Future State:** Identify where bottlenecks can be removed and where process simplification is possible.
- **Isolate Deterministic Steps:** Identify process parts that follow clear rules and do not require expensive AI inference.
- **Orchestrate:** Apply AI only to the decision logic, using it to manage those deterministic functions effectively.

![A structured approach to AI implementation](/assets/images/blog/AI_Implementation_Step_by_step.png)

AI should be the final component of a multi-step improvement initiative, not the justification for the project itself. For process deconstruction, use standard operational frameworks such as Swimlane diagrams, Affinity diagrams, SIPOCs, or Fishbone analyses.

## Process Discipline and AI Design

A common mistake is to apply AI to every step of the process simply because it is available. This often results in solutions that are more complex than necessary, more expensive to operate, and harder to govern. The Claude Code leak illustrates the importance of clearly defining what should be handled by deterministic code and what by AI. 

If you treat AI like a junior associate who needs strict instructions, guardrails, and clear parameters, you gain predictability. If you treat it like an autonomous executive, you invite chaos. The goal is to build an environment where the AI provides the reasoning, but your architecture provides the reliability. When you design with this level of restraint, you stop experimenting and start engineering business outcomes.

## Conclusions

The Claude Code leak is a practical case study in AI architecture. By limiting pure AI inference to 1.6% of the codebase, the developers built a scalable, reliable system.

The implication for business leaders is that successful AI initiatives are not determined by how much intelligence you can pack into an agent, **but how little you actually need to achieve the result**. 

When you shift your focus from "AI-first" to "Logic-first," you move beyond token cost optimization to building systems that are auditable, stable, and integrated into your bottom line. Stop asking what your AI can decide, and start asking what your deterministic code can handle. That is where real business value is created.
