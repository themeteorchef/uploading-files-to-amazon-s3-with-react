import React, { PropTypes } from 'react';
import { composeWithTracker } from 'react-komposer';
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Files from '../../api/files/files';
import Loading from './Loading';

const deleteObject = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('files.delete', _id, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('File deleted!', 'success');
      }
    });
  }
};

const FileList = ({ files }) => (
  <div className="Files">
    {files.length ? <ListGroup>
      {files.map(({ _id, url }) => (
        <ListGroupItem key={url}>
          <a href={url} target="_blank">{url}</a>
          <i onClick={() => { deleteObject(_id); }} className="fa fa-remove" />
        </ListGroupItem>
      ))}
    </ListGroup> : <Alert bsStyle="warning">No files yet. Try uploading something!</Alert>}
  </div>
);

FileList.propTypes = {
  files: PropTypes.array,
};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('files');
  if (subscription.ready()) {
    const files = Files.find({ userId: Meteor.userId() }).fetch();
    onData(null, { files });
  }
};

export default composeWithTracker(composer, Loading)(FileList);
