import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";

const styles = () => ({
  boldListItem: {
    fontWeight: "bold" as "bold"
  },
  nestedListItem: {
    paddingLeft: "2rem"
  }
});

export interface IMultilevelDropdownProps {
  label: string;
  options: IMultilevelDropdownOption[];
  selectedId: number;
  classes?: any;
  setOption: (option: IMultilevelDropdownOption) => void;
}

export interface IMultilevelDropdownOption {
  Id: number;
  Name: string;
  Type: string;
  Children: IMultilevelDropdownOption[];
}

export const findSelectedOption = (
  options: IMultilevelDropdownOption[],
  id: number
) => {
  const selected = options.filter((option: IMultilevelDropdownOption) =>
    option.Children.some((child: IMultilevelDropdownOption) => child.Id === id)
  );
  if (selected[0].Children.length === 1) {
    return selected[0].Name;
  }
  return selected.map((option: any) =>
    option.Children.find((child: IMultilevelDropdownOption) => child.Id === id)
  )[0].Name;
};

export const composeOptionMenu = (
  options: IMultilevelDropdownOption[],
  id: number,
  boldListItem: any,
  nestedListItem: any,
  handleMenuClick: (option: IMultilevelDropdownOption) => void
) => {
  return options.map((option: IMultilevelDropdownOption) => {
    const isHeaderOption = option.Id <= 0;
    const isLeveled = option.Children.length > 1;
    const menuItems = [];

    menuItems.push(
      <MenuItem
        key={isHeaderOption ? option.Children[0].Id : option.Id}
        className={isHeaderOption || isLeveled ? boldListItem : undefined}
        selected={
          !isHeaderOption && !isLeveled
            ? option.Children[0].Id === id
            : undefined
        }
        onClick={
          !isHeaderOption && !isLeveled
            ? () => handleMenuClick(option.Children[0])
            : undefined
        }
      >
        {option.Name}
      </MenuItem>
    );
    if (isLeveled) {
      option.Children.forEach((child: IMultilevelDropdownOption) =>
        menuItems.push(
          <MenuItem
            key={child.Id}
            selected={child.Id === id}
            className={nestedListItem}
            onClick={(e: React.MouseEvent) => handleMenuClick(child)}
          >
            {child.Name}
          </MenuItem>
        )
      );
    }
    return menuItems;
  });
};

const BaseMultilevelDropdown: React.FunctionComponent<
  IMultilevelDropdownProps
> = ({ classes: { boldListItem, nestedListItem }, ...props }) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {
    label,
    options,
    selectedId,
    setOption
  } = props;

  const handleMenuClick = (option: IMultilevelDropdownOption) => {
    setOption(option);
    setAnchorEl(null);
  }

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <List component="nav" aria-label={label}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={label}
          onClick={e => handleClickListItem(e)}
        >
          <ListItemText
            primary={label}
            secondary={findSelectedOption(options, selectedId)}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        {composeOptionMenu(
          options,
          selectedId,
          boldListItem,
          nestedListItem,
          handleMenuClick
        )}
      </Menu>
    </div>
  );
};

const MultilevelDropdown = withStyles(styles)(BaseMultilevelDropdown);

export { MultilevelDropdown };
