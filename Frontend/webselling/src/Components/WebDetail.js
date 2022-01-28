import { Button, CardMedia, IconButton, Paper } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { delete_website, get_web_detail } from './ApiAction/SendApiRequest';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FullScreenDialog from './CreateEditSite';
import Bid from './Bid';
import { authContext } from '../ContextApi/contextManage';

const WebDetail = (props) => {

    const [data, setData] = useState({});
    const { web_id } = useParams()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({})
    const [type, setType] = useState('create')
    const [bidOpen, setBidOpen] = useState(false);
    const { state } = React.useContext(authContext)
    const history = useHistory();

    const handleClickOpen = (reType) => {
        setOpen(true);
        setType(reType)
    };
    const editCLick = (item) => {
        setValue(item)
        handleClickOpen('edit')
    }
    const handleClose = () => {
        setOpen(false);
        setValue({})
    };

    const deleteClick = () => {
        var select = window.confirm("Are you sure you want to delete this website ?");
        if (select === true) {
            delete_website(data.id)
        }
    }

    useEffect(() => {
        const context = props.location.state
        if (context) {
            setData(context.data)
        }
        else {
            get_web_detail(web_id, setData)
        }
        return () => {
            setData({})
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <div className='container-fluid mt-5 mx-0'>
                <IconButton onClick={history.goBack}><ArrowBackRoundedIcon /></IconButton>
                <div className='row mt-2'>
                    <div className='col-md-7 mb-3'>
                        <Paper elevation={3} className='p-3'>
                            <AccountCircleIcon fontSize='large' /> {data?.user_name}
                            <hr />
                            <h6><b>Domain name : </b><small>{data?.domain_name}</small></h6>
                            <h6><b>Short title : </b><small>{data?.short_title}</small></h6>
                            <h6><b>Price : </b><small>{data?.price} INR</small></h6>
                            <h6><b>Website url : </b><small><a href={data?.website_url} target="_blank" rel="noreferrer"> {data?.website_url?.substring(0, 25)}...</a></small></h6>
                            <h6><b>Uploaded on : </b><small>{data?.created_date}</small></h6>
                            <hr />
                            <h6><b>Description : </b><br /> &nbsp; <small>{data?.full_description}</small></h6>
                            <br />
                            {state.auth.username === data?.user_name &&
                                <Fragment>
                                    <Button variant='contained' size='small' color='warning' onClick={() => editCLick(data)}>Edit</Button> &nbsp;
                                    <Button variant='contained' size='small' color='error' onClick={deleteClick}>Delete</Button> &nbsp;
                                </Fragment>
                            }
                            <Button variant='contained' size='small' color='success' onClick={() => setBidOpen(true)}>Bid</Button>
                        </Paper>
                    </div>
                    <div className='col-md-5 mb-3'>
                        <Paper elevation={3}>
                            <center className='py-3'>
                                <strong>Image</strong>
                            </center>
                            <CardMedia
                                component="img"
                                image={data?.website_image}
                                alt="web image"
                                height='300'
                                style={{ objectFit: 'fill' }}
                            />
                        </Paper>
                        {data?.short_video &&
                            <Paper elevation={3} className='my-2'>
                                <center className='py-3'>
                                    <strong>Video</strong>
                                </center>
                                <CardMedia
                                    component="video"
                                    image={data?.short_video}
                                    alt="web video"
                                    height='300'
                                    style={{ objectFit: 'fill' }}
                                    controls
                                    muted
                                    autoPlay
                                />
                            </Paper>
                        }
                    </div>
                </div>
            </div>
            {open && <FullScreenDialog perms={{ handleClose, open, value, type }} />}
            {bidOpen && <Bid perms={{ setBidOpen, bidOpen, data, state }} />}
        </Fragment>
    )
}

export default WebDetail;