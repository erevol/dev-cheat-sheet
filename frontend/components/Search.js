import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_QUESTIONS_QUERY = gql`
  query SEARCH_QUESTIONS_QUERY($searchTerm: String!) {
    questions(where: { OR: [{ title_contains: $searchTerm }, { answer_contains: $searchTerm }] }) {
      id
      title
      answer
      seniority { id name }
      topic { id name }
      votes
    }
  }
`;

class AutoComplete extends React.Component {
  state = {
    questions: [],
    loading: false,
  };

  routeToQuestion = (question) => {
    Router.push({
      pathname: '/question',
      query: {
        id: question.id,
      },
    });
  }

  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_QUESTIONS_QUERY,
      variables: { searchTerm: e.target.value },
    });
    this.setState({
      questions: res.data.questions,
      loading: false,
    });
  }, 350);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={this.routeToQuestion} itemToString={question => (question === null ? '' : question.title)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search For A Question',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.questions.map((question, index) => (
                    <DropDownItem
                      {...getItemProps({ item: question })}
                      key={question.id}
                      highlighted={index === highlightedIndex}
                    >
                      {question.title}
                    </DropDownItem>
                  ))}
                  {!this.state.questions.length &&
                    !this.state.loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
