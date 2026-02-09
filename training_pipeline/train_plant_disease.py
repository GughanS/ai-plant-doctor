import os
import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

# --- Configuration ---
DATASET_DIR = 'training_pipeline/PlantVillage'  # Path to your dataset
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

    print("Loading dataset...")
    # 1. Load Data
    train_ds = image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    val_ds = image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE
    )

    class_names = train_ds.class_names
    print(f"Classes found: {class_names}")

    # 2. Performance Tuning
    AUTOTUNE = tf.data.AUTOTUNE
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    # 3. Create Model (Transfer Learning with MobileNetV2)
    base_model = MobileNetV2(input_shape=IMG_SIZE + (3,), include_top=False, weights='imagenet')
    base_model.trainable = False  # Freeze the base model

    model = models.Sequential([
        layers.Rescaling(1./255, input_shape=IMG_SIZE + (3,)),
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(len(class_names), activation='softmax')
    ])

    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
                  metrics=['accuracy'])

    # 4. Train
    print("Starting training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS
    )

    # 5. Save
    print(f"Saving model to {MODEL_SAVE_PATH}...")
    model.save(MODEL_SAVE_PATH)
    print("Training complete!")

if __name__ == "__main__":
    train_model()