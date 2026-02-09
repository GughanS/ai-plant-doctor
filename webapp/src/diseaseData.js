// Maps specific model labels to human-readable advice
// This makes the app useful for farmers/gardeners

export const DISEASE_DATA = {
  // --- APPLE ---
  'Apple___Apple_scab': {
    name: 'Apple Scab',
    description: 'A fungal disease causing dark, scabby spots on leaves and fruit.',
    treatment: 'Apply fungicides containing myclobutanil or sulfur. Rake up and destroy fallen leaves to prevent overwintering spores.',
    prevention: 'Plant resistant varieties and prune trees to improve air circulation.'
  },
  'Apple___Black_rot': {
    name: 'Black Rot',
    description: 'Fungal infection causing circular brown spots on leaves and rotting fruit.',
    treatment: 'Remove infected mummies (dried fruit) and dead wood. Apply captan or sulfur-based fungicides.',
    prevention: 'Keep trees healthy and avoid wounding the bark.'
  },
  'Apple___Cedar_apple_rust': {
    name: 'Cedar Apple Rust',
    description: 'Bright orange-yellow spots on leaves.',
    treatment: 'Apply fungicides during the pink stage of blossom development.',
    prevention: 'Remove nearby Eastern Red Cedar trees if possible (the alternate host).'
  },
  'Apple___healthy': {
    name: 'Healthy Apple',
    description: 'Your apple plant looks vibrant and disease-free!',
    treatment: 'No action needed. Keep up the good work.',
    prevention: 'Maintain regular watering and fertilization schedules.'
  },

  // --- CHERRY ---
  'Cherry_(including_sour)___Powdery_mildew': {
    name: 'Powdery Mildew',
    description: 'White powdery growth on leaves and shoots.',
    treatment: 'Spray with horticultural oils or sulfur fungicides.',
    prevention: 'Prune for airflow and avoid overhead watering.'
  },
  'Cherry_(including_sour)___healthy': {
    name: 'Healthy Cherry',
    description: 'Your cherry plant looks healthy.',
    treatment: 'Monitor for pests occasionally.',
    prevention: 'Mulch around the base to retain moisture.'
  },

  // --- CORN ---
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': {
    name: 'Gray Leaf Spot',
    description: 'Rectangular gray to brown lesions on leaves.',
    treatment: 'Fungicides may be needed in severe cases. Rotate crops.',
    prevention: 'Plant resistant hybrids and manage crop residue.'
  },
  'Corn_(maize)___Common_rust_': {
    name: 'Common Rust',
    description: 'Small, cinnamon-brown pustules on leaves.',
    treatment: 'Usually usually not required unless infection is severe early in the season.',
    prevention: 'Plant resistant varieties.'
  },
  'Corn_(maize)___Northern_Leaf_Blight': {
    name: 'Northern Leaf Blight',
    description: 'Cigar-shaped gray-green lesions on leaves.',
    treatment: 'Fungicides can be effective if applied early.',
    prevention: 'Crop rotation and tillage to bury infected residue.'
  },
  'Corn_(maize)___healthy': {
    name: 'Healthy Corn',
    description: 'This corn plant is in great shape.',
    treatment: 'Ensure adequate nitrogen and water during tasseling.',
    prevention: 'Keep weeds under control.'
  },

  // --- GRAPE ---
  'Grape___Black_rot': {
    name: 'Grape Black Rot',
    description: 'Brown circular spots on leaves and shriveled black berries.',
    treatment: 'Apply fungicides from bud break through fruit set.',
    prevention: 'Remove infected fruit and canes during dormant pruning.'
  },
  'Grape___Esca_(Black_Measles)': {
    name: 'Black Measles (Esca)',
    description: 'Tiger-stripe patterns on leaves and spotting on fruit.',
    treatment: 'There is no chemical cure. Protect pruning wounds.',
    prevention: 'Remove and burn infected vines.'
  },
  'Grape___healthy': {
    name: 'Healthy Grape',
    description: 'Vines look vigorous and healthy.',
    treatment: 'Prune annually to maintain structure.',
    prevention: 'Monitor for pests like Japanese beetles.'
  },

  // --- PEACH ---
  'Peach___Bacterial_spot': {
    name: 'Bacterial Spot',
    description: 'Small water-soaked spots on leaves that turn into holes (shot-hole effect).',
    treatment: 'Copper sprays applied at dormancy and varying antibiotics during bloom.',
    prevention: 'Plant resistant varieties and avoid high-nitrogen fertilizers.'
  },
  'Peach___healthy': {
    name: 'Healthy Peach',
    description: 'Leaves are green and free of spots.',
    treatment: 'Thin fruit to ensure good size and quality.',
    prevention: 'Regular pruning is essential.'
  },

  // --- PEPPER ---
  'Pepper,_bell___Bacterial_spot': {
    name: 'Bacterial Spot',
    description: 'Small dark spots on leaves and fruit.',
    treatment: 'Copper-based bactericides can help reduce spread.',
    prevention: 'Use disease-free seeds and rotate crops.'
  },
  'Pepper,_bell___healthy': {
    name: 'Healthy Pepper',
    description: 'Glossy green leaves and sturdy stems.',
    treatment: 'Stake plants if they get heavy with fruit.',
    prevention: 'Mulch to keep soil moisture consistent.'
  },

  // --- POTATO ---
  'Potato___Early_blight': {
    name: 'Early Blight',
    description: 'Dark brown spots with concentric rings (target shape) on older leaves.',
    treatment: 'Apply chlorothalonil or copper fungicides.',
    prevention: 'Ensure good nitrogen levels and avoid overhead irrigation.'
  },
  'Potato___Late_blight': {
    name: 'Late Blight',
    description: 'Large, dark, water-soaked spots on leaves. White mold may appear.',
    treatment: 'Requires immediate action with specific fungicides like metalaxyl.',
    prevention: 'Destroy infected tubers and use certified disease-free seed potatoes.'
  },
  'Potato___healthy': {
    name: 'Healthy Potato',
    description: 'Robust foliage with no signs of distress.',
    treatment: 'Hill soil around the base to protect tubers from light.',
    prevention: 'Monitor for Colorado Potato Beetles.'
  },

  // --- TOMATO ---
  'Tomato___Bacterial_spot': {
    name: 'Bacterial Spot',
    description: 'Small, dark, greasy-looking spots on leaves and fruit.',
    treatment: 'Copper sprays may slow the spread but cannot cure it.',
    prevention: 'Avoid working in the garden when plants are wet.'
  },
  'Tomato___Early_blight': {
    name: 'Early Blight',
    description: 'Bullseye-patterned brown spots on lower leaves.',
    treatment: 'Remove infected lower leaves. Apply copper or bio-fungicides.',
    prevention: 'Mulch to prevent soil splash onto leaves.'
  },
  'Tomato___Late_blight': {
    name: 'Late Blight',
    description: 'Dark, greasy patches on leaves and stems. Can kill plants quickly.',
    treatment: 'Remove and destroy infected plants immediately. Do not compost.',
    prevention: 'Keep foliage dry and provide good airflow.'
  },
  'Tomato___Leaf_Mold': {
    name: 'Leaf Mold',
    description: 'Pale yellow spots on upper leaves, olive-green mold underneath.',
    treatment: 'Improve ventilation and reduce humidity. Fungicides if severe.',
    prevention: 'Water at the base, not the leaves.'
  },
  'Tomato___Septoria_leaf_spot': {
    name: 'Septoria Leaf Spot',
    description: 'Small circular spots with gray centers and dark borders.',
    treatment: 'Remove infected leaves. Apply chlorothalonil or copper soap.',
    prevention: 'Crop rotation and weed control.'
  },
  'Tomato___Spider_mites Two-spotted_spider_mite': {
    name: 'Spider Mites',
    description: 'Leaves look stippled or yellow; fine webbing may be visible.',
    treatment: 'Spray with water to knock them off, or use insecticidal soap/neem oil.',
    prevention: 'Keep plants well-watered (mites love dry, dusty conditions).'
  },
  'Tomato___Target_Spot': {
    name: 'Target Spot',
    description: 'Brown lesions with faint concentric rings.',
    treatment: 'Apply fungicides approved for target spot.',
    prevention: 'Remove plant debris and improve airflow.'
  },
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': {
    name: 'Yellow Leaf Curl Virus',
    description: 'Leaves curl upward and turn yellow; plant is stunted.',
    treatment: 'No cure. Remove and destroy infected plants.',
    prevention: 'Control whiteflies which spread the virus using reflective mulches.'
  },
  'Tomato___Tomato_mosaic_virus': {
    name: 'Mosaic Virus',
    description: 'Mottled light and dark green pattern on leaves.',
    treatment: 'No cure. Remove infected plants. Wash hands after smoking (tobacco carries it).',
    prevention: 'Plant resistant varieties.'
  },
  'Tomato___healthy': {
    name: 'Healthy Tomato',
    description: 'Vibrant green leaves and strong stems.',
    treatment: 'Support with cages or stakes.',
    prevention: 'Water consistently to prevent blossom end rot.'
  },
  
  // --- FALLBACK ---
  'Unknown': {
    name: 'Unknown Issue',
    description: 'The model could not identify the disease with high confidence.',
    treatment: 'Consult a local agricultural extension office.',
    prevention: 'Ensure general plant hygiene.'
  }
};