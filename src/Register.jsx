import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const firebaseConfig = {
  apiKey: "AIzaSyDDlPUqnnvMIMaiwUCTMcAtSeeqkt8AxjI",
  authDomain: "tce-alumni-association.firebaseapp.com",
  projectId: "tce-alumni-association",
  storageBucket: "tce-alumni-association.firebasestorage.app",
  messagingSenderId: "695271971599",
  appId: "1:695271971599:web:6ae3ed7ff35298e747bc7a"
};

const app = initializeApp(firebaseConfig);

function Register() {
  const [name,setname] = useState("");
  const [email,setemail] = useState("");
  const [phone,setphone] = useState("");
  const [password,setpassword] = useState(""); 

   const submit = async(e) =>{
    e.preventDefault();
    const db = getFirestore(app);
    console.log("Registering user:", name, email, phone, password);
    const user = {
      name: name,
      email: email,
      phone: phone,
      password: password
    }
    await setDoc(doc(db, "users", email), user)
    .then(() => {
      console.log("User registered successfully");
      alert("User registered successfully");
      setname("");
      setemail("");
      setphone("");
      setpassword("");
     // document.getElementById("registerModal").classList.add("show");
      document.getElementById("registerModal").style.display = "block";
    })
  
   }

 return (
  <>
  <form className="container align-items-center" style={{border:"1px solid black", padding:"100px",backgroundColor:"brown", borderRadius:"10px",color:"white"}}>
    <img src={logo} alt="TCE Alumni Logo" style={{width:"100px", display:"block", margin:"0 auto"}} />
    <h1 style={{textAlign:"center"}}>Register Page</h1>

    <div className="row">
           <label htmlFor="name" className='form-label mt-5' style={{textAlign:"left"}}>Name</label>
          <input className="form-control" type="text" id="name" value={name} onChange={(e)=>setname(e.target.value)} />
    </div>
    <div className="row">
          <label htmlFor="email" className='form-label mt-5' style={{textAlign:"left"}}>Email</label>
          <input className="form-control" type="email" id='email' value={email} onChange={(e)=>setemail(e.target.value)}/>
    </div>
    <div className="row">
          <label htmlFor="phone" className='form-label mt-5' style={{textAlign:"left"}}>Phone</label>
          <input className="form-control" type="number" id='phone' value={phone} onChange={(e)=>setphone(e.target.value)}/>
    </div>
    <div className="row">
          <label htmlFor="password" className='form-label mt-5' style={{textAlign:"left"}}>Password</label>
          <input className="form-control" type="password" id='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
    </div>
    <div className="button">
      <button onClick={submit} className='btn btn-primary' style={{marginTop:"20px"}}>Register</button>
    </div>
  </form>

   <div className="modal" tabIndex="2" id="registerModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Welcome to TCE Alumni Association</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Thank you for registering! You can now access the alumni portal.</p>
            <Link to="/Interview" className='btn btn-success'>Go to Interview Page</Link>
          </div>
        </div>
      </div>
   </div>

  </>
 )
}

export default Register;
