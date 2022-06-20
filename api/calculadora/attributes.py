

import pandas as pd

def attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict):
    '''This function return the attributes of the final calculation of the carbon footprint, given the input tables and the emission factors.'''
    #Add new variables initilized at zero:
    cv_fuel['Partial_emissions'] = 0
    cv_elect['Partial_emissions'] = 0

    ic_fuel['Emission_factor'] = 0
    ic_fuel['Partial_emissions'] = 0

    ic_leak_gas['PCA'] = 0
    ic_leak_gas['Partial_emissions'] = 0

    ic_garbage['Emission_factor']=0
    ic_garbage['Partial_emissions']=0

    #We get the year of calculation:
    ic_general.reset_index(drop=True)
    year = int(ic_general['Year'])

    #We get the factor_emissions information:
    ef_fuels1 = ef_dict["combustible"]
    ef_pca_leak_gas = ef_dict["leak_gases"]
    ef_garbage = ef_dict["garbage"]

    #Calculation of the total CO2 emissions coming from the fuels of the computer vision extraction:
    total_cv_fuel = 0.0
    for i in range(0, len(cv_fuel)):
        #We make sure the get the year of the bills match the year of the calculation:
        if (int(cv_fuel.loc[i, 'Year']) == year):
            #Partial calculation of CO2 emission
            cv_fuel.loc[i, "Partial_emissions"] = float(cv_fuel.loc[i, "Quant_fuel"]) * float(cv_fuel.loc[i, "Emission_factor"])
        else:
            print("Error: The year of the bill does not match the year of the calculation. Please, make sure to upload only the year of calculation bills.")

        #Total calculation of cv_fuel
        total_cv_fuel += cv_fuel.loc[i, "Partial_emissions"]

    #Calculation of the total CO2 emissions coming from the fuels of the web extraction:
    num_vehicles = 0
    total_ic_fuel_sc1 = 0.0
    total_ic_fuel_sc3 = 0.0
    for i in range(0,len(ic_fuel)):
        #Extract emission factor
        ic_fuel.loc[i, 'Emission_factor'] = ef_fuels1.loc[str(ic_fuel.iloc[i, 3]), str(year)]

        if ic_fuel.loc[i, 'Option'] == 1:
            #Partial calculation of CO2 emission:
            ic_fuel.loc[i, "Partial_emissions"] = float(ic_fuel.loc[i, "Quant_fuel"]) * float(ic_fuel.loc[i, "Emission_factor"])

        elif ic_fuel.loc[i, 'Option'] == 0: #model, km_traveled -> quant
            #Extracting Quant_fuel:
            ic_fuel.loc[i, 'Quant_fuel'] = float(ic_fuel.loc[i, 'Consum (l/100km)']/100) * float(ic_fuel.loc[i, 'Km_traveled'])
            #Partial calculation of CO2 emission:
            ic_fuel.loc[i, "Partial_emissions"] = float(ic_fuel.loc[i, "Quant_fuel"]) * float(ic_fuel.loc[i, "Emission_factor"])

        #Total calculation of ic_fuel
        num_vehicles += ic_fuel.loc[i, 'Num_vehicles']

        #Separation of the total by the two scopes
        if (ic_fuel.loc[i, 'Type_vehicles'] == 'Interno'):
            total_ic_fuel_sc1 += ic_fuel.loc[i, "Partial_emissions"]
        elif (ic_fuel.loc[i, 'Type_vehicles'] == 'Externo'):
            total_ic_fuel_sc3 += ic_fuel.loc[i, "Partial_emissions"]


    #Calculation of the total CO2 emissions coming from the gas_leaks of the web extraction:
    total_leak_gas = 0.0
    for i in range(0,len(ic_leak_gas)):
        #Extracting PCA:
        aux = ic_leak_gas.loc[i, 'Type_gas']
        aux2 = ef_pca_leak_gas[ef_pca_leak_gas['Type_gas'] == aux]
        ic_leak_gas.loc[i, 'PCA'] = int(aux2['PCA'])


        #Partial calculation of CO2 emission
        ic_leak_gas.loc[i, 'Partial_emissions'] = (float(ic_leak_gas.loc[i, 'Inicial_charge (kg)']) - float(ic_leak_gas.loc[i, 'Annual_charge (kg)']) ) * float(ic_leak_gas.loc[i, 'PCA'])

        #Total calculation of gas_leaks:
        total_leak_gas += ic_leak_gas.loc[i, "Partial_emissions"]

    #Calculation of the total CO2 emissions coming from the electricity of the computer vision extraction:
    total_elect = 0.0
    for i in range(0, len(cv_elect)):
        #We make sure the get the year of the bills match the year of the calculation:
        if (int(cv_elect.loc[i, 'Year']) == year) :
            #Partial calculation of CO2 emission
            cv_elect.loc[i, 'Partial_emissions'] = float(cv_elect.loc[i, 'Consum (kWh)']) * float(cv_elect.loc[i, 'Emission_factor'])
        else:
            print("Error: The year of the bill does not match the year of the calculation. Please, make sure to upload only the year of calculation bills.")

        total_elect += cv_elect.loc[i, 'Partial_emissions']

    #Calculation of the total CO2 emissions coming from the garbage produced coming of the web extraction:
    total_garbage = 0.0
    for i in range(0,len(ic_garbage)):
        #Extracting factor_emissions:
        ic_garbage.loc[i, 'Emission_factor'] = ef_garbage.loc[ic_garbage.loc[i, 'Type_waste'], 'Factor_emission']

        #Partial calculation of CO2 emission
        ic_garbage.loc[i, 'Partial_emissions'] = float(ic_garbage.loc[i, 'Quantity(kg)']) * float(ic_garbage.loc[i, 'Emission_factor'])

        #Total calculation of garbage:
        total_garbage += ic_garbage.loc[i, "Partial_emissions"]

    total_emissions_per_inst_type_sc_1_2 = total_cv_fuel + total_ic_fuel_sc1 + total_leak_gas + total_elect
    total_emissions_per_inst_type_sc_3 = total_ic_fuel_sc3 + total_garbage
    total_emissions = total_emissions_per_inst_type_sc_1_2 + total_emissions_per_inst_type_sc_3

    #Database with all the information:
    #Output --> Year | Name_organ | Sector_organ | Auton_community | Type_organ | Num_empl | Surface | Num_vehicles | kgCO2_sc_1_2 | kgCO2_sc_3 | kgCO2_total| TCO2_sc_1_2 | TCO2_sc_3 | TCO2_total
    ic_general['Num_vehicles'] = num_vehicles
    ic_general['kgCO2_sc_1_2'] = total_emissions_per_inst_type_sc_1_2
    ic_general['kgCO2_sc_3'] = total_emissions_per_inst_type_sc_3
    ic_general['kgCO2_total'] = total_emissions
    ic_general['total_ic_fuel_sc1'] = total_ic_fuel_sc1
    ic_general['total_ic_fuel_sc3'] = total_ic_fuel_sc3
    ic_general['total_leak_gas'] = total_leak_gas
    ic_general['total_elect'] = total_elect
    ic_general['total_cv_fuel'] = total_cv_fuel
    ic_general['total_garbage'] = total_garbage
    ic_general['TCO2_sc_1_2'] =  float(ic_general['kgCO2_sc_1_2']) * 0.001
    ic_general['TCO2_sc_3'] =  float(ic_general['kgCO2_sc_3']) * 0.001
    ic_general['TCO2_total'] =  float(ic_general['kgCO2_total']) * 0.001

    #ML Model database with the following information: #Year | Name_organ | Sector_organ | Auton_community | Type_organ | Num_empl | TCO2

    #we want to keep as well the dataframes cv_fuel, ic_fuel, cv_elect, ic_leak_gas, ic_garbage
    return ic_general
