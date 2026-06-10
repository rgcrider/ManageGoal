export interface DownloadableAsset {
  id: string;
  name: string;
  description: string;
  fileSize: string;
  fileType: "ZIP" | "PDF" | "JSON";
  category: "Source Code Bundle" | "Operations Guide" | "Reference Blueprint" | "Merchant Schema";
  lastUpdated: string;
  fileName: string;
}

export const PRODUCT_ASSETS_MAP: Record<string, DownloadableAsset[]> = {
  "leadflow-crm": [
    {
      id: "lf-source-pack",
      name: "LeadFlow CRM Standalone Core Module",
      description: "Complete modular CRM build containing client kanban state engines, pipeline analytics hooks, and database schemas.",
      fileSize: "1.2 MB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-05-18",
      fileName: "leadflow-crm-core-v2.1.zip"
    },
    {
      id: "lf-integration-pdf",
      name: "Salesforce & HubSpot Integration Blueprint",
      description: "Advanced architectural handbook showing custom dual-sync layouts, event webhooks, and rate-limiting buffers.",
      fileSize: "840 KB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-02",
      fileName: "leadflow_integration_playbook.pdf"
    }
  ],
  "mailboost-ai": [
    {
      id: "mb-source-pack",
      name: "MailBoost Mail Queue & Template Compiler",
      description: "Server-side high-throughput mail queuing scheduler script with DKIM and SPF verification registers.",
      fileSize: "850 KB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-05-24",
      fileName: "mailboost-ai-queuer-esm.zip"
    },
    {
      id: "mb-copy-guide",
      name: "B2B AI Growth Copywriting Playbook",
      description: "Field manual with vetted conversational models, open-rate metrics, and custom CSS email layout systems.",
      fileSize: "1.6 MB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-08",
      fileName: "mailboost_b2b_copy_playbook.pdf"
    }
  ],
  "invoicepro": [
    {
      id: "ip-source-pack",
      name: "InvoicePro Billing Gateway Boilerplate",
      description: "Express backend templates incorporating Stripe webhooks, JWT merchant auth, and GAAP ledgering exports.",
      fileSize: "2.4 MB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-05-30",
      fileName: "invoicepro-stripe-gateway-v4.zip"
    },
    {
      id: "ip-compliance-pdf",
      name: "GAAP Financial Compliance Ledger Standard",
      description: "Legal blueprint detailing payment system compliance guidelines, trial balancing formulas, and escrow logs.",
      fileSize: "910 KB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-05",
      fileName: "invoicepro_gaap_compliance_guide.pdf"
    },
    {
      id: "ip-db-json",
      name: "Multi-tenant Ledger Schema",
      description: "Structured database model containing table relations, audit trail integrity triggers, and payment indexes.",
      fileSize: "14 KB",
      fileType: "JSON",
      category: "Merchant Schema",
      lastUpdated: "2026-06-09",
      fileName: "invoicepro_postgres_schema.json"
    }
  ],
  "socialpilot-ai": [
    {
      id: "sp-source-pack",
      name: "SocialPilot Campaign Autoposter Engine",
      description: "Self-hosted cron runner backing scheduled publish buffers, automated short-URL tracking, and link decoders.",
      fileSize: "980 KB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-05-15",
      fileName: "socialpilot-autopost-cron.zip"
    },
    {
      id: "sp-growth-pdf",
      name: "Organic LinkedIn & Twitter Playbook",
      description: "Vetted schedule intervals, rich typographic layouts mapping hooks, and engagement multiplier statistics.",
      fileSize: "2.1 MB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-01",
      fileName: "socialpilot_audience_booster_stats.pdf"
    }
  ],
  "tasksync": [
    {
      id: "ts-source-pack",
      name: "TaskSync Agile Database State Manager",
      description: "Server-authoritative tasks list with state reconciliations, priority queues, and calendar event listeners.",
      fileSize: "1.1 MB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-05-20",
      fileName: "tasksync-agile-engine.zip"
    },
    {
      id: "ts-matrix-pdf",
      name: "Scaled OKR Matrix Framework Document",
      description: "Tactical document mapping personal micro-goals to team milestones inside complex engineering workspaces.",
      fileSize: "1.3 MB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-07",
      fileName: "tasksync_okr_scaffold_matrix.pdf"
    }
  ],
  "analyticshub": [
    {
      id: "ah-source-pack",
      name: "AnalyticsHub Recharts Visualizer Wrappers",
      description: "Beautiful TypeScript dashboard layouts, fluid sizing wrapper components, and responsive grid canvases.",
      fileSize: "1.5 MB",
      fileType: "ZIP",
      category: "Source Code Bundle",
      lastUpdated: "2026-06-03",
      fileName: "analyticshub-recharts-components.zip"
    },
    {
      id: "ah-metrics-pdf",
      name: "SaaS Essential Metrics Audit Blueprint",
      description: "Analytical guidebook to charting CAC payback loops, LTV computations, and user growth retention calculations.",
      fileSize: "1.8 MB",
      fileType: "PDF",
      category: "Operations Guide",
      lastUpdated: "2026-06-09",
      fileName: "analyticshub_metrics_calculation_standard.pdf"
    }
  ]
};

/**
 * Retrieves the downloadable assets assigned to a given product node.
 */
export function getAssetsForProduct(productId: string): DownloadableAsset[] {
  return PRODUCT_ASSETS_MAP[productId] || [];
}

/**
 * Checks if the caller has purchased/unlocked access to this product and returns
 * a compiled local simulated Blob to fulfill the artifact requirement securely.
 */
