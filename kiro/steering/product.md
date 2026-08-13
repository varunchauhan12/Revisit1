---
inclusion: always
---

# Revisit — Product Specification

## 1. Product Identity

Product name: Revisit

Revisit is a knowledge rediscovery application.

Revisit is NOT primarily:
- a bookmark manager
- a read-later application
- a note-taking application
- a social network
- an AI chatbot

Revisit helps people rediscover useful content they previously saved.

The central product problem is:

People save valuable content from the internet, but most saved content is never revisited.

The application should transform a passive collection of saved links into an active, useful personal knowledge system.

---

# 2. Product Vision

## Vision

Turn forgotten saved content into useful knowledge.

A user should be able to save something in seconds and trust Revisit to:

1. Understand what they saved.
2. Organize it automatically.
3. Make it searchable by meaning.
4. Bring it back at an appropriate time.
5. Help them actually use the knowledge.

The product should feel like:

"I don't need to remember where I saved something. Revisit remembers it for me."

---

# 3. Core Product Loop

The most important concept in the entire product is the following loop:

Find useful content
        ↓
Save it
        ↓
Revisit receives the content
        ↓
AI understands the content
        ↓
Revisit stores structured knowledge
        ↓
User can find it semantically
        ↓
Revisit resurfaces it at the right time
        ↓
User uses the knowledge
        ↓
Knowledge becomes useful
        ↓
Repeat

Every major product decision must support this loop.

If a feature does not improve:
- saving
- understanding
- finding
- rediscovering
- using

then it should not be prioritized for V1.

---

# 4. Product Philosophy

## Rediscovery over storage

The product should never optimize purely for collecting more bookmarks.

The goal is not:

"How many things has the user saved?"

The goal is:

"How many useful things did the user successfully rediscover?"

Saving is the input.

Rediscovery is the outcome.

---

# 5. Target User

The initial target user is someone who consumes a large amount of useful online content.

Examples:

- developers
- students
- researchers
- designers
- founders
- creators
- people learning technical subjects

They frequently encounter useful:

- LinkedIn posts
- Reddit posts
- GitHub repositories
- Medium articles
- Dev.to articles
- X posts
- web pages
- tutorials
- technical discussions
- educational content

They save content because it may be useful later.

The problem is that "later" usually never happens.

---

# 6. User Problem

Typical user behavior:

See useful post
→ Save it
→ Continue scrolling
→ Save another post
→ Save another article
→ Save another GitHub repository
→ Never return to most of them

Existing bookmarking systems solve storage.

They do not adequately solve rediscovery.

The user should not have to remember:

- where they saw something
- which platform it was on
- what the title was
- which folder they put it in
- which tags they assigned
- the exact words used in the original post

Revisit should understand the content itself.

---

# 7. Core Differentiator

Revisit competes on:

## Rediscovery

Not:

## Bookmarking

Competitors may be better at:
- reading
- bookmarking
- highlighting
- organization
- knowledge management

Revisit should be better at:

"Finding something useful I saved months ago without remembering exactly what it was."

---

# 8. Example User Experience

User sees a post about React Native performance.

They share it to Revisit.

Revisit processes it and understands:

Topic:
React Native performance

Summary:
The post explains several techniques for reducing unnecessary renders...

Key ideas:
- memoization
- FlatList optimization
- avoiding unnecessary state updates

Tags:
React Native
Performance
Mobile Development

The user does not manually organize this information.

Later the user searches:

"that post about making FlatList faster"

Revisit finds it.

Alternatively, Revisit resurfaces it:

"That React Native performance post you saved is worth revisiting today."

This is the desired product experience.

---

# 9. V1 Core Features

V1 should focus on the smallest complete version of the core loop.

## Required

### Authentication

Users can:
- create an account
- log in
- log out
- remain authenticated between sessions

### Save content

Users can save content through the platform's sharing mechanism.

