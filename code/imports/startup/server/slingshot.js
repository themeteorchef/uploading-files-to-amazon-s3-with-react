import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import { Slingshot } from 'meteor/edgee:slingshot';
import Files from '../../api/files/files';

Slingshot.fileRestrictions('Uploader', {
  allowedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/gif', 'image/svg+xml'],
  maxSize: 1 * 1024 * 1024, // 1MB limit (use null for unlimited)
});

Slingshot.createDirective('Uploader', Slingshot.S3Storage, {
  bucket: 'tmc-react-s3',
  acl: 'public-read',
  region: 'us-west-2',
  authorize() {
    if (!this.userId) throw new Meteor.Error('need-login', 'You need to be logged in to upload files!');
    const userFileCount = Files.find({ userId: this.userId }).count();
    return userFileCount < 3;
  },
  key(file) {
    const user = Meteor.users.findOne(this.userId);
    return `${user.emails[0].address}/${file.name}`;
  },
});
