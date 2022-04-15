import { useEffect } from "react";
import { useQuery } from "react-query";
import { fetchGithubCode } from "../api";
import HeaderMenu from "../components/HeaderMenu";
import { Container } from "../styles/containerStyle";

function GitLoginCallback() {
  const baseUrl = "http://localhost:3000"; //local 아닐 때는 수정하기
  const code = window.location.href.replace(
    `${baseUrl}/login/github/callback?code=`,
    ""
  );
  console.log(code);
  const { isLoading, data, isError } = useQuery("fetchGithubCode", () =>
    fetchGithubCode(code)
  );

  useEffect(() => {
    console.log(data);
    // const { password, ...rest } = data;
    // setLogin({
    //   loggedIn: true,
    //   user: rest,
    // });

    // navigate("/");
  }, []);

  return (
    <>
      <HeaderMenu />
      <Container>{isLoading && <div>Hello, Hello</div>}</Container>
    </>
  );
}

export default GitLoginCallback;
