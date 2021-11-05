import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { Avatar, Paper, TextField } from '@mui/material';
import { create_bid, delete_bid, get_all_bidded_users, update_bid } from './ApiAction/SendApiRequest';
import { toast } from 'react-toastify';
import { deepOrange } from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Bid = ({ perms }) => {

    const { setBidOpen, bidOpen, data, state } = perms;
    const [bidData, setBidData] = React.useState([]);
    const [value, setValue] = React.useState({ bid_price: false, bid_id: 0 })

    const handleSubmit = (event) => {
        event.preventDefault();
        const bid_data = new FormData(event.currentTarget);
        if (bid_data.get('bid_price') && (parseInt(bid_data.get('bid_price')) > parseInt(data.price))) {
            bid_data.append('website', data.id)
            if (value.bid_price) {
                update_bid(bid_data, value.bid_id, bidData, setBidData)
            }
            else {
                create_bid(bid_data, bidData, setBidData, setValue)
            }
        }
        else {
            toast(`Bid price must be greater than ${data.price} INR`, {
                type: 'warning',
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    const bidDelete = (bid_id) => {
        var select = window.confirm("Are you sure you want to delete this bid ?");
        if (select === true) {
            delete_bid(bid_id, bidData, setBidData, setValue)
        }
    }

    const handleClose = () => {
        setBidOpen(false);
    };

    React.useEffect(() => {
        get_all_bidded_users(setBidData, data.id, setValue, state)
        return () => {
            setBidData([])
        }
        // eslint-disable-next-line
    }, [])


    return (
        <div>
            <Dialog
                fullScreen
                open={bidOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', background: '#fc7646', zIndex: "1202" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Bid
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className='web_upload__form'>
                    <Box component="form" method='post' onSubmit={handleSubmit} noValidate sx={{ mt: 3, mx: 6 }}>
                        <TextField
                            name="bid_price"
                            required
                            type='number'
                            label="Bid price"
                            autoFocus
                            fullWidth
                            margin="normal"
                            size='small'
                            helperText='Price in INR'
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mb: 1 }}
                            size='small'
                        >
                            {value?.bid_price ? 'Update Bid' : 'Bid Now'}
                        </Button>
                    </Box>
                    <hr />
                </div>
                {bidData?.map((item) => {
                    return (
                        <Paper elevation={3} key={item.id} className='my-1 p-2 d-flex justify-content-between mx-3'>
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.user.slice(0, 1)}</Avatar>
                            <strong>{item.user}</strong>
                            <strong>{item.bid_price} INR</strong>
                            <small>{item.created_date.slice(0, 12)}</small>
                            {
                                item.user === state.auth.username &&
                                <IconButton variant='contained' color='error' size='small' onClick={() => bidDelete(item.id)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            }
                        </Paper>
                    )
                })}
            </Dialog >
        </div >
    );
}

export default Bid;