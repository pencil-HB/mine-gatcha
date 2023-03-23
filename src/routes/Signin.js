import { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../service/firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signin() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });

  }, [])

  const goToLogIn = () => {
    navigate({
      pathname: '/',
    })
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      alert("회원 가입에 성공하였습니다!! 확인을 누르면 로그인 페이지로 이동합니다.");
      goToLogIn();
    } catch (error) {
      if (error.message === "Firebase: The email address is badly formatted. (auth/invalid-email).")
        alert("올바른 이메일을 입력해주세요.");
      if (error.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).")
        alert("이미 존재하는 이메일 계정입니다.");
      if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).")
        alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      console.log(error.message);
    }
  };


  const logout = async () => {
    await signOut(firebaseAuth);
  };

  return (
    <div className="login">

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Text className="text-muted">
            제가 여러분의 보안까지 책임질 실력은 아직 되지 않으니<br/>
            유출되어도 괜찮은 이메일과 비밀번호를 사용해주세요.<br/>
            쩨발!
          </Form.Text>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }} />
          <Form.Control type="password" placeholder="Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }} />
            <Form.Check type="checkbox" label="내 로그인 정보 기억됐으면 좋겠다(근데안됨)" className="text-muted" />
        </Form.Group>
        <Button variant="primary" onClick={register} >
          회원가입하기
        </Button>
      </Form>



    </div>
  );
}

export default Signin;