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
import { Input, TextField } from '@mui/material';
import { create_web, edit_web } from './ApiAction/SendApiRequest';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({ perms }) => {

    const { handleClose, open, value, type } = perms

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (type === 'create') {
            create_web(data)
        }
        else {
            (data.get('website_image').size === 0) && data.delete('website_image');
            (data.get('short_video').size === 0) && data.delete('short_video');
            edit_web(data, value.id)
        }
    }

    return (
        <div>
            <Dialog
                fullScreen
                open={open}
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
                            {type === 'create' ? 'Upload new website' : 'Edit website details'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className='web_upload__form'>
                    <Box component="form" method='post' onSubmit={handleSubmit} noValidate sx={{ mt: 3, mx: 6 }}>
                        <TextField
                            name="domain_name"
                            required
                            label="Domain name"
                            autoFocus
                            fullWidth
                            margin="normal"
                            size='small'
                            defaultValue={value.domain_name}
                        />
                        <TextField
                            name="short_title"
                            required
                            label="Short title"
                            margin="normal"
                            size='small'
                            fullWidth
                            defaultValue={value.short_title}
                        />
                        <TextField
                            name="price"
                            type='number'
                            required
                            label="Price"
                            margin="normal"
                            size='small'
                            fullWidth
                            helperText='Price in INR'
                            defaultValue={value.price}
                        />
                        <TextField
                            name="full_description"
                            required
                            label="Description"
                            margin="normal"
                            size='small'
                            fullWidth
                            multiline
                            rows='4'
                            defaultValue={value.full_description}
                        />
                        <TextField
                            name="website_url"
                            required
                            type='url'
                            label="Website url"
                            margin="normal"
                            size='small'
                            fullWidth
                            defaultValue={value.website_url}
                            helperText='http://test.com/'
                        />
                        <br />
                        <b>Website thumbnail : </b> <Input accept="image/*" name='website_image' multiple={false} type='file' /> {value.website_image && <small>{value.website_image.split('/').at(-1)}</small>}
                        <br />
                        <br />
                        <b>Website short video : </b> <Input accept="video/*" name='short_video' multiple={false} type='file' /> {value.short_video && <small>{value.short_video.split('/').at(-1)}</small>}
                        <br />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 5 }}
                        >
                            {type === 'create' ? 'Sell Now' : 'Save Changes'}
                        </Button>
                    </Box>
                </div>
            </Dialog >
        </div >
    );
}

export default FullScreenDialog;