Initial target sources:

- LinkedIn
- Reddit
- GitHub
- Medium
- Dev.to
- X
- generic web pages

### AI understanding

When content is saved, Revisit should attempt to generate:

- title
- summary
- key points
- topics/tags
- estimated reading time
- embedding

### Semantic search

Users should be able to search naturally.

Example:

"that article about improving React Native performance"

The system should search by meaning, not only exact keywords.

### Rediscovery

The application should surface saved content at appropriate times.

### Today's Revisit

The home screen should have a strong rediscovery experience.

The user should immediately see content worth revisiting.

### Saved content

Users should still be able to browse everything they have saved.

### Content detail

Users can open a saved item and see:

- original content/link
- title
- summary
- key points
- tags
- metadata
- reminder information

### Reminder

A user should be able to choose when they want to revisit saved content.

---

# 10. Home Screen Philosophy

The home screen should NOT feel like a traditional bookmark manager.

Avoid making the primary experience:

"Here are all your bookmarks."

Instead prioritize:

## Today's Revisit

Content that deserves attention now.

Then:

## Continue Reading

Content the user has started but not finished.

Then:

## Recently Saved

Recently added content.

Then:

## Suggested

Potentially useful content to rediscover.

The home screen should make Revisit feel alive.

---

# 11. Search Philosophy

Search is one of the core features.

The user should not need to remember exact words.

Bad:

"react native flatlist performance memoization"

Good:

"show me that post about making my React Native app faster"

Good:

"the article I saved about vector databases"

Good:

"that GitHub repository for authentication"

Search should operate primarily on semantic meaning.

---

# 12. Notifications Philosophy

Notifications are not generic reminders.

They are a mechanism for rediscovery.

Bad notification:

"You have 5 saved posts."

Bad notification:

"You forgot to read this."

Better:

"That React Native performance post you saved might be useful today."

Notifications should feel helpful rather than nagging.

Default principle:

Maximum approximately 1–2 rediscovery notifications per day.

Never spam users.

The user must be able to control notification behavior.

---

# 13. AI Philosophy

AI should be invisible.

The user should not think:

"This application uses an LLM."

The user should think:

"This application understands what I save."

AI exists to remove manual work.

The user should not have to manually:

- summarize
- tag
- categorize
- describe
- organize
- remember

AI should perform these tasks automatically whenever possible.

---

# 14. Content Sources

Initial supported content:

- LinkedIn
- Reddit
- GitHub
- Medium
- Dev.to
- X
- generic web URLs

Platform reliability may differ.

The architecture must NOT assume that every platform can always be extracted successfully.

If extraction fails:

The original URL should still be preserved.

The save should not be silently lost.

The application should represent processing failure clearly.

---

# 15. Content Extraction Principle

Content extraction is an infrastructure problem, not a UI problem.

Extraction should be modular.

Different sources may require different extraction strategies.

The system should be able to support:

1. direct extraction
2. readability-based extraction
3. external extraction services
4. platform-specific extraction
5. fallback URL metadata

The architecture must allow extraction strategies to change without rewriting the entire application.

LinkedIn is considered a particularly important technical risk.

Do not assume extraction works until it has been tested.

---

# 16. Collections

Collections should reduce cognitive load.

Automatic organization is preferred over requiring the user to manually categorize every saved item.

Smart collections can eventually group content based on:

- topics
- tags
- source
- time
- semantic similarity

However, collections are secondary to the core rediscovery loop.

Do not overbuild collection functionality in V1.

---

# 17. V1 Screens

Initial screens:

1. Splash
2. Onboarding
3. Authentication
4. Home
5. Search
6. Search Results
7. Saved/Library
8. Content Detail
9. Reminder Selection
10. Profile
11. Settings
12. Notification Preferences

Every screen should have defined:

- purpose
- navigation
- components
- states
- loading state
- empty state
- error state
- success state
- API/data requirements

