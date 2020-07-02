import styled from '@emotion/styled';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from './Button';
import User from './User';

const StyledItem = styled.div`
  display: inline-block;
  margin-bottom: 10px;
  transform: skewX(-5deg);
  cursor: pointer;
  justify-self: flex-start;
  margin-right: auto;
  padding: 0 20px;

  &:hover {
    a {
      color: ${props => props.theme.black};
    }
    background-color: ${props => props.theme.grey1};
    border-radius: 10px;
    padding: 0 20px;
  }
`;

const StyledQuestionListItem = styled.li`
  counter-increment: li;
  margin-bottom: 10px;
  position: relative;
  min-height: 85px;
  border-bottom: 1px solid ${props => props.theme.offWhite};

  &:last-child {
    border-bottom: none;
  }

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

  .ui.checkbox {
    margin: 0 8px 0 20px;
  }
`;

class Question extends React.Component {
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
            <a>{question.title}</a>
          </Link>
        </StyledItem>
        {this.props.pathname.includes('topic') ? <Button color="green"><Link
            href={{
              pathname: '/seniority',
              query: { id: question.seniority.id },
            }}
          >
            <a>{question.seniority.name}</a>
          </Link>
        </Button> : null}
        <User>
          {({ data }) => {
            const me = data ? data.me : null;
            return (
              me && <Button position="right" color="red"><Link
                href={{
                  pathname: '/update-question',
                  query: { id: question.id },
                }}
              >
                <a>Update</a>
              </Link>
            </Button>
            )
          }}
        </User>
      </StyledQuestionListItem>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Question;
