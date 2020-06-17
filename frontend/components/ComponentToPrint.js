import {
  Image,
  Header,
} from 'semantic-ui-react';
import logo from '../static/crown.svg';
import SingleQuestionToPrint from './SingleQuestionToPrint';
import styled from '@emotion/styled';

const StyledContainer = styled.div``;
const StyledHeader = styled.div`
  margin-bottom: 10px;
`;

class ComponentToPrint extends React.Component {
  render() {
    return (
      <StyledContainer>
        <StyledHeader>
          <Header as="h1">
            <Image avatar src={logo} verticalAlign="bottom" size="small" />
            <span> DEV CHEAT SHEET</span>
            <Header.Subheader>Access the answers of developers questions. Success you interview!</Header.Subheader>
          </Header>
          <Header as="h2">
            {this.props.topic} Questions
          </Header>
        </StyledHeader>
        { this.props.questions ? this.props.questions.map((question, index) => (
          <SingleQuestionToPrint
            key={question.id}
            question={question}
            itemNumber={index + 1}
          />
        )) : null}
      </StyledContainer>
    )
  };
};

export default ComponentToPrint;
