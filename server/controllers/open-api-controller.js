import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getMoodInsights = async (req, res) => {
  const { moodData, journalData } = req.body;
  let moodDescription = "";
  let journalDescription = "";

  if (moodData && moodData.length > 0) {
    const moodSummary = moodData.reduce((acc, entry) => {
      const date = entry.timestamp.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(entry.mood);
      return acc;
    }, {});

    moodDescription = Object.entries(moodSummary)
      .map(
        ([date, moods]) => `On ${date}, moods recorded: ${moods.join(", ")}.`
      )
      .join(" ");
  }

  if (journalData && journalData.length > 0) {
    const latestJournal = journalData[journalData.length - 1];
    journalDescription = `Latest journal entry titled "${latestJournal.title}": ${latestJournal.content}`;
  } else {
    journalDescription = "No recent journal entries available.";
  }

  const sampleData = {
    insights:
      "Here are some tips for you to boost your mood and enhance your well-being 🌟: Start your day with a moment of gratitude—acknowledge the good things in your life, no matter how small. Engage in physical activities like a morning jog or a fun workout, which can naturally uplift your spirits and boost your energy levels 💪. Connect with loved ones through a call or a quick message; meaningful interactions can provide comfort and joy. Consider exploring a new hobby or revisiting an old one that brings you pleasure and satisfaction 🎨. Practice relaxation techniques, such as deep breathing or meditation, to help manage stress and keep your mind clear 🧘‍♀️. Ensure you’re getting quality sleep and eating nutritious meals to support your overall health. Remember, taking these small steps can make a big difference in how you feel throughout the day. 🌈",
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are receiving information about the user's mood data and journal data. Based on the information, provide insights on the user's mood. Suggest activities and tips to enhance the user's mood in less than 1000 characters. If the data is missing, provide general insights and tips for a positive mood and don't mention that no data is present. Try to give a different response each time. Start your tips like Here are some tips for you:, and don't give the insights in pointers, rather provide a paragraph and incorporate emojis.",
          },
          {
            role: "user",
            content: `Mood Summary: ${moodDescription}. Journal Summary: ${journalDescription}.`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ insights: response.data.choices[0].message.content });
  } catch (error) {
    // Logging the error internally, but sending a general error response to the client
    //as using a free openAI subscription and might get insufficient_quota error when limit reaches
    console.error("Error in API request:", error.message);
    res.json({ insights: sampleData.insights });
  }
};

const getTherapistInsights = async (req, res) => {
    const { answers } = req.body;  

    // Sample fallback response if ChatGPT API fails
const sampleResponse = {
    insights: "Here are some tips for you: It's essential to focus on your well-being by taking time to relax and de-stress. Engage in activities that bring you joy, like hobbies or spending time with loved ones. Physical exercise, a balanced diet, and proper sleep are crucial in boosting your mood and overall health. Remember, it's okay to seek support from friends, family, or a professional when needed. 😊"
  };
    
    const messages = [
      {
        role: "system",
        content: "You are an empathetic virtual therapist providing mood and emotional well-being insights based on user answers to 1-How would you describe your mood over the past few days?2-What recent events or activities have had the biggest impact on your emotions?3-What do you do when you're feeling stressed or anxious, and how effective has that been?4-Can you think of a moment this week where you felt happy or calm? What contributed to that feeling?5-How well have you been able to sleep, and how has that affected your mood? character limit is 1000 words, incorporate smileys."
      },
      {
        role: "user",
        content: `Answers: ${answers.join(", ")}`
      }
    ];
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
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
        res.status(200).json({ insights: response.data.choices[0].message.content });
      } else {
        // If no valid insights, send the fallback sample response
        res.status(200).json(sampleResponse);
      }
    } catch (error) {
      // Handle any error (insufficient quota, network issues, etc.) and send fallback response   
      res.status(200).json(sampleResponse);  // Send sample response if ChatGPT API fails
    }
  };

export { getMoodInsights, getTherapistInsights };
