const getGeminiClient = require("../config/gemini");

const analyzeGrievance = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Complaint description is required"
      });
    }

    const ai = await getGeminiClient();

    const prompt = `
      Analyze the following public grievance description.

      Identify:
      1. District in Kerala, if explicitly mentioned.
      2. Appropriate grievance category.
      3. A short and meaningful complaint subject.

      Do not invent a district if it is not mentioned.
      If district is unclear, return null.

      Return only valid JSON in this format:

      {
        "district": null,
        "category": "Health",
        "subject": "Unavailability of medicines in hospital"
      }

      Complaint description:
      ${description}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text);

    return res.status(200).json({
      success: true,
      message: "Grievance analyzed successfully",
      analysis: result
    });

  } catch (error) {
    console.error("AI Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed"
    });
  }
};

module.exports = { analyzeGrievance };