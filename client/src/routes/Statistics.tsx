import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms";
import HeaderMenu from "../components/HeaderMenu";
import { langs, languagesInKo } from "../util/language";
import PieChart from "../components/PieChart";
import React, { useEffect, useState } from "react";
import RadialBarChart from "../components/RadialBarChart";
import BarChart from "../components/BarChart";

const Container = styled.div`
  background-color: black;
  min-height: 50vh;
  width: 100%;
  color: white;
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ul {
    padding: 20px;
    border-radius: 30px;
    background-color: white;
    color: black;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3 {
      font-size: 30px;
      padding: 20px;
      font-weight: 700;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    li {
      display: block;
      padding: 1em;
    }
  }
`;

function Statistics() {
  const [loginInfo, setLoginInfo] = useRecoilState(loginState);
  const { user } = loginInfo;
  useEffect(() => {
    fetch(`/api/users/${String(user?._id)}`).then((response) =>
      response
        .json()
        .then((json) => setLoginInfo((prev) => ({ ...prev, ...json })))
    );
  }, []);

  const totals = langs.map((lang) =>
    user?.stat[lang].total === undefined ? 0 : user.stat[lang].total
  );
  let totalNum = 0;
  totals.forEach((total) => (totalNum += total));

  const [lang, setLang] = useState("En");
  const selectLang = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedLang = event.currentTarget.value;
    setLang(() => selectedLang);
  };

  return (
    <>
      <HeaderMenu />
      <Container>
        <ul>
          <h3>집계</h3>
          <li>전체 : {totalNum}</li>
          {totals.map((total, index) => (
            <li key={`total_${index}`}>
              {languagesInKo[index]} : {total}
            </li>
          ))}
          <PieChart labels={languagesInKo} series={totals} />
        </ul>
        <ul>
          <h3>복습 현황</h3>
          <select onChange={selectLang}>
            {languagesInKo.map((language, index) => (
              <option key={`languageOption_${index}`} value={langs[index]}>
                {language}
              </option>
            ))}
          </select>
          <li>전체 : {user?.stat[lang].total}</li>
          {["once", "twice", "threeTimes", "fourTimes"].map(
            (revTimes, index) => (
              <li key={`reviewed_${revTimes}`}>
                {["1회 복습", "2회 복습", "3회 복습", "4회 복습"][index]} :{" "}
                {user?.stat[lang][revTimes]}
              </li>
            )
          )}
          <RadialBarChart
            labels={`마스터한 단어 : ${user?.stat[lang].fourTimes}개`}
            series={
              (user?.stat[lang].fourTime && user.stat[lang].total !== 0
                ? (user?.stat[lang].fourTimes / user?.stat[lang].total) * 100
                : 0) ?? 0
            }
          />
          <BarChart
            labels={["Once", "Twice", "ThreeTimes"]}
            series={[
              user?.stat[lang].once ?? 0,
              user?.stat[lang].twice ?? 0,
              user?.stat[lang].threeTimes ?? 0,
            ]}
          />
        </ul>
      </Container>
    </>
  );
}

export default Statistics;
