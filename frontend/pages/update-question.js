import React from 'react';
import UpdateQuestion from '../components/UpdateQuestion';
import PrivateRoute from '../components/PrivateRoute';

const UpdateQuestionPage = ({ query }) => {
  return (
    <PrivateRoute>
      <UpdateQuestion id={query.id} />
    </PrivateRoute>
  );
};

export default UpdateQuestionPage;
