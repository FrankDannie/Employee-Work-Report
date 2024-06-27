
import './App.css';

import {useState} from "react"; 
import Axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


function App() {

  const [EMPLOYEE_ID , setEMPLOYEE_ID ] = useState(0);
  const [EMPLOYEE_NAMES, setEMPLOYEE_NAMES] = useState("");
  const [TASK, setTASK] = useState("");
  const [TASK_DATE, setTASK_DATE] = useState("");
  const [DATE_UPDATE, setDATE_UPDATE] = useState("");

  const [newTASK, setNewTASK] = useState("");
  const [employeeList, setEmployeeList] = useState([]);



  const addEmployee = () => {
    window.alert("Task added");
    Axios.post("http://localhost:3001/create", {
      EMPLOYEE_ID : EMPLOYEE_ID ,
      EMPLOYEE_NAMES: EMPLOYEE_NAMES,
      TASK: TASK,
      TASK_DATE: TASK_DATE,
      DATE_UPDATE: DATE_UPDATE,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          EMPLOYEE_ID : EMPLOYEE_ID ,
          EMPLOYEE_NAMES: EMPLOYEE_NAMES,
          TASK: TASK,
          TASK_DATE: TASK_DATE,
          DATE_UPDATE: DATE_UPDATE,
        },
      ]);
    });
  };
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
      
    });
  };
  const updateEmployeetask = (EMPLOYEE_ID) => {
    window.alert("Task Updated");
    Axios.put("http://localhost:3001/update", {TASK: newTASK, EMPLOYEE_ID: EMPLOYEE_ID }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.EMPLOYEE_ID == EMPLOYEE_ID
              ? {
                  
                  EMPLOYEE_ID : val.EMPLOYEE_ID ,
                  EMPLOYEE_NAMES: val.EMPLOYEE_NAMES,
                  TASK: newTASK,
                  TASK_DATE: val.TASK_DATE,
                  DATE_UPDATE: val.DATE_UPDATE

                }
              : val;
          })
        )
        
      }
    );
    
  };
  
  
  const deleteEmployee = (EMPLOYEE_ID) => {
    if (window.confirm("Do you really want to delete!\n Choose either OK or Cancel.")) {
    
    Axios.delete(`http://localhost:3001/delete/${EMPLOYEE_ID}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.EMPLOYEE_ID !== EMPLOYEE_ID;
        })
      );
    });}
  };
 
  return (
    <div class="container">
    <div className="App">
      <div class="col-sm-12">
      <div class="container">
      <div class="col-sm-3">
        <div className="information" >
        
        <h1>Work Report</h1>
        <p>Daily work reports of the employees have to be entered.</p>
        <div class="kl"><div class="span">
   <label>EMPLOYEE_ID </label>
   <span>
        <input
          type="NUMBER"
          min="1"
          onChange={(event) => {
            setEMPLOYEE_ID (event.target.value);
          }}
        /></span></div><div class="span">
        <label>EMPLOYEE_NAMES</label>
        <input
          type="TEXT"
          onChange={(event) => {
            setEMPLOYEE_NAMES(event.target.value);
          }}
        /></div><div class="span">
        <label>TASK</label>
        <input
          type="text"
          onChange={(event) => {
            setTASK(event.target.value);
          }}
        /></div><div class="span">
        <label>START_DATE</label>
        <input
          type="DATE"
          onChange={(event) => {
            setTASK_DATE(event.target.value);
          }}
        /></div><div class="span">
        <label>END_UPDATE</label>
        <input
          type="DATE"
          onChange={(event) => {
            setDATE_UPDATE(event.target.value);
          }}
        /></div>
        <div className="employees">
        <button  onClick={addEmployee}>Add TASK</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show TASK</button></div></div></div></div>
        
       
      

        <div className="information" >
        
          
        
        
            <div className="employee" >
            
              <Table>
              <Thead>
                <Tr>
                  <Th scope='col'>EMPLOYEE_ID</Th>
                  <Th scope='col'>EMPLOYEE_NAMES</Th>
                  <Th scope='col'>TASK</Th>
                  <Th scope='col'>START_DATE</Th>
                  <Th scope='col'>END_DATE</Th>
                  <Th scope='col'> </Th>
                </Tr></Thead>
      <Tbody>
                {employeeList.map((val) => {
          return (
          
                <Tr>
                  
                  <Td>{val.EMPLOYEE_ID }</Td>
                  <Td>{val.EMPLOYEE_NAMES}</Td>
                  <Td>{val.TASK}</Td>
                  <Td>{val.TASK_DATE}</Td>
                  <Td>{val.DATE_UPDATE}</Td>
                  <Td> 
                  
<br></br>
                <button class="buttontable"
                  onClick={() => {
                    deleteEmployee(val.EMPLOYEE_ID);
                  }}
                >
                  Delete
                </button>
                <Popup trigger={<button class="buttontable"> Update </button>} 
     position="left center">
      <input class="inputupdate"
                  type="text"
                  placeholder="TASK..."
                  onChange={(event) => {
                    setNewTASK(event.target.value);
                  }}
                 
                />
      <button class="buttontable" onClick={() => {
                    updateEmployeetask(val.EMPLOYEE_ID);
                    
                  }}> Update
                  
                </button>

    </Popup> </Td>
                </Tr>
                
                
          );
        })}
              </Tbody>
    </Table>
              
              </div>
            
          </div>
       
    </div>
    </div>
    </div></div>
    
  );
}

export default App;
