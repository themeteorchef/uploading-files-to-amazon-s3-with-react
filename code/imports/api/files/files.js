import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Files = new Mongo.Collection('Files');

Files.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Files.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const FilesSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'The ID of the owner of this file.',
  },
  url: {
    type: String,
    label: 'The Amazon S3 URL for this file.',
  },
  fileName: {
    type: String,
    label: 'The original name for this file.',
  },
});

Files.attachSchema(FilesSchema);

export default Files;
