from pathlib import Path

DATA_PATH = Path(__file__).parent.joinpath('database')

def f(p):
   return str(DATA_PATH.joinpath(p))

