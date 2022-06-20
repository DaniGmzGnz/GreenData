import random
import pickle

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics
from sklearn import ensemble
from sklearn.preprocessing import OneHotEncoder

from ..calculadora.utils import f


def prepare_data(data):
  data_2 = data[['Year', 'Sector_organ','Type_organ', 'Auton_community', 'Num_empl', 'TCO2']]
  encoder = OneHotEncoder(sparse=False).fit(data_2[['Sector_organ', 'Auton_community']])
  data_2[np.concatenate(encoder.categories_)] = encoder.transform(data_2[['Sector_organ', 'Auton_community']])
  data_2.drop(['Sector_organ', 'Auton_community'], axis=1, inplace=True)

  tamaños_dic = {'Gran empresa':0, 'Mediana':1, 'Pequeña':2, 'Micro':3, 'micro entity': 3}
  data_2['Type_organ'] = [tamaños_dic.get(sec, -1) for sec in data['Type_organ']]

  return data_2, encoder

def remove_outliers(database):
  mean = np.mean(database['TCO2'])
  sigma = np.std(database['TCO2'])
  database['z'] = (database['TCO2']-mean)/sigma
  database = database[database['z'] < 3]
  database = database[database['z'] > -3]
  return database.drop(columns = ['z'])

def split(data_size, size):
    if size == 'median':
        limit = 4500
        data = data_size[data_size['Type_organ'] == 1]
    elif size == 'little':
        limit = 2500
        data = data_size[data_size['Type_organ'] == 2]
    else:
        limit = 800
        data = data_size[data_size['Type_organ'] == 3]

    data = data.drop(columns = ['Type_organ'])
    data = remove_outliers(data)
    data = data[data['TCO2'] < limit]

    return train_test_split(data, test_size=0.05)

#TRAINING THE MODEL: We use Random forest for median and little and GradientBoosting for micro
def training(train, test, size):
    X_train = train.drop(columns = ['TCO2'])
    y_train = train['TCO2']
    X_test = test.drop(columns = ['TCO2'])
    y_test = test['TCO2']
    if size == 'micro':
        reg = ensemble.GradientBoostingRegressor(n_estimators=500, max_depth=16, min_samples_split=5, learning_rate=0.01, random_state=0)
    else:
        reg = RandomForestRegressor(n_estimators = 100, min_samples_split=2, random_state=0, verbose=1)
    reg.fit(X_train, y_train)
    y_pred_t = reg.predict(X_train)
    y_pred = reg.predict(X_test)

    return y_train, y_test, y_pred_t, y_pred, reg

def evaluacio(y_train, y_test, y_pred_t, y_pred):
     error_train = np.mean(np.abs(y_train-y_pred_t)/y_train)
     error_test = np.mean(np.abs(y_test-y_pred)/y_test)
     return error_test, error_train

def predict(data):
    model_type = {
       'Mediana': 'median',
       'Pequeña': 'little',
       'Micro': 'micro',
    }[data['Type_organ'][0]]
    with open(f(model_type + '.pkl'), 'rb') as file:
       model = pickle.load(file)
    with open(f('encoder.pkl'), 'rb') as file:
       encoder = pickle.load(file)
   
    data = data[['Year', 'Sector_organ', 'Auton_community', 'Type_organ', 'Num_empl']]
    data[np.concatenate(encoder.categories_)] = encoder.transform(data[['Sector_organ', 'Auton_community']])
    data.drop(['Sector_organ', 'Auton_community'], axis=1, inplace=True)
    tamaños_dic = {'Gran empresa':0, 'Mediana':1, 'Pequeña':2, 'Micro':3}
    data['Type_organ'] = [tamaños_dic[sec] for sec in data['Type_organ']]
    data.drop('Type_organ', axis=1, inplace=True)
    return model.predict(data)[0]

def main():
    data = pd.read_csv(f('BDEmpreses.csv'), sep = ',')#/Users/carlamiquelblasco/Desktop/sisèquatri/PE/Dades Simulacio/
    #data_model = data[['año', 'sector', 'comunidad', 'Type_organ', 'empleados', 'tco2']]
    #Apply dummies to data
    #data_model = dummies(data)
    #SPLIT DATA INTO MEDIAN, LITTLE AND MICRO SIZE
    data_size, encoder = prepare_data(data)
    train_median, test_median = split(data_size, size = 'median')
    train_little, test_little = split(data_size, size = 'little')
    train_micro, test_micro = split(data_size, size = 'micro')
    #Train different models depending on the size of the business
    y_train_median, y_test_median, y_pred_t_median, y_pred_median, reg_median = training(train_median, test_median, size = 'median')
    y_train_little, y_test_little, y_pred_t_little, y_pred_little, reg_little = training(train_little, test_little, size = 'little')
    y_train_micro, y_test_micro, y_pred_t_micro, y_pred_micro, reg_micro = training(train_micro, test_micro, size = 'micro')
    #Evaluation of the models:
    error_test_median, error_train_median = evaluacio(y_train_median, y_test_median, y_pred_t_median, y_pred_median)
    error_test_little, error_train_little = evaluacio(y_train_little, y_test_little, y_pred_t_little, y_pred_little)
    error_test_micro, error_train_micro = evaluacio(y_train_micro, y_test_micro, y_pred_t_micro, y_pred_micro)

    with open(f('median.pkl'), 'wb') as file:
       pickle.dump(reg_median, file)
    with open(f('little.pkl'), 'wb') as file:
       pickle.dump(reg_little, file)
    with open(f('micro.pkl'), 'wb') as file:
       pickle.dump(reg_micro, file)
    with open(f('encoder.pkl'), 'wb') as file:
       pickle.dump(encoder, file)        

    #Print results 1:
    print('-'*50)
    print('General errors for each model:')
    print('Error trainin median size: ', error_train_median, 'Error test median size: ', error_test_median)
    print('Error trainin little size: ', error_train_little, 'Error test little size: ', error_test_little)
    print('Error trainin micro size: ', error_train_micro, 'Error test micro size: ', error_test_micro)
    print('-'*50)


if __name__ == '__main__':
   main()
