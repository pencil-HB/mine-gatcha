import { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../service/firebase";

function Login() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        setUser(currentUser);
    });

}, [])

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      if(error.message === "Firebase: Error (auth/invalid-email).")
      alert("올바른 이메일을 입력해주세요.");
      if(error.message === "Firebase: Error (auth/email-already-in-use).")
      alert("이미 존재하는 이메일 계정입니다.");
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      goToHome(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const goToHome=user=>{
    navigate({
        pathname : '/home',
        state:{userInfo : user},
    })
  }


  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div className="login">

      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <br/>
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <br/>
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <br/>
        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {user ? user.email : "Not Logged In"}
      <br/>
      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default Login;