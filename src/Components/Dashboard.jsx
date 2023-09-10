import Navbar from "./Navbar"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Button, Dialog, ToggleButtonGroup, TextField } from "@mui/material";
import { EditNote, Delete } from '@mui/icons-material'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser, deleteUser, editUserDetails, getUsersData } from "../Redux/Slices/UserSlice";
import CustomAlert from "./CustomAlert";

const Dashboard = () => {

    // States
    const [addDataDialog, setaddDataDialog] = useState(false)
    const [editDataDialog, setEditDataDialog] = useState(false)
    const [editableData, setEditableData] = useState({ name: "", role: "", phone: "", address: "" })
    const [user, setUser] = useState({ name: "", role: "", phone: "", address: "" })

    // accessing users data from redux
    const users = useSelector((state) => state.UsersData.users)

    // creating dispatch
    const dispatch = useDispatch()

    // function for show/hide add user modal 
    const addDataDialogHandler = () => {
        if (addDataDialog) {
            setaddDataDialog(false)
        }
        else {
            setaddDataDialog(true)
        }
    }

    // function for show/hide edit user modal 
    const editDataDialogHandler = (data) => {
        if (addDataDialog) {
            setEditDataDialog(false)
            setEditableData(data)
        }
        else {
            setEditDataDialog(true)
            setEditableData(data)
        }
    }

    // functions for handle onChange events 
    const editOnchange = (e) => {
        setEditableData({ ...editableData, [e.target.name]: e.target.value })
    }

    const addOnchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // function for dispatch create new user action
    const addUser = (e) => {
        e.preventDefault()
        dispatch(createNewUser(user))
        setUser({ name: "", role: "", phone: "", address: "" })
        addDataDialogHandler()
    }

    // function for dispatch update user action
    const updateDataHandler = (e) => {
        e.preventDefault()
        dispatch(editUserDetails(editableData))
        setEditDataDialog(false)
    }

    // accessing error state from redux
    let error = useSelector((state) => state.UsersData.error)

    useEffect(() => {
        dispatch(getUsersData())
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar />
            {error !== null && <CustomAlert severity={'error'} message={error.error} type={'Error'} />}
            <Container style={{ padding: 24 }}>
                <h1 style={{ textAlign: "center", margin: "20px 20px" }}>Users Data</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">User ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Role</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? users.map((element) => {
                                return <TableRow
                                    key={element._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">E{element._id.slice(0, 5)}</TableCell>
                                    <TableCell align="center">{element.name}</TableCell>
                                    <TableCell align="center">{element.role}</TableCell>
                                    <TableCell align="center">{element.phone}</TableCell>
                                    <TableCell align="center">{element.address}</TableCell>
                                    <TableCell align="center">
                                        <ToggleButtonGroup spacing={5}>
                                            <Button md='small' color="warning" onClick={() => editDataDialogHandler(element)}><EditNote></EditNote> </Button>
                                            <Button color="error" onClick={() => dispatch(deleteUser(element._id))}><Delete></Delete> </Button>
                                        </ToggleButtonGroup>
                                    </TableCell>
                                </TableRow>
                            }) : <TableRow>
                                <TableCell align="center" colSpan={6}>Records not found</TableCell>
                            </TableRow>}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Container  >
                <Button variant="contained" color="success" onClick={addDataDialogHandler}>
                    Add Data
                </Button>
            </Container>

            {/* add data  */}

            <Dialog
                open={addDataDialog}
                onClose={addDataDialogHandler}
            >
                <DialogTitle>Add Data</DialogTitle>
                <DialogContent>
                    <form onSubmit={addUser}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Full Name"
                            type="text"
                            value={user.name && user.name}
                            name="name"
                            fullWidth
                            variant="standard"
                            required
                            onChange={addOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Role"
                            type="text"
                            value={user.role && user.role}
                            name="role"
                            fullWidth
                            required
                            variant="standard"
                            onChange={addOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Phone Number"
                            type="text"
                            value={user.phone && user.phone}
                            name="phone"
                            fullWidth
                            required
                            variant="standard"
                            onChange={addOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Address"
                            type="text"
                            value={user.address && user.address}
                            name="address"
                            fullWidth
                            variant="standard"
                            required
                            onChange={addOnchange}
                        />
                        <DialogActions>
                            <Button type="submit" color="success" variant="contained"> Add</Button>
                            <Button onClick={addDataDialogHandler}>Close</Button>
                        </DialogActions>
                    </form>
                </DialogContent>


            </Dialog>

            {/* Edit data  */}

            <Dialog
                open={editDataDialog}
                onClose={editDataDialogHandler}
            >
                <DialogTitle>Add Data</DialogTitle>
                <DialogContent>
                    <form onSubmit={updateDataHandler}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Full Name"
                            type="text"
                            value={editableData.name && editableData.name}
                            name="name"
                            fullWidth
                            variant="standard"
                            onChange={editOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Role"
                            type="text"
                            value={editableData.role && editableData.role}
                            name="role"
                            fullWidth
                            variant="standard"
                            onChange={editOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Phone Number"
                            type="text"
                            value={editableData.phone && editableData.phone}
                            name="phone"
                            fullWidth
                            variant="standard"
                            onChange={editOnchange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Address"
                            type="text"
                            value={editableData.address && editableData.address}
                            name="address"
                            fullWidth
                            variant="standard"
                            onChange={editOnchange}
                        />
                        <DialogActions>
                            <Button type="submit" color="success" variant="contained">Update</Button>
                            <Button onClick={() => setEditDataDialog(false)}>Close</Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>


        </>
    )
}

export default Dashboard