import React,{useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios'
import "../CssFiles/get.css";
import { Navigate } from 'react-router-dom';
function Get() {
  const [products,setProducts]=useState([]);
  let navigate=useNavigate()

  const navi=()=>{
    navigate('./Post')
  }
  const GetData=async()=>{

    try{
      let response=await axios.get("http://localhost:7500/")
      if(response.status===200){
        setProducts(response.data)
        console.log("Success")
      }
    }
    catch(err){
      console.log(err)
    }
  }
 
  useEffect(()=>{
      const getdata=async()=>{
        try{
        let response=await axios("http://localhost:7500/")
        if(response.status===200){
          setProducts(response.data)
        }
      }
      catch(err){
        console.log(err)
      }
      };
      getdata()
  },[])
    const deleteData=async(paramId)=>{
      console.log(paramId)
      try{
        let response=await axios.delete(`http://localhost:7500/delete/${paramId}`)
        if(response.status===200){
          setProducts(products.filter(item => item.id !== parseInt(paramId,10)));
          
        }   
      }
      catch(err){
        console.log(err)
      }
    }
    

  return (
    <div className="Parent">
      <ul>
        <button id="create"> <Link to={"./Post"}> Create Product</Link></button>
        {/* <button onClick={navi}>Create Product</button> */}
        <button id="refresh" onClick={GetData}>Refresh</button>
      </ul>
        <div className="child">
           <ul>
            <li>Product-Id</li>
            <li>product-Name</li>
            <li>Product-Price</li>
            <li>Category</li>
            <li>Image</li>
            <li>Actions</li>
           </ul>
           <hr></hr>
          <div className="Products">
            <table>
              {products.map((d,i)=>(

                <tr key={i}>
                  <td id="one">{d.id}</td>
                  <td id="two">{d.name}</td>
                  <td id="three">{d.price}</td>
                  <td id="four">{d.category}</td>
                  <td>{d.image}</td>
                 <td><button id="btn-1" ><Link to={`/Put/${d.id}`}>EDIT</Link></button></td>

                 <td> <button id="btn-2" onClick={()=>deleteData(d.id)}>Delete</button></td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        
    </div>
  )
}

export default Get