import random
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from .emision_factors_matrix import creation_matrix
from .attributes import attributes
from .utils import f

'''Variables que tenim per canviar total = 10'''
'''Les variables són:
ic_fuel: files (0), num_vechicles(1), km_traveled/quant_fuel(2)
ic_garbage: files(3), quantity(4)
ic_leak_gas: files(5), initial_charge(6), annual_charge(7)
cv_elect: consum(8)
cv_fuel: quant_fuel(9)
'''
#CANVIAR FILES???? si maxim aspirem a un 10% i el nombre de files es petit al voltant de 5,
#no canviarem cap fila mai
#Consum cas base: 39.928424 TCO2



def main():

    #Define number of iterations
    iter = 1000
    #Create a dictionari with the emission factors
    ef_dict = creation_matrix()
    #Farem 1000 proves
    values = np.zeros(iter) #sin alcance 3
    values2 = np.zeros(iter) #con alcance 3

    #Calculem càlcula de referència: amb la calculadora de l'estat i amb la de GreenData
    ref_estat = [22.28591, 112.29005, 489.42607] # [Empresa 0, Empresa 1, Empresa2]
    ref_greendata = np.zeros(3) # [Empresa 0, Empresa 1, Empresa2]
    #Empresa 0
    ic_general = pd.read_csv(f("ic_general.csv"), header=0, sep=";")
    ic_fuel = pd.read_csv(f("ic_fuel.csv"), header=0, sep=";")
    ic_leak_gas = pd.read_csv(f("ic_leak_gas.csv"), header=0, sep=";")
    ic_garbage = pd.read_csv(f("ic_garbage.csv"), header = 0, sep=";")
    cv_fuel = pd.read_csv(f("cv_fuel.csv"), header = 0, sep=",")
    cv_elect = pd.read_csv(f("cv_elect.csv"), header = 0, sep=",")
    ref_greendata[0] = np.float(attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)['TCO2_total'])
    #Empresa 1
    ic_general = pd.read_csv(f("ic_general2.csv"), header=0, sep=";")
    ic_fuel = pd.read_csv(f("ic_fuel2.csv"), header=0, sep=";")
    ic_leak_gas = pd.read_csv(f("ic_leak_gas2.csv"), header=0, sep=";")
    ic_garbage = pd.read_csv(f("ic_garbage2.csv"), header = 0, sep=";")
    cv_fuel = pd.read_csv(f("cv_fuel2.csv"), header = 0, sep=",")
    cv_elect = pd.read_csv(f("cv_elect2.csv"), header = 0, sep=",")
    ref_greendata[1] = np.float(attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)['TCO2_total'])
    #Empresa 2
    ic_general = pd.read_csv(f("ic_general3.csv"), header=0, sep=";")
    ic_fuel = pd.read_csv(f("ic_fuel3.csv"), header=0, sep=";")
    ic_leak_gas = pd.read_csv(f("ic_leak_gas3.csv"), header=0, sep=";")
    ic_garbage = pd.read_csv(f("ic_garbage3.csv"), header = 0, sep=";")
    cv_fuel = pd.read_csv(f("cv_fuel3.csv"), header = 0, sep=",")
    cv_elect = pd.read_csv(f("cv_elect3.csv"), header = 0, sep=",")
    ref_greendata[2] = np.float(attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)['TCO2_total'])

    #We iter for 3 diferent real companies cases
    for empresa in range(0,3):
        print("empresa:")
        print(empresa)
        for i in range(0,iter):
            print(i)
            #Read information provided by the company in csv depending on the company:
            if (empresa == 0):
                ic_general = pd.read_csv(f("ic_general.csv"), header=0, sep=";")
                ic_fuel = pd.read_csv(f("ic_fuel.csv"), header=0, sep=";")
                ic_leak_gas = pd.read_csv(f("ic_leak_gas.csv"), header=0, sep=";")
                ic_garbage = pd.read_csv(f("ic_garbage.csv"), header = 0, sep=";")
                cv_fuel = pd.read_csv(f("cv_fuel.csv"), header = 0, sep=",")
                cv_elect = pd.read_csv(f("cv_elect.csv"), header = 0, sep=",")
            elif (empresa == 1):
                ic_general = pd.read_csv(f("ic_general2.csv"), header=0, sep=";")
                ic_fuel = pd.read_csv(f("ic_fuel2.csv"), header=0, sep=";")
                ic_leak_gas = pd.read_csv(f("ic_leak_gas2.csv"), header=0, sep=";")
                ic_garbage = pd.read_csv(f("ic_garbage2.csv"), header = 0, sep=";")
                cv_fuel = pd.read_csv(f("cv_fuel2.csv"), header = 0, sep=",")
                cv_elect = pd.read_csv(f("cv_elect2.csv"), header = 0, sep=",")
            elif (empresa == 2):
                ic_general = pd.read_csv(f("ic_general3.csv"), header=0, sep=";")
                ic_fuel = pd.read_csv(f("ic_fuel3.csv"), header=0, sep=";")
                ic_leak_gas = pd.read_csv(f("ic_leak_gas3.csv"), header=0, sep=";")
                ic_garbage = pd.read_csv(f("ic_garbage3.csv"), header = 0, sep=";")
                cv_fuel = pd.read_csv(f("cv_fuel3.csv"), header = 0, sep=",")
                cv_elect = pd.read_csv(f("cv_elect3.csv"), header = 0, sep=",")

            #Separem entre alcance 1 i 2 i l'alcance 3
            for alcance in range(0,2):
                #Cuandlo alcance = 0, modificaremos solo el input de alcance 1 y 2
                #Cuando alcance = 1, modificaremos solo el input de alcance 3 (el de 1y2 ya estará modificado)
                if (alcance == 0):
                    ic_garbage = pd.read_csv(f("ic_garbage_sin_alcance_3.csv"), header = 0, sep=";")
                elif (alcance == 1):
                    if(empresa == 0):
                        ic_garbage = pd.read_csv(f("ic_garbage.csv"), header = 0, sep=";")
                    if(empresa == 1):
                        ic_garbage = pd.read_csv(f("ic_garbage2.csv"), header = 0, sep=";")
                    if(empresa == 2):
                        ic_garbage = pd.read_csv(f("ic_garbage3.csv"), header = 0, sep=";")

                #Triem quin tant per cent de les variables modificarem (entre un 20% i un 80%)
                rand_variables = random.randint(2,8) #canviarem de 2 a 8 variables de els 10 que tenim
                indx_var = random.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], rand_variables)

                #generarem nombre aleatori de -10 a 10 per disminuir o augmentar en un 10% el valor d'aquelles Variables
                for j in range(0,rand_variables):
                    rand_variables2 = random.randint(-10,10)

                    if (indx_var[j] == 0 and alcance == 0):
                        #canviar files de ic_fuel
                        canv_files = int((rand_variables2/100)*len(ic_fuel))
                        if (canv_files < 0):
                            files = random.sample(list(range(0,len(ic_fuel))), -canv_files)
                            ic_fuel.drop(files, axis=0)
                        elif(canv_files >= 0):
                            files = random.sample(list(range(0,len(ic_fuel))), canv_files)
                            for fila in files:
                                ic_fuel.loc[len(ic_fuel)] = ic_fuel.loc[fila]

                    elif (indx_var[j] == 1 and alcance == 0):
                        #per cada fila de ic_fuel
                        for k in range(0,len(ic_fuel)):
                            ic_fuel.loc[k, 'Num_vehicles'] = ic_fuel.loc[k, 'Num_vehicles'] + int(ic_fuel.loc[k, 'Num_vehicles']*rand_variables2/100)

                    elif(indx_var[j] == 2 and alcance == 0):
                        #per cada fila de ic_fuel
                        for k in range(0,len(ic_fuel)):
                            if (ic_fuel.loc[k, 'Option']==1): #quant_fuel
                                ic_fuel.loc[k, 'Quant_fuel'] = ic_fuel.loc[k, 'Quant_fuel'] + ic_fuel.loc[k, 'Quant_fuel']*rand_variables2/100
                            else: #km_traveled
                                ic_fuel.loc[k, 'Km_traveled'] = ic_fuel.loc[k, 'Km_traveled'] + ic_fuel.loc[k, 'Km_traveled']*rand_variables2/100

                    elif(indx_var[j] == 3 and alcance == 1):
                        #canviar files de ic_garbage
                        canv_files = int((rand_variables2/100)*len(ic_garbage))
                        if (canv_files < 0):
                            files = random.sample(list(range(0,len(ic_garbage))), -canv_files)
                            ic_garbage.drop(files, axis=0)
                        elif(canv_files >= 0):
                            files = random.sample(list(range(0,len(ic_garbage))), canv_files)
                            for fila in files:
                                ic_garbage.loc[len(ic_garbage)] = ic_garbage.loc[fila]

                    elif(indx_var[j] == 4 and alcance == 1): #quantity garbage
                        for k in range(0,len(ic_garbage)):
                            ic_garbage.loc[k,'Quantity(kg)'] = ic_garbage.loc[k,'Quantity(kg)'] + ic_garbage.loc[k, 'Quantity(kg)']*rand_variables2/100

                    elif(indx_var[j] == 5 and alcance == 0):
                        #canviar files de ic_leak_gas
                        canv_files = int((rand_variables2/100)*len(ic_leak_gas))
                        if (canv_files < 0):
                            files = random.sample(list(range(0,len(ic_leak_gas))), -canv_files)
                            ic_leak_gas.drop(files, axis=0)
                        elif(canv_files >= 0):
                            files = random.sample(list(range(0,len(ic_leak_gas))), canv_files)
                            for fila in files:
                                ic_leak_gas.loc[len(ic_leak_gas)] = ic_leak_gas.loc[fila]

                    elif(indx_var[j] == 6 and alcance == 0): #initial_charge ic_leak_gas
                        for k in range(0, len(ic_leak_gas)):
                            ic_leak_gas.loc[k,'Inicial_charge (kg)'] = ic_leak_gas.loc[k,'Inicial_charge (kg)'] + ic_leak_gas.loc[k, 'Inicial_charge (kg)']*rand_variables2/100

                    elif(indx_var[j] == 7 and alcance == 0): #annual_charge ic_leak_gas
                        for k in range(0, len(ic_leak_gas)):
                            ic_leak_gas.loc[k,'Inicial_charge (kg)'] = ic_leak_gas.loc[k,'Inicial_charge (kg)'] + ic_leak_gas.loc[k, 'Inicial_charge (kg)']*rand_variables2/100

                    elif(indx_var[j] == 8 and alcance == 0): #consum cv_elect
                        cv_elect.loc[0,'Consum (kWh)'] = cv_elect.loc[0,'Consum (kWh)'] + cv_elect.loc[0,'Consum (kWh)']*rand_variables2/100

                    elif(indx_var[j] == 9 and alcance == 0): #quant_fuel cv_fuel
                        cv_fuel.loc[0,'Quant_fuel'] = cv_fuel.loc[0,'Quant_fuel'] + cv_fuel.loc[0,'Quant_fuel']*rand_variables2/100
                if (alcance == 0):
                    values[i] = np.float(attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)['TCO2_total'])
                elif (alcance == 1):
                    values2[i] = np.float(attributes(cv_fuel, cv_elect, ic_general, ic_fuel, ic_leak_gas, ic_garbage, ef_dict)['TCO2_total'])

        data = [values, values2]
        fig, ax = plt.subplots()
        titulo = str('Empresa ' + ic_general.loc[0, 'Name_organ'])
        ax.set_title(titulo)
        ax.set_xlabel("Abasts")
        ax.set_ylabel('TCO2')
        ax.scatter(1, ref_estat[empresa], c='r')
        ax.text(1.1, ref_estat[empresa], "Estat")
        ax.scatter(1, ref_greendata[empresa], c='g')
        ax.text(1.1, ref_greendata[empresa], "GreenData")
        ax.set_xticklabels(['1+2', '1+2+3'])
        ax.scatter(2, ref_estat[empresa], c='r')
        ax.text(2.1, ref_estat[empresa], "Estat")
        ax.scatter(2, ref_greendata[empresa], c='g')
        ax.text(2.1, ref_greendata[empresa], "GreenData")
        ax.hlines(y=ref_estat[empresa], xmin=1, xmax=2, color='r', ls='dashed')
        ax.hlines(y=ref_greendata[empresa], xmin=1, xmax=2, color='g', ls='dashed')
        ax.boxplot(data, vert = True, meanline = True, flierprops= dict(marker='o', markerfacecolor='white', markersize=3.5, markeredgecolor='black'))
        nombre_save = 'boxplot' + str(empresa) + '.png'
        plt.savefig(nombre_save)

main()
