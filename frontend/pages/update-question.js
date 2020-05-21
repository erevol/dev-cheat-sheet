import React from 'react';
import UpdateQuestion from '../components/UpdateQuestion';

const UpdateQuestionPage = ({ query }) => {
  return (
    <UpdateQuestion id={query.id} />
  );
};

export default UpdateQuestionPage;
