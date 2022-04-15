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
import { useRecoilValue, useResetRecoilState } from "recoil";
import {
  loginState,
  weeklyWordsCntState,
  weeklyWordsState,
  wordsState,
} from "../atoms";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.periwinkleTint90};
  padding: 50px 30px 30px 30px;
  overflow: hidden;
  position: relative;
  align-items: center;
  color: ${(props) => props.theme.periwinkleTint90};
  &::before {
    content: "";
    background-image: url("https://cdn.pixabay.com/photo/2015/12/13/00/11/rosemary-1090419__340.jpg");
    background-position-y: center;
    opacity: 0.8;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

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
        text-shadow: 1px 1px 1px ${(props) => props.theme.periwinkleShade90};
        display: flex;
        align-items: center;
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
          background-color: ${(props) => props.theme.periwinkleTint90};
          transition: opacity 500ms, transform 500ms;
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
          width: 20px;
          height: 20px;
          cursor: pointer;
          &.search-icon {
            font-size: 18px;
          }
          path {
            fill: ${(props) => props.theme.periwinkleTint90};
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
  const login = useRecoilValue(loginState);
  const PCMode = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const resetLogin = useResetRecoilState(loginState);
  const resetWords = useResetRecoilState(wordsState);
  const resetWeeklyWords = useResetRecoilState(weeklyWordsState);
  const resetWeeklyWordsCnt = useResetRecoilState(weeklyWordsCntState);

  const logout = () => {
    fetch("/api/users/logout");
    resetWords();
    resetWeeklyWords();
    resetWeeklyWordsCnt();
    resetLogin();
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
                <Link to={"/words"}>
                  새 단어
                  <FontAwesomeIcon icon={faPlus} />
                </Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/words/statistics"}>
                  통계
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M32 32C49.67 32 64 46.33 64 64V400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32zM160 224C177.7 224 192 238.3 192 256V320C192 337.7 177.7 352 160 352C142.3 352 128 337.7 128 320V256C128 238.3 142.3 224 160 224zM288 320C288 337.7 273.7 352 256 352C238.3 352 224 337.7 224 320V160C224 142.3 238.3 128 256 128C273.7 128 288 142.3 288 160V320zM352 192C369.7 192 384 206.3 384 224V320C384 337.7 369.7 352 352 352C334.3 352 320 337.7 320 320V224C320 206.3 334.3 192 352 192zM480 320C480 337.7 465.7 352 448 352C430.3 352 416 337.7 416 320V96C416 78.33 430.3 64 448 64C465.7 64 480 78.33 480 96V320z" />
                  </svg>
                </Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/words/search"}>
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
                {login.loggedIn ? null : (
                  // <Link to={"/users/profile"}>프로필</Link>
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
