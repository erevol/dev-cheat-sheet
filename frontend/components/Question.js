import React, { Component } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const StyledItem = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  transform: skewX(-5deg);
  cursor: pointer;
  justify-self: flex-start;
  margin-right: auto;


  &:hover {
    a {
      color: ${props => props.theme.black};
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
  margin-bottom: 10px;
  position: relative;
  min-height: 85px;
  border-bottom: 1px solid ${props => props.theme.offWhite};

  @media (min-width: 769px) {
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    margin-bottom: 10px;
    min-height: 42px;
  }

  &:before {
    content: counter(li);
    display: inline-block;
    width: 1em;
    min-width: 30px;
    margin-right: 10px;
    background-color: ${props => props.theme.red};
    color: ${props => props.theme.white};
    border-radius: 10px;
    text-align: center;
    transform: skewX(-5deg);

    @media (min-width: 769px) {
      margin-left: -1em;
    }
  }
`;

const StyledSeniorityButton = styled.div`
  min-width: 100px;
  background-color: ${props => props.theme.green};
  display: inline-block;
  text-align: center;
  color: ${props => props.theme.white};
  border-radius: 10px;
  cursor: pointer;
  transform: skewX(-5deg);

  bottom: 10px;
  position: absolute;
  width: calc(50% - 10px);
  left: 0;

  @media (min-width: 769px) {
    margin-left: 10px;
    position: initial;
    width: auto;
  }

  &:hover {
    background-color: ${props => props.theme.green_darken20};
    transition: background 0.2s ease-out;
  }
`;

const StyledUpdateButton = styled.div`
  min-width: 100px;
  background-color: ${props => props.theme.red};
  display: inline-block;
  text-align: center;
  color: ${props => props.theme.white};
  border-radius: 10px;
  cursor: pointer;
  transform: skewX(-5deg);

  bottom: 10px;
  position: absolute;
  width: calc(50% - 10px);
  right: 0;

  @media (min-width: 769px) {
    margin-left: 10px;
    position: initial;
    width: auto;
  }

  a {
    color: ${props => props.theme.white};
  }

  &:hover {
    background-color: ${props => props.theme.red_darken20};
    transition: background 0.2s ease-out;
  }
`;

class Question extends Component {
  render() {
    const { question } = this.props;

    return (
      <StyledQuestionListItem>
        <StyledItem>
          <Link
            href={{
              pathname: '/question',
              query: { id: question.id },
            }}
          >
            <StyledQuestion>{question.title}</StyledQuestion>
          </Link>
        </StyledItem>
        <StyledSeniorityButton>{question.seniority}</StyledSeniorityButton>
        <StyledUpdateButton><Link
            href={{
              pathname: '/update-question',
              query: { id: question.id },
            }}
          >
            Update
          </Link></StyledUpdateButton>
      </StyledQuestionListItem>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
