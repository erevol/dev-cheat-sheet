import React from 'react';
import CreateQuestion from '../components/CreateQuestion';
import PrivateRoute from '../components/PrivateRoute';

const CreateQuestionPage = () => {
  return (
    <PrivateRoute>
      <CreateQuestion />
    </PrivateRoute>
  );
};

export default CreateQuestionPage;
