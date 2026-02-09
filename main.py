import sys
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """
    Main entry point for the application.
    """
    try:
        logger.info("Application starting...")
        
        # --- YOUR APPLICATION LOGIC GOES HERE ---
        print("Hello from the Professional Python Container!")
        print(f"Python Version: {sys.version}")
        
        # Example of keeping the container alive if it's a service
        # while True:
        #     time.sleep(1)
        
        logger.info("Application finished successfully.")
        
    except Exception as e:
        logger.error(f"An error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()