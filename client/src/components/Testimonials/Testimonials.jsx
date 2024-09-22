import React from 'react'
import { Carousel } from 'react-bootstrap';
import "./Testimonials.scss";

const testimonials = [
  {
    "username": "Jane Doe",
    "testimonial": "Reflectify has been a game-changer for tracking my moods. I love how easy it is to journal and reflect on my emotions. The insights I get from reviewing my moods over time have really helped me understand myself better.",
    "rating": 5
  },
  {
    "username": "John Smith",
    "testimonial": "As someone who struggles with managing emotions, Reflectify has been a helpful tool. The design is clean, and the mood-tracking feature makes it easy to keep tabs on how I’m feeling throughout the day.",
    "rating": 4
  },
  {
    "username": "Sarah Connor",
    "testimonial": "Reflectify has improved my self-care routine immensely. It's intuitive and gives me a safe space to document my feelings. I can already see positive changes in my mental health.",
    "rating": 5
  },
  {
    "username": "Michael Jordan",
    "testimonial": "I appreciate how Reflectify integrates journaling with mood tracking. It helps me stay in tune with my mental well-being and offers useful insights, though I wish there were more customization options.",
    "rating": 4
  },
  {
    "username": "Anna Lee",
    "testimonial": "Reflectify is my go-to app for self-reflection. It's simple to use, and the mood tracking is so detailed. It's amazing to see my emotional patterns over time.",
    "rating": 5
  }
];

export default function Testimonials() {
  return (
    <div className="testimonial-section">
    <h2 className="text-center testimonial-title">Reflections from Our Community</h2>
    <Carousel variant='dark'>
      {testimonials.map((item, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '300px' }}>
            <h5>{item.username}</h5>
            <p>"{item.testimonial}"</p>
            <div className="text-warning">
              {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
  )
}
