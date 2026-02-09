import os
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV3Small

# --- Configuration ---
# Match these with your dataset structure
DATASET_DIR = 'training_pipeline/PlantVillage' 
MODEL_SAVE_PATH = 'plant_doctor_model.h5'
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 5

def train_model():
    print(f"Checking for dataset at: {os.path.abspath(DATASET_DIR)}")
    
    if not os.path.exists(DATASET_DIR):
        print(f"ERROR: Dataset not found at {DATASET_DIR}")
        print("Please verify you have downloaded the PlantVillage dataset and extracted it there.")
        return

    # 1. Load Data
    print("Loading training data...")
    train_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='int'
    )

    print("Loading validation data...")
    val_ds = tf.keras.utils.image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='int'
    )

    class_names = train_ds.class_names
    print(f"Classes found ({len(class_names)}): {class_names}")

    # 2. Performance Tuning
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    # 3. Create Model (MobileNetV3-Small)
    # We use Transfer Learning: Pre-trained on ImageNet, but we add our own classification layers.
    print("Building MobileNetV3Small model...")
    base_model = MobileNetV3Small(
        input_shape=IMG_SIZE + (3,), 
        include_top=False, 
        weights='imagenet'
    )
    base_model.trainable = False  # Freeze the base model to keep ImageNet features

    # Model Architecture
    inputs = tf.keras.Input(shape=IMG_SIZE + (3,))
    
    # Note: MobileNetV3 has internal rescaling, but explicit rescaling 
    # is often safer for ensuring 0-1 range if the input isn't exactly what TF expects.
    # However, for this specific architecture, passing [0, 255] is standard.
    x = base_model(inputs, training=False)
    
    x = layers.GlobalAveragePooling2D()(x)
    x = layers.Dense(128, activation='relu')(x)
    x = layers.Dropout(0.2)(x) # Regularization to prevent overfitting
    outputs = layers.Dense(len(class_names), activation='softmax')(x)

    model = models.Model(inputs, outputs)

    # 4. Compile
    model.compile(optimizer='adam',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])

    model.summary()

    # 5. Train
    print(f"Starting training for {EPOCHS} epochs...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS
    )

    # 6. Save
    print(f"Saving model to {MODEL_SAVE_PATH}...")
    model.save(MODEL_SAVE_PATH)
    print("Training complete!")
    print("NOTE: To use this in the web app, you must convert it to TensorFlow.js format.")

if __name__ == "__main__":
    # Optional: Force Legacy Keras to avoid Keras 3 export bugs if running locally
    # os.environ["TF_USE_LEGACY_KERAS"] = "1" 
    train_model()