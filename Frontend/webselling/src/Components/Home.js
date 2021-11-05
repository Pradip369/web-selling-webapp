import React, { useEffect, useState } from 'react'
import { get_website } from './ApiAction/SendApiRequest'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

const Home = () => {

    const [sites, setSites] = useState([])

    useEffect(() => {
        get_website('', setSites)  // get all website pass only => ''
        return () => {
            setSites([])
        }
    }, [])

    return (
        <div className='mt-5'>
            <div className='mt-2'>
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
                                        <Typography gutterBottom variant="p" component="div">
                                            <b> {item.domain_name}</b>
                                        </Typography>
                                        <Typography>
                                            Price : <b>{item.price} INR</b>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.short_title}
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;