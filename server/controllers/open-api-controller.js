import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getTherapistInsights = async (req, res) => {
    const { answers } = req.body;  
    const answersText = Array.isArray(answers) ? answers.join(", ") : "No answers provided";

    // Sample fallback response if ChatGPT API fails or using free API Key
const sampleResponse = {
    insights: "Here are some tips for you: It's essential to focus on your well-being by taking time to relax and de-stress. Engage in activities that bring you joy, like hobbies or spending time with loved ones. Physical exercise, a balanced diet, and proper sleep are crucial in boosting your mood and overall health. Remember, it's okay to seek support from friends, family, or a professional when needed. 😊"
  };
    
    const messages = [
      {
        role: "system",
        content: "You are an empathetic virtual therapist providing emotional well-being insights based on answers to 1-describe mood over past few days?2-What recent events or activities have had the biggest impact on your emotions?3-What do you do when you're feeling stressed or anxious, and how effective has that been?4-Can you think of a moment this week where you felt happy or calm? What contributed to that feeling?5-How well have you been able to sleep, and how that affected your mood? character limit 1000 words, incorporate smileys."
      },
      {
        role: "user",
        content: `Answers: ${answersText}`,
      }
    ];
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          // model: "gpt-4o-mini",
          messages: messages,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
        if (response.data && response.data.choices && response.data.choices[0].message.content) {
          console.log(response)
        res.status(200).json({ insights: response.data.choices[0].message.content });
      } else {
        // If no valid insights, send the fallback sample response
        res.status(200).json(sampleResponse);
      }
    } catch (error) {
    // sending a general sample response to the client  if ChatGPT API fails
    //as using a free openAI subscription and might get insufficient_quota error when limit reaches
    //will use paid one for demo purpose
      res.status(200).json(sampleResponse);  
    }
  };

export { getTherapistInsights };
