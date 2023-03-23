import { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../service/firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

  }, [])

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
      console.log(user);
    }
  };

  const goToHome = user => {
    navigate({
      pathname: '/home',
      state: { userInfo: user },
    })
  }

  const goToSignIn = () => {
    navigate({
      pathname: '/signin',
    })
  }

  const openKakao = () => {
    window.open('https://open.kakao.com/o/sTUOwIgb');
  }


  return (
    <div className="login">

      <Form>
      <Form.Text className="text-muted">
            로그인
          </Form.Text>
          <br/>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <br/>
          <Form.Control type="password" placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <br/>
          <Button variant="primary" onClick={login} >
            Login
          </Button>
          <Form.Text className="text-muted" onClick={goToSignIn}>
            회원가입하기
          </Form.Text>
          <Form.Text className="text-muted" onClick={openKakao}>
            비밀번호를 잊어버리셨나요?
          </Form.Text>
        </Form.Group>
      </Form>

    </div>
  );
}

export default Login;