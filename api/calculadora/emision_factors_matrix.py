import pandas as pd
from .utils import f

def creation_matrix():
    '''This function returns a dictionari of dataframes. Each data frame is the emission factor of some contamination parameters (fossil fuels, facto emission CO2, leak_gases, GdO, garbage).'''
    
    combustible = pd.read_csv(f('combustible.csv'), header = 0, index_col = 0, encoding='latin-1')
    factor_emision_CO2 = pd.read_csv(f('factor_emision_CO2.csv'), header = 0, index_col = 0, encoding='latin-1')
    leak_gases = pd.read_csv(f('leak_gases.csv'), header = 0, index_col = 0, encoding='latin-1')
    GdO = pd.read_csv(f('GdO.csv'), header = 0, sep = ';', decimal=',',
                  dtype = dict([(i,float) for i in range(1, 20, 2)]))
    garbage = pd.read_csv(f('garbage.csv'), header = 0, index_col = 0, encoding='latin-1')

    dfs = {}
    dfs["combustible"] = combustible
    dfs["factor_emision_CO2"] = factor_emision_CO2
    dfs["leak_gases"] = leak_gases
    dfs["GdO"] = GdO
    dfs["garbage"] = garbage

    return dfs
