import styled from "styled-components";
import { OauthWrapper } from "../styles/oauthboxStyle";

const SocialLoginBtn = styled.button`
  img {
    width: 40px;
    height: 40px;
  }
`;

function OauthBox() {
  const onGithubClick = async () => {
    const { finalUrl } = await (await fetch("/api/users/login/github")).json();
    window.location.href = finalUrl;
  };
  return (
    <div>
      <OauthWrapper>
        <h3>소셜 로그인</h3>
        <SocialLoginBtn onClick={onGithubClick}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" />
        </SocialLoginBtn>
      </OauthWrapper>
    </div>
  );
}

export default OauthBox;
