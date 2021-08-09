import React, {Component} from 'react';
import {Grid, Button, Typography} from "@material-ui/core";
import { Link } from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';

export default class Room extends Component {
    constructor(props){
        super(props);
        this.state = {
            votesToSkip : 2,
            guestCanPause : false,
            isHost : false,
            showSettings : false,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.renderSettings = this.renderSettings.bind(this);  
        this.getRoomDetails();
    }

    getRoomDetails(){
        return fetch('/api/get-room'+'?code='+this.roomCode)
        .then((response) => {
            if(!response.ok){
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
        .then((data) => {
            this.setState({
                votesToSkip:data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost : data.is_host,
            });
        });
    }

    leaveButtonPressed(){
        const requestOptions = {
            method : 'POST', 
            headers : {"Content-Type":"application/json"},
        };
        fetch('/api/leave-room', requestOptions)
        .then((response) => {
            this.props.leaveRoomCallback();
            this.props.history.push('/');
        })
    }

    updateShowSettings(value){
        this.setState({
            showSettings: value,
        });
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12} align="center">
                <Button 
                variant="contained" 
                color="primary" 
                onClick = {() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    renderSettings() {
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoomPage 
                update={true} 
                votesToSkip={this.state.votesToSkip} 
                guestCanPause={this.state.guestCanPause} 
                roomCode={this.roomCode}
                updateCallback={this.getRoomDetails}/>
            </Grid>
            <Grid item xs={12} align="center">
            <Button
            color="secondary"
            variant="contained"
            onClick={() => this.updateShowSettings(false)}
            >
            Close
            </Button>
            </Grid>
        </Grid>
        )
    }

    render(){
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return(
            <Grid container spacing={1}>
                <Grid item xs = {12} align="center">
                    <Typography variant="h4" component="h4">
                        Code : {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align="center">
                    <Typography variant="h6" component="h6">
                        Votes : {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align="center">
                    <Typography variant="h6" component="h6">
                        Guest Can Pause : {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align="center">
                    <Typography variant="h6" component="h6">
                        Host? :{this.state.isHost.toString()}
                    </Typography>
                </Grid>
                {/* more security provided wrt user is host or not in api/views.py */}
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs = {12} align="center">
                        <Button
                        color="secondary"
                        variant="contained"
                        onClick={this.leaveButtonPressed}
                        >
                            Leave Room
                        </Button>
                </Grid>
            </Grid>



            
        ) 
    }
}


{/* <div>
                <h3>Room Code : {this.roomCode}</h3>
                <h3>Votes to skip : {this.state.votesToSkip}</h3>
                <h3>Guest can pause : {this.state.guestCanPause.toString()}</h3>
                <h3>Host ? : {this.state.isHost.toString()}</h3>
            </div> */}