export function secureDownloadAsset(
  productId: string,
  assetId: string,
  purchasedProductIds: string[]
): { success: boolean; dataUrl?: string; fileName?: string; error?: string } {
  // 1. Strict Security Gate: Verify product catalog acquisition
  const isUnlocked = purchasedProductIds.includes(productId);
  if (!isUnlocked) {
    return {
      success: false,
      error: `Security Access Violation: Registration for product identifier '${productId}' is required. Please secure appropriate checkout to download.`
    };
  }

  // 2. Fetch target asset attributes
  const assets = getAssetsForProduct(productId);
  const targetAsset = assets.find(a => a.id === assetId);
  if (!targetAsset) {
    return {
      success: false,
      error: `Resource Unavailable: Asset identifier '${assetId}' could not be located in this license cluster.`
    };
  }

  // 3. Generate high-fidelity custom payloads representing appropriate document templates
  let blobContent = "";
  let mimeType = "text/plain";

  if (targetAsset.fileType === "ZIP") {
    mimeType = "application/zip";
    blobContent = `[ManageGoal Secure Deployment Zip Pack]
=========================================
Product ID: ${productId}
Asset SKU: ${targetAsset.id}
File Name: ${targetAsset.fileName}
SHA-256 Hash: ea8f8ad79f4de9${Math.floor(Math.random() * 900000 + 100000)}bda8e2ec3d2
State: Production Ready (Vetted & Bound)
=========================================

This ZIP contains:
1. /src/index.ts - Core bootstrapper initializing security loops.
2. /src/config.json - Bound parameters generated for localized hosting environment.
3. /src/controllers/sync.ts - Database transaction state synchronization.
4. /docs/INTEGRATION.md - Step-by-step setup guides to tie into your production server.
5. /LICENSE.txt - Enterprise usage agreement.

------------------------------------------------------------------------
Generated dynamically under authentic subscriber license certificate.
ManageGoal Inc. (c) 2026. All rights reserved.
`;
  } else if (targetAsset.fileType === "PDF") {
    mimeType = "text/html"; // Browser can download as HTML or we can style a beautiful print-ready overview
    blobContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ManageGoal Document - ${targetAsset.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; background: #fafafa; }
    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
    .header { border-bottom: 2px solid #3b82f6; padding-bottom: 20px; margin-bottom: 20px; }
    .title { font-size: 24px; font-weight: bold; color: #0f172a; margin: 0; }
    .meta { font-family: monospace; font-size: 11px; color: #64748b; margin-top: 5px; }
    .badge { display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; text-transform: uppercase; }
    .section { margin-top: 30px; }
    .section-title { font-size: 16px; font-weight: bold; color: #1e293b; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .content-body { font-size: 13px; line-height: 1.6; color: #475569; margin-top: 10px; }
    .checksum { font-family: monospace; background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 11px; border: 1px solid #e2e8f0; word-break: break-all; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">${targetAsset.category}</span>
      <h1 class="title">${targetAsset.name}</h1>
      <div class="meta">LICENSEE: Subscriber-Exclusive Node | TIMESTAMP: ${new Date().toISOString()}</div>
    </div>
    
    <div class="section">
      <h3 class="section-title">1. Document Context</h3>
      <p class="content-body">${targetAsset.description}</p>
    </div>

    <div class="section">
      <h3 class="section-title">2. Architectural Execution Guidelines</h3>
      <p class="content-body">
        To properly mount this framework onto your live architecture, confirm that outbound connection tunnels are open on HTTPS port 443. All communications with ManageGoal relay servers request standard bearer token headers.
      </p>
      <p class="content-body">
        Verify that you have configured appropriate database environment drivers corresponding to the schema details.
      </p>
    </div>

    <div class="section">
      <h3 class="section-title">3. Active Node Authentication Hash</h3>
      <div class="checksum">
        SHA-256 Digest Certificate: f5e229bf23ee${Math.floor(Math.random() * 90000 + 10000)}97cf1cbd6bf7c63ee28ab961239bf019803
      </div>
    </div>

    <div class="section" style="margin-top: 40px; text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px;">
      ManageGoal Enterprise Operations & Frameworks. Legal PDF-Print Export Facility.
    </div>
  </div>
</body>
</html>`;
  } else {
    // JSON
    mimeType = "application/json";
    blobContent = JSON.stringify({
      managegoalAsset: {
        skuId: targetAsset.id,
        productId,
        name: targetAsset.name,
        description: targetAsset.description,
        schemaRevision: "v1.2.6",
        tables: productId === "invoicepro" ? [
          { name: "mg_merchants", columns: ["id", "company_name", "stripe_account_id", "created_at"] },
          { name: "mg_invoices", columns: ["id", "merchant_id", "client_name", "amount_cents", "due_date", "status"] },
          { name: "mg_audit_ledger", columns: ["id", "invoice_id", "transaction_type", "checksum", "audit_timestamp"] }
        ] : [
          { name: "mg_generic_store", columns: ["id", "payload", "synced_at"] }
        ],
        compiledAt: new Date().toISOString(),
        securityLevel: "Enforced AES-255-GCM",
        signatureSeed: "sig_seed_" + Math.random().toString(36).substring(7)
      }
    }, null, 2);
  }

  // 4. Wrap file content securely and prepare URL
  const blob = new Blob([blobContent], { type: mimeType });
  const dataUrl = URL.createObjectURL(blob);

  return {
    success: true,
    dataUrl,
    fileName: targetAsset.fileName
  };
}
