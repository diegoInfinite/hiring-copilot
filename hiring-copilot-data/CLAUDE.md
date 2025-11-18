# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Hiring Copilot** is an AI-powered recruitment platform that automates candidate evaluation, interview question generation, and skill assessment. The system consists of:
- **Backend**: ASP.NET Core 8 (.NET 8) with Clean Architecture
- **Frontend**: React 19 + TypeScript + Vite
- **Data Processing**: Python-based AI service (planned migration to backend)

This repository (`hiring-copilot-data`) contains the Python-based AI service proof-of-concept and planned architecture.

## Repository Context

This is part of a multi-repo project:
- `hiring-copilot-backend/` - ASP.NET Core API (sibling directory)
- `hiring-copilot-frontend/` - React application (sibling directory)
- `hiring-copilot-data/` - THIS REPO: AI service architecture planning

## Tech Stack (This Repo)

- **Language**: Python 3.x
- **AI Integration**: Google Gemini API (google-genai)
- **Document Processing**: PDFPlumber
- **Planned Framework**: FastAPI/Flask (not yet implemented)

## Common Commands

### Python Development
```bash
# Install dependencies (when requirements.txt exists)
pip install -r requirements.txt

# Current PoC
pip install google-genai python-dotenv pdfplumber
python Nicholas/filterTest.py
```

### Related Commands (From Sibling Repos)

Backend (run from `../hiring-copilot-backend/`):
```bash
dotnet build HiringCopilot.sln
dotnet run --project Api/Api.csproj
dotnet ef migrations add <Name> --project Infrastructure
dotnet ef database update --project Infrastructure
```

Frontend (run from `../hiring-copilot-frontend/`):
```bash
npm install
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
```

## Architecture

### Planned Structure (from data.md)

The `data.md` file defines a comprehensive FastAPI-based AI service architecture:

```
app/
├── api/v1/
│   ├── routes_evaluation.py   # Candidate scoring + feedback
│   ├── routes_questions.py    # Interview question generation
│   ├── routes_assessments.py  # Technical assessment generation
│   └── routes_health.py       # Health checks
├── core/
│   ├── config.py
│   ├── logging_config.py
│   └── errors.py
├── models/
│   ├── schemas_evaluation.py
│   ├── schemas_questions.py
│   ├── schemas_assessments.py
│   └── domain.py              # Shared models (JobKeyInfo, CvKeyInfo)
├── services/
│   ├── job_posting_extractor.py
│   ├── cv_extractor.py
│   ├── matching_service.py
│   ├── scoring_service.py
│   ├── feedback_service.py
│   ├── evaluation_pipeline.py
│   ├── questions_service.py
│   ├── assessments_service.py
│   ├── llm_evaluation_client.py
│   ├── llm_questions_client.py
│   └── llm_assessments_client.py
└── utils/
    ├── text_cleaning.py
    ├── pdf_reader.py
    └── docx_reader.py
```

### Service Architecture Pattern

This AI service follows a **pipeline architecture**:

1. **Extraction Layer**: Extract structured data from job descriptions and CVs
2. **Matching Layer**: Compare candidate qualifications against job requirements
3. **Scoring Layer**: Quantify candidate fit
4. **Generation Layer**: Create interview questions and assessments
5. **LLM Client Layer**: Abstract different AI models for different tasks

Each "model" (evaluation, questions, assessments) has:
- Dedicated route handlers
- Specific request/response schemas
- Specialized LLM client (allows different AI models per task)
- Service/pipeline orchestrating the workflow

### Integration with Backend

The backend (`hiring-copilot-backend`) stores results in PostgreSQL:
- **AiAnalysis** entity: Stores JD analysis, CV analysis, gap analysis (JSONB)
- **InterviewQuestion** entity: Generated interview questions (JSONB)
- **Assignment** entity: Generated technical assessments (JSONB)

AI service should POST results to backend API endpoints, which persist to database.

## Current State vs Planned

**Current Reality**:
- Only `app/__init__.py`, `app/main.py`, and route stubs exist
- Proof-of-concept in `Nicholas/filterTest.py` demonstrates Gemini API integration
- No FastAPI implementation yet
- Core services not implemented

**Implementation Priority** (when building):
1. Start with `evaluation_pipeline.py` - Core candidate scoring
2. Implement extractors (`job_posting_extractor.py`, `cv_extractor.py`)
3. Build LLM clients with proper error handling and retries
4. Add interview question generation
5. Add assessment generation last

## Backend Domain Entities (Reference)

When building AI service endpoints, structure responses to match backend entities:

```csharp
// AiAnalysis.cs
public Guid Id { get; set; }
public Guid ApplicationId { get; set; }
public JsonDocument JobDescriptionAnalysis { get; set; }  // JSONB
public JsonDocument CvAnalysis { get; set; }              // JSONB
public JsonDocument GapAnalysis { get; set; }             // JSONB
public decimal CompatibilityScore { get; set; }
public DateTime AnalyzedAt { get; set; }
```

Ensure JSON structures from AI service match expected JSONB schema in backend.

## Development Workflow

### Git Branch Strategy
- **main**: Production branch
- **dev**: Integration/testing branch
- **diego** (current): Personal development branch

Personal branch naming: `FirstName_LastName-ISSUE_NUMBER-MODULE`

### PR Process
1. Work on feature in personal branch
2. Create PR to `dev` (requires Diego + 1 other approval)
3. After group testing: `dev` → `main`

## Key Considerations

### Security
- Never commit `.env` files with API keys
- Use environment variables for Gemini API keys
- Validate all file uploads (size limits, type checking)

### AI Integration
- Current PoC uses Google Gemini API
- LLM clients should support:
  - Retry logic with exponential backoff
  - Token limit handling
  - Cost tracking/logging
  - Multiple model support (GPT-4, Claude, Gemini)

### Document Processing
- PDFPlumber for PDF extraction (currently used in PoC)
- Plan for DOCX support (python-docx)
- Handle malformed documents gracefully

### Error Handling
- API should return structured errors following backend conventions
- Log all LLM API calls for debugging and cost analysis
- Handle rate limits from AI providers

## Critical TODOs

When implementing the planned architecture:
1. Set up FastAPI with proper dependency injection
2. Implement shared extractors before building pipelines
3. Create LLM client abstraction layer (don't hardcode Gemini)
4. Add request validation with Pydantic schemas
5. Implement proper logging (structured logs for production)
6. Add health checks that verify AI API connectivity
7. Create integration tests with mocked LLM responses

## File Naming Conventions
- Python modules: snake_case (e.g., `evaluation_pipeline.py`)
- Classes: PascalCase (e.g., `JobPostingExtractor`)
- Functions: snake_case (e.g., `extract_key_info()`)
