import '../App.css';
import API from '../api';
import Auth from '../auth';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import FormModal from '../Components/FormModal';
import ItemsTable from '../Components/ItemsTable';
import DeleteModal from '../Components/DeleteModal';
import { useAuthContext } from "@asgardeo/auth-react";
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {

    const { signOut } = useAuthContext();
    const stateData = JSON.parse(localStorage.getItem("state"));
    const userName = stateData ? stateData.username : "Unknown User";

    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedId, setSelectedId] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getItems();
    }, []);

    const logout = () => {
        Auth.logout(() => {
            signOut();
            window.location.reload();
        });
    }

    const openFormModal = (item, isUpdating) => {
        setSelectedItem(item ? item : {});
        setIsEdit(isUpdating ? true : false);
        setOpenForm(true);
        setOpenDelete(false);
    }

    const openDeleteModal = (id) => {
        setSelectedId(id);
        setOpenDelete(true);
        setOpenForm(false);
    }

    const closeModal = () => {
        setSelectedItem({});
        setIsEdit(false);
        setOpenForm(false);
        setOpenDelete(false);
    }

    const getItems = () => {
        setIsLoading(true);
        API.get('')
            .then(res => {
                console.log("res GET", res);
                setItems(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("AXIOS ERROR:", err);
                setIsLoading(false);
            })
    }

    const addItem = (item) => {
        setIsLoading(true);
        closeModal();
        API.post('', item)
            .then(res => {
                console.log("res ADD", res);
                getItems();
                setIsLoading(false);
            })
            .catch(err => {
                console.log("AXIOS ERROR:", err);
                setIsLoading(false);
            })
    }

    const updateItem = (item) => {
        setIsLoading(true);
        closeModal();
        API.put('', item)
            .then(res => {
                console.log("res UPDATE", res);
                getItems();
                setIsLoading(false);
            })
            .catch(err => {
                console.log("AXIOS ERROR:", err);
                setIsLoading(false);
            })
    }

    const removeItem = () => {
        setIsLoading(true);
        closeModal();
        API.delete(`${selectedId}`)
            .then(res => {
                console.log("res DELETE", res);
                getItems();
                setIsLoading(false);
            })
            .catch(err => {
                console.log("AXIOS ERROR:", err);
                setIsLoading(false);
            })
    }

    return (
        <div className="dashboard-main">
            {isLoading &&
                <Box sx={{ display: 'flex' }} className="circular-progress-box">
                    <CircularProgress className="circular-progress" />
                </Box>
            }
            <button className="signin-button" onClick={() => logout()}>Logout</button>
            <div className="dashboard-body">
                <div className="dashboard-username">{`Logged as: ${userName}`}</div>
                <div className="dashboard-table-main">
                    <button className="action-button" onClick={openFormModal}>Add Item</button>
                    <div className="dashboard-table">
                        <ItemsTable
                            items={items}
                            update={openFormModal}
                            remove={openDeleteModal}
                        />
                    </div>
                </div>
            </div>

            <FormModal
                open={openForm}
                isEdit={isEdit}
                data={selectedItem}
                onSubmit={isEdit ? updateItem : addItem}
                onClose={closeModal}
            />

            <DeleteModal
                open={openDelete}
                onSubmit={removeItem}
                onClose={closeModal}
            />

        </div>
    )
}

export default withRouter(Dashboard);