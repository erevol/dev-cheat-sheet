import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@emotion/styled';
import Question from './Question';

const ALL_QUESTIONS_QUERY = gql`
  query ALL_QUESTIONS_QUERY {
    questions {
      id
      title
      answer
    }
  }
`;

const Center = styled.div`

`;

const StyledHeading = styled.h1`
  text-transform: uppercase;
  line-height: 3;
`;

const QuestionsList = styled.ol`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0;
  list-style: none;
  counter-reset: li;
`;

class Questions extends Component {
  render() {
    return (
      <Center>
        <StyledHeading>Questions</StyledHeading>
        <Query query={ALL_QUESTIONS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: { error.message }</p>;
            console.log(data);
            return <QuestionsList>
              { data.questions.map((question) => <Question
                question={question}
                key={question.id}
              />) }
            </QuestionsList>;
          }}
        </Query>
      </Center>
    );
  }
}

export default Questions;
