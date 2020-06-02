import Hero from '../components/Hero';
import TopicsList from '../components/TopicsList';
import {
  Grid,
} from 'semantic-ui-react';

const Home = () => {
  return (
    <Grid columns={2} stackable textAlign="center">
      <Grid.Row verticalAlign="middle">
        <Hero />
      </Grid.Row>
      <Grid.Row verticalAlign="middle">
        <TopicsList />
      </Grid.Row>
    </Grid>
  );
};

export default Home;
