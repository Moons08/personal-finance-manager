import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const selectboxStyles = {
    marginTop: '12px'
}

const MuiSelectBox = (props) => {
    const { label, item, value, handleChange, disabled, variant, selectOptionList } = props;

    return (
        <TextField
            label={label}
            select
            fullWidth
            value={value}
            disabled={disabled}
            //onChange={e => handleChange(e, item)}
            variant={variant}
            style={selectboxStyles}
            size="small"
        >
            {selectOptionList.map((i) => (
                <MenuItem
                    key={i.name}
                    value={i.id}
                >
                    {i.name}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default MuiSelectBox

MuiSelectBox.defaultProps = {
    label: '',
    selectOptionList : [
        { id: "month", name: "월별" },
        { id: "quarter", name: "분기별" },
        { id: "half", name: "반기별" },
        { id: "year", name: "연간" },
    ]
}