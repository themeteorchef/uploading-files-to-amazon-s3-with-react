import React, { PropTypes } from 'react';
import Uploader from '../components/Uploader';
import Files from '../components/Files';

const Index = () => (
  <div className="Index">
    <Uploader />
    <Files />
  </div>
);

Index.propTypes = {};

export default Index;
