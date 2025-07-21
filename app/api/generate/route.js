import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const data = await req.json()
        const enhancedPrompt = `
            You are a senior building materials consultant with 20+ years of experience in Indian construction industry, architecture, and engineering. You have deep knowledge of Indian building codes, climate conditions, local materials, and construction practices.
            
            ${data.body}
            
            Please provide a comprehensive, professional material analysis report specifically for Indian construction market that includes:

            1. **Executive Summary**
               - Key recommendations overview tailored for Indian conditions
               - Cost estimate summary in INR
               - Timeline overview considering Indian market dynamics

            2. **Recommended Materials by Component (Indian Context)**
               - Foundation materials (3 options: considering monsoon, soil conditions, local availability)
               - Structural materials (3 options: steel grades per IS codes, cement types, concrete grades)
               - Roofing materials (3 options: monsoon-resistant, heat-reflective, cost-effective)
               - Insulation materials (3 options: climate-appropriate, energy-efficient, affordable)
               - Exterior finishing (3 options: weather-resistant, maintenance-friendly, aesthetic)
               - Interior materials (3 options: humidity-resistant, cost-effective, locally available)

            3. **Cost Analysis (Indian Market)**
               - Material cost breakdown in INR per unit
               - Labor cost considerations (skilled vs unskilled)
               - Transportation costs within India
               - Total project cost estimate with 10-15% contingency
               - Cost comparison with market alternatives

            4. **Environmental Impact Assessment (Indian Climate)**
               - Carbon footprint analysis
               - Energy efficiency ratings (BEE standards)
               - Monsoon and extreme weather resistance
               - Thermal performance in Indian climate zones
               - End-of-life disposal considerations

            5. **Durability & Maintenance (Indian Conditions)**
               - Expected lifespan in Indian climate (monsoon, heat, humidity)
               - Maintenance requirements and frequency
               - Warranty information from Indian suppliers
               - Long-term cost implications including maintenance
               - Resistance to common Indian problems (termites, moisture, etc.)

            6. **Local Considerations (India-Specific)**
               - NBC 2016 compliance and relevant IS codes
               - State-specific building bylaws
               - Local supplier recommendations (major cities)
               - Regional material preferences and availability
               - Seismic zone considerations (Zone I-V)
               - Climate zone specific requirements

            7. **Procurement Timeline (Indian Market)**
               - Lead times for each material in Indian market
               - Seasonal availability considerations (monsoon impact)
               - Supply chain considerations across different states
               - Import dependency and alternatives

            8. **Professional Recommendations (Indian Best Practices)**
               - Top 3 overall material combinations for Indian conditions
               - Risk mitigation strategies for monsoon and extreme weather
               - Quality assurance recommendations
               - Local contractor and supplier network suggestions
               - GRIHA/IGBC green building compliance options

            Include specific Indian brand names, IS codes, NBC references, and current market rates in INR. Consider regional variations and local construction practices.
        `;

        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        const code = await response.text()

        return NextResponse.json({code: code})
    } catch (error) {
        console.error('Error generating material analysis:', error);
        return NextResponse.json(
            { error: 'Failed to generate material analysis report' }, 
            { status: 500 }
        );
    }
}