---

# 18. UI Principles

The UI should feel:

- modern
- calm
- intelligent
- minimal
- premium
- fast
- content-focused

Avoid:

- unnecessary gradients
- excessive decoration
- excessive animations
- cluttered dashboards
- generic SaaS layouts
- unnecessary cards
- unnecessary buttons

The interface should prioritize the saved content itself.

The visual design should make rediscovery feel rewarding.

Reference designs provided in the project are the visual source of truth.

When implementing a screen from a reference image:

1. Match structure.
2. Match proportions.
3. Match spacing.
4. Match typography.
5. Match colors.
6. Match borders and radius.
7. Match shadows.
8. Match icons.
9. Match responsive behavior.

Do not replace the reference design with generic UI patterns.

---

# 19. Product Constraints

Revisit V1 is intentionally limited.

Do NOT build unless explicitly requested:

- knowledge graphs
- learning paths
- creator following
- social features
- gamification
- widgets
- complex analytics dashboards
- weekly digest
- recommendation feeds
- collaboration
- public profiles
- complex collection systems

The goal is to make the core loop excellent.

---

# 20. Success Metrics

Do not primarily measure:

- downloads
- total saved items
- account registrations

Important metrics include:

### Save rate

How frequently users save content.

### Rediscovery rate

Percentage of saved content that is opened again.

### Search usage

How frequently users use semantic search.

### Search success

Percentage of searches resulting in a useful/opened result.

### Notification open rate

How often users act on rediscovery notifications.

### Revisit rate

How frequently users return to saved content.

The ultimate question is:

"Did Revisit cause the user to use something they previously saved?"

---

# 21. Product Decision Rule

Before implementing any feature, ask:

1. Does this reduce friction?
2. Does this improve understanding?
3. Does this improve discovery?
4. Does this improve rediscovery?
5. Does this help the user use saved knowledge?

If the answer is no to all of these:

Do not build it for V1.

---

# 22. Product Priority

Priority order:

P0 — Core loop

Save
→ Understand
→ Search
→ Rediscover

P1 — Supporting experience

Authentication
Content detail
Library
Reminders
Notification preferences

P2 — Quality

Loading states
Error handling
Performance
Polish
Accessibility

P3 — Future

Advanced organization
Recommendations
Analytics
Additional platforms

---

# 23. Four-Week MVP Direction

## Week 1

Foundation:

- project setup
- navigation
- authentication
- database
- core UI
- share flow foundation

## Week 2

Saving:

- share payload
- URL processing
- metadata extraction
- content extraction
- persistence

## Week 3

Understanding:

- AI summary
- key points
- tags
- embeddings
- semantic search

## Week 4

Rediscovery:

- Today's Revisit
- reminders
- notifications
- error handling
- testing
- polish
- launch preparation

This is a target direction, not a reason to rush unstable functionality.

---

# 24. Engineering/Product Relationship

Product requirements are more important than individual implementation preferences.

However, never change the core product behavior merely because another implementation is easier.

If a technical limitation affects product behavior:

1. identify the limitation
2. explain the tradeoff
3. preserve the core user experience where possible
4. choose the simplest reliable implementation

Do not silently reduce the product's core functionality.

---

# 25. Critical Product Risks

## Risk 1 — Content extraction

The most important technical/product risk is reliable extraction.

## Risk 2 — Rediscovery feels like spam

Notifications must feel useful.

## Risk 3 — AI output is generic

AI-generated summaries and tags must provide actual value.

## Risk 4 — Search feels like normal keyword search

Semantic search must genuinely understand user intent.

## Risk 5 — Saving is too slow

Saving should feel nearly instantaneous from the user's perspective.

Heavy processing should happen asynchronously.

---

# 26. North Star

Revisit succeeds when a user says:

"I knew I saved this somewhere, but I couldn't remember where. Revisit found it."

That is the experience the entire product should optimize for.
