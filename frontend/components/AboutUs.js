import {
  Card,
  Icon,
  Image,
  Container,
  Segment,
  Header,
  Divider,
} from 'semantic-ui-react';
import profile from '../static/profile.jpg';
import styled from '@emotion/styled';

const StyledRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: inherit;
  align-items: stretch;
  width: 100%!important;
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;

  @media (min-width: 400px) {
    flex-direction: row;
  }
`;

const StyledColumn = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
  padding-left: 1rem;
  padding-right: 1rem;
  vertical-align: top;

  @media (min-width: 400px) {
    width: 50%;
  }
`;

const AboutUs = () => {
  return (
    <Container>
      <Segment>
        <StyledRow>
          <StyledColumn>
            <Card style={{marginBottom: '20px'}}>
              <Image src={profile} wrapped ui={false} />
              <Card.Content>
                <Card.Header>Eugenia Revol</Card.Header>
                <Card.Meta>Fullstack Engineer</Card.Meta>
                <Card.Description>
                  Eugenia is from Córdoba Argentina and she likes to code in Javascript.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="envelope" />
                  euge.revol@gmail.com
                </a>
              </Card.Content>
            </Card>
          </StyledColumn>
          <StyledColumn>
            <Container textAlign="justified">
              <Header as="h1">Non ipsum deserunt</Header>
              <Divider />
              <p>
                Te eum doming eirmod, nominati pertinacia argumentum ad his. Ex eam alia
                facete scriptorem, est autem aliquip detraxit at. Usu ocurreret
                referrentur at, cu epicurei appellantur vix. Cum ea laoreet recteque
                electram, eos choro alterum definiebas in. Vim dolorum definiebas an. Mei
                ex natum rebum iisque.
              </p>
              <p>
                Audiam quaerendum eu sea, pro omittam definiebas ex. Te est latine
                definitiones. Quot wisi nulla ex duo. Vis sint solet expetenda ne, his te
                phaedrum referrentur consectetuer. Id vix fabulas oporteat, ei quo vide
                phaedrum, vim vivendum maiestatis in.
              </p>
            </Container>
          </StyledColumn>
        </StyledRow>
      </Segment>
    </Container>
  )
}

export default AboutUs;
