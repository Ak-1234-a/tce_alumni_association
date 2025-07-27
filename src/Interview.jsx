import logo from '../assets/logo.png';
import './Interview.css';
import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import {useEffect, useState} from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDDlPUqnnvMIMaiwUCTMcAtSeeqkt8AxjI",
  authDomain: "tce-alumni-association.firebaseapp.com",
  projectId: "tce-alumni-association",
  storageBucket: "tce-alumni-association.firebasestorage.app",
  messagingSenderId: "695271971599",
  appId: "1:695271971599:web:6ae3ed7ff35298e747bc7a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Interview(){
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [role,setrole] = useState("");
    const [company,setcompany] = useState("");
    const [logoUrl,setlogoUrl] = useState("");
    const [type,settype] = useState("product");
    const [experience,setexperience] = useState("");
    

    const submit = async(e) =>{
        e.preventDefault();
        setname(document.getElementById("name").value);
        setemail(document.getElementById("email").value);
        setrole(document.getElementById("role").value);
        setcompany(document.getElementById("company").value);
        setlogoUrl(document.getElementById("logo").value);
        settype(document.getElementById("type").value);
        setexperience(document.getElementById("experience").value);


        if(!name || !email || !role || !company || !logoUrl || !type || !experience){
            alert("Please fill all the fields");
            return;
        }


        const interviewData = {
            name: name,
            email: email,
            role: role,
            company: company,
            logoUrl: logoUrl,
            type: type,
            experience: experience,
        };
        await setDoc(doc(db,"interviews",email),interviewData)

            console.log("Interview experience submitted successfully");
            alert("Interview experience submitted successfully");
            setname("");
            setemail("");
            setrole("");
            setcompany("");
            setlogoUrl("");
            settype("product");
            setexperience("");
            document.getElementById("modal").style.display = "none";

        
    }

    const [interviews, setInterviews] = useState([]);

   useEffect(() => {
    const fetchInterviews = async () => {
        const snapshot = await getDocs(collection(db, "interviews"));
        const interviewsList = snapshot.docs.map(doc => doc.data());
        setInterviews(interviewsList);
    };
    fetchInterviews();
    }, []); 
    const show = () =>{
        document.getElementById("modal").style.display = "block";
    }
    const close = () =>{
        document.getElementById("modal").style.display = "none";
        setname("");
        setemail("");
        setrole("");
        setcompany("");
        setlogoUrl("");
        settype("product");
        setexperience("");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("role").value = "";
        document.getElementById("company").value = "";
        document.getElementById("logo").value = "";
        document.getElementById("type").value = "product";
        document.getElementById("experience").value = "";
        
    }
    return(
       <>
         <nav className="navbar" style={{backgroundColor:"brown", padding:"20px"}}>
              <div className="navbar-brand">
                <img src={logo} alt="TCE Alumni Logo" style={{width:"80px",height:"80px",borderRadius:"50%"}} />
                <span className="navbar-text" style={{color:"white", fontSize:"24px", marginLeft:"10px"}}>TCE Alumni Association</span>
              </div>
              <h2 className='' style={{color:"white"}}>Interview Experience</h2>
         </nav>

         <div className="row ">
            <div className="col-6">
                <input className='mt-5 mx-5 p-2' type="text" placeholder='Enter a company or position' style={{borderRadius:"5px",color:"white", width:"400px",height:"40px",backgroundColor:"brown",border:"2px solid brown"}}/>
            </div>
            <div className="col-6">
                <button onClick={show} className='btn btn-primary mt-5' style={{width:"max-content",height:"40px",borderRadius:"5px"}}>Share your Interview Experience</button>
            </div>
         </div>


         <div className="row ms-5 mt-5">
            <h4 className='text-primary' style={{}}>Popular Companies</h4>
            {interviews.map((interview,index)=>(
            <div className="col-3 mt-5" key={index}>
                <div className="card p-2" style={{borderRadius:"10px", backgroundColor:"brown", color:"white"}}>
                    <img src={interview.logoUrl} className='card-img-top' alt="Company Logo" style={{borderRadius:"80%"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{interview.company}</h5>
                        <p className="card-text">Brief description of the company.</p>
                        <a href="#" className="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
            ))}
         </div>

        <div className="modal"  id='modal' style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
  <div className="modal-dialog" >
    <div className="modal-content" style={{backgroundColor:"brown", color:"white"}}>
      <div className="modal-header">
        <h5 className="modal-title">Share your Interview Experience</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={close}></button>
      </div>
      <div className="modal-body">
        <form action="">
            <div className="row">
                <div className="col">
                    <label htmlFor="name">Full Name</label>
                    <input id='name' type="text" className='form-control' placeholder='Enter your full name' />
                </div>
                <div className="col">
                    <label htmlFor="email">Email</label>
                    <input id='email' type="email" className='form-control' placeholder='Enter your email' />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="">Current Role</label>
                    <input id='role' type="text" className='form-control' placeholder='Enter your current role' />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="company">Company Name</label>
                    <input id='company' type="text" className='form-control' placeholder='Enter the company name' />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="">Enter company logo url</label>
                    <input id='logo' type="text" className='form-control' placeholder='Enter the logo URL' />
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="type">Company Type</label>
                    <select id='type' className='form-select'>
                        <option value="product">Product based</option>
                        <option value="service">Service Based</option>
                        <option value="startup">Startup</option>
                    </select>
                </div>
                <div className="col-12 mt-3">
                    <label htmlFor="">Interview Experience</label>
                    <textarea id='experience' className='form-control' rows="5" placeholder='Share your interview experience'></textarea>
                </div>
            </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={(e)=>submit(e)} type="button" className="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
       </>
    )
}

export default Interview;