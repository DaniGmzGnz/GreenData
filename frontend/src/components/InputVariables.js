import React, {useState} from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { useForm, useField, splitFormProps } from "react-form";
import { useTable } from "react-table";
import FileUploader from "./FileUploader";
import './InputVariables.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'




const TableInput = props => {
//   console.log("TableInput", props);
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return <input class="table-input" type="number" value={cell.value} onChange={onChange} />;
};

const TableInputCombustible = props => {
    const { column, row, cell, updateData } = props;
    const onChange = e => updateData(row.index, column.id, e.target.value);
    return (
    <>
      <select name="combustible" class="table-input"  value={cell.value} onChange={onChange}>
        <option value=""> Elige una opción </option>
        <option value="E10">E10</option>
        <option value="E5">E5</option>
      </select>
    </>
    );
  };

const TableInputVehiculo = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <select name="vehiculo" class="table-input"  value={cell.value} onChange={onChange}>
      <option value=""> Elige una opción </option>
      <option value="intern">Interno</option>
      <option value="extern">Externo</option>
    </select>
  </>
  );
};

const TableInputOption = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <select name="option" class="table-input"  value={cell.value} onChange={onChange}>
      <option value=""> Elige una opción </option>
      <option value="0">Cantidad Combustible</option>
      <option value="1">Kilómetros Recorridos</option>
    </select>
  </>
  );
};

const TableInputModelo = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <select name="modelo" class="table-input"  value={cell.value} onChange={onChange}>
      <option value=""> Elige una opción </option>
      <option value="audi">Audi</option>
      <option value="bmw">BMW</option>
      <option value="volkswagen">Volkswagen</option>
    </select>
  </>
  );
};

const TableInputNombre = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <input name="nombre-instalacion" type="text" class="table-input"  value={cell.value} onChange={onChange}>
    </input>
  </>
  );
};

const TableInputGas = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <select name="gas" class="table-input"  value={cell.value} onChange={onChange}>
      <option value=""> Elige una opción </option>
      <option value="R-404A">R-404A</option>
      <option value="R-424A">R-424A</option>
    </select>
  </>
  );
};

const TableInputResiduo = props => {
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return (
  <>
    <select name="residuo" class="table-input"  value={cell.value} onChange={onChange}>
      <option value=""> Elige una opción </option>
      <option value="Paper">Papel</option>
      <option value="Plastic">Plástico</option>
    </select>
  </>
  );
};


const StyledTable = styled.table`
  justify-content: center;
  align-self: center;
  width: 100%;
  border: 1.5px solid #000;
  border-radius: 5px;
  padding-bottom: 20px;
  background-color: #c7e8c4;
  th {
    padding: 8px;
    width: 30%;
    text-align: center;
  }
  td {
    width: 30%;
    text-align: center;
    border-top: 0.75px solid black;
    padding: 8px;
  }
`;


