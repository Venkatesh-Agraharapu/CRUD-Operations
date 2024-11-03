import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../CssFiles/post.css";
import axios from 'axios';

function Put() {   
  let { paramId } = useParams();
  const [id, setId] = useState('');  
  const [name, setName] = useState('');  
  const [category, setCategory] = useState('Phone');  
  const [price, setPrice] = useState('');  

  // useEffect(() => {  
  
  //   fetch(`http://localhost:7500/${paramId}`).then((res) => {
  //     return res.json()
  //   }).then((res) => {
  //     console.log(res);
  //     setId(res.id);
  //     setName(res.name);
  //     setCategory(res.category);
  //     setPrice(res.price);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, [paramId]);

  const putData = async () => {    
    try {      
      let response = await axios.put(`http://localhost:7500/Put/${paramId}`, { name, id, category, price });      

      if (response.status === 200) {        
        alert("Update Successful");        
        setId(response.data.id);        
        setName(response.data.name);        
        setCategory(response.data.category);        
        setPrice(response.data.price);      
      }    
    } catch (err) {      
      console.log(err);    
    }  
  };  


  // useEffect(() => {
  //   if (!paramId) {
  //     console.error("Invalid paramId");
  //     return;
  //   }
  //   fetch("http://localhost:7500/" + paramId) // Correct route
  //     .then((res) => {
  //       if (!res.ok) { // Check if the response is not ok
  //         throw new Error('Product not found');
  //       }
  //       return res.json(); // Convert response to JSON
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setId(res.id);          // Set the product details in state
  //       setName(res.name);
  //       setCategory(res.category);
  //       setPrice(res.price);
  //     })
  //     .catch((err) => {
  //       console.log(err.message); // Catch any errors
  //     });
  // }, [paramId]); // Ensure paramId is defined in useParams
  

  return (    
    <div className="parent">      
      <h1>Update Product</h1>      
      <form>        
        <label id="p1">Product-Id</label>        
        <input type="text" id="i1" value={id} onChange={(e) => setId(e.target.value)} /><br />        
        <label id="p2">Product-Name</label>        
        <input type="text" id="i2" value={name} onChange={(e) => setName(e.target.value)} /><br />        
        <label id="p3">Category</label>        
        <select className="select-box" id="i3" value={category} onChange={(e) => setCategory(e.target.value)}>          
          <option value="Phone">Phone</option>          
          <option value="Computer">Computer</option>          
          <option value="Tab">Tab</option>          
          <option value="Others">Others</option>                  
        </select><br />        
        <label id="p4">Price</label>        
        <input type="text" id="i4" value={price} onChange={(e) => setPrice(e.target.value)} /><br />        
        <label id="p5">Image</label>        
        <input type="file" id="i5" /><br />      
      </form>      
      <button id="post" onClick={putData}>Update Data</button>      
      <button id="getback"><Link to="/">Get Back</Link></button>    
    </div>  
  );
}

export default Put;
