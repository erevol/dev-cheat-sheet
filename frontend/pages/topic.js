import QuestionsList from '../components/QuestionsList';
import TopicsList from '../components/TopicsList';
import JobsList from '../components/JobsList';
import styled from '@emotion/styled';
import {
  Grid,
} from 'semantic-ui-react';

const StyledContainer = styled.div`
  margin: 50px 20px 100px;
`;

const TopicPage = (props) => (
  <StyledContainer>
    <QuestionsList id={props.query.id}/>
  </StyledContainer>
);

export default TopicPage;
