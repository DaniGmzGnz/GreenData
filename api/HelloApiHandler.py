from flask_restful import Api, Resource, reqparse
import pandas as pd

from .calculadora.calculadora import main
from .model.modelo import predict
from .calculadora.utils import f

def write_input_data(args, only_general=False):
   print(args)

   read = lambda s: pd.read_csv(f("DEFAULT_" + s + ".csv"), header=0, sep=";")
   write = lambda df, s: df.to_csv(f(s + ".csv"), sep=";", index=False)

   s = "ic_general"
   df = read(s)
   df["Num_empl"] = args.data["number"]
   df["Auton_community"] = args.data["autonom"]
   df["Name_organ"] = args.data["name"]
   df["Sector_organ"] = args.data["sector"]
   df["Surface(m2)"] = args.data["sup"]
   df["Type_organ"] = args.data["type"]
   df["Year"] = args.data["year"]

   if only_general:
      return df
   
   write(df, s)

   s = "ic_fuel"
   df = pd.DataFrame()
   data1 = pd.DataFrame(args.data1)
   df["Name_inst"] = None
   df["Num_vehicles"] = data1["num"]
   df["Type_vehicles"] = data1["type"]
   df["Type_fuel"] = data1["type_fuel"]
   df["Option"] = data1["option"]
   df["Quant_fuel"] = data1["quantity"]
   df["Consum (l/100km)"] = data1["consum"]
   df["Km_traveled"] = data1["km"]
   write(df, s)

   s = "ic_leak_gas"
   df = pd.DataFrame()
   data2 = pd.DataFrame(args.data2)
   df["Name_inst"] = data2["name_inst"]
   df["Type_gas"] = data2["name_gas"]
   df["Inicial_charge (kg)"] = data2["equipment_charge"]
   df["Annual_charge (kg)"] = data2["anual_charge"]
   write(df, s)

   s = "ic_garbage"
   df = pd.DataFrame()
   data3 = pd.DataFrame(args.data3)
   df["Name_inst"] = None
   df["Quantity(kg)"] = data3["quantity_waste"]
   df["Type_waste"] = data3["type_waste"]
   write(df, s)

class HelloApiHandler(Resource):

  def get(self):  
     return {
        "resultStatus": "200",
        "message": "all ok"
     }

  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("data", type=dict)
    parser.add_argument("data1", type=dict, action="append")
    parser.add_argument("data2", type=dict, action="append")
    parser.add_argument("data3", type=dict, action="append")
    args = parser.parse_args()
    print(args.data2[0])
    write_input_data(args)
    res = main()
    # print(res)
    return {
         "resultStatus": "SUCCESS",
         "message": f"api handler, received name: {args.data['name']}",
         "result": res.to_dict()
      }

class PredictionApiHandler(Resource):

  def get(self):  
     return {
        "resultStatus": "200",
        "message": "prediction all ok"
     }

  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument("data", type=dict)
    args = parser.parse_args()
    df = write_input_data(args, only_general=True)
    res = predict(df)
    print(res)
    return {
         "resultStatus": "SUCCESS",
         "message": f"api handler, received name: {args.data['name']}",
         "result": res
      }
