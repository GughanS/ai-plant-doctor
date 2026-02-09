import { useState, useEffect, useRef } from 'react'
import * as tf from '@tensorflow/tfjs'
import { Upload, AlertCircle, CheckCircle, Activity, Image as ImageIcon, Stethoscope, Sprout, Shield } from 'lucide-react'
import { DISEASE_DATA } from './diseaseData'

// Class names must match your training data folder names exactly
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
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const imageRef = useRef(null)

  // 1. Load Model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true)
        console.log("Loading Graph Model...")
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
      setInfo(null)
      setError(null)
    }
  }

  // 3. Run Prediction
  const predict = async () => {
    if (!model || !imageRef.current) return

    setLoading(true)
    try {
      const result = tf.tidy(() => {
        let img = tf.browser.fromPixels(imageRef.current)
        img = tf.image.resizeBilinear(img, [224, 224])
        const batch = img.expandDims(0)
        const predictions = model.predict(batch)
        if (Array.isArray(predictions)) return predictions[0].dataSync()
        if (predictions.dataSync) return predictions.dataSync()
        return predictions
      })

      const maxConfidence = Math.max(...result)
      const classIndex = result.indexOf(maxConfidence)
      const label = CLASS_NAMES[classIndex]
      
      setPrediction({
        label: label,
        confidence: (maxConfidence * 100).toFixed(1)
      })

      const advice = DISEASE_DATA[label] || DISEASE_DATA['Unknown']
      setInfo(advice)

    } catch (err) {
      console.error(err)
      setError(`Prediction Failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // --- FOREST GREEN THEME STYLES ---
  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      // Deep Forest Gradient
      background: 'linear-gradient(135deg, #022c22 0%, #14532d 100%)', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#f0fdf4', // Very pale green text
      padding: '20px',
      boxSizing: 'border-box'
    },
    card: {
      width: '100%',
      maxWidth: '520px',
      // Glassmorphism effect on dark green
      backgroundColor: 'rgba(6, 78, 59, 0.6)', 
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      padding: '2rem',
      border: '1px solid rgba(52, 211, 153, 0.2)' // Mint border
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '0.5rem',
      // Gradient text: Bright Green to Teal
      background: 'linear-gradient(to right, #4ade80, #2dd4bf)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: { color: '#a7f3d0', fontSize: '0.9rem', opacity: 0.8 },
    uploadArea: {
      // Improved Visibility & Center Alignment
      border: '2px dashed rgba(52, 211, 153, 0.4)', // Mint dashed border
      borderRadius: '16px',
      padding: '3rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(6, 95, 70, 0.3)', // Darker inner fill
      width: '100%',
      boxSizing: 'border-box'
    },
    uploadIcon: { marginBottom: '1rem', color: '#4ade80', filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.4))' },
    previewImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(52, 211, 153, 0.3)'
    },
    buttonGroup: { display: 'flex', gap: '12px', justifyContent: 'center' },
    primaryBtn: {
      padding: '12px 24px',
      borderRadius: '12px',
      border: 'none',
      // Green Gradient Button
      background: loading ? '#3f3f46' : 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
      color: 'white',
      fontWeight: '600',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 14px 0 rgba(22, 163, 74, 0.39)',
      transition: 'transform 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    secondaryBtn: {
      padding: '12px 20px',
      borderRadius: '12px',
      border: '1px solid #34d399',
      background: 'transparent',
      color: '#6ee7b7',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    // Results & Treatment Styling
    resultSection: {
      marginTop: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    scoreCard: {
      padding: '1rem',
      backgroundColor: 'rgba(20, 83, 45, 0.5)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '12px',
      textAlign: 'center'
    },
    treatmentCard: {
      padding: '1.5rem',
      backgroundColor: 'rgba(2, 44, 34, 0.6)', // Darker background for text contrast
      borderRadius: '12px',
      border: '1px solid rgba(5, 150, 105, 0.3)',
      textAlign: 'left'
    },
    infoRow: {
      marginBottom: '1rem',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    },
    progressBar: {
      height: '6px',
      width: '100%',
      background: '#064e3b',
      borderRadius: '3px',
      marginTop: '12px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: '#4ade80',
      transition: 'width 0.5s ease-out',
      boxShadow: '0 0 10px #4ade80'
    },
    statusFooter: {
      marginTop: '2rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(52, 211, 153, 0.1)',
      textAlign: 'center',
      fontSize: '0.8rem',
      color: '#6ee7b7'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', marginBottom: '12px' }}>
            <Activity size={32} color="#4ade80" />
          </div>
          <h1 style={styles.title}>AI Plant Doctor</h1>
          <p style={styles.subtitle}>Professional Grade Disease Detection</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '10px', alignItems: 'start', fontSize: '0.9rem' }}>
            <AlertCircle size={20} style={{ minWidth: '20px', marginTop: '2px' }} />
            <div>{error}</div>
          </div>
        )}

        {/* Main Area */}
        {!imageURL ? (
          <label 
            style={styles.uploadArea} 
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4ade80'; e.currentTarget.style.backgroundColor = 'rgba(6, 78, 59, 0.5)'; }} 
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.4)'; e.currentTarget.style.backgroundColor = 'rgba(6, 95, 70, 0.3)'; }}
          >
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <Upload size={48} style={styles.uploadIcon} />
            <h3 style={{ color: '#ecfccb', margin: '0 0 0.5rem 0' }}>Upload Plant Photo</h3>
            <p style={{ color: '#a7f3d0', margin: 0, fontSize: '0.85rem' }}>Drag & drop or click to browse</p>
          </label>
        ) : (
          <div>
            <div style={{ position: 'relative' }}>
              <img src={imageURL} alt="Preview" ref={imageRef} style={styles.previewImage} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'white' }}>
                <ImageIcon size={14} /> Preview
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <button 
                onClick={() => setImageURL(null)} 
                style={styles.secondaryBtn}
                onMouseEnter={(e) => {e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#fff'}}
                onMouseLeave={(e) => {e.currentTarget.style.borderColor = '#34d399'; e.currentTarget.style.color = '#6ee7b7'}}
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

        {/* Results & Treatments */}
        {prediction && info && (
          <div style={styles.resultSection}>
            {/* Diagnosis */}
            <div style={styles.scoreCard}>
              <h2 style={{ margin: '0 0 0.5rem 0', color: '#4ade80', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <CheckCircle size={24} />
                {info.name}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#a7f3d0', marginBottom: '4px' }}>
                <span>Confidence</span>
                <span>{prediction.confidence}%</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${prediction.confidence}%` }}></div>
              </div>
            </div>

            {/* Doctor's Advice */}
            <div style={styles.treatmentCard}>
              <div style={{ borderBottom: '1px solid rgba(52, 211, 153, 0.2)', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#2dd4bf', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Stethoscope size={18} /> Doctor's Analysis
              </div>
              
              <div style={styles.infoRow}>
                <Activity size={20} color="#94a3b8" style={{ minWidth: '20px', marginTop: '3px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#e2e8f0' }}>Diagnosis</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0' }}>{info.description}</p>
                </div>
              </div>

              <div style={styles.infoRow}>
                <Sprout size={20} color="#4ade80" style={{ minWidth: '20px', marginTop: '3px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#e2e8f0' }}>Treatment</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0' }}>{info.treatment}</p>
                </div>
              </div>

              <div style={styles.infoRow}>
                <Shield size={20} color="#facc15" style={{ minWidth: '20px', marginTop: '3px' }} />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#e2e8f0' }}>Prevention</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0' }}>{info.prevention}</p>
                </div>
              </div>
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