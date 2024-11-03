import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import "../CssFiles/post.css"
import axios from 'axios'
function Post() {

  const[id,setId]=useState('');
  const[name,setName]=useState('');
  const[category,setCategory]=useState('phone')
  const[price,setPrice]=useState('');
  // const[image,setImage]=useState('')
  // const handleImage=(e)=>{
  //   setImage(e.target.files[0])
  // }
  // function handleApi(){
  //   let newData=new FormData()
  //   newData.append('image',image)
  //   axios.post("http://localhost:4500/Addproduct",{newData}).then((res)=>{
  //     console.log(res)
  //   })
  // }
  const postData=async()=>{

    try{
      let response=await axios.post("http://localhost:7500/Addproduct",{name,id,category,price})
      if(response.status===200)
      {
          console.log("success")
          alert("Post Successfully")
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="parent">
      <h1>Create Product</h1>
      <form>
        <label id="p1">Product-Id</label>
        <input type="text" id="i1" value={id} onChange={(e)=>setId(e.target.value)}></input><br></br>
        <label id="p2">Product-Name</label>
        <input type="text" id="i2" value={name} onChange={(e)=>setName(e.target.value)}></input><br></br>
        <label id="p3" >Category</label>
         <select class="select-box" id="i3" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="Phone" >Phone</option>
          <option value="Computer" >Computer</option>
          <option value="Tab" >Tab</option>
          <option value="Others" >Others</option>         
         </select><br></br> 
         <label id='p4'>Price</label>
         <input type="text" id="i4" onChange={(e)=>setPrice(e.target.value)}></input><br></br>
         <label id="p5" >Image</label>
         <input type="file" id="i5"  ></input>
        
      </form>
      <button id="post" onClick={postData} >PostData</button>
      <button  id="getback"><Link to ={"/"}>getBack</Link></button>
    </div>
  )
}

export default Post