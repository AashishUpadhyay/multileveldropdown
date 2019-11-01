import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { findSelectedOption, composeOptionMenu, MultilevelDropdown, IMultilevelDropdownProps, IMultilevelDropdownOption } from './multileveldropdown';

describe('multileveldropdown tests', () => {
  let options: IMultilevelDropdownOption[];
  let optionsWithHeader: IMultilevelDropdownOption[];

  beforeEach(() => {
    configure({ adapter: new Adapter() });

    options = [
      {
        Id: 17,
        Name: 'Vulnerability Library',
        Type: 'Application',
        Children: [
          {
            Id: 126,
            Name: 'Vulnerability Library',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 65,
        Name: 'Policies',
        Type: 'Application',
        Children: [
          {
            Id: 3,
            Name: 'Policy',
            Type: 'Application',
            Children: []
          },
          {
            Id: 4,
            Name: 'Area',
            Type: 'Application',
            Children: []
          },
          {
            Id: 5,
            Name: 'Section',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 66,
        Name: 'Control Standards',
        Type: 'Application',
        Children: [
          {
            Id: 41,
            Name: 'Control Standards',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 537,
        Name: 'ARCHER-68342',
        Type: 'Application',
        Children: [
          {
            Id: 335,
            Name: 'ARCHER-68342',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 539,
        Name: 'Containers',
        Type: 'Application',
        Children: [
          {
            Id: 337,
            Name: 'Containers',
            Type: 'Application',
            Children: []
          }
        ]
      }
    ];

    optionsWithHeader = [
      {
        Id: 17,
        Name: 'Vulnerability Library',
        Type: 'Application',
        Children: [
          {
            Id: 126,
            Name: 'Vulnerability Library',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 65,
        Name: 'Policies',
        Type: 'Application',
        Children: [
          {
            Id: 3,
            Name: 'Policy',
            Type: 'Application',
            Children: []
          },
          {
            Id: 4,
            Name: 'Area',
            Type: 'Application',
            Children: []
          },
          {
            Id: 5,
            Name: 'Section',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 66,
        Name: 'Control Standards',
        Type: 'Application',
        Children: [
          {
            Id: 41,
            Name: 'Control Standards',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 537,
        Name: 'ARCHER-68342',
        Type: 'Application',
        Children: [
          {
            Id: 335,
            Name: 'ARCHER-68342',
            Type: 'Application',
            Children: []
          }
        ]
      },
      {
        Id: 539,
        Name: 'Containers',
        Type: 'Application',
        Children: [
          {
            Id: 337,
            Name: 'Containers',
            Type: 'Application',
            Children: []
          }
        ]
      },
      { Type: '0', Name: '42', Id: 0, Children: [{ Name: '42', Id: 0, Type: '', Children: [] }] },
      { Type: 'a', Name: '42', Id: -1, Children: [{ Name: '42', Id: -1, Type: '', Children: [] }] },
      { Type: 'o', Name: '42', Id: -2, Children: [{ Name: '42', Id: -2, Type: '', Children: [] }] }
    ];
  });

  it('should match snapshot', () => {
    const props: IMultilevelDropdownProps = {
      label: 'Target',
      options,
      selectedId: 126,
      setOption: (option: IMultilevelDropdownOption) => { }
    };
    const componentmount = mount(<MultilevelDropdown {...props} />);
    expect(componentmount).toMatchSnapshot();
  });

  it('should findSelectedOption for multilevel options', () => {
    const expectedName = 'Section';
    const returnedValue = findSelectedOption(options, 5);
    expect(returnedValue).toStrictEqual(expectedName);
  });

  it('should findSelectedOption for single level options', () => {
    const expectedName = 'Vulnerability Library';
    const returnedValue = findSelectedOption(options, 126);
    expect(returnedValue).toStrictEqual(expectedName);
  });

  it('should findSelectedOption for multilevel options when header options are present', () => {
    const expectedName = 'Section';
    const returnedValue = findSelectedOption(optionsWithHeader, 5);
    expect(returnedValue).toStrictEqual(expectedName);
  });

  it('should findSelectedOption for single level options when header options are present', () => {
    const expectedName = 'Vulnerability Library';
    const returnedValue = findSelectedOption(optionsWithHeader, 126);
    expect(returnedValue).toStrictEqual(expectedName);
  });

  it('should composeOptionMenu for single and multilevel options', () => {
    const expected = [17, 65, 3, 4, 5, 66, 537, 539];
    const boldListItem = {
      fontWeight: 'bold' as 'bold'
    };
    const nestedListItem = {
      paddingLeft: '2rem'
    };
    const setSelectedTarget = jest.fn();
    const returnedValue = composeOptionMenu(options, 126, boldListItem, nestedListItem, setSelectedTarget);
    const returnedValueFlattened = returnedValue.reduce((accumulator, value) => accumulator.concat(value), [] as JSX.Element[]);
    const returnedKeys = returnedValueFlattened.map(menuItem => {
      return menuItem.key;
    });

    expect(expected.join()).toStrictEqual(returnedKeys.join());
  });

  it('should composeOptionMenu for single and multilevel options when header options are present', () => {
    const expected = [17, 65, 3, 4, 5, 66, 537, 539, 0, -1, -2];
    const boldListItem = {
      fontWeight: 'bold' as 'bold'
    };
    const nestedListItem = {
      paddingLeft: '2rem'
    };
    const setSelectedTarget = jest.fn();
    const returnedValue = composeOptionMenu(optionsWithHeader, 126, boldListItem, nestedListItem, setSelectedTarget);
    const returnedValueFlattened = returnedValue.reduce((accumulator, value) => accumulator.concat(value), [] as JSX.Element[]);
    const returnedKeys = returnedValueFlattened.map(menuItem => {
      return menuItem.key;
    });

    expect(expected.join()).toStrictEqual(returnedKeys.join());
  });
});
