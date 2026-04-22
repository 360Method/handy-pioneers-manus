import express, { type Request, type Response } from "express";
import { createServer } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Temporary intake endpoint for the 360° Priority Translation lead magnet.
 *
 * The canonical backend lives at pro.handypioneers.com and will own parsing,
 * Claude enrichment, portal account creation, and email delivery. Until it is
 * deployed, this fallback:
 *   - Accepts multipart/form-data at /api/priority-translation/submit
 *   - Persists the PDF (if any) to /tmp/priority-translations/<id>.pdf
 *   - Forwards the submission via Resend to help@handypioneers.com (if
 *     RESEND_API_KEY is set), otherwise logs the payload and returns 202.
 *
 * TODO: move to CMS (nucleus) — switch SUBMIT_TARGET to external backend once live.
 */

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || "/tmp/priority-translations");
const INTAKE_RECIPIENT = process.env.INTAKE_RECIPIENT || "help@handypioneers.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

function ensureUploadDir() {
  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.error("[priority-translation] failed to create upload dir", err);
  }
}

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.originalname.toLowerCase().endsWith(".pdf")) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF uploads are accepted"));
    }
  },
});

async function sendIntakeEmail(payload: Record<string, string>, pdf?: Express.Multer.File) {
  if (!RESEND_API_KEY) {
    console.log("[priority-translation] RESEND_API_KEY not set — logging instead");
    console.log("[priority-translation] payload:", payload);
    if (pdf) {
      console.log(`[priority-translation] pdf: ${pdf.originalname} (${pdf.size} bytes)`);
    }
    return { sent: false };
  }

  const lines = Object.entries(payload)
    .filter(([k]) => k !== "consent")
    .map(([k, v]) => `<strong>${k.replace(/_/g, " ")}:</strong> ${escapeHtml(v)}`)
    .join("<br>");

  const body: Record<string, unknown> = {
    from: "Handy Pioneers <noreply@handypioneers.com>",
    to: [INTAKE_RECIPIENT],
    subject: "New 360° Priority Translation request",
    html: `<h2>New Priority Translation submission</h2><p>${lines}</p>`,
  };
  if (pdf) {
    body.attachments = [
      { filename: pdf.originalname, content: pdf.buffer.toString("base64") },
    ];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("[priority-translation] Resend error", res.status, text);
    return { sent: false, error: text };
  }
  return { sent: true };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function startServer() {
  ensureUploadDir();
  const app = express();
  const server = createServer(app);

  // ─── JSON + CORS for cross-origin intake (future backend will own this) ──
  app.use(express.json({ limit: "1mb" }));
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
    next();
  });

  // ─── Priority Translation intake (fallback) ──────────────────────────────
  app.post(
    "/api/priority-translation/submit",
    uploader.single("report_pdf"),
    async (req: Request, res: Response) => {
      try {
        const id = randomUUID();
        const fields = req.body as Record<string, string>;
        const pdf = (req as Request & { file?: Express.Multer.File }).file;

        if (pdf) {
          const savePath = path.join(UPLOAD_DIR, `${id}.pdf`);
          try {
            fs.writeFileSync(savePath, pdf.buffer);
          } catch (err) {
            console.error("[priority-translation] failed to persist pdf", err);
          }
        }

        const emailResult = await sendIntakeEmail(fields, pdf);

        res.status(200).json({
          id,
          status: "received_via_fallback",
          emailed: emailResult.sent,
          note: "Canonical backend not yet connected. Submission queued via manus fallback.",
        });
      } catch (err) {
        console.error("[priority-translation] submit error", err);
        res
          .status(500)
          .json({ error: "Unable to accept submission. Please email help@handypioneers.com." });
      }
    }
  );

  // ─── Static SPA ──────────────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
