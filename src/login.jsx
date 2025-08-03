import React from "react";
import { useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import { doc,getFirestore, collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth';
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDDlPUqnnvMIMaiwUCTMcAtSeeqkt8AxjI",
  authDomain: "tce-alumni-association.firebaseapp.com",
  projectId: "tce-alumni-association",
  storageBucket: "tce-alumni-association.firebasestorage.app",
  messagingSenderId: "695271971599",
  appId: "1:695271971599:web:6ae3ed7ff35298e747bc7a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

function login(){
   const [Password,setpassword] = useState("");
   const [email,setemail] = useState("");
   const submit = async(e) =>{
    e.preventDefault();
   
    const snapshot = await getDocs(collection(db, "users"));
    const usersList = snapshot.docs.map(doc => doc.data());

     const userFound = usersList.find(
        (user) => user.email === email && user.password === Password
      );

      if(userFound){
        alert("Logged Successfully");
        document.getElementById("loginModal").style.display="block";
      }
      else{
        alert("User email and password doesnot exist")
      }

   }

     const signInWithGoogle = async (e) => {
        e.preventDefault();
    
      await signInWithPopup(auth, googleProvider);
      alert("Login Successful");
      document.getElementById("loginModal").style.display="block";
    }


    return(
        <>
            <form className="container align-items-center mt-5" style={{backgroundColor:"brown",width:"600px",padding:"50px"}}>
                <h1 style={{color:"white",textAlign:"center"}} >Login</h1>
                <div>
                    <label htmlFor="email" className="form-label" style={{color:"white"}}>Email</label>
                    <input id="email" type="email" className="form-control" onChange={(e)=>{setemail(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="" className="form-label" style={{color:"white"}}>Password</label>
                    <input type="password" name="" id="" className="form-control" onChange={(e)=>{setpassword(e.target.value)}}/>
                </div>
                <button onClick={(e)=>{submit(e)}} className="btn btn-primary mt-5">Login</button>
                <hr />
                <button onClick={(e)=>signInWithGoogle(e)} className="btn btn-primary">SignIn With Google</button>
            </form>
             <div className="modal" tabIndex="2" id="loginModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Welcome to TCE Alumni Association</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Link to="/Interview" className='btn btn-success'>Go to Interview Page</Link>
          </div>
        </div>
      </div>
   </div>
        </>
    )
}

export default login;