const ReactTable1 = React.memo(({ updateFunc}) => {
//   console.log("ReactTable", props);
  const columns = React.useMemo(
    () => [
      {
        Header: "Nº Vehículos",
        accessor: "num",
        Cell: TableInput
      },
      {
        Header: "Tipo Vehículo",
        accessor: "type",
        Cell: TableInputVehiculo
      },
      {
        Header: "Tipo Combustible",
        accessor: "type_fuel",
        Cell: TableInputCombustible
      },
      {
        Header: "Opción",
        accessor: "option",
        Cell: TableInputOption
      },
      {
        Header: "Cantidad de combustible (litros)",
        accessor: "quantity",
        Cell: TableInput
      },
      {
        Header: "Consumo (l/100km)",
        accessor: "consum",
        Cell: TableInput
      },
      {
        Header: "Kilómetros Recorridos",
        accessor: "km",
        Cell: TableInput
      }
    ],
    []
  );
  const initialData = [
    {
      num: "1",
      type: "",
      type_fuel: "",
      option: 0,
      quantity: 2,
      consum: 0,
      km: 321
    },
    {
      num: "1",
      type: "",
      type_fuel: "",
      option: 0,
      quantity: 4,
      consum: 0,
      km: 124
    }
  ];

  const [data, setData] = React.useState(initialData);
  //console.log("DATA_table1: -->", data);
  const resetData = () => setData(initialData);
  const addRow = () => setData(old => [...old, { num: 1, type: "", type_fuel: "", option: 0, quantity: 0, consum: 0, km: 0 }]);
  const updateData = (rowIndex, columnID, value) => {

    setData(oldData => {
       const res = oldData.map((row, index) => {
          if (index === rowIndex) {
                return {
                ...oldData[rowIndex],
                [columnID]: value
                };
          }
          return row;
       })

       updateFunc(res)

       return res

    })
  };

  const table = useTable({ columns, data, updateData });
  const { getTableProps, headerGroups, rows, prepareRow } = table;

  return (
    <>
    <br/><br/><br/>
      <label class="subtitulo">Información de Consumo de Vehículos</label>
      <br />
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={7}>
              <button type="button" class="table-button" onClick={addRow}>
                Añade una fila
              </button>
              <button type="button" class="table-button" width="200px" onClick={resetData}>
                Reiniciar la tabla
              </button>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
});

const ReactTable2 = React.memo(({ updateFunc}) => {
    // console.log("ReactTable2", props);
    const columns = React.useMemo(
      () => [
        {
          Header: "Nombre de la Instalación",
          accessor: "name_inst",
          Cell: TableInputNombre
        },
        {
          Header: "Nombre del gas",
          accessor: "name_gas",
          Cell: TableInputGas
        },
        {
          Header: "Equipamiento de carga inicial (kg)",
          accessor: "equipment_charge",
          Cell: TableInput
        },
        {
          Header: "Carga Anual (kg)",
          accessor: "anual_charge",
          Cell: TableInput
        }
      ],
      []
    );
    const initialData = [
      {
        name_inst: "Cámara frigorífica",
        name_gas: "",
        equipment_charge: 3,
        anual_charge: 0.6
      },
      {
        name_inst: "Aire acondicionado",
        name_gas: "",
        equipment_charge: 4,
        anual_charge: 1
      }
    ];
  
    const [data, setData] = React.useState(initialData);
    //console.log("DATA_table2: -->", data);
    const resetData = () => setData(initialData);
    const addRow = () => setData(old => [...old, { name_inst: "Nueva Instalación", name_gas: "", equipment_charge: 0, anual_charge: 0 }]);
    const updateData = (rowIndex, columnID, value) => {

      setData(oldData => {
         const res = oldData.map((row, index) => {
            if (index === rowIndex) {
                  return {
                  ...oldData[rowIndex],
                  [columnID]: value
                  };
            }
            return row;
         })

         updateFunc(res)

         return res

      })
    };
  
    const table = useTable({ columns, data, updateData });
    const { getTableProps, headerGroups, rows, prepareRow } = table;
  
    return (
      <>
      <br/><br/><br/>
        <label class="subtitulo">Información sobre Fugas de Gas Fluorinado</label>
        <br />
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>
                <button type="button" class="table-button" onClick={addRow}>
                  Añade una fila
                </button>
                <button type="button" class="table-button" width="200px" onClick={resetData}>
                  Reiniciar la tabla
                </button>
              </td>
            </tr>
          </tbody>
        </StyledTable>
      </>
    );
  });

const ReactTable3 = React.memo(({ updateFunc}) => {
    // console.log("ReactTable3", props);

    const columns = React.useMemo(
    () => [
        {
        Header: "Tipo de deshechos",
        accessor: "type_waste",
        Cell: TableInputResiduo
        },
        {
        Header: "Cantidad (kg)",
        accessor: "quantity_waste",
        Cell: TableInput
        }
    ],
    []
    );
    const initialData = [
    {
        type_waste: "",
        quantity_waste: 10
    },
    {
        type_waste: "",
        quantity_waste: 48
    }
    ];

    const [data, setData] = React.useState(initialData);
    //console.log("DATA_table3: -->", data);
    const resetData = () => setData(initialData);
    const addRow = () => setData(old => [...old, { type_waste: "", quantity_waste: 0}]);
    const updateData = (rowIndex, columnID, value) => {

      setData(oldData => {
         const res = oldData.map((row, index) => {
            if (index === rowIndex) {
                  return {
                  ...oldData[rowIndex],
                  [columnID]: value
                  };
            }
            return row;
         })

         updateFunc(res)

         return res

      })
    };

    const table = useTable({ columns, data, updateData });
    const { getTableProps, headerGroups, rows, prepareRow } = table;

    return (
    <>
    <br/><br/><br/>
        <label class="subtitulo">Información Generación de Residuos</label>
        <br />
        <StyledTable {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody>
            {rows.map(row => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                </tr>
            );
            })}
            <tr>
            <td colSpan={2}>
                <button type="button" class="table-button" onClick={addRow}>
                Añade una fila
                </button>
                <button type="button" class="table-button" width="200px" onClick={resetData}>
                Reiniciar la tabla
                </button>
            </td>
            </tr>
        </tbody>
        </StyledTable>
    </>
    );
});


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
     data1: [],
     data2: [],
     data3: []
   })

   const updateTable1 = data => {
      setGlobalData(oldData => ({...oldData, data1: data}))
   }

   const updateTable2 = data => {
      setGlobalData(oldData => ({...oldData, data2: data}))
   }

   const updateTable3 = data => {
      setGlobalData(oldData => ({...oldData, data3: data}))
   }

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
    const requestOptions = {
      method: 'POST',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(globalData)
   };
   console.log('MENSAJE: ', globalData)
   fetch('http://greendata.herokuapp.com/flask/hello', requestOptions)
         .then(response => response.json())
         .then(json => {
            console.log('message from api', json);
         });
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

          <section>
            <div class="box-facturas">
              <label class="Facturas">Cuelga las facturas de gas y electricidad:</label>
              <div id="img-preview"></div>
              <input type="file" accept="image/*" class="fileupload" id="fileupl"></input>
              <label for="fileupl">Elige un archivo...<FontAwesomeIcon icon={faUpload}/></label>
              
            </div>
          </section>

        </aside>
        <div class="tables">
          <ReactTable1 updateFunc={updateTable1}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <ReactTable2 updateFunc={updateTable2}/>        
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <ReactTable3 updateFunc={updateTable3}/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        
        <aside class="div-bajo">
          <section>
            <div class="box-notes">
            <p>
              Escribe cualquier comentario aquí: <br/><br/><input class="notes" as={FormInput} field="notes" />
            </p>
            </div>
          </section>
          <section>
            <button class="submit_button" type="submit" disabled={!canSubmit} >
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
  
  border-radius: 5px;
  padding: 10px;
  h1 {
    text-align: center;
  }
  background-color: rgb(243, 249, 235);
`;

const Invoice = props => {
  //console.log("Invoice", props);

  return (
    <Main>
      <h1 class="titulo">DATOS DE TU EMPRESA</h1>
      <ReactForm class="input-form"/>
    </Main>
  );
};

export default Invoice;