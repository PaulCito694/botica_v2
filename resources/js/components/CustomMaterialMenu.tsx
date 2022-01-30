import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line react/prop-types
const CustomMaterialMenu = ({ row, onDeleteRow, size, onUpdateRow }:any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteRow = () => {
    if (onDeleteRow) {
      onDeleteRow(row.id);
    }
  };
  const updateRow = () => {
    if (onUpdateRow) {
      onUpdateRow(row);
    }
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick} size={size}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Ver</MenuItem>

        <MenuItem onClick={updateRow}>Editar</MenuItem>

        <Divider />

        <MenuItem onClick={deleteRow}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="inherit">Eliminar</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CustomMaterialMenu
