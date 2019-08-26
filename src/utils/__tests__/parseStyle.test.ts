import parseStyle from '../parseStyle';

describe('parseStyle', () => {
  it('should parse css styles correctly', () => {
    const styleString = 'z-index:1; background-color:#ff0000; margin:10px 0px;';
    const expectedOutput = {
      zIndex: '1',
      backgroundColor: '#ff0000',
      margin: '10px 0px',
    };
    expect(parseStyle(styleString)).toMatchObject(expectedOutput);
  });
});
