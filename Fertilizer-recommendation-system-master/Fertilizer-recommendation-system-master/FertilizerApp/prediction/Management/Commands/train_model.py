import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score
import joblib


data = pd.read_csv('FertilizerApp\prediction\Management\Commands\Fertilizer Prediction.csv')


label_encoders = {}
categorical_columns = ['Soil Type', 'Crop Type', 'Fertilizer Name']


for column in categorical_columns:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le


scaler = StandardScaler()
data[['Temparature', 'Humidity ', 'Moisture']] = scaler.fit_transform(data[['Temparature', 'Humidity ', 'Moisture']])


data['Temp_Humidity'] = data['Temparature'] * data['Humidity ']
data['Moisture_SoilType'] = data['Moisture'] * data['Soil Type']


X = data[['Temparature', 'Humidity ', 'Moisture', 'Soil Type', 'Crop Type', 'Temp_Humidity', 'Moisture_SoilType']]
y = data['Fertilizer Name']


from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=42)
X, y = smote.fit_resample(X, y)


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


param_grid_rf = {
    'n_estimators': [200, 300, 400],
    'max_depth': [10, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

grid_search_rf = GridSearchCV(estimator=RandomForestClassifier(random_state=42),
                               param_grid=param_grid_rf,
                               cv=3, n_jobs=-1, verbose=2)
grid_search_rf.fit(X_train, y_train)


rf_model = grid_search_rf.best_estimator_


rf_y_pred = rf_model.predict(X_test)
rf_accuracy = accuracy_score(y_test, rf_y_pred)

print(f"Random Forest Optimized Accuracy: {rf_accuracy * 100:.2f}%")


joblib.dump(rf_model, 'fertilizer_model.pkl')
print("Saved Random Forest model")


joblib.dump(label_encoders, 'label_encoders.pkl')




def process_input_and_generate_recommendation(input_data):
    temperature = input_data['Temparature']
    humidity = input_data['Humidity']
    moisture = input_data['Moisture']
    soil_type = label_encoders['Soil Type'].transform([input_data['Soil Type']])[0]
    crop_type = label_encoders['Crop Type'].transform([input_data['Crop Type']])[0]

    temp_humidity = temperature * humidity
    moisture_soil_type = moisture * soil_type
    feature_vector = [[temperature, humidity, moisture, soil_type, crop_type, temp_humidity, moisture_soil_type]]

    model = joblib.load('fertilizer_model.pkl')


    fertilizer_encoded = model.predict(feature_vector)[0]
    fertilizer_name = label_encoders['Fertilizer Name'].inverse_transform([fertilizer_encoded])[0]

    

