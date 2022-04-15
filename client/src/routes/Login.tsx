import HeaderMenu from "../components/HeaderMenu";
import LoginForm from "../components/LoginForm";
import OauthBox from "../components/OauthBox";
import { Container } from "../styles/containerStyle";

function Login() {
  return (
    <>
      <HeaderMenu />
      <Container>
        <LoginForm></LoginForm>
        <OauthBox></OauthBox>
      </Container>
    </>
  );
}

export default Login;
