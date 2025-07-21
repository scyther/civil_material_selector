# AI-Powered Building Material Selector (India)

A professional web application designed for Indian civil engineers and architects to select optimal construction materials for projects by analyzing constraints and generating detailed comparative reports using AI, specifically tailored for Indian construction industry.

## Features

- **Indian Climate Zone Analysis**: Input detailed project requirements based on Indian climate zones and conditions
- **AI-Powered Material Recommendations**: Get professional material suggestions compliant with Indian standards (NBC 2016, IS Codes)
- **Cost Analysis in INR**: Detailed cost breakdowns in Indian Rupees with current market rates
- **Indian Building Code Compliance**: NBC 2016, IS codes, and seismic zone considerations
- **Monsoon & Climate Considerations**: Material recommendations considering Indian weather patterns
- **Local Supplier Network**: Recommendations for Indian suppliers and brands
- **Professional Reports**: Generate detailed engineering reports with Indian market insights

## Indian-Specific Features

- **Climate Zones**: Hot & Dry, Warm & Humid, Moderate, Cold, Composite, Coastal, Hill Station
- **Budget Ranges**: Economy (₹800-1,500/sq ft) to Luxury (₹4,000+/sq ft)
- **Building Standards**: NBC 2016 compliance, IS codes, seismic zones (I-V)
- **Green Building**: GRIHA/IGBC certification considerations
- **Local Materials**: Focus on locally available materials and Indian brands
- **Monsoon Planning**: Construction timeline considering monsoon seasons

## How to Use

### Prerequisites
1. Obtain a Gemini API key from [Google AI Studio](https://ai.google.dev/aistudio)
2. Create a `.env.local` file in your root directory:
```
GEMINI_API_KEY=[YOUR API KEY]
```

### Installation
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the Building Material Selector.

### Usage
1. **Fill Project Requirements**: Complete the form with your project specifications
   - Project type (residential, commercial, industrial, etc.)
   - Indian climate zone (Hot & Dry, Warm & Humid, etc.)
   - Budget constraints in INR
   - Structural requirements (seismic zone, load requirements)
   - Sustainability goals (GRIHA/IGBC compliance)

2. **Generate Analysis**: Click "Generate Material Analysis Report" to get AI-powered recommendations

3. **Review Report**: Examine the comprehensive material analysis including:
   - Material recommendations by component (with Indian brands)
   - Cost analysis in INR with current market rates
   - Environmental impact assessment for Indian climate
   - Durability considering monsoon and extreme weather
   - Local availability and Indian supplier recommendations
   - NBC 2016 and IS code compliance

4. **Export Report**: Copy the generated report for use in your project documentation

## Target Users (India)

- **Civil Engineers**: Structural material selection with IS code compliance
- **Architects**: Building envelope recommendations for Indian climate
- **Construction Managers**: Cost optimization and procurement planning in India
- **Building Consultants**: Professional material advisory for Indian projects
- **Real Estate Developers**: Material selection for Indian residential and commercial projects

## Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI Integration**: Google Gemini AI for material analysis
- **Deployment**: Vercel-ready configuration

## Professional Disclaimer

This tool provides general recommendations based on Indian building standards (NBC 2016, IS codes) and industry practices. Always consult with licensed Indian professionals and verify local building codes and state-specific regulations before making final material selections. Consider monsoon timing and regional variations in material availability.

## License

Professional use license - suitable for Indian engineering and architectural firms.

