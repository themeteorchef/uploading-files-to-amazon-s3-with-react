import s3PublicUrl from 'node-s3-public-url';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Files from './files';
import S3 from '../../modules/server/s3';

Meteor.methods({
  'files.store': function filesStoreMethod(file) {
    check(file, Object);
    const user = Meteor.users.findOne(this.userId, { fields: { emails: 1 } });
    const email = user.emails[0].address;
    const sanitizedUrl =
    file.url.replace(email, `${encodeURIComponent(email)}`)
    .replace(file.name, `${s3PublicUrl(file.name)}`);
    return Files.insert({ userId: this.userId, url: sanitizedUrl, fileName: file.name });
  },
  'files.delete': function filesStoreMethod(fileId) {
    check(fileId, String);
    const file = Files.findOne(fileId);
    const user = Meteor.users.findOne(this.userId, { fields: { emails: 1 } });
    file.emailAddress = user.emails[0].address;
    if (file && file.userId === this.userId) {
      return S3.deleteFile(file, () => {
        Files.remove({ _id: fileId, userId: this.userId });
      });
    }

    throw new Meteor.Error('500', 'Must be logged in to do that!');
  },
});
