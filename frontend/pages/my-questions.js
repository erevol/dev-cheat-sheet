import QuestionsByUserList from '../components/QuestionsByUserList';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  margin: 50px 20px 100px;
`;

const MyQuestionsPage = (props) => (
  <StyledContainer>
    <QuestionsByUserList id={props.query.id} pathname={props.pathname} />
  </StyledContainer>
);

export default MyQuestionsPage;
