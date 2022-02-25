import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vw;
  min-height: 50vh;
  background-color: white;
`;

function AddWordForm() {
  return (
    <>
      <form>
        <FormContainer>
          <ul>
            <li>
              <label htmlFor="">철자</label>
              <input></input>
            </li>
          </ul>
        </FormContainer>
      </form>
    </>
  );
}

export default AddWordForm;
