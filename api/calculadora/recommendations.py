import pandas as pd
import numpy as np

from .emision_factors_matrix import creation_matrix
from .attributes import attributes
from .utils import f


def reduce_gas(tco2_red_gas, cv_fuel_t):
    cv_fuel_sort = cv_fuel_t.sort_values(by=['Emission_factor'], ascending=False)
    gas_del = []
    tco2_gas_reduced = 0
    for idx, row in cv_fuel_sort.iterrows():
        if tco2_red_gas <= 0:
            continue
        elif tco2_red_gas - row['Partial_emissions'] >= 0:
            gas_del.append(row)
            tco2_red_gas -= row['Partial_emissions']
            tco2_gas_reduced += row['Partial_emissions']
        else:
            gas_del.append(row)
            gas_del[-1]['Partial_emissions'] = tco2_red_gas
            tco2_gas_reduced += tco2_red_gas
            gas_del[-1]['Quant_fuel'] = tco2_red_gas/row['Emission_factor']
            tco2_red_gas = 0
    gas_del = pd.DataFrame(gas_del)

    return gas_del, tco2_gas_reduced
 

def reduce_fuel(tco2_red_fuel, ic_fuel_t):
    fuel_int = ic_fuel_t.loc[ic_fuel_t.Type_vehicles == 'Interno']
    fuel_int = fuel_int.sort_values(by=['Emission_factor'], ascending=False)
    tco2_fuel_reduced = 0
    fuel_del = []
    for idx, row in fuel_int.iterrows():
        if tco2_red_fuel <= 0:
            continue
        elif tco2_red_fuel - row['Partial_emissions'] >= 0:
            fuel_del.append(row)
            tco2_red_fuel -= row['Partial_emissions']
            tco2_fuel_reduced += row['Partial_emissions']
        else:
            fuel_del.append(row)
            fuel_del[-1]['Partial_emissions'] = tco2_red_fuel
            tco2_fuel_reduced += tco2_red_fuel
            fuel_del[-1]['Quant_fuel'] = tco2_red_fuel/float(row['Emission_factor'])
            tco2_red_fuel = 0
    fuel_del = pd.DataFrame(fuel_del)
    fuel_del = fuel_del[['Num_vehicles','Type_fuel','Quant_fuel','Partial_emissions']]

    return fuel_del, tco2_fuel_reduced


def reduce_electricity(tco2_red_elect, cv_elect_t):
    elect = cv_elect_t.sort_values(by=['Emission_factor'], ascending=False)
    tco2_elect_reduced = 0
    elect_del = []
    for idx, row in elect.iterrows():
        if tco2_red_elect <= 0:
            continue
        elif tco2_red_elect - row['Partial_emissions'] >= 0:
            elect_del.append(row)
            tco2_red_elect -= row['Partial_emissions']
            tco2_elect_reduced += row['Partial_emissions']
        else:
            elect_del.append(row)
            elect_del[-1]['Partial_emissions'] = tco2_red_elect
            tco2_elect_reduced += tco2_red_elect
            elect_del[-1]['Consum (kWh)'] = tco2_red_elect/row['Emission_factor']
            tco2_red_elect = 0
    elect_del = pd.DataFrame(elect_del)

    return elect_del, tco2_elect_reduced


