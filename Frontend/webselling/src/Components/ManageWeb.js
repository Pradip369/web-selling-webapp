import React, { useEffect, useState } from 'react'
import { authContext } from '../ContextApi/contextManage'
import { get_website } from './ApiAction/SendApiRequest'
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import FullScreenDialog from './CreateEditSite';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

const ManageWeb = () => {

    const { state } = React.useContext(authContext);
    const [sites, setSites] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState({})
    const [type, setType] = useState('create')

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

    useEffect(() => {
        get_website(state.auth.id, setSites)
        return () => {
            setSites([])
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='mt-5'>
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
                <Button
                    variant="contained"
                    sx={{ mt: 0, mb: 2, mr: 2 }}
                    size='small'
                    color='info'
                    onClick={() => handleClickOpen('create')}
                >
                    Sell New Website
                </Button>
            </div>
            <Divider />
            <div className='mt-2'>
                <h3><center>My Uploaded Websites</center></h3>
                {(sites.length === 0) && <center>No data...</center>}
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '5px', justifyContent: 'space-around' }}>
                    {sites.map((item) => {
                        return (
                            <Card sx={{ maxWidth: 290 }} className='m-2' key={item.id}>
                                <Link to={{ pathname: `/web_detail/${item.id}`, state: { data: item } }} className='text-decoration-none text-black'>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={item.website_image}
                                        alt="web image"
                                        style={{ objectFit: 'fill' }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {item.domain_name}
                                        </Typography>
                                        <Typography>
                                            Price : <b>{item.price} INR</b>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.short_title}
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <CardActions>
                                    <Button variant='contained' color='warning' size='small' onClick={() => editCLick(item)}>Edit</Button> &nbsp;
                                    <Link to={{ pathname: `/web_detail/${item.id}`, state: { data: item } }} className='text-decoration-none'>
                                        <Button variant='contained' color='info' size='small'>View</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
            </div>
            {open && <FullScreenDialog perms={{ handleClose, open, value, type }} />}
        </div>
    )
}

export default ManageWeb;