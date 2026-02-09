import { useState, useEffect, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import { Upload, AlertCircle, CheckCircle, Activity, Image as ImageIcon } from 'lucide-react'

// Class names must match your training data folder names exactly (alphabetical order)
const CLASS_NAMES = [
  'Apple___Apple_scab',
  'Apple___Black_rot',
  'Apple___Cedar_apple_rust',
  'Apple___healthy',
  'Blueberry___healthy',
  'Cherry_(including_sour)___Powdery_mildew',
  'Cherry_(including_sour)___healthy',
  'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
  'Corn_(maize)___Common_rust_',
  'Corn_(maize)___Northern_Leaf_Blight',
  'Corn_(maize)___healthy',
  'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  'Grape___healthy',
  'Orange___Haunglongbing_(Citrus_greening)',
  'Peach___Bacterial_spot',
  'Peach___healthy',
  'Pepper,_bell___Bacterial_spot',
  'Pepper,_bell___healthy',
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Potato___healthy',
  'Raspberry___healthy',
  'Soybean___healthy',
  'Squash___Powdery_mildew',
  'Strawberry___Leaf_scorch',
  'Strawberry___healthy',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy'
];

function App() {
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const imageRef = useRef(null)

  // 1. Load the Graph Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log("Loading Graph Model...")
        
        // Load the graph model from the public folder
        const loadedModel = await tf.loadGraphModel('/web_model/model.json')
        
        setModel(loadedModel)
        console.log("Graph Model loaded successfully")
        setLoading(false)
      } catch (err) {
        console.error("Failed to load model:", err)
        setError(`Failed to load model. Ensure 'web_model' folder is in 'public'.\nDetails: ${err.message}`)
        setLoading(false)
      }
    }
    loadModel()
  }, [])

  // 2. Handle Image Upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImageURL(url)
      setPrediction(null)
      setError(null)
    }
  }

  // 3. Run Prediction
  const predict = async () => {
    if (!model || !imageRef.current) return

    setLoading(true)
    try {
      const result = tf.tidy(() => {
        // a. Read image
        let img = tf.browser.fromPixels(imageRef.current)
        
        // b. Resize to 224x224
        img = tf.image.resizeBilinear(img, [224, 224])
        
        // c. Expand dims [1, 224, 224, 3]
        const batch = img.expandDims(0)
        
        // d. Predict
        const predictions = model.predict(batch)
        
        if (Array.isArray(predictions)) return predictions[0].dataSync()
        if (predictions.dataSync) return predictions.dataSync()
        return predictions
      })

      const maxConfidence = Math.max(...result)
      const classIndex = result.indexOf(maxConfidence)
      
      setPrediction({
        label: CLASS_NAMES[classIndex] || "Unknown",
        confidence: (maxConfidence * 100).toFixed(1)
      })

    } catch (err) {
      console.error(err)
      setError(`Prediction Failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // --- UI Styles ---
  const styles = {
    container: {
      width: '100%', // Force full width to fix left-alignment
      minHeight: '100vh',
      backgroundColor: '#1b7a0354',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#e2e8f0',
      padding: '20px',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '480px',
      backgroundColor: '#1d2d1b', // Slate 800
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      padding: '2rem',
      border: '1px solid #334155'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      background: 'linear-gradient(to right, #4ade80, #38bdf8)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '0.9rem'
    },
    uploadArea: {
      // FIX: Improved visibility and Flexbox centering
      border: '2px dashed rgba(148, 163, 184, 0.5)', 
      borderRadius: '16px',
      padding: '3rem 2rem',
      display: 'flex',           // Added Flexbox
      flexDirection: 'column',   // Stack vertically
      alignItems: 'center',      // Center horizontally
      justifyContent: 'center',  // Center vertically
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(30, 41, 59, 0.3)',
      width: '100%',
      boxSizing: 'border-box'
    },
    uploadIcon: {
      marginBottom: '1rem',
      color: '#38bdf8',
      filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.3))'
    },
    previewImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center'
    },
    primaryBtn: {
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      background: loading ? '#475569' : 'linear-gradient(135deg, #4ade80 0%, #0ea5e9 100%)',
      color: 'white',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
      transition: 'transform 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    secondaryBtn: {
      padding: '12px 20px',
      borderRadius: '12px',
      border: '1px solid #475569',
      background: 'transparent',
      color: '#94a3b8',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    resultCard: {
      marginTop: '1.5rem',
      padding: '1.5rem',
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      border: '1px solid rgba(74, 222, 128, 0.2)',
      borderRadius: '16px',
      textAlign: 'center'
    },
    progressBar: {
      height: '6px',
      width: '100%',
      background: '#334155',
      borderRadius: '3px',
      marginTop: '12px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: '#4ade80',
      transition: 'width 0.5s ease-out'
    },
    statusFooter: {
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid #334155',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#64748b'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header Section */}
        <div style={styles.header}>
          <div style={{ display: 'inline-flex', padding: '10px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.1)', marginBottom: '10px' }}>
            <Activity size={32} color="#38bdf8" />
          </div>
          <h1 style={styles.title}>AI Plant Doctor</h1>
          <p style={styles.subtitle}>Professional Grade Disease Detection</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'start', fontSize: '0.9rem' }}>
            <AlertCircle size={20} style={{ minWidth: '20px', marginTop: '2px' }} />
            <div>{error}</div>
          </div>
        )}

        {/* Main Interaction Area */}
        {!imageURL ? (
          <label style={styles.uploadArea} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4ade80'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#475569'}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <Upload size={48} style={styles.uploadIcon} />
            <h3 style={{ color: '#e2e8f0', margin: '0 0 0.5rem 0' }}>Upload Plant Photo</h3>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.85rem' }}>Drag & drop or click to browse</p>
          </label>
        ) : (
          <div>
            <div style={{ position: 'relative' }}>
              <img src={imageURL} alt="Preview" ref={imageRef} style={styles.previewImage} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ImageIcon size={14} /> Preview
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                onClick={() => setImageURL(null)} 
                style={styles.secondaryBtn}
                onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#fff'}}
                onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#475569'; e.currentTarget.style.color = '#94a3b8'}}
              >
                Reset
              </button>
              <button 
                onClick={predict} 
                disabled={!model || loading} 
                style={styles.primaryBtn}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {loading ? 'Analyzing...' : 'Diagnose Disease'}
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {prediction && (
          <div style={styles.resultCard}>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#4ade80', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle size={20} />
              {prediction.label.replace(/_/g, ' ')}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>
              <span>Confidence</span>
              <span>{prediction.confidence}%</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${prediction.confidence}%` }}></div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.statusFooter}>
          {model ? (
            <span style={{ color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}></span>
              System Online
            </span>
          ) : (
            <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: '#facc15', borderRadius: '50%' }}></span>
              Initializing Neural Engine...
            </span>
          )}
        </div>

      </div>
    </div>
  )
}

export default App