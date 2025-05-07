from flask import Flask, render_template, jsonify
import random
import os

app = Flask(__name__, static_folder='static')

# Comfort messages and tips
comfort_data = {
    "hugs": [
        "Sending you the warmest hug!",
        "Virtual hug incoming! 🤗",
        "You deserve all the hugs today!",
        "Squeeze! That was a hug from me!",
        "Hug delivery for my favorite person!"
    ],
    "tips": [
        "Try a warm ginger tea with honey",
        "Gentle yoga stretches can help with cramps",
        "A heating pad works wonders for discomfort",
        "Dark chocolate (70%+) is great for mood and cramps",
        "Warm baths with Epsom salts can be relaxing",
        "Listen to your favorite calming music",
        "Try some light meditation or deep breathing",
        "Comfort movies and cozy blankets are a must",
        "Stay hydrated with warm herbal teas",
        "Pillow fort relaxation time!"
    ],
    "mood_boosters": {
        "happy": [
            "You bring so much joy to the world!",
            "Your smile is my favorite thing! 😊",
            "Happy looks beautiful on you!"
        ],
        "silly": [
            "Why don't eggs tell jokes? They'd crack each other up!",
            "What do you call a fake noodle? An impasta!",
            "I would tell you a chemistry joke but I know I wouldn't get a reaction!"
        ],
        "calm": [
            "Breathe in... and out... You've got this",
            "Imagine yourself in your happy place",
            "Peace begins with a smile"
        ],
        "loved": [
            "You are deeply loved, more than words can express",
            "Every part of you is precious and worthy",
            "If love were a color, it would look like you"
        ]
    },
    "affirmations": [
        "You're stronger than you think",
        "Your feelings are valid",
        "This discomfort is temporary",
        "You're doing amazing",
        "Your body is wise and wonderful",
        "Rest is productive too",
        "You deserve comfort and care",
        "Be gentle with yourself today"
    ]
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_hug_message')
def get_hug_message():
    return jsonify({"message": random.choice(comfort_data["hugs"])})

@app.route('/get_tips')
def get_tips():
    return jsonify({"tips": random.sample(comfort_data["tips"], 3)})

@app.route('/get_mood_booster/<mood>')
def get_mood_booster(mood):
    if mood in comfort_data["mood_boosters"]:
        return jsonify({
            "message": random.choice(comfort_data["mood_boosters"][mood]),
            "affirmation": random.choice(comfort_data["affirmations"])
        })
    return jsonify({"message": "You're wonderful just as you are!"})

@app.route('/get_affirmation')
def get_affirmation():
    return jsonify({"affirmation": random.choice(comfort_data["affirmations"])})

@app.route('/get_cycle_info')
def get_cycle_info():
    return jsonify({
        "day": random.randint(1, 7),
        "symptoms": ["cramps", "tiredness"],
        "recommendations": ["rest", "hydration", "warm compress"]
    })

if __name__ == '__main__':
    app.run(debug=True)
