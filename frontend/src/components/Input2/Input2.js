import React,  {Component, useState} from 'react';
import styled, { createGlobalStyle } from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";
import './Input2.css';

const FormInput = React.forwardRef((props, ref) => {
    //   console.log("FormInput", props);
      const [field, fieldOptions, rest] = splitFormProps(props);
      const inputField = useField(field, fieldOptions);
      const { meta, getInputProps } = inputField;
      const { error, isTouched, isValidating } = meta;
      return (
        <>
          <input class="first-input" key={props.field} {...getInputProps({ ref, ...rest })} />
          {isValidating ? (
            <em>Validando...</em>
          ) : isTouched && error ? (
            <em>{error}</em>
          ) : null}
        </>
      );
    });

const ReactForm = props => {

    const [globalData, setGlobalData] = useState({
      data: [],
    })

 
   console.log('Global Data: ', globalData)
 
   const defaultValues = React.useMemo(
     () => ({
       name: "",
       type: "",
       sector: "",
       autonom: "",
       number: "",
       sup: "",
       year: ""
     }),
     []
   );
 
   // const chooseFile = document.getElementById("fileupl");
   // const imgPreview = document.getElementById("img-preview");
 
   // chooseFile.addEventListener("change", function () {
   //   getImgData();
   // });
 
   // function getImgData() {
   //   const files = chooseFile.files[0];
   //   if (files) {
   //     const fileReader = new FileReader();
   //     fileReader.readAsDataURL(files);
   //     fileReader.addEventListener("load", function () {
   //       imgPreview.style.display = "block";
   //       imgPreview.innerHTML = '<img src="' + this.result + '" />';
   //     });    
   //   }
   // }
 
   // SEND MESSAGE TO BACKEND //
   const onSubmit =  (values, instance) => {
     //console.log("Form values:", values);
     setGlobalData(oldData => ({...oldData, data: values}))
     const message = {...globalData, data: values}
     const requestOptions = {
       method: 'POST',
       cache: 'no-cache',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(message)
    };
    console.log('MENSAJE: ', message)
    fetch('http://greendata.herokuapp.com/flask/predict', requestOptions)
          .then(response => response.json())
          .then(response => {
             console.log('message from api', response)
             props.onResultChange({prediction: response.result})
          })
   };
  
   const form = useForm({ defaultValues, onSubmit });
   const { Form, meta } = form;
   const { isSubmitting, canSubmit } = meta;
 
   
   return (
     <div class="style">
       <Form>
         <aside>
           <section>
             <label class="label">
               Nombre Organización: <FormInput class="first-input" field="name" placeholder="Farmácia Manolo"/>
             </label>
             <label class="label">
               Tipo Organización: <FormInput class="first-input" field="type" placeholder="Micro Entidad"/>
             </label>
             <label class="label">
               Sector Organización: <FormInput class="first-input" field="sector" placeholder="Farmacéutica"/>
             </label>
             <label class="label">
               C. Autónoma: <FormInput class="first-input" field="autonom" placeholder="Cataluña"/>
             </label>
             <label class="label">
               Nº Empleados: <FormInput class="first-input" field="number" placeholder="32"/>
             </label>
             <label class="label">
               Superfície de la instalación (m^2): <FormInput class="first-input" field="sup" placeholder="122"/>
             </label>
             <label class="label">
               Año: <FormInput class="first-input" field="year" placeholder="2022"/>
             </label>
           </section>
 
         </aside>
         <br/><br/><br/>
         <aside class="div-bajo">
           <section>
             <div class="box-notes">
             <p>
               Escribe cualquier comentario aquí: <br/><br/><input class="notes" as={FormInput} field="notes" />
             </p>
             </div>
           </section>
           <section>
             <button to='../result' class="submit_button" type="submit" disabled={!canSubmit} >
               Enviar datos
             </button>
           </section>
         </aside>
       </Form>
     </div>
   );
 };



const Main = styled.main`
  align-content: center;
  border-radius: 10px;
  padding: 10px;
  h1 {
    text-align: center;
  }
  background-color: rgb(243, 249, 235);
`;

const Input2 = (props) => {
    return (
        <Main>
          <br></br><br></br>
          <h1>FORMULARIO DE DATOS DE LA EMPRESA</h1>
          <ReactForm class="input-form" onResultChange={props.onResultChange}/>
        </Main>
      );

}
export default Input2
