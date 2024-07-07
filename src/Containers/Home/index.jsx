

import {
  Container,
  Title,
  Image,
  ContainerItems,
  
} from './styles';
import People from '../../Assets/people.svg';
import ClientForm from '../../Components/Form/Index';
function Home() {

  

  return (
    <Container>
      <Image alt='logo-image' src={People} />

      <ContainerItems>
        <Title>Cadastro de Clientes</Title>
       <ClientForm />

      </ContainerItems>
    </Container>
  );
}

export default Home;
