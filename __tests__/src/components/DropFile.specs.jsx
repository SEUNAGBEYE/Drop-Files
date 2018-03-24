import React from 'react';
import { shallow } from 'enzyme';
import DropFile from '../../../index';

const event = {
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  dataTransfer: {
    files: ['fileone']
  },
  target: {
    id: 'files',
    name: 'files',
    dataset: {
      id: 'files'
    },
    files: ['one']
  }
}
const props = {
  that: {
    state: {
      files: [{}]
    },
    setState: jest.fn()
  }
}

describe('# Drop File', () => {

  it('should render successfully', (done) => {
    const wrapper = shallow(<DropFile
      {...props}
      />);
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('main');
    expect(wrapper).toMatchSnapshot()
    done();
  });

  it('should click on input', (done) => {
    const onChangeSpy = jest.spyOn(DropFile.prototype, 'onChange')
    const wrapper = shallow(<DropFile
      {...props}
      />);
    wrapper.find('#file').simulate('change', event)
    expect(onChangeSpy).toHaveBeenCalled();
    done();
  });

  it('should drag and drop file', (done) => {
    const dragAndDropFileSpy = jest.spyOn(DropFile.prototype, 'dragAndDropFile')
    const wrapper = shallow(<DropFile
      {...props}
      />);
    wrapper.find('#selectFileContainer').simulate('dragenter', event)
    wrapper.find('#selectFileContainer').simulate('dragover', event)
    wrapper.find('#selectFileContainer').simulate('drop', event)
    expect(dragAndDropFileSpy).toHaveBeenCalled();
    done();
  });

  it('should remove file', (done) => {
    const removeFileSpy = jest.spyOn(DropFile.prototype, 'removeFile')
    const wrapper = shallow(<DropFile
      {...props}
      />);
    wrapper.find('[data-id=0]').simulate('click', event)
    expect(removeFileSpy).toHaveBeenCalled();
    done();
  });
});