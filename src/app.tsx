import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {
  MultilevelDropdown,
  IMultilevelDropdownProps,
  IMultilevelDropdownOption
} from "./multileveldropdown";

const multilevelDropdownOptions: IMultilevelDropdownOption[] = [
  {
    Id: 17,
    Name: "Vulnerability Library",
    Type: "Application",
    Children: [
      {
        Id: 126,
        Name: "Vulnerability Library",
        Type: "",
        Children: []
      }
    ]
  },
  {
    Id: 65,
    Name: "Policies",
    Type: "Application",
    Children: [
      { Id: 3, Name: "Policy", Type: "", Children: [] },
      { Id: 4, Name: "Area", Type: "", Children: [] },
      { Id: 5, Name: "Section", Type: "", Children: [] }
    ]
  },
  {
    Id: 66,
    Name: "Control Standards",
    Type: "Application",
    Children: [
      {
        Id: 41,
        Name: "Control Standards",
        Type: "",
        Children: []
      }
    ]
  },
  {
    Id: 537,
    Name: "ARCHER-68342",
    Type: "Application",
    Children: [
      {
        Id: 335,
        Name: "ARCHER-68342",
        Type: "",
        Children: []
      }
    ]
  },
  {
    Id: 539,
    Name: "Containers",
    Type: "Application",
    Children: [
      {
        Id: 337,
        Name: "Containers",
        Type: "",
        Children: []
      }
    ]
  }
];

const sortOptions = (items: IMultilevelDropdownOption[], sortby: string) => {
  return items.slice().sort((a, b) => {
    let nameA = '';
    let nameB = '';
    if (sortby === 'Name') {
      nameA = a.Name.toUpperCase();
      nameB = b.Name.toUpperCase();
    }
    if (sortby === 'Type') {
      nameA = a.Type.toUpperCase();
      nameB = b.Type.toUpperCase();
    }
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

const addHeaderOptions = (inputTargets: IMultilevelDropdownOption[]) => {
  const sortedInputTargets = inputTargets && inputTargets.length > 0 ? sortOptions(inputTargets, 'Name') : [];

  const additionalHeaderOptions = [
    {
      Type: '0',
      Name: 'Target',
      Id: 0,
      Children: [
        {
          Name: 'Target',
          Id: 0,
          Type: '',
          Children: []
        }
      ]
    },
    {
      Type: 'a',
      Name: 'Applications',
      Id: -1,
      Children: [
        {
          Name: 'Applications',
          Id: -1,
          Type: '',
          Children: []
        }
      ]
    },
    {
      Type: 'o',
      Name: 'Questionnaires',
      Id: -2,
      Children: [
        {
          Name: 'Questionnaires',
          Id: -2,
          Type: '',
          Children: []
        }
      ]
    }
  ];

  return sortOptions([...sortedInputTargets, ...additionalHeaderOptions], 'Type');
};

const App = () => {
  const [selectedTarget, setSelectedTarget] = useState<number>(0);

  const multilevelDropdownOptionsWithHeader = addHeaderOptions(multilevelDropdownOptions);

  const multilevelDropdownProps: IMultilevelDropdownProps = {
    label: "Applications",
    options: multilevelDropdownOptionsWithHeader,
    selectedId: selectedTarget,
    setOption: (option: IMultilevelDropdownOption) => {
      setSelectedTarget(option.Id);
    },
  };
  return (
    <div>
      <Typography variant="body1">Multilevel Dropdown Demo</Typography>
      <Grid direction="row" container justify="flex-start">
        <Grid container item justify="flex-start" xs={6}>
          <MultilevelDropdown {...multilevelDropdownProps} />
        </Grid>
        <Grid container item justify="flex-start" xs={6}>
          <Typography variant="body1">Current Selection: {selectedTarget}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default App;

