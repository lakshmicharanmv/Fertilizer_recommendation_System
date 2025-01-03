import React, { useState } from "react";

function Signup(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setMail] = useState("");
  const [cap, setCap] = useState("");
  const [preCap,setprevCap]=useState("");
  const [print, setPrint] = useState("");
  const capEle="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  function capset(){
    setprevCap("");
    for(let i=0;i<6;i++){
        let l=Math.floor(Math.random()*36);
        setprevCap(c=>c+capEle.charAt(l));
    }
  }
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeMail = (e) => {
    setMail(e.target.value);
  };
  const changeCap = (e) => {
    setCap(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (cap === preCap) {
      console.log(name);
      console.log(phone);
      console.log(email);
      localStorage.setItem("userName", name);
      props.onSubmit(localStorage.getItem("userName"));
    } else {
      setPrint("Invalid Captha!");
    }
  }
  return (
    <>
      <div>
        <h1>Sing UP Hear</h1>
        <form onSubmit={handleSubmit}>
          <p>User Name:</p>
          <input type="text" value={name} onChange={changeName} onFocus={capset}></input>
          <p>Phone NO:</p>
          <input type="number" value={phone} onChange={changePhone} onFocus={capset}></input>
          <p>Email:</p>
          <input type="email" value={email} onChange={changeMail} onFocus={capset}></input>
          <p>Captha:</p>
          <p id="capthaPrint" style={{backgroundColor:" rgba(198, 251, 242, 0.855)"}}>{preCap}</p>
          <input type="text" value={cap} onChange={changeCap}></input>
          <button type="submit">Sign Up</button>
        </form>
        <h1>{print}</h1>
      </div>
    </>
  );
}

export default Signup;
