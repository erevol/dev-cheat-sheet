import React from 'react';
import PostJob from '../components/PostJob';
import PrivateRoute from '../components/PrivateRoute';

const PostJobPage = () => {
  return (
    <PrivateRoute>
      <PostJob />
    </PrivateRoute>
  );
};

export default PostJobPage;
