import { Product, Testimonial, FAQItem, BlogPost, PricingPlan } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "leadflow-crm",
    name: "LeadFlow CRM",
    tagline: "Close more deals with automated workflow intelligence",
    description: "The ultimate relationship builder for high-growth sales teams. Automate pipeline staging, gather intelligence on prospects, and integrate with standard mail platforms.",
    logoName: "Users",
    colorClass: "from-blue-600 to-indigo-600",
    badgeColorClass: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    priceMonthly: 29,
    rating: 4.8,
    reviewCount: 312,
    highlightedMetric: { label: "Pipeline conversion boost", value: "+37%" },
    features: [
      "Lead tracking with automatic enrichment",
      "Unified contact history & activity log",
      "Interactive visual drag-and-drop sales pipeline",
      "Rich context logging with searchable task notes",
      "Bidirectional Email integration & template sender",
      "Real-time pipeline analytics & projection dashboard",
      "One-click reports & PDF exporting"
    ],
    benefits: [
      "Eliminate repetitive spreadsheet logs",
      "Saves up to 12 hours per salesperson each week",
      "Centralize conversations with prospects seamlessly",
      "Understand which channels close deals with analytics",
      "Fast onboarding - have your team set up in 10 minutes"
    ],
    overview: "LeadFlow CRM takes the complexity out of sales pipeline management. Designed specifically for SaaS startups and growing agencies, it provides visual indicators for bottlenecks in your pipeline, integrates directly with email exchanges, and leverages automated data enrichment to fill contact details instantly without manual entries.",
    faq: [
      { question: "How does the automatic lead enrichment work?", answer: "LeadFlow CRM searches public domains and social registries using the lead's email domain to populate company details, sizing, social handles, and logos automatically." },
      { question: "Can I import leads from my old Salesforce or Hubspot export?", answer: "Yes, LeadFlow has a standard visual CSV import tool mapping existing columns directly to contact records within three clicks." },
      { question: "Is there a limit on contact records?", answer: "The Starter plan includes up to 5,000 active contacts. Professional and Enterprise configurations support millions of leads without latency." }
    ],
    screenshots: [
      { title: "Dynamic Sales Workspace", description: "Monitor active deals grouped by pipeline confidence stages.", visualType: "crm" },
      { title: "Lead Contact Context Panel", description: "Review public details, emails, calls, and files in a single tab.", visualType: "crm" }
    ],
    testimonials: [
      { name: "Marcus Thorne", role: "VP of Growth", company: "AeroTech Labs", rating: 5, text: "Swapping out our clunky Salesforce workspace for LeadFlow immediately boosted team alignment. It is incredibly intuitive and quick!" },
      { name: "Elena Rostova", role: "Founder", company: "Bloom Creative", rating: 5, text: "For a creative agency, pipeline visibility is crucial. LeadFlow makes tracking deal values and stages a delight." }
    ]
  },
  {
    id: "mailboost-ai",
    name: "MailBoost AI",
    tagline: "AI-driven engagement loops to skyrocket open rates",
    description: "Write, segment, and trigger personal customer email journeys backed by responsive language models. Reach the inbox every run with adaptive warm-up logic.",
    logoName: "Mail",
    colorClass: "from-blue-600 to-indigo-600",
    badgeColorClass: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    priceMonthly: 19,
    rating: 4.9,
    reviewCount: 428,
    highlightedMetric: { label: "Average Email Open Rate", value: "41.2%" },
    features: [
      "Dynamic visual drag-and-drop campaign builder",
      "Over 80 high-conversion pre-built responsive templates",
      "AI Copywriting Engine for adaptive variations",
      "Advanced engagement analytics (clicks, bounces, spam)",
      "Smart behavioral automation triggers & step conditions",
      "Deep cohort segmentation via attributes or behavior"
    ],
    benefits: [
      "No technical knowledge needed to build complex journeys",
      "Write subject lines and body copies in seconds using generative AI assistants",
      "Continuous auto-testing optimizes variants to increase clickthroughs",
      "Built-in compliance filters protect domain reputations automatically"
    ],
    overview: "MailBoost AI bridges the gap between massive newsletter operations and high-converting personalized messaging. Use the drag-and-drop visual editor to structure multi-day trial sequences, and trigger targeted updates only when users perform specific tasks inside your own system.",
    faq: [
      { question: "Does MailBoost AI support cold outreach?", answer: "Indeed! However, we require users to adhere to CAN-SPAM and GDPR guidelines, maintaining clean opt-out triggers." },
      { question: "Are custom custom domains supported?", answer: "Yes. MailBoost walks you through DKIM, SPF, and DMARC text records setup to maximize delivery success to modern primary inboxes." }
    ],
    screenshots: [
      { title: "AI Generation Studio", description: "Prompt the model to optimize click rates and brand voice.", visualType: "email" },
      { title: "Sequence Automator", description: "Design flows with visual conditions based on link triggers.", visualType: "email" }
    ],
    testimonials: [
      { name: "Johnathan Mercer", role: "Marketing Director", company: "FinGrid", rating: 5, text: "Our clickthrough rates expanded by over 80% since adopting MailBoost. The AI writing tool handles the blank page problem beautifully." }
    ]
  },
  {
    id: "invoicepro",
    name: "InvoicePro",
    tagline: "Get paid faster with automated cloud invoicing",
    description: "Build clean, professional invoices, support dynamic global tax systems, handle recurring client subscriptions, and accept secure payments directly from notifications.",
    logoName: "ReceiptText",
    colorClass: "from-emerald-600 to-teal-600",
    badgeColorClass: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    priceMonthly: 15,
    rating: 4.7,
    reviewCount: 195,
    highlightedMetric: { label: "Payment speedup times", value: "3x Faster" },
    features: [
      "Instant customized PDF invoice generation",
      "Multi-country tax support with automatic rates calculation",
      "Interactive customer contact directory",
      "Real-time transaction tracking and ledger overview",
      "Overdue automated reminder emails and custom late fees",
      "Secure hosting of customer payment portals"
    ],
    benefits: [
      "Look highly professional to your high-value enterprise clients",
      "Never miss past-due bills again with auto-dunning schedules",
      "Seamless integration with Stripe, Credit Card, and bank networks",
      "Reclaim hours previously spent manually checking accounting balances"
    ],
    overview: "InvoicePro provides billing simplicity. Generate customized invoice templates with your branding assets, schedule automated weekly reminders, and let clients make single-tap bank deposits. Ideal for freelancers, agencies, and cloud service consultancies.",
    faq: [
      { question: "Does it support variable currencies?", answer: "InvoicePro supports over 135 international currencies and dynamically resolves exchange rates at checkout." },
      { question: "Can clients pay without a registered profile?", answer: "Yes, clients receive an encrypted payment link leading to a checkout panel requiring no registration." }
    ],
    screenshots: [
      { title: "Professional Ledger Overview", description: "Filter income streams by due dates, active quotes, or client records.", visualType: "invoice" }
    ],
    testimonials: [
      { name: "Celine Dupond", role: "Principal Architect", company: "Studio Paris", rating: 5, text: "My customers pay me faster because they can checkout on credit card instantly. Highly recommended for creative pros." }
    ]
  },
  {
    id: "socialpilot-ai",
    name: "SocialPilot AI",
    tagline: "Set and forget your social growth engine",
    description: "Connect all publishing targets, generate optimized content for multiple feeds simultaneously, organize materials visually, and evaluate reach from one screen.",
    logoName: "Share2",
    colorClass: "from-amber-600 to-orange-600",
    badgeColorClass: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    priceMonthly: 24,
    rating: 4.8,
    reviewCount: 224,
    highlightedMetric: { label: "Average weekly reach lift", value: "+178%" },
    features: [
      "Multi-platform posting (Twitter/X, LinkedIn, Facebook, Instagram)",
      "Adaptive caption model optimizing message length & tag density",
      "Drag-and-drop integrated monthly publishing calendar",
      "Unified performance metrics measuring engagement loops",
      "In-app bulk queue uploader (via CSV lists)"
    ],
    benefits: [
      "Stop repeating manual logins across five individual apps",
      "Keep an active social profile even while on vacation",
      "Draft a month's worth of post copy in an afternoon",
      "Find out exactly which hours maximize engagement"
    ],
    overview: "SocialPilot AI streamlines brand publishing. Write your post once, and watch the platform customize image attachments and character parameters to fit LinkedIn formats and Twitter's strict limits concurrently. Ensure consistency with ease.",
    faq: [
      { question: "Can I schedule video uploads?", answer: "Yes, SocialPilot AI fully supports video formatting, Reels, Shorts, and carousel arrays." }
    ],
    screenshots: [
      { title: "Unified Dispatcher View", description: "Review scheduling targets in a highly legible visual calendar.", visualType: "social" }
    ],
    testimonials: [
      { name: "Darnell Jefferson", role: "Social Director", company: "Vibe Brands", rating: 5, text: "Scheduling hundreds of posts across accounts was previously stressful. SocialPilot AI completely simplified our flow!" }
    ]
  },
  {
    id: "tasksync",
    name: "TaskSync",
    tagline: "Collaborative tasks for modern, distributed teams",
    description: "Align distributed teams around clear project cards. Use interactive boards, track deadline commitments, post comments, and host digital work assets securely.",
    logoName: "Layers",
    colorClass: "from-cyan-600 to-blue-600",
    badgeColorClass: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    priceMonthly: 18,
    rating: 4.6,
    reviewCount: 164,
    highlightedMetric: { label: "On-time project delivery", value: "94.8%" },
    features: [
      "Drag-and-drop interactive Kanban board",
      "Direct task comments with file attachment options",
      "Role-based permission settings for team members",
      "Time-tracking counters directly inside checklist cards",
      "Automated Slack & email notifications on step completion",
      "Secure storage of shared project files and design mockups"
    ],
    benefits: [
      "Everyone instantly knows who is working on what",
      "Drastically reduces back-and-forth alignment Slack chats",
      "Never lose critical files inside cluttered desktop folders",
      "Easily view timeline bottlenecks before they delay clients"
    ],
    overview: "TaskSync delivers lightweight project focus. It filters out complex enterprise over-engineering, leaving you with beautiful boards, immediate checklist controls, simple assignments, and shared file folders so everyone stays productive.",
    faq: [
      { question: "Is there a limit on collaborator numbers?", answer: "Starter groups include up to 10 active editors, with unlimited read-only clients welcome." }
    ],
    screenshots: [
      { title: "Sleek Kanban Layout", description: "Organize actions into Custom columns like In Progress or Ready for Review.", visualType: "tasks" }
    ],
    testimonials: [
      { name: "Sarah Lin", role: "Product Manager", company: "Shift Dev", rating: 5, text: "Finally, a project organizer that isn't bloated. TaskSync is fast, beautiful, and our software engineers actually love it." }
    ]
  },
  {
    id: "analyticshub",
    name: "AnalyticsHub",
    tagline: "Consolidated commercial dashboards in seconds",
    description: "Hook up all software endpoints, synthesize databases, compute automated metrics, and generate clean executive dashboards for presentation slides instantly.",
    logoName: "BarChart3",
    colorClass: "from-rose-600 to-red-600",
    badgeColorClass: "border-rose-500/30 text-rose-400 bg-rose-500/10",
    priceMonthly: 35,
    rating: 4.9,
    reviewCount: 382,
    highlightedMetric: { label: "Time saved generating report", value: "-90%" },
    features: [
      "Fully customized interactive KPI dashboards",
      "Visual chart builders with rich theme choices",
      "Robust data integrations (Stripe, HubSpot, PG Database, GA4)",
      "Scheduled Slack report feeds and automated email digests",
      "Secure custom domain portal options for white-labeled client views"
    ],
    benefits: [
      "Verify marketing expenditures and user behaviors in real time",
      "Stop spending valuable Fridays copying spreadsheets into charts",
      "Identify churn trajectories before they affect capital",
      "Present board members with clean, self-revising data visualizations"
    ],
    overview: "AnalyticsHub pulls together performance data from Stripe, HubSpot, and transactional databases, rendering actionable financial charts. Build unified executive panels within minutes under our code-free sync wizard.",
    faq: [
      { question: "Is my technical developer credentials safe?", answer: "Absolutely. AnalyticsHub utilizes end-to-end credential hashing and read-only connectors, ensuring isolation." }
    ],
    screenshots: [
      { title: "Consolidated Financial Portal", description: "Evaluate cohort trajectories alongside live checkout metrics.", visualType: "analytics" }
    ],
    testimonials: [
      { name: "Devon Woods", role: "Managing CFO", company: "CapWest Group", rating: 5, text: "Swapping out manual reporting tables for AnalyticsHub saved our finance division 20+ hours of busywork every single week." }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Sarah Jenkins", company: "PathLight Marketing", position: "Creative Founder", rating: 5, review: "Swapping our client operations over to ManageGoal's unified catalog changed our entire week. MailBoost AI paired with LeadFlow CRM works smoothly to drive real sales.", avatarSeed: "Sarah" },
  { id: "t2", name: "David Vance", company: "Apex Digital SaaS", position: "Lead Architect", rating: 5, review: "AnalyticsHub and TaskSync have simplified remote product deliveries. They are extremely fast, well-crafted, and deliver reliable value daily.", avatarSeed: "David" },
  { id: "t3", name: "Elena Rostova", company: "Bloom Creative Agency", position: "Design Partner", rating: 5, review: "InvoicePro made invoice collection stress-free. Clients checkout securely using our brand logo in seconds. Highly recommend!", avatarSeed: "Elena" },
  { id: "t4", name: "Marcus Thorne", company: "Aerotech Labs", position: "Operations VP", rating: 5, review: "The customer service response times and outstanding tool reliability make ManageGoal our dependable SaaS provider. 10/10 tool design.", avatarSeed: "Marcus" },
  { id: "t5", name: "Claire Chen", company: "Nexus Education", position: "Software CTO", rating: 5, review: "We connected LeadFlow with our local databases in minutes. Incredible APIs and clear documentation structure.", avatarSeed: "Claire" },
  { id: "t6", name: "Michael Frost", company: "Polaris Capital", position: "CFO Advisor", rating: 5, review: "AnalyticsHub is exactly what we needed to organize our portfolio companies' metrics on one single panel.", avatarSeed: "Michael" },
  { id: "t7", name: "Aria Montgomery", company: "Solace Wellness", position: "Founder", rating: 5, review: "SocialPilot AI keeps my target channels active even during off-hours, saving me hours of copying and pasting.", avatarSeed: "Aria" },
  { id: "t8", name: "Xavier Dupont", company: "Vanguard Studios", position: "General Manager", rating: 5, review: "We are paid on average three times quicker using InvoicePro. The PDF delivery and automated reminder rules are absolute life-savers.", avatarSeed: "Xavier" },
  { id: "t9", name: "Tariq Al-Fayed", company: "Desert Commerce", position: "E-Commerce Founder", rating: 5, review: "MailBoost AI's subject writing generator boosted my store's newsletter discount click rate to over 38%. Outstanding ROI.", avatarSeed: "Tariq" },
  { id: "ta10", name: "Sophia Martinez", company: "Zeta Consulting", position: "Senior Analyst", rating: 5, review: "Clean UI dashboard systems and zero performance bloat. ManageGoal builds tools for builders.", avatarSeed: "Sophia" },
  { id: "ta11", name: "James Peterson", company: "Gridworks LLC", position: "Project Manager", rating: 5, review: "TaskSync is delightfully quick. Dragging story points across boards has zero latency, supporting team standups flawlessly.", avatarSeed: "James" },
  { id: "ta12", name: "Naomi Kiyotaka", company: "Yugen Media Agency", position: "Comms Director", rating: 5, review: "The multi-platform publishing pipelines inside SocialPilot AI are pristine. My creative copy reaches audiences everywhere with zero fuss.", avatarSeed: "Naomi" }
];

export const FAQS: FAQItem[] = [
  // 20 realistic FAQs covering billing, cancellation, support, refunds, license, updates, etc.
  { category: "billing", question: "How do subscriptions work?", answer: "Our SaaS products are billed monthly or annually. You can upgrade, downgrade, or cancel your active subscription anytime through your Account central portal." },
  { category: "billing", question: "Is there a discount for annual billing?", answer: "Yes, you save over 20% on any SaaS plan compared to the monthly rates when committing to annual cycles." },
  { category: "billing", question: "What payment options are supported?", answer: "We accept all major international credit cards (Visa, MasterCard, Amex), Apple Pay, Google Pay, and bank transfers on checkout." },
  { category: "billing", question: "Are taxes calculated automatically on checkouts?", answer: "Yes, our Stripe-backed checkout processes dynamically evaluate localized Sales Tax or VAT based on your business address." },
  { category: "billing", question: "Do you offer enterprise-wide pricing packages?", answer: "Yes, our custom team packages include dedicated account managers, customized API limits, compliance routing, and custom SLAs. Get in touch with Sales!" },
  
  { category: "cancellation", question: "How do I cancel my active subscription?", answer: "Simply go to your App's profile tab, select Billing, and click 'Cancel Subscription'. You will maintain full premium features until your current period terminates." },
  { category: "cancellation", question: "What happens to my data if I cancel?", answer: "Your recorded data is securely stored for 90 days after cancellation, allowing safe reactivation. You can also request complete data deletions instantly." },
  { category: "cancellation", question: "Can I switch plans mid-cycle?", answer: "Yes. When upgrading or downgrading, our billing engine automatically calculates a pro-rated credit for the remainder of your billing cycle." },

  { category: "security", question: "Is my personal data safe with ManageGoal?", answer: "We enforce absolute database isolation, TLS 1.3 encryption for all data in motion, and AES-256 wrapping for values at rest. Safety is our primary focus." },
  { category: "security", question: "Are you GDPR and CCPA compliant?", answer: "Absolutely. All hosting arrays reside in modern, ISO-27001 audited centers, and we support complete export/deletion tools for compliance." },
  { category: "security", question: "Where is my confidential client records hosted?", answer: "All SaaS infrastructure resides on premium Google Cloud Platform servers, secured with dual-layer firewalls." },
  { category: "security", question: "Do you support Single Sign-On (SSO)?", answer: "Yes, our enterprise tiers support SAML, Okta, and Google Workspace SSO authentication integrations." },

  { category: "product", question: "Do we get access to all updates?", answer: "Yes. ManageGoal handles all updates server-side silently. You always experience the newest version without manually reloading." },
  { category: "product", question: "Is there an offline fallback mode?", answer: "TaskSync and LeadFlow CRM support local database caching, letting you log activities while offline which merge securely when you reconnect." },
  { category: "product", question: "Can I connect custom domains to my reports?", answer: "Yes, our white-label feature on AnalyticsHub, InvoicePro, and MailBoost allows custom branded URLs with automated SSL generation." },
  { category: "product", question: "Is there a limit on API integrations?", answer: "We offer generous starter endpoints. Pro tiers have custom, high-frequency webhooks and robust payload pipelines." },

  { category: "all", question: "What is your refund policy?", answer: "We support a strict 14-day, hassle-free 100% money-back guarantee if you are not fully satisfied with our services." },
  { category: "all", question: "Do you have a free developers trial?", answer: "Yes! Every single product in our catalog comes with a 14-day fully featured trial with no credit card required." },
  { category: "all", question: "How do I access customer support?", answer: "We offer 24/7 web ticket support, active email channels, and real-time live chat assistance to priority members." },
  { category: "all", question: "Can we request custom feature additions?", answer: "We love client feedback! Customers can submit and vote on feature ideas inside our unified Feedback Portal." }
];

export const BLOGS: BlogPost[] = [
  {
    slug: "automating-b2b-lead-pipeline",
    title: "How to Build a Seamless Automated B2B Lead Funnel in 2026",
    excerpt: "Learn how to link active landing pages with pipeline CRM metrics to drive a 40% growth in target conversions with zero tedious follow-ups.",
    date: "June 08, 2026",
    readTime: "6 min read",
    category: "Sales Strategy",
    author: { name: "Marcus Thorne", role: "VP of Sales Optimization", avatarSeed: "Marcus" },
    content: `Building a modern B2B pipeline requires shifting from manual notes to organized trigger actions. 

### Why Manual Logs Stifle Sales Teams
Sales development representatives often lose up to 10 hours a week switching between personal databases, calendars, and text notes. In a fast-paced market, a lead left unaddressed for over an hour drops in close probability by up to 60%.

### Step 1: Establish Automated Scraping and Enrichment
When a prospect completes a registration form, your CRM should instantly look up company parameters, capital raised, and target size. This prevents your front-line team from spending initial calls asking basic qualification questions, letting them focus on actual pain points instead.

### Step 2: Visual Stages for Clear Focus
Representing conversions like a visual Kanban board (e.g. LeadFlow CRM layout) gives your executive team instant visibility. Dragging elements triggers notifications to client owners, ensuring a standardized and reliable deal journey.

### Step 3: Set automated follow-up sequences
If a client doesn't book a slot within 48 hours, system automation should dispatch a gentle review article or brief video demonstration on credit terms. Keeping an active loop increases conversion margins by up to 30%.`
  },
  {
    slug: "ai-email-best-practices",
    title: "Leveraging Language Models for Inbox Optimization & CTR Growth",
    excerpt: "Blank pages are a thing of the past. Understand how using targeted, contextual prompts yields superior user email performance and higher email open rates.",
    date: "May 24, 2026",
    readTime: "7 min read",
    category: "Marketing Automation",
    author: { name: "Naomi Kiyotaka", role: "Growth Director", avatarSeed: "Naomi" },
    content: `Blowing through budgets on empty newsletters is a common growth trap. Today’s audiences demand hyper-personalized relevance.

### The Problem With Standard Blast Mail
Sending an identical email blast to your entire contact list is a recipe for high unsubscribes and low engagement. Users ignore generic self-promotion.

### Cohort Segmentation Rules
To maximize open rates, divide your database based on actual interactive metrics:
- **Active trialers**: Show setup wizards and custom configuration help.
- **Dormant readers**: Share interesting industry case studies and highlights.
- **Paying enterprise accounts**: Deliver advanced compliance tips and priority feature alerts.

### Write Smarter With Generative Assistants
Using generative AI helps compose variations in seconds. When using tools like MailBoost AI, draft variants of your subject lines with diverse tones and let automated split tests route the winner to the majority of your outreach campaign.`
  },
  {
    slug: "solving-freelancer-cashflow-bottlenecks",
    title: "The Ultimate Guide to Reclaiming Professional Agency Billing Hours",
    excerpt: "Overdue payments stifle business expansion. Explore practical tactics, including automatic dunning patterns and simplified customer checkouts.",
    date: "May 10, 2026",
    readTime: "5 min read",
    category: "Business Finance",
    author: { name: "Elena Rostova", role: "Design Partner", avatarSeed: "Elena" },
    content: `Are you tired of chasing clients for invoices past their due dates? Unpaid balances waste creative energy and restrict your company's growth.

### Setup Immediate Payment Buttons
Do not expect clients to manually transfer funds using complex routing numbers. Embed secure checkouts directly within digital invoices. Giving them immediate card access (e.g. via InvoicePro checkout pages) can speed up invoice collection by up to three times.

### Implement Automatic Dunning Reminders
Avoid the awkwardness of manual follow-up calls by setting up automated reminder schedules:
- **3 Days Before Due Date**: Send a friendly heads up with the invoice link.
- **On Due Date**: Send a quick payment reminder.
- **7 Days Overdue**: Send an escalation notice applying standard late terms.

With automation handling the reminders, you can save valuable hours and focus on delivering great work for your clients.`
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "suite-starter",
    name: "Starter Bundle",
    priceMonthly: 49,
    priceYearly: 39,
    description: "Ideal for solo-founders and freelancers seeking to unify core business operations.",
    features: [
      "Access to any 2 individual SaaS apps",
      "Up to 2,500 active records / leads",
      "Standard client visual analytics templates",
      "Email and community ticket support",
      "SSL custom domain integrations",
      "Secure cloud database backups"
    ],
    ctaText: "Start Starter Bundle"
  },
  {
    id: "suite-pro",
    name: "Growth Suite Plus",
    priceMonthly: 89,
    priceYearly: 69,
    description: "Our most popular package. Full access to our entire 6-SaaS product catalog.",
    isPopular: true,
    features: [
      "Full premium access to all 6 SaaS apps",
      "Unlimited sales pipeline stages & CRM fields",
      "AI text optimizer and subject line builder",
      "Custom branded invoice PDFs & portals",
      "Multi-destination social content publishing",
      "Shared secure team storage (50GB limit)",
      "Priority Customer Support (under 1hr response)"
    ],
    ctaText: "Get Growth Suite Plus"
  },
  {
    id: "suite-enterprise",
    name: "Enterprise Central",
    priceMonthly: 199,
    priceYearly: 149,
    description: "SaaS architecture designed for corporate environments, agencies, and large teams.",
    features: [
      "All 6 apps with unlimited seats configurations",
      "Custom API webhooks and data pipelines",
      "White-labeled domain hosting options",
      "ISO-27001 secure data configurations",
      "SAML / Active Directory SSO support",
      "Dedicated client success account manager",
      "99.9% uptime SLA contract assurance"
    ],
    ctaText: "Adopt Enterprise Central"
  }
];

export const REFUND_POLICY_TEMPLATE = `
# ManageGoal — Refund & Cancellation Policy
**Last Updated: June 10, 2026**

At **ManageGoal**, we strive to design and deliver high-performance, SaaS products that help grow your business. We understand that software needs can adapt, and we want to ensure you are fully confident in your investment.

---

### 1. 14-Day Money-Back Guarantee
We provide a 100% risk-free, **14-day money-back guarantee** on all new SaaS subscription purchases.
- **Eligibility**: To be eligible for a refund, you must submit an official request to our support team within exactly fourteen (14) days of your initial purchase transaction.
- **Calculation**: Approved refunds are issued for the full transaction value of your initial billing.
- **Applicability**: This guarantee applies exclusively to first-time product bundles or individual software purchases. It does not apply to subsequent recurring cycles.

### 2. Subscription Cancellations
You may cancel your active subscription package at any time:
- No cancellation fees or long-term contracts.
- You can cancel easily within your account's billing configuration tab.
- Once cancelled, you will retain access to premium features until your paid billing period concludes.
- No partial refunds are issued for mid-cycle cancellations.

### 3. Non-Refundable Cases
The following charges are exempt from refunds:
- Requests submitted after the 14-day guarantee window.
- Services involving custom API creations or custom dedicated databases once work has started.
- Professional services, tailored setups, or custom migrations as agreed in writing.
- Accounts terminated due to terms of service violations.

### 4. Custom Processing Times
Once approved, refunds are credited back to your original payment method (e.g., Stripe, Paypal, or Card network) within **5 to 10 business days**, depending on your financial institution's processing times.

---

**Have any questions?** Reach out to us at:
- **Email**: payments@managegoal.example.com
- **Help Center**: support.managegoal.example.com
`;

export const PRIVACY_POLICY_TEMPLATE = `
# ManageGoal — Privacy & Security Policy
**Last Updated: June 10, 2026**

Your security and trust are paramount to **ManageGoal**. This Privacy Policy explains how we collect, store, share, and protect your information when you access our platforms, software products, and connected customer services.

---

### 1. Data Collection & Usage
We process information necessary to fulfill our core services:
- **Account Credentials**: Name, email, company, and securely hashed passwords.
- **Billing Details**: Payment transactions are compiled routing through trusted PCI-compliant gateways (such as Stripe). We do not record or view credit card numbers.
- **Integration Metadata**: If you link external pipelines (e.g. databases, SMTP servers), we store only encrypted config tokens securely.
- **Usage Metrics**: Anonymized viewport configurations and telemetry patterns used to optimize performance.

### 2. Cookies & Tracker Guidelines
We use cookies to keep you signed in, remember your preferences, and map marketing pathways:
- **Essential Cookies**: Necessary to authenticate sessions and manage shopping carts securely.
- **Analytics Trackers**: Monitor speed and engagement via GDPR-compliant processors.
- You can manage or disable cookie tracking within your regional browser preferences anytime.

### 3. GDPR & International Compliance
If you reside within the European Economic Area (EEA) or the California region, you maintain specific rights:
- **Access & Portability**: Request a copy of your stored records in CSV format.
- **Rectification & Deletion**: Promptly request corrections or permanent deletion of your data.
- **Processing Objections**: Limit automated analysis of your data.

### 4. Advanced Security Controls
We employ rigorous physical & digital safeguards, including TLS 1.3 transfer protocols, isolated GCP storage, read-only third-party access scopes, and multi-factor sign-on.

---

**Exercise Your Privacy Rights**:
- **Email**: privacy@managegoal.example.com
- **Security Team**: compliance@managegoal.example.com
`;

export const TERMS_CONDITIONS_TEMPLATE = `
# ManageGoal — Terms & Conditions of Service
**Last Updated: June 10, 2026**

Please review these Terms & Conditions carefully. By accessing or subscribing to **ManageGoal** platforms, you agree to be bound by these provisions, creating a legally binding agreement between you and ManageGoal.

---

### 1. Use of Services
- **Eligibility**: You must be at least 18 years of age or act as an authorized representative of a registered business.
- **Account Conduct**: You are solely responsible for maintaining security credentials, active passwords, and for any activities occurring under your team profiles.
- **Lawful Use**: You are prohibited from deploying our software to dispatch unsolicited communications (spam), collect protected records unlawfully, or breach global security rules.

### 2. Subscription Fees & Renewals
- **Pricing**: Subscription packages are billed upfront on a monthly or annual cycle.
- **Auto-Renewal**: Subscriptions auto-renew unless cancelled at least 24 hours prior to the next billing date.
- **Price Revisions**: We reserve the right to revise our rates. Any pricing adjustments will be communicated to you at least 30 days in advance.

### 3. Intellectual Property Rights
- All brand designs, software interfaces, vector code, animations, copy, and icons are the exclusive property of ManageGoal.
- Users retain absolute ownership of all raw documents, lead fields, databases, and assets uploaded to our CRM or analytics platforms.

### 4. Limitation of Liability
ManageGoal is provided "as-is" without warranties of any kind. Under no circumstances shall ManageGoal or its affiliates be liable for indirect, incidental, or consequential damages (including loss of profits) arising from service downtime or coordinate failures.

---

**Contact Legal Counsel**:
- **Email**: legal@managegoal.example.com
`;

export const COOKIE_POLICY_TEMPLATE = `
# ManageGoal — Cookie & Analytics Policy
**Last Updated: June 10, 2026**

This Cookie Policy explains how **ManageGoal** structures browser cookies to ensure instant page load speeds and intuitive dashboard settings.

---

### 1. What Are Cookies?
Cookies are small text documents saved onto your hardware registry when visiting websites. They act as a memory log, enabling websites to remember your credentials and preferences across sessions.

### 2. Cookies We Deploy
- **Essential Authentication (Strictly Necessary)**: Keep you securely logged in to active SaaS workspaces. These cookies expire once you close your browser.
- **Performance & State (Preference Cookies)**: Save interface preferences like theme settings, billing toggle choices, and search filters.
- **Analytics Tracking (Telemetry)**: Monitor anonymous page speeds, loading errors, and click hierarchies to help us improve UI performance.

### 3. Take Control
You can configure your browser to block or warn about all cookie placements. However, disabling essential cookies will prevent our platform from authenticating your sessions and securing your database.

---

**Reach Out: Support Division**
- **Email**: cookies@managegoal.example.com
`;

export const DISCLAIMER_TEMPLATE = `
# ManageGoal — Professional Service Disclaimer
**Last Updated: June 10, 2026**

All information and software utilities hosted on **ManageGoal** are provided strictly for educational and commercial productivity enrichment.

---

### 1. Legal Guidance Disclaimer
The legal policy templates generated under our terms (Privacy, Terms, Refunds) represent standardized baselines. They **MUST** be reviewed and customized to match your actual business practices, jurisdictions, and local compliance regulations before commercial use. Using them does not create an attorney-client relationship.

### 2. Commercial Expectations
While our tools (LeadFlow, MailBoost, AnalyticsHub) are optimized to increase team efficiency:
- Past metrics cannot guarantee identical future growth.
- Conversion gains are highly dependent on your product quality, message relevance, and specific market conditions.

---

**Any further inquiries?**
- **Email**: hello@managegoal.example.com
`;
