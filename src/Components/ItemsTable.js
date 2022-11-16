import * as React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';

const ItemsTable = ({ items, update, remove }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Item ID</TableCell>
                        <TableCell align="right">Item Name</TableCell>
                        <TableCell align="right">Units Available</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item.item_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{item.item_id}</TableCell>
                            <TableCell align="right">{item.item_name}</TableCell>
                            <TableCell align="right">{item.units_available}</TableCell>
                            <TableCell align="right">
                                <div className='table-actions-main'>
                                    <EditIcon className='update-icon' onClick={() => update(item, true)} />
                                    <DeleteIcon className='delete-icon' onClick={() => remove(item.item_id)} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ItemsTable;