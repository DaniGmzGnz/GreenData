import pandas as pd

from .emision_factors_matrix import creation_matrix
from .attributes import attributes
from .utils import f


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

	#Create a dictionari with the emission factors
	ef_dict = creation_matrix()

	#Calculate the output including the general information of the company and the carbon footprint of each scope
	result = attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)
	
	#We select the necessary parameters for add the information of this company to the database for the model training.
	model_param = result[['Year', 'Name_organ', 'Sector_organ', 'Auton_community', 'Type_organ', 'Num_empl', 'TCO2_total']]
	model_param = model_param.rename(columns = {'TCO2_total':'TCO2'})

	model = pd.read_csv(f("BDEmpreses.csv"), sep=",")
	model = model.append(model_param, ignore_index = True)
	model.to_csv(f('BDEmpreses.csv'), index = False)


	return result  # return as pd.Series

# main()
