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

export { getMoodInsights };
