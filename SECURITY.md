# Síkat-Aurora Security & Compliance Policy

This document outlines the security architecture, data protection policies, and secure development practices enforced across the Síkat-Aurora Inc. public website (`apps/website`).

---

## 1. Content Security Policy (CSP) & Fine-Tuning

### Implementation
Content Security Policy (CSP) is enabled across both HTML `<meta>` tags and HTTP response headers (`_headers` and `vercel.json`).

- **Report-Only Mode**: Initial header deployment utilizes `Content-Security-Policy-Report-Only` alongside `Content-Security-Policy` to log policy violations without breaking legacy third-party scripts.
- **Enforced Policy Directive**:
  ```http
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https:;
  connect-src 'self' https: wss:;
  frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com;
  object-src 'none';
  base-uri 'self';
  ```

---

## 2. Browser-Level Security Headers

All static hosting servers and meta tags enforce the following mandatory HTTP security headers:

| Security Header | Configured Value | Security Function |
| :--- | :--- | :--- |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME-type spoofing & content sniffing |
| `X-Frame-Options` | `DENY` | Mitigates framing & clickjacking attacks |
| `Referrer-Policy` | `no-referrer-when-downgrade` | Prevents referrer leakage over insecure connections |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Forces encrypted HTTPS connections |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` | Disables unauthorized browser hardware APIs |

---

## 3. Dependency Auditing & Patching

- **Automated Vulnerability Scans**: Run `npm audit` on a weekly schedule.
- **Dependency Upgrades**: Keep core dependencies (`react`, `react-dom`, `framer-motion`, `lucide-react`, `vite`) updated to patched releases.
- **Supply Chain Protection**: Avoid unverified third-party CDN scripts in production HTML templates.

---

## 4. Comprehensive Data Privacy & Data Minimization

- **Regulatory Compliance**: Built in accordance with Republic Act No. 10173 (Philippines Data Privacy Act of 2012), GDPR, and CCPA.
- **Data Minimization**: Only collect fields strictly necessary for volunteer processing or donation receipts.
- **Privacy Policy**: Accessible at `/privacy` detailing user rights, data access, correction, deletion, and DPO contacts.

---

## 5. Secure PCI DSS Payment Processing

- **Third-Party Payment Gateway**: All online monetary contributions use **PayMongo**, a PCI DSS Level 1 certified payment processor.
- **Zero Card Handling**: Credit card numbers, CVVs, GCash PINs, Maya passwords, and banking credentials **never touch or store on Síkat-Aurora servers**.

---

## 6. Periodic Security Assessments & Penetration Testing

- **Quarterly Audits**: Perform automated vulnerability scans and static code analysis.
- **Penetration Testing**: Conduct annual third-party security audits targeting authentication, API endpoints, and CSP bypass vulnerabilities.

---

## 7. Secure Coding Guidelines for Developers

1. **Input Sanitization**: Always pass raw text through `sanitizeInput()` and validate email structures via `isValidEmail()`.
2. **Context-Aware Encoding**: Never use `dangerouslySetInnerHTML` for untrusted user inputs.
3. **Secret Management**: Never hardcode secret API keys or private credentials in client-side code. Use environment variables (`.env`).
4. **Link Security**: Always specify `rel="noreferrer"` on external links target `_blank`.
