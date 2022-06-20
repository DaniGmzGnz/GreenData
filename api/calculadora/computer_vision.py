import cv2
import pytesseract

from google.colab import drive
#drive.mount('/content/drive')

from google.colab.patches import cv2_imshow

import re #regular expression

import pandas as pd
import numpy as np

import os

from .utils import f
from .emision_factors_matrix import creation_matrix

#######################################################################
# DATA
#######################################################################


fossil_fuels = {'b10': 'l', 'b100': 'l', 'b20': 'l', 'b30': 'l', 'b7': 'l',
 'carbon de importacion': 'kg', 'carbon nacional': 'kg', 'cng': 'kg',
 'coque de petroleo': 'kg', 'e10': 'l', 'e100': 'l', 'e5': 'l', 'e85': 'l',
 'fueloleo': 'kg', 'gas butano': 'kg', 'gas natural': 'kwh', 'gas propano': 'kg',
 'gasolina': 'l', 'gasoleo a': 'l', 'gasoleo b': 'l', 'gasoleo c': 'l',
 'h2': 'kg', 'lng': 'kg', 'lpg': 'l', 'xtl': 'l'}

ef_dict = creation_matrix()

GdO = ef_dict['GdO']
combustible = ef_dict['combustible']
combustible.index = [s.lower() for s in combustible.index]


#######################################################################
# MAIN FUNCTIONS
#######################################################################

def find_consumption(text, units = 'kwh'):
  parsed = text.split('\n')

  relevant = []
  for v in parsed:
    if units in v:
      relevant.append(v)

  energy = []
  for v in relevant:
    aux = v.replace(',', '.').split(' ') # to obtain floats
    for idx, w in enumerate(aux):
      if (w == units) and idx > 0:
        try:
          x = float(aux[idx-1])
          energy.append(x)
        except:
          print('Could not convert ' + aux[idx-1] + ' to float')

  if len(energy) > 0:
    return max(energy)
  return -1


def find_year(text):
  years = [str(2011 + i) for i in range(10)]
  year = -1
  for y in years:
    if y in text: year = y

  if year == -1: print('No year found!')
  return year


def extract_fossil(img, combustible = combustible, fossil_fuels = fossil_fuels):
  text = pytesseract.image_to_string(img)
  text = text.lower() # all lowercase letter

  consumption = -1
  for v in fossil_fuels:
    if v in text:
      fuel = v
      units = fossil_fuels[v]
      consumption = find_consumption(text, units)
      if consumption != -1: break

  if consumption == -1:
    print('Did not find the consumption')
    return -1

  year = find_year(text)
  if year == -1: return -1

  emission_factor = combustible.loc[fuel,year]

  return (year, fuel, consumption, units, emission_factor)


def extract_electricity(img, GdO = GdO):
  text = pytesseract.image_to_string(img)
  text = text.lower() # all lowercase letter

  if not ('electric' in text or 'eléctric' in text): return -1

  consumption = find_consumption(text)

  if consumption == -1:
    print('Did not find the consumption')
    return -1

  year = find_year(text)
  if year == -1: return -1

  GdO_year = GdO[[year, 'Mix' + year]].dropna()
  company = 'Other'
  for comp in GdO_year[year]:
    if comp.lower() in text:
      company = comp
      break

  if company == 'Other':
    emission_factor = GdO_year.loc[0,'Mix' + year]
  else:
    emission_factor = GdO_year.loc[GdO[year] == company, 'Mix' + year].values[0]

  return (year, company, consumption, emission_factor)


#######################################################################
# DATAFRAMES
#######################################################################

# two dataframes:
# electric + fossil fuels

df_fossil = pd.DataFrame(columns = ['Year', 'Type_fuel', 'Quant_fuel', 'Units', 'Emission_factor'])
df_elec = pd.DataFrame(columns = ['Year', 'Elect_company', 'Consum (kWh)', 'Emission_factor'])


#######################################################################
# READ IMAGES
#######################################################################

image_folder = f('facturas')
for f in os.listdir(image_folder): #possible images
  img = cv2.imread(f)
  try:
    if img == None: continue
  except:
    res = extract_electricity(img)
    if res != -1:
      df_elec = df_elec.append(pd.Series(res[:], index = df_elec.columns), ignore_index=True)
    else:
      res = extract_fossil(img)
      if res != -1:
        df_fossil = df_fossil.append(pd.Series(res[:], index = df_fossil.columns), ignore_index=True)
    if res != -1: print(' --> ',f, ' good')


#######################################################################
# DF to csv (TBD)
#######################################################################

path = '' # can be changed
df_elec.to_csv(f(path+'cv_elect.csv'), index=False)
df_fossil.to_csv(f(path+'cv_fuel.csv'), index=False)
