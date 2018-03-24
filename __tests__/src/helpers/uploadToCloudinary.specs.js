import { uploadToCloudinary } from '../../../index';

const files = ['fileone']

describe('# Drop File', () => {

  it('should call on upload to cloudinary', (done) => {
    const cloudinaryObject = { uploadToCloudinary }
    const uploadToCloudinarySpy = jest.spyOn( cloudinaryObject, 'uploadToCloudinary')
    cloudinaryObject.uploadToCloudinary(files)
    expect(uploadToCloudinarySpy).toHaveBeenCalled();
    done();
  });
});