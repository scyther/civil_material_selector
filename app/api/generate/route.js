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
            
            Please provide a comprehensive, professional material analysis report specifically for Indian construction market in strict JSON format. Return ONLY valid JSON with the following structure:

            {
                "executiveSummary": {
                    "keyRecommendations": ["recommendation1", "recommendation2", "recommendation3"],
                    "totalCostEstimate": "₹XX,XX,XXX",
                    "timelineOverview": "X-Y months",
                    "climateSuitability": "description"
                },
                "recommendedMaterials": {
                    "foundation": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "benefits": ["benefit1", "benefit2"],
                            "isCodes": ["IS XXXX", "NBC 2016"]
                        }
                    ],
                    "structural": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "benefits": ["benefit1", "benefit2"],
                            "isCodes": ["IS XXXX"]
                        }
                    ],
                    "roofing": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "benefits": ["benefit1", "benefit2"],
                            "monsoonResistance": "High/Medium/Low"
                        }
                    ],
                    "insulation": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "thermalRating": "R-value or description",
                            "climateZones": ["Zone 1", "Zone 2"]
                        }
                    ],
                    "exterior": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "weatherResistance": "description",
                            "maintenance": "Low/Medium/High"
                        }
                    ],
                    "interior": [
                        {
                            "name": "Material Name",
                            "brand": "Indian Brand",
                            "costPerUnit": "₹XXX per unit",
                            "humidityResistance": "High/Medium/Low",
                            "availability": "Pan India/Regional"
                        }
                    ]
                },
                "costAnalysis": {
                    "materialCosts": {
                        "foundation": "₹XX,XXX",
                        "structural": "₹XX,XXX",
                        "roofing": "₹XX,XXX",
                        "insulation": "₹XX,XXX",
                        "finishing": "₹XX,XXX"
                    },
                    "laborCosts": "₹XX,XXX",
                    "transportationCosts": "₹X,XXX",
                    "contingency": "₹X,XXX (15%)",
                    "totalProjectCost": "₹XX,XX,XXX"
                },
                "environmentalImpact": {
                    "carbonFootprint": "description",
                    "energyEfficiency": "BEE star rating or description",
                    "monsoonResistance": "description",
                    "sustainability": ["point1", "point2", "point3"]
                },
                "durabilityMaintenance": {
                    "expectedLifespan": "XX years",
                    "maintenanceFrequency": "description",
                    "commonIssues": ["issue1", "issue2"],
                    "preventiveMeasures": ["measure1", "measure2"]
                },
                "localConsiderations": {
                    "complianceCodes": ["NBC 2016", "IS XXXX"],
                    "seismicZone": "Zone I-V",
                    "climaticZone": "description",
                    "localSuppliers": ["supplier1", "supplier2"],
                    "regionalFactors": ["factor1", "factor2"]
                },
                "procurementTimeline": {
                    "foundation": "X weeks",
                    "structural": "X weeks", 
                    "roofing": "X weeks",
                    "insulation": "X weeks",
                    "finishing": "X weeks",
                    "monsoonConsiderations": "description"
                },
                "professionalRecommendations": {
                    "topCombinations": [
                        {
                            "name": "Combination 1",
                            "materials": ["material1", "material2"],
                            "benefits": ["benefit1", "benefit2"],
                            "cost": "₹XX,XXX"
                        }
                    ],
                    "riskMitigation": ["strategy1", "strategy2"],
                    "qualityAssurance": ["qa1", "qa2"],
                    "greenBuildingCompliance": "GRIHA/IGBC details"
                }
            }

            Include specific Indian brand names, IS codes, NBC references, and current market rates in INR. Consider regional variations and local construction practices. Return ONLY the JSON object, no additional text or formatting.
        `;

        const result = await model.generateContent(enhancedPrompt);
        const response = await result.response;
        const code = await response.text();

        // Try to parse the response as JSON
        let parsedResponse;
        try {
            // Clean the response to ensure it's valid JSON
            const cleanedCode = code.replace(/```json\n?/g, '').replace(/\n?```/g, '').trim();
            parsedResponse = JSON.parse(cleanedCode);
        } catch (parseError) {
            console.warn('Failed to parse JSON response, returning raw text:', parseError);
            parsedResponse = { rawText: code };
        }

        return NextResponse.json({code: parsedResponse})
    } catch (error) {
        console.error('Error generating material analysis:', error);
        return NextResponse.json(
            { error: 'Failed to generate material analysis report' }, 
            { status: 500 }
        );
    }
}