import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function FormModal({ open, onSubmit, onClose, isEdit, data }) {

    const [id, setId] = useState(data ? data.item_id : 0);
    const [name, setName] = useState(data ? data.item_name : "");
    const [units, setUnits] = useState(data ? data.units_available : 0);

    useEffect(() => {
        setId(data.item_id);
        setName(data.item_name);
        setUnits(data.units_available);
    }, [data]);

    const submit = () => {
        const data = {
            item_id: Number(id),
            item_name: name,
            units_available: Number(units)
        }
        onSubmit(data);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`${isEdit ? "Update" : "Add"} Item`}
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="ID" variant="outlined" type="number" fullWidth value={id} onChange={e => setId(e.target.value)} />
                        <TextField id="outlined-basic" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={e => setName(e.target.value)} />
                        <TextField id="outlined-basic" label="Units" variant="outlined" type="number" fullWidth value={units} onChange={e => setUnits(e.target.value)} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} autoFocus>Submit</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}