import React, { Component } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import PropTypes from 'prop-types';

const StyledItem = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  transform: skewX(-5deg);

  &:hover {
    a {
      color: ${props => props.theme.black};
      cursor: pointer;
    }
    background-color: ${props => props.theme.grey1};
    border-radius: 10px;
  }
`;

const StyledQuestion = styled.a`
  padding-left: 10px;
`;

const StyledQuestionListItem = styled.li`
  counter-increment: li;
  cursor: pointer;

  &:before {
    content: counter(li);
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    min-width: 30px;
    margin-right: 10px;
    background-color: ${props => props.theme.red};
    color: ${props => props.theme.white};
    border-radius: 10px;
    text-align: center;
    transform: skewX(-5deg);
  }
`;

const StyledSeniorityIcon = styled.div`
  min-width: 100px;
  margin-left: 10px;
  background-color: ${props => props.theme.red};
  display: inline-block;
  text-align: center;
  color: ${props => props.theme.white};
  border-radius: 10px;
`;

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <StyledQuestionListItem key={question.id}>
        <StyledItem>
          <Link
            href={{
              pathname: '/question',
              query: { id: question.id },
            }}
          >
            <StyledQuestion>{question.title}</StyledQuestion>
          </Link>
          <StyledSeniorityIcon>AtestingABC</StyledSeniorityIcon>
        </StyledItem>
      </StyledQuestionListItem>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
};

export default Question;
