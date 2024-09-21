export async function seed(knex) {
  await knex("journal").del();
  await knex("journal").insert([
    {
      id: 1,
      user_id: 1,
      title: "Morning Reflections",
      content:
        "Had a peaceful morning. Feeling optimistic about the day. The birds were chirping, and the cool breeze made me feel refreshed. I hope to carry this calm energy into the rest of the day.",
      timestamp: "2024-09-01 08:00:00",
    },
    {
      id: 2,
      user_id: 1,
      title: "Afternoon Thoughts",
      content:
        "Busy day at work, but managed to stay focused. The workload was heavier than expected, but I found a good rhythm. Managed to check off a few important tasks.",
      timestamp: "2024-09-01 14:00:00",
    },
    {
      id: 3,
      user_id: 1,
      title: "Late Night Pondering",
      content:
        "Could not sleep well last night. A lot on my mind. I kept replaying events from the day, and it was hard to switch off. Hopefully tomorrow will bring more clarity.",
      timestamp: "2024-09-01 23:30:00",
    },
    {
      id: 4,
      user_id: 1,
      title: "Workout Recap",
      content:
        "Had a great workout session today. Feeling strong! The routine was challenging, but I pushed through and hit some personal bests. Really proud of my progress.",
      timestamp: "2024-09-02 08:00:00",
    },
    {
      id: 5,
      user_id: 1,
      title: "Work Stress",
      content:
        "Work was challenging today. Need to find a better balance. I felt overwhelmed by the number of tasks, and it's starting to impact my mental health. Definitely need to prioritize some self-care.",
      timestamp: "2024-09-02 14:00:00",
    },
    {
      id: 6,
      user_id: 1,
      title: "Evening Chill",
      content:
        "Spent the evening reading a book. Very relaxing. It was nice to unwind and get lost in a good story. I needed this break to recharge for the rest of the week.",
      timestamp: "2024-09-03 23:30:00",
    },
    {
      id: 7,
      user_id: 1,
      title: "Morning Run",
      content:
        "Went for a run in the park. Feeling energized. The fresh air and open space helped me clear my mind, and I feel ready to tackle the day ahead.",
      timestamp: "2024-09-04 07:30:00",
    },
    {
      id: 8,
      user_id: 1,
      title: "Project Progress",
      content:
        "Made good progress on the project today. Feeling accomplished. The issues I faced last week are starting to make more sense, and it’s satisfying to see things come together.",
      timestamp: "2024-09-05 03:30:00",
    },
    {
      id: 9,
      user_id: 1,
      title: "Meditation Session",
      content:
        "Meditated for 30 minutes. Helped clear my mind. I felt a sense of calm wash over me as I focused on my breathing. Definitely something I need to do more often.",
      timestamp: "2024-09-05 07:30:00",
    },
    {
      id: 10,
      user_id: 1,
      title: "A Relaxed Morning",
      content:
        "Had a peaceful morning with some good coffee and reading time. It’s a simple pleasure, but it set a nice tone for the rest of the day. Hoping for more mornings like this.",
      timestamp: "2024-09-06 07:30:00",
    },
    {
      id: 11,
      user_id: 1,
      title: "A Great Day",
      content:
        "Today was amazing! I finished all my tasks and had time for a walk. The fresh air helped me clear my head, and it felt good to be so productive.",
      timestamp: "2024-09-07 18:00:00",
    },
    {
      id: 12,
      user_id: 1,
      title: "New Project",
      content:
        "Started working on a new project at work today. Feeling excited! It’s a challenging one, but I’m eager to see how it develops and contribute my ideas.",
      timestamp: "2024-09-08 17:30:00",
    },
    {
      id: 13,
      user_id: 1,
      title: "Feeling Down",
      content:
        "It was a tough day. Nothing seemed to go right. I felt frustrated with everything, and it was hard to stay motivated. Hoping tomorrow will be better.",
      timestamp: "2024-09-01 19:45:00",
    },
    {
      id: 14,
      user_id: 1,
      title: "Getting Better",
      content:
        "Things are starting to look up. Had a productive meeting. I feel like I’m slowly getting back on track, and it’s a relief to see some positive momentum.",
      timestamp: "2024-09-03 20:00:00",
    },
    {
      id: 15,
      user_id: 1,
      title: "Frustration at Work",
      content:
        "Today was frustrating. Too many issues popping up in the code. It felt like one step forward, two steps back. Definitely not my best day, but I’ll keep pushing through.",
      timestamp: "2024-09-01 21:00:00",
    },
    {
      id: 16,
      user_id: 1,
      title: "A Relaxed Morning",
      content:
        "Had a peaceful morning with some good coffee and reading time. It’s amazing how a simple routine can bring so much comfort. Feeling recharged for the day ahead.",
      timestamp: "2024-09-02 07:30:00",
    },
  ]);
}
