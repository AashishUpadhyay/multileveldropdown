import React from "react";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export interface IMultilevelDropdownOption {
  Id: number;
  Name: string;
  Type: string;
  Children: IMultilevelDropdownOption[];
}

export interface Target {
  LevelId?: number;
  LevelName?: string;
  ModuleId: number;
  ModuleName: string;
  IsLeveled: boolean;
}

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
    Name: "Policies Library",
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

export const composeOptions = (
  options: IMultilevelDropdownOption[]
) => {
  const menuItems: Target[] = [];
  for (const option of options) {
    const isLeveled = option.Children.length > 1;
    if (isLeveled) {
      menuItems.push(
        {
          IsLeveled: isLeveled,
          ModuleId: option.Id,
          ModuleName: option.Name
        }
      );
    }
    option.Children.forEach((child: IMultilevelDropdownOption) =>
      menuItems.push(
        {
          IsLeveled: isLeveled,
          ModuleId: option.Id,
          ModuleName: option.Name,
          LevelId: child.Id,
          LevelName: child.Name
        }
      )
    );
  };
  return menuItems;
};

const AutocompleteApp = () => {
  var options = composeOptions(multilevelDropdownOptions);
  return (
    <div>
      <Typography variant="body1">Auto Complete Demo</Typography>
      <Grid direction="row" container justify="flex-start">
        <Grid container item justify="flex-start" xs={6}>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={option => (option.LevelName || option.ModuleName)}
            getOptionDisabled={option => (!option.LevelId)}
            style={{ width: 333 }}
            renderInput={params => (
              <TextField {...params} placeholder="Combo box" variant="outlined" fullWidth />
            )}
            renderOption={(option) => {
              if (option.IsLeveled && option.LevelId) {
                return (<React.Fragment>
                  <span>&nbsp;&nbsp;</span>
                  {(option.LevelName || option.ModuleName)}
                </React.Fragment>);
              }
              else {
                return (<React.Fragment>
                  {(option.LevelName || option.ModuleName)}
                </React.Fragment>);
              }
            }
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default AutocompleteApp;

