import React from 'react'
import {useEffect, useState} from 'react'
import {Table, TableHead, TableRow, TableBody, TableCell, Typography, Grid, TableFooter} from '@material-ui/core'
import {ArrowDropUp, Stop} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  good: {
    color: 'green',
},
bad : {
    color : 'red'
},
sad : {
    color : 'black'
},
mid : {
    color : '#D3D3D3'
}
});

const All = () => {
    const [data, setData] = useState([]);
    const [global,setGlobal] = useState({});

    useEffect(() => {
        fetch("https://api.covid19api.com/summary")
        .then(res => res.json())
        .then(json => {
            setGlobal(json.Global);
            setData(json.Countries);
        })
    }, 1500);

    const classes = useStyles();

    return(
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align = 'right'>No</TableCell>
                    <TableCell >Country</TableCell>
                    <TableCell >New Confirmed</TableCell>
                    <TableCell>New Deaths</TableCell>
                    <TableCell>New Recovered</TableCell>
                    <TableCell align = 'right'>Total Confirmed</TableCell>
                    <TableCell align = 'right'>Total Deaths</TableCell>
                    <TableCell align = 'right'>Total Recovered</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((data,index) => {
                    return(
                        <TableRow key = {index}>
                            <TableCell align = 'right'>{++index}</TableCell>
                            <TableCell >{data.Country}</TableCell>
                            <TableCell align = 'center'>
                                <Grid container>
                                    {data.NewConfirmed > 0 ? <ArrowDropUp item className = {classes.bad}/> : <Stop item fontSize = 'small' color = 'disabled'/>}
                                    <Typography item className = {data.NewConfirmed > 0 ? classes.bad : classes.mid}>{data.NewConfirmed}</Typography>
                                </Grid>
                            </TableCell>
                            <TableCell align = 'center'>
                                <Grid container>
                                    {data.NewDeaths > 0 ? <ArrowDropUp item className = {classes.sad}/> : <Stop item fontSize = 'small' color = 'disabled'/>}
                                    <Typography item className = {data.NewDeaths > 0 ? classes.sad : classes.mid}>{data.NewDeaths}</Typography>
                                </Grid>
                            </TableCell>
                            <TableCell align = 'center'>
                                <Grid container>
                                    {data.NewRecovered > 0 ? <ArrowDropUp item className = {classes.good}/> : <Stop item fontSize = 'small' color = 'disabled'/>}
                                    <Typography item className = {data.NewRecovered == 0 ? classes.mid : classes.good}>
                                        {data.NewRecovered}
                                    </Typography>
                                </Grid>
                            </TableCell>
                            <TableCell align = 'center' className = {classes.bad}>{data.TotalConfirmed}</TableCell>
                            <TableCell align = 'center' className = {classes.sad}>{data.TotalDeaths}</TableCell>
                            <TableCell align = 'center' className = {classes.good}>{data.TotalRecovered}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableHead>
                <TableRow>
                    <TableCell align = 'right'>Total</TableCell>
                    <TableCell >Global</TableCell>
                    <TableCell >{global.NewConfirmed}</TableCell>
                    <TableCell>{global.NewDeaths}</TableCell>
                    <TableCell>{global.NewRecovered}</TableCell>
                    <TableCell align = 'center' className = {classes.bad}>{global.TotalConfirmed}</TableCell>
                    <TableCell align = 'center' className = {classes.sad}>{global.TotalDeaths}</TableCell>
                    <TableCell align = 'center' className = {classes.good}>{global.TotalRecovered}</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    )
}

export default All

{/*const td = */}
