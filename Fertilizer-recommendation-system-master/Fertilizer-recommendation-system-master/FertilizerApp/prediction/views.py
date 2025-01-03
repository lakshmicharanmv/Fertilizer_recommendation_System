import os
import json
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import joblib

# Paths for model and encoders
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'prediction', 'Management', 'Commands', 'fertilizer_model.pkl')
encoders_path = os.path.join(BASE_DIR, 'prediction', 'Management', 'Commands', 'label_encoders.pkl')


model = joblib.load(model_path)
label_encoders = joblib.load(encoders_path)
APPLICATION_TECHNIQUES = [
    "Apply the fertilizer uniformly across the field to ensure even crop growth.",
    "Mix the fertilizer well with the soil to prevent nutrient loss.",
    "Apply fertilizer near the root zone for better absorption.",
    "Avoid applying fertilizer during heavy rain to prevent runoff."
]

ENVIRONMENTAL_CONSIDERATIONS = [
    "Avoid using fertilizers near water bodies to prevent contamination.",
    "Use organic fertilizers to reduce chemical pollution in the environment.",
    "Test soil health regularly to prevent overuse of fertilizers.",
    "Choose eco-friendly fertilizers for sustainable farming."
]

IRRIGATION_GUIDELINES = [
    "Water the soil lightly after applying fertilizers to help nutrients penetrate.",
    "Ensure proper irrigation before applying fertilizers to avoid nutrient leaching.",
    "Avoid excessive watering after fertilization to maintain soil structure.",
    "Use drip irrigation for precise and efficient water and nutrient delivery."
]

ADDITIONAL_TIPS = [
    "Store fertilizers in a dry and cool place to maintain quality.",
    "Follow recommended dosages to avoid over-fertilizing the crops.",
    "Combine organic and inorganic fertilizers for balanced nutrient supply.",
    "Monitor crop growth closely to assess the impact of fertilizer application."
]

def generate_random_tips():
    """Generate random tips for fertilizer application."""
    return {
        "application_techniques": random.choice(APPLICATION_TECHNIQUES),
        "environmental_considerations": random.choice(ENVIRONMENTAL_CONSIDERATIONS),
        "irrigation_guidelines": random.choice(IRRIGATION_GUIDELINES),
        "additional_tips": random.choice(ADDITIONAL_TIPS)
    }

@csrf_exempt
def predict_fertilizer(request):
    """Predict fertilizer and generate recommendations dynamically."""
    if request.method == 'POST':
        try:
            
            data = json.loads(request.body)
            soil_type = data['soilType']
            crop_type = data['cropType']
            crop_age = int(data['cropAge'])
            npk_ratio = data['npkRatio']
            fertilizer_used = data['fertilizerUsed']
            temperature = float(data['temperature'])
            humidity = float(data['humidity'])

            soil_type_encoded = label_encoders['Soil Type'].transform([soil_type])[0]
            crop_type_encoded = label_encoders['Crop Type'].transform([crop_type])[0]

            temp_humidity = temperature * humidity
            feature_vector = [[temperature, humidity, 0, soil_type_encoded, crop_type_encoded, temp_humidity, 0]]

            fertilizer_encoded = model.predict(feature_vector)[0]
            fertilizer_name = label_encoders['Fertilizer Name'].inverse_transform([fertilizer_encoded])[0]

            tips = generate_random_tips()

            return JsonResponse({
                'fertilizer': fertilizer_name,
                'recommendation': tips
            }, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'message': 'Invalid request method'}, status=405)
