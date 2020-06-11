import {
  Card,
  Icon,
  Image,
  Container,
  Segment,
  Header,
  Divider,
  Grid,
} from 'semantic-ui-react';
import Link from 'next/link';
import profile from '../static/profile.jpg';

const AboutUs = () => {
  return (
    <Container>
      <Segment raised placeholder>
        <Grid columns={2} stackable>
          <Grid.Row >
            <Grid.Column width={6}>
              <Grid.Row>
                <Card>
                  <Image src={profile} />
                  <Card.Content>
                    <Card.Header>Eugenia Revol</Card.Header>
                    <Card.Meta>
                      <span className='date'>Fullstack Engineer</span>
                    </Card.Meta>
                    <Card.Description>
                      Eugenia is from Córdoba Argentina and she likes to code in Javascript.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Link href="mailto:euge.revol@gmail.com"><a>
                      <Icon name='envelope' />
                      euge.revol@gmail.com
                    </a></Link>
                  </Card.Content>
                </Card>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default AboutUs;
