import styled from "styled-components";
import {
  faBars,
  faUser,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import TitleBlock from "./TitleBlock";
import { useRecoilState } from "recoil";
import { loginState } from "../atoms";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(30, 39, 46, 0.2);
  padding: 50px 30px 30px 30px;
  overflow: hidden;
  position: relative;
  align-items: center;
  svg {
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &.profile {
      font-size: 24px;
      border: 0.5px solid rgba(138, 144, 45, 0.5);
      padding: 5px;
      border-radius: 7px;
    }
  }

  ul {
    /* background-color: red; */
    display: flex;
    align-items: flex-end;
    padding-top: 30px;
    li {
      display: flex;
      align-items: center;

      h1 {
        margin-right: 20px;
      }

      a {
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8);
        display: block;
        position: relative;
        text-decoration: none;
        padding: 0.2em 0;
        transition: 0.3s ease-out all;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0.08em;
          background-color: rgba(149, 165, 166, 0.5);
          transition: opacity 300ms, transform 300ms;
          opacity: 1;
          transform: translate3d(-100%, 0, 0);
        }

        &:hover::after,
        &:focus::after {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        svg {
          margin-left: 2px;
          font-size: 20px;
          cursor: pointer;
          &.search-icon {
            font-size: 18px;
          }
        }
      }
    }
    &.left {
      li {
        margin-right: 20px;
      }
    }
    &.right {
      li {
        margin-left: 20px;
      }
    }
  }
`;

const MenuItem = styled.span`
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  text-shadow: 0.5px 0.5px 0.5px rgba(128, 128, 128, 0.5);
`;

function HeaderMenu() {
  const [login, setLogin] = useRecoilState(loginState);
  const PCMode = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const logout = () => {
    fetch("/api/user/logout");
    setLogin({ loggedIn: false, user: null });
  };

  return (
    <HeaderContainer>
      <ul className="left">
        {PCMode ? (
          <>
            <li>
              <MenuItem>
                <Link to={"/"}>복습</Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/word/add"}>
                  새 단어
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/word/search"}>
                  검색
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                  />
                </Link>
              </MenuItem>
            </li>
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faBars} />
          </>
        )}
      </ul>

      <TitleBlock />

      <ul className="right">
        {PCMode ? (
          <>
            <li>
              <MenuItem>
                {login.loggedIn ? (
                  <Link to={"/user/profile"}>프로필</Link>
                ) : (
                  <Link to={"/join"}>가입</Link>
                )}
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                {login.loggedIn ? (
                  <Link to={"/login"} onClick={logout}>
                    로그아웃
                  </Link>
                ) : (
                  <Link to={"/login"}>로그인</Link>
                )}
              </MenuItem>
            </li>
          </>
        ) : (
          <FontAwesomeIcon icon={faUser} className={"profile"} />
        )}
      </ul>
    </HeaderContainer>
  );
}

export default HeaderMenu;