def recommendations(reduction, result, cv_elect_t, cv_fuel_t, ic_fuel_t):

    reductions = {}
    measures = {}

    tco2 = result['TCO2_total'][0]
    tco2_red_orig = (reduction) * tco2

    if reduction > 1:
        tco2_red_orig = tco2
        print('Not possible to reduce more than the total TCO2')

    for part_tco2_red in [0, 0.25, 0.5, 0.75, 1]:

        elect_del = []
        fuel_del = []
        gas_del = []

        tco2_red = tco2_red_orig  # lo que queda por reducir
        tco2_red_elect = part_tco2_red*tco2_red  # tco2_red_elect = lo que queda por reducir de electricidad
        elect_del, tco2_elect_reduced = reduce_electricity(tco2_red_elect, cv_elect_t) 
        tco2_red = tco2_red_orig - tco2_elect_reduced

        if tco2_red > 0:
            tco2_red_fuel = tco2_red
            fuel_del, tco2_fuel_reduced = reduce_fuel(tco2_red_fuel, ic_fuel_t)
            tco2_red = tco2_red - tco2_fuel_reduced
        else:
            tco2_fuel_reduced = 0

        if tco2_red > 0:
            tco2_red_gas = tco2_red
            gas_del, tco2_gas_reduced = reduce_gas(tco2_red_gas, cv_fuel_t)
            tco2_red -= tco2_gas_reduced
        else:
            tco2_gas_reduced = 0

        
        reductions[part_tco2_red] = {
            'TCO2 electricity': tco2_elect_reduced, 
            'TCO2 fuel': tco2_fuel_reduced, 
            'TCO2 gas': tco2_gas_reduced, 
            'left TCO2': tco2_red
        }
        measures[part_tco2_red] = {
            'Measures electricity': elect_del, 
            'Measures fuel': fuel_del, 
            'Measures gas': gas_del
        }

    return reductions, measures


def main():
    '''Given the input tables of a company, defined one concrete year, return the carbon footprint of this company for that year including:
    General information of the company, carboon footprint by scopes, and carbon footprint in tones by scopes.'''

    #Read information provided by the company in csv:
    ic_general = pd.read_csv(f("ic_general.csv"), header=0, sep=";")
    ic_fuel = pd.read_csv(f("ic_fuel.csv"), header=0, sep=";")
    ic_leak_gas = pd.read_csv(f("ic_leak_gas.csv"), header=0, sep=";")
    ic_garbage = pd.read_csv(f("ic_garbage.csv"), header = 0, sep=";")
    cv_fuel = pd.read_csv(f("cv_fuel.csv"), header = 0, sep=",")
    cv_elect = pd.read_csv(f("cv_elect.csv"), header = 0, sep=",")

    cv_elect_new = cv_elect.copy()
    cv_elect_new['Consum (kWh)'] = 20000

    ic_leak_gas_new = ic_leak_gas.copy()
    ic_leak_gas_new['Inicial_charge (kg)'] /= 10
    ic_leak_gas_new['Annual_charge (kg)'] /= 10

    #Create a dictionary with the emission factors
    ef_dict = creation_matrix()

    #Calculate the output including the general information of the company and the carbon footprint of each scope
    result = attributes(cv_fuel, cv_elect_new, ic_general, ic_fuel, ic_leak_gas_new, ic_garbage, ef_dict)
    
    #Set CO2 emissions and factors to tones
    ic_fuel_t = ic_fuel.copy()
    ic_fuel_t['Partial_emissions'] = ic_fuel_t['Partial_emissions'].astype(float)/1000
    ic_fuel_t['Emission_factor'] = ic_fuel_t['Emission_factor'].astype(float)/1000

    cv_fuel_t = cv_fuel.copy()
    cv_fuel_t['Partial_emissions'] = cv_fuel_t['Partial_emissions'].astype(float)/1000
    cv_fuel_t['Emission_factor'] = cv_fuel_t['Emission_factor'].astype(float)/1000

    cv_elect_t = cv_elect_new.copy()
    cv_elect_t['Emission_factor'] = cv_elect_t['Emission_factor'].astype(float)/1000
    cv_elect_t['Partial_emissions'] = cv_elect_t['Consum (kWh)']*cv_elect_t['Emission_factor']

    reduction = 0.1
    
    reductions, measures = recommendations(reduction, result, cv_elect_t, cv_fuel_t, ic_fuel_t)
    #print(reductions)
    #print(measures)
    print(result['TCO2_total'])
    print(result['TCO2_sc_1_2'])
    print(result['TCO2_sc_3'])
    #print(result['total_leak_gas'])
    #print(result['total_elect'])
    #print(result['total_ic_fuel_sc1'])
    #print(result['total_cv_fuel'])

    reductions_df = pd.DataFrame.from_dict(reductions, orient='index')
    reductions_df.to_csv(f'reductions_{int(reduction*100)}.csv')

    measures_df = pd.DataFrame.from_dict(measures, orient='index')
    measures_df.to_csv(f'measures_{int(reduction*100)}.csv', sep=';')

    return reductions, measures



# main()