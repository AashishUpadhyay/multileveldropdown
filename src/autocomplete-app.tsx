import React from "react";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nestedModules: {
      paddingLeft: theme.spacing(2),
    },
    nestedLevels: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

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
  Type: string;
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
        Type: "Application",
        Children: []
      }
    ]
  },
  {
    Id: 65,
    Name: "Policies Library",
    Type: "Application",
    Children: [
      { Id: 3, Name: "Policy", Type: "Application", Children: [] },
      { Id: 4, Name: "Area", Type: "Application", Children: [] },
      { Id: 5, Name: "Section", Type: "Application", Children: [] }
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
        Type: "Application",
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
        Type: "Application",
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
        Type: "Application",
        Children: []
      }
    ]
  },
  {
    Id: 9817,
    Name: "Vulnerability Library Assessment",
    Type: "Questionnaire",
    Children: [
      {
        Id: 12676,
        Name: "Vulnerability Library Assessment",
        Type: "Questionnaire",
        Children: []
      }
    ]
  },
  {
    Id: 6235,
    Name: "Policies Assessment",
    Type: "Questionnaire",
    Children: [
      { Id: 23, Name: "Policy Assessment", Type: "Questionnaire", Children: [] },
      { Id: 344, Name: "Area Assessment", Type: "Questionnaire", Children: [] },
      { Id: 25, Name: "Section Assessment", Type: "Questionnaire", Children: [] }
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
          ModuleName: option.Name,
          Type: option.Type
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
          LevelName: child.Name,
          Type: option.Type
        }
      )
    );
  };
  return menuItems;
};

const AutocompleteApp = () => {
  const classes = useStyles();
  var options = composeOptions(multilevelDropdownOptions);
  return (
    <div>
      <Typography variant="body1">Auto Complete Demo</Typography>
      <Grid direction="row" container justify="flex-start">
        <Grid container item justify="flex-start" xs={6}>
          <Autocomplete
            id="combo-box-demo"
            options={options}
            groupBy={(option) => option.Type}
            getOptionLabel={option => (option.LevelName || option.ModuleName)}
            getOptionDisabled={option => (!option.LevelId)}
            style={{ width: 333 }}
            renderInput={params => (
              <TextField {...params} label="Combo box" variant="outlined" fullWidth />
            )}
            renderOption={(option) => {
              if (option.IsLeveled && option.LevelId) {
                return (<React.Fragment>
                  <span className={classes.nestedLevels}>
                    {(option.LevelName || option.ModuleName)}</span>
                </React.Fragment>);
              }
              else {
                return (<React.Fragment>
                  <span className={classes.nestedModules}>
                    {(option.LevelName || option.ModuleName)}</span>
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

