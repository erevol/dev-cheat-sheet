import QuestionsList from '../components/QuestionsList';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 50px 20px 100px;
`;

const SeniorityPage = (props) => (
  <StyledContainer>
    <QuestionsList id={props.query.id} pathname={props.pathname} />
  </StyledContainer>
);

export default SeniorityPage;
