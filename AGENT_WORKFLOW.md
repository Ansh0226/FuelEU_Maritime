# 🤖 AI Agent Contribution Log

This document highlights **how AI tools assisted** during the development of the **FuelEU Maritime Compliance Platform**.  
Purpose: Maintain transparency and clearly state the role of AI in coding and decision-making.

---

## ⚙️ AI Tools Used

| AI Tool | Role | Area of Use |
|--------|------|-------------|
| **ChatGPT (GPT-5)** | Main coding + logic assistant | API routes, Prisma schema, UI explanations, optimization suggestions |
| **GitHub Copilot** | Inline auto-completion | TypeScript boilerplate, repetitive JSX patterns, small refactors |
| **Cursor / VSCode Agent** *(optional)* | Code clean-up & type hints | Auto-formatting, quick fix suggestions |
| **Claude (If used)** | Clarification assistant | Understanding regulatory and compliance logic |

---

## 🧩 Prompt → Output → Human Adjustment

### 🧠 1) Backend — Route Comparison Logic
**Prompt Given:**  
> “Create a comparison API that returns baseline route vs comparison route + percentage difference + compliance flag.”

**AI Generated:**
- Prisma query to fetch baseline + compared set.
- Formula applied:  
  `percent = ((compare / baseline) - 1) × 100`
- `isCompliant = percent <= target`

**Manual Revisions:**
- Renamed internal variables for clarity.
- Added error handling for missing baseline values.
- Improved returned response structure.

---

### 🧠 2) Frontend — Compare View Component
**Prompt Given:**  
> “Build a Compare tab UI with Recharts bar graph using React + TS + Tailwind.”

**AI Output:**
- Ready-to-use component with `<BarChart>`, `<Tooltip>`, `<Legend>`.

**Manual Edits:**
- Adjusted TypeScript interfaces.
- Added empty state fallback message.
- Updated color scheme for better readability.

---

### 🧠 3) Prisma Database URL Issue
**Prompt Given:**  
> “DATABASE_URL not detected while running prisma generate.”

**AI Suggested Fix:**

- Identified missing env variable in Windows shell.
- Suggested command:  
  `set DATABASE_URL=postgresql://postgres:Ayush%40123@localhost:5432/fueleu?schema=public`

**Manual Verification:**
- Confirmed fix.
- Added `.env` file for permanent storage.

---

## 🧪 Validation / Fix Summary

| Issue Faced | AI Suggested | Final Correction |
|-------------|-------------|-----------------|
| Node type error in TS | Install `@types/node` | Added in `tsconfig.json` types array |
| Incorrect service import paths | Use relative imports | Standardized using project root alias |
| Compare view not showing data initially | Add loading / empty state | Added conditional UI render |
| CORS blocked API calls | Enable CORS middleware | Added `app.use(cors({ origin: "*" }))` |

---

## 📊 Observations

### 👍 Helpful Contributions
- Faster scaffolding of backend routes and UI layout.
- Maintained consistent code style throughout the project.
- Helped reduce trial-and-error setup time.

### ⚠️ Required Human Review
- TypeScript generics and strict-mode checks.
- Actual compliance logic verification.
- Testing route outputs with real sample data.

---

## 🧭 Development Flow Summary

1. Brainstorm/logic discussed using **ChatGPT**.
2. Base code and UI prepared using **Copilot inline suggestions**.
3. Code was tested and corrected **manually**.
4. Commits were made **module-by-module** for clarity.


### 👍 Where AI Helped
- Saved **60–70%** of setup time for scaffolding.
- Helped generate clean, consistent TypeScript boilerplate.
- Provided architectural clarity for **Hexagonal pattern**.
- Suggested fixes for Prisma + Node env issues quickly.

### ⚠️ Where AI Failed / Needed Review
- Occasionally suggested invalid import paths.
- Missed minor syntax issues with async handlers.
- Generated redundant DB query code that needed refactoring.



---

## 🧠 Best Practices Followed

✅ Used ChatGPT for architectural planning (not direct copy-paste).  
✅ Used Copilot inline only for boilerplate.  
✅ Tested each feature (backend + frontend) after agent assistance.  
✅ Wrote commits per feature (`Routes`, `Compare`, `Banking`, `Pooling`).  
✅ Documented all agent interactions transparently.  

---

## 🧭 Summary

AI agents significantly improved productivity and structure but did not replace human decision-making.  
Every generated output was **reviewed, validated, and corrected** before commit.  
The result is a hybrid AI-assisted yet human-validated engineering workflow.

---

✍️ **Author:** *Ansh Rathore*  
🎓 MCA — MNNIT Allahabad  
📅 November 2025
