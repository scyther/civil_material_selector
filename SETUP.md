# Development Setup Instructions

## AI-Powered Building Material Selector

### Prerequisites
- Node.js 18+ installed
- Google Gemini API key (from https://ai.google.dev/aistudio)

### Quick Setup
1. Clone the repository
2. Copy `.env.example` to `.env.local`
3. Add your Gemini API key to `.env.local`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

### Environment Variables
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Project Structure
```
app/
├── api/generate/route.js     # AI material analysis endpoint
├── components/
│   ├── MaterialReport.jsx    # Report display component
│   └── ProjectSummary.jsx    # Project specs summary
├── globals.css               # Professional styling
├── layout.js                 # App layout and metadata
└── page.js                   # Main application page
```

### Features Implemented
- ✅ Professional project requirement forms
- ✅ AI-powered material analysis
- ✅ Comprehensive reporting system
- ✅ Cost and environmental analysis
- ✅ Professional styling and UX
- ✅ Export functionality

### Target Users
- Civil Engineers
- Architects
- Construction Managers
- Building Consultants

### Production Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Ensure environment variables are configured in production

### Support
For professional support and customization, contact the development team.
