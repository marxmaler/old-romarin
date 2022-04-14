import WordForm from "../components/WordForm";
import HeaderMenu from "../components/HeaderMenu";
import { Container } from "../styles/containerStyle";

function AddWords() {
  return (
    <>
      <HeaderMenu />
      <Container>
        <WordForm />
      </Container>
    </>
  );
}

export default AddWords;
