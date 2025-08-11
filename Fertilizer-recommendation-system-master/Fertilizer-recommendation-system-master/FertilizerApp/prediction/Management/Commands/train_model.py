import os
import pandas as pd
import logging
from django.core.management.base import BaseCommand
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import joblib
from imblearn.over_sampling import SMOTE

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Command(BaseCommand):
    help = 'Trains the fertilizer recommendation model'

    def handle(self, *args, **kwargs):
        logging.info('Starting model training...')
        try:
            file_path = os.path.join(os.path.dirname(__file__), 'Fertilizer Prediction.csv')
            logging.info(f'Loading data from {file_path}')
            data = pd.read_csv(file_path)
            logging.info('Data loaded successfully.')

            logging.info('Encoding categorical features...')
            label_encoders = {}
            categorical_columns = ['Soil Type', 'Crop Type', 'Fertilizer Name']
            for column in categorical_columns:
                le = LabelEncoder()
                data[column] = le.fit_transform(data[column])
                label_encoders[column] = le
            logging.info('Categorical features encoded.')

            logging.info('Scaling numerical features...')
            scaler = StandardScaler()
            data[['Temparature', 'Humidity ', 'Moisture']] = scaler.fit_transform(data[['Temparature', 'Humidity ', 'Moisture']])
            logging.info('Numerical features scaled.')

            logging.info('Creating new features...')
            data['Temp_Humidity'] = data['Temparature'] * data['Humidity ']
            data['Moisture_SoilType'] = data['Moisture'] * data['Soil Type']
            logging.info('New features created.')

            X = data[['Temparature', 'Humidity ', 'Moisture', 'Soil Type', 'Crop Type', 'Temp_Humidity', 'Moisture_SoilType']]
            y = data['Fertilizer Name']

            logging.info('Applying SMOTE...')
            smote = SMOTE(random_state=42)
            X, y = smote.fit_resample(X, y)
            logging.info('SMOTE applied.')

            logging.info('Splitting data into training and testing sets...')
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            logging.info('Data split.')

            param_grid_rf = {
                'n_estimators': [200, 300, 400],
                'max_depth': [10, 20, None],
                'min_samples_split': [2, 5, 10],
                'min_samples_leaf': [1, 2, 4]
            }

            logging.info('Starting GridSearchCV for RandomForestClassifier...')
            grid_search_rf = GridSearchCV(estimator=RandomForestClassifier(random_state=42),
                                           param_grid=param_grid_rf,
                                           cv=3, n_jobs=-1, verbose=2)
            grid_search_rf.fit(X_train, y_train)
            logging.info('GridSearchCV finished.')

            rf_model = grid_search_rf.best_estimator_

            rf_y_pred = rf_model.predict(X_test)
            rf_accuracy = accuracy_score(y_test, rf_y_pred)

            logging.info(f'Random Forest Optimized Accuracy: {rf_accuracy * 100:.2f}%')

            model_path = os.path.join(os.path.dirname(__file__), 'fertilizer_model.pkl')
            joblib.dump(rf_model, model_path)
            logging.info(f'Saved Random Forest model to {model_path}')

            encoders_path = os.path.join(os.path.dirname(__file__), 'label_encoders.pkl')
            joblib.dump(label_encoders, encoders_path)

            scaler_path = os.path.join(os.path.dirname(__file__), 'scaler.pkl')
            joblib.dump(scaler, scaler_path)

            logging.info('Model training complete.')

        except Exception as e:
            logging.error(f'An error occurred during model training: {e}')
            self.stderr.write(self.style.ERROR(f'An error occurred: {e}'))

    

