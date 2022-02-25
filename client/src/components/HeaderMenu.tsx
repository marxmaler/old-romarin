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

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  border: 1px solid rgba(30, 39, 46, 0.2);
  padding: 50px 50px 60px 50px;
  overflow: hidden;
  color: rgba(194, 54, 22, 1);
  svg {
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &.profile {
      font-size: 24px;
      border: 0.5px solid rgba(138, 144, 45, 0.5);
      background-color: rgba(246, 229, 141, 1);
      padding: 5px;
      border-radius: 7px;
    }
    &:hover,
    &:active,
    &:focus {
      opacity: 0.7;
    }
  }

  ul {
    display: flex;
    align-items: flex-end;
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
          background-color: rgba(232, 65, 24, 0.5);
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
          color: rgba(232, 65, 24, 0.8);
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
  const PCMode = useMediaQuery({
    query: "(min-width:1024px)",
  });

  return (
    <HeaderContainer>
      <ul className="left">
        {PCMode ? (
          <>
            <li>
              <MenuItem>
                <Link to={"/"}>홈</Link>
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
                <Link to={"/"}>
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
                <Link to={"/"}>메뉴</Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/"}>메뉴</Link>
              </MenuItem>
            </li>
            <li>
              <MenuItem>
                <Link to={"/"}>메뉴</Link>
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
