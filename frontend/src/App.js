import React,  {Component, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header'

// import InputFile from './components/InputFile';
import Invoice from './components/InputVariables/InputVariables';
import Main from './components/Main/main';
import Result from './components/Result/Result';
import Recommend from './components/Recommend/Recommend';
import Input2 from './components/Input2/Input2';
import Result2 from './components/Result2/Result2';

class App extends React.Component {

   constructor(props) {
      super(props)
      this.handleResultChange = this.handleResultChange.bind(this)
      this.state = {
         Year: [2022],
         Name_organ: ["Empresa X"],
         total_cv_fuel: [6],
         total_elect: [2.5], 
         total_garbage: [3],
         total_leak_gas: [4],
         total_ic_fuel_sc1: [2],
         total_ic_fuel_sc3: [5],
         kgCO2_sc_1_2: [14.5],
         kgCO2_sc_3: [8],
         kgCO2_total: [22.5],
         prediction: 0,
      }
   }

   handleResultChange(result) {
      this.setState({...this.state, ...result})
      console.log('state', this.state)
   }

   render() {
      return (
         <BrowserRouter>
           <Header/>
             <Routes>
               <Route exact path='/' element={<Main />}/>
               <Route exact path='/input' element={<Invoice class='input-form' onResultChange={this.handleResultChange}/>}/>
               <Route path='/result' element={<Result result={this.state} />}/>
               <Route exact path='/input2' element={<Input2 class='input-form' onResultChange={this.handleResultChange}/>}/>
               <Route path='/result2' element={<Result2 result={this.state} />}/>
               <Route path='/recommend' element={<Recommend result={this.state}/>}/>
             </Routes>
         </BrowserRouter>
       )
   }

  }

export default App;
