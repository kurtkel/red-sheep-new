# Church Psychosocial Risk Assessment Tool

A comprehensive web-based psychosocial risk assessment tool designed specifically for churches and Christian organisations. This tool enables dual assessments from both leaders and staff perspectives, providing gap analysis to identify areas of workplace wellbeing that need attention.

## Features

### Core Functionality
- **Dual Assessments**: Separate survey versions for leaders and staff members
- **30 Comprehensive Questions**: Covering 9 thematic sections of workplace wellbeing
- **7-Point Likert Scale**: Detailed response options from "Strongly Disagree" to "Strongly Agree"
- **Progress Tracking**: Visual progress indicator and question navigation
- **Anonymous Responses**: Confidential data collection with no individual tracking

### Analysis & Reporting
- **Gap Analysis**: Compare leader perceptions vs staff experiences
- **Risk Level Assessment**: Automatic categorization into high, moderate, and low risk areas
- **Visual Dashboards**: Interactive charts and graphs using Recharts
- **Section-Level Analysis**: View results by thematic section
- **Priority Identification**: Automatically highlight areas requiring immediate attention
- **CSV Export**: Export complete results for further analysis

### User Interface
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Dark Mode Support**: Automatic dark mode support
- **Accessible**: ARIA labels and keyboard navigation
- **Professional Appearance**: Clean, calming design suitable for church context

## Assessment Sections

1. **Job Demands & Expectations** (4 questions)
2. **Role Clarity & Organisational Justice** (4 questions)
3. **Control & Autonomy** (3 questions)
4. **Support & Recognition** (4 questions)
5. **Relationships & Harmful Behaviours** (3 questions)
6. **Ministry-Specific Factors** (4 questions)
7. **Trauma & Emotional Demands** (2 questions)
8. **Work-Life Integration** (2 questions)
9. **Trust & Psychological Safety** (4 questions)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Database**: JSON-based file storage (easily upgradable to PostgreSQL/SQLite)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd red-sheep-new
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes
│   │   ├── analysis/       # Analysis endpoint
│   │   ├── export/         # CSV export endpoint
│   │   └── survey/         # Survey submission endpoint
│   ├── survey/
│   │   ├── [role]/         # Dynamic survey route (leader/staff)
│   │   └── complete/       # Completion page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── lib/
│   ├── analysis.ts         # Gap analysis and risk calculations
│   ├── db.ts               # Database operations
│   └── questions.ts        # Survey questions data
└── data/                   # JSON database files (auto-created)
    ├── surveys.json
    └── responses.json
```

## Usage Guide

### For Respondents

1. Visit the homepage
2. Select your role (Leader/Manager or Staff/Team Member)
3. Complete all 30 questions
4. Use the navigation buttons to move between questions
5. Track your progress with the visual indicators
6. Submit your responses

### For Administrators

1. Navigate to `/admin` or click "Admin Dashboard" from the homepage
2. View overall statistics and insights
3. Switch between different views:
   - **Overview**: Key statistics and top priority areas
   - **By Section**: Analysis grouped by thematic sections
   - **All Questions**: Detailed table of all questions
4. Export results to CSV for further analysis

## Risk Level Definitions

The tool automatically categorizes each question into risk levels:

- **High Risk**: Staff scores ≤3 AND gap ≥2 points
  - Requires immediate attention
- **Moderate Risk**: Staff scores 3-4 OR gap 1-2 points
  - Should be monitored and improved
- **Low Risk**: Staff scores ≥5 AND gap <1 point
  - Indicates healthy practices

## Data Storage

The application uses JSON-based file storage for simplicity:
- `data/surveys.json`: Survey metadata
- `data/responses.json`: Individual question responses

### Upgrading to a Database

To upgrade to PostgreSQL or SQLite:

1. Install database dependencies:
```bash
npm install @prisma/client
```

2. Update the Prisma schema in `prisma/schema.prisma`
3. Replace the JSON database functions in `src/lib/db.ts` with Prisma calls
4. Run migrations:
```bash
npx prisma migrate dev
```

## Privacy & Ethics

- All responses are anonymous by default
- No individual tracking or identification
- Aggregate analysis only
- Secure data storage
- GDPR/privacy-compliant design

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

### Other Platforms

The application can be deployed to any Node.js hosting platform:
- Railway
- Render
- AWS
- Digital Ocean
- Self-hosted

## Configuration

### Organisation Name (Optional)

To enable organisation tracking, modify the survey submission to include an organisation identifier.

### Customizing Questions

Edit `src/lib/questions.ts` to modify questions, sections, or scale labels.

### Styling

Tailwind CSS configuration can be modified in `tailwind.config.js`.

## Future Enhancements

Potential additions for future versions:
- PDF report generation
- Email notifications
- Multi-organisation support with separate dashboards
- Longitudinal tracking (compare over time)
- Recommendation engine
- Integration with church management systems
- Advanced filtering and segmentation
- Custom question builder

## Support & Documentation

For issues, questions, or contributions, please refer to the project repository.

## License

[Add your license information here]

## Acknowledgments

This tool is designed to help churches and Christian organisations create healthier, more supportive workplaces that honor both leaders and staff members.

---

**Note**: This tool is for informational purposes and should be used as part of a comprehensive workplace wellbeing strategy. For serious workplace issues, please consult with appropriate professionals.
