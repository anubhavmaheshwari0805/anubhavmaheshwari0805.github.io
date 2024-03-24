import { useState, useEffect } from 'react';
import axios from 'axios';

import './../styles/AGVStatusComponentStyle.css';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {getPreciseDistance, computeDestinationPoint, getCenter, getRhumbLineBearing} from 'geolib';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EmojiFoodBeverageRoundedIcon from '@mui/icons-material/EmojiFoodBeverageRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import ElectricScooterRoundedIcon from '@mui/icons-material/ElectricScooterRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';

import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import ThingSpeakAPI from '../apis/api';

export default function AGVStatus() {
  // const [checkpoints, setCheckpoints] = useState([
  //   {latitude: 12.965399, longitude: 77.693526},
  //   {latitude: 12.965295, longitude: 77.693401},
  //   {latitude: 12.965174, longitude: 77.693498},
  //   {latitude: 12.964991, longitude: 77.693641},
  //   {latitude: 12.964961, longitude: 77.693600},
  // ]);
  const [checkpoints, setCheckpoints] = useState([
    {latitude: 12.9658902, longitude: 77.6939083},
    {latitude: 12.9657853, longitude: 77.6942668},
    {latitude: 12.9654834, longitude: 77.6945276},
    {latitude: 12.9651704, longitude: 77.6945015},
    {latitude: 12.9646304, longitude: 77.6940478},
  ]);

  const [viewState, setViewState] = useState({...getCenter(checkpoints), zoom: 18.5, pitch: 60, bearing: getRhumbLineBearing(checkpoints[0], checkpoints[checkpoints.length-1])});

  const [terminals, setTerminals] = useState(["Canteen", "Auditorium"]); 
  const [temp, setTemp] = useState(32);
  const [humid, setHumid] = useState(25);
  const [loc, setLoc] = useState(checkpoints[0]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const channelId = '2482432';
  const field = 'feeds';
  const api_key = '92L3D5FS3OGZ6W81'

  const [nearestIndices, setNearestIndices] = useState([{distance: 12.965399, index: 0}, {distance: 12.965295, index: 1}]);
  useEffect(() => {
    const distances = checkpoints.map((checkpoint) => {
      const distance = getPreciseDistance(loc, checkpoint);
      return { distance, index: checkpoints.indexOf(checkpoint) };
    });
    distances.sort((a, b) => a.distance - b.distance);
    const nearest = distances.slice(0, 2);
    setNearestIndices(nearest);
    //console.log(nearest);
  }, [checkpoints, loc]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.thingspeak.com/channels/${channelId}/${field}.json?api_key=${api_key}&results=1`
        );
        console.log("Temp: "+response.data.feeds[0].field1+"\tHumidity: "+response.data.feeds[0].field2+"\tLatitude: "+response.data.feeds[0].field3+"\tLongitude: "+response.data.feeds[0].field4);
        setData(response.data);
        setTemp(Math.round(response.data.feeds[0].field1));
        setHumid(Math.round(response.data.feeds[0].field2));
        setLoc({latitude: response.data.feeds[0].field3, longitude: response.data.feeds[0].field4});
        const date = new Date()
        //const temppoints = computeDestinationPoint(checkpoints[Math.round(date.getSeconds()/(checkpoints.length*2))%checkpoints.length], Math.random()*7, Math.random()*360)
        //setLoc(temppoints);
        
        //  setViewState({...viewState,
        //   longitude: temppoints.longitude,
        //   latitude: temppoints.latitude,
        //   zoom: 20
        // })
      } catch (error) {
        setError(error);
      }
    };
    let interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [channelId, field]);
  if (error) {
    console.log("Error: "+error.message);
  }

  if (!data) {
    console.log("data displayed");
  }
  else {
    //console.log("Data: "+data);
  }

  const [timelinepos0, setTimelinepos0] = useState(0);
  const [timelinepos1, setTimelinepos1] = useState(0);
  const [timelinepos2, setTimelinepos2] = useState(0);
  useEffect(()=> {
    const leftInd = Math.min(nearestIndices[0].index,nearestIndices[1].index);
    const rightInd = Math.max(nearestIndices[0].index,nearestIndices[1].index); //leftInd+1;
    setTimelinepos0(nearestIndices[0].index);
    if(rightInd==nearestIndices[0].index) {
      if(nearestIndices[0].distance<=4)
        setTimelinepos1(rightInd);
      else
        setTimelinepos1(leftInd);
      setTimelinepos2(leftInd);
    }
    else {
      setTimelinepos1(leftInd);
      if(nearestIndices[0].distance>4)
        setTimelinepos2(leftInd);
      else
        setTimelinepos2(leftInd-1);
    }
  }, [nearestIndices]);
  return (
        <div className='mainContent'>
          <div className='firstColumn'>
            <Paper className='mapPaper'>
              <Map
                mapboxAccessToken="pk.eyJ1IjoiYW5udW1haGVzaHdhcmk4NSIsImEiOiJjbHN3eGJ4cDUwMHczMmptcW1wcWV4ZjN3In0.rcU8XyXEXZD6Jtw8TOdoxA"
                {...viewState}
                //onViewportChange={setViewState}
                mapStyle="mapbox://styles/mapbox/standard"
              >
                <Marker longitude={77.69356891514599} latitude={12.965644281593828} anchor="bottom" >
                  <RestaurantMenuRoundedIcon color='secondary'/>
                </Marker>
                <Marker longitude={77.69423770768566} latitude={12.964343575187684} anchor="bottom" >
                  <GroupsRoundedIcon color='secondary'/>
                </Marker>
                <Marker longitude={checkpoints[0].longitude} latitude={checkpoints[0].latitude} anchor="bottom" >
                  <RoomRoundedIcon color='secondary'/>
                </Marker>
                <Marker longitude={checkpoints[checkpoints.length-1].longitude} latitude={checkpoints[checkpoints.length-1].latitude} anchor="bottom" >
                  <RoomRoundedIcon color='success'/>
                </Marker>
                <Marker longitude={loc.longitude} latitude={loc.latitude} anchor="bottom" >
                  <ElectricScooterRoundedIcon color='primary'/>
                </Marker>
              </Map>
            </Paper>
          </div>
          <div className='secondColumn'>
            <div className='sensorData'>
              <Paper className='tempBox'>
                <h3 className='tempBoxHeading'>AGV Temperature</h3>
                <div className='tempBoxContent'>
                  <h1 className='tempBoxData'>{temp} °C</h1>
                  <DeviceThermostatRoundedIcon color='primary' sx={{fontSize: 50}} className='tempIcon'/>
                </div>
                
              </Paper>
              <Paper className='humidityBox'>
                <h3 className='tempBoxHeading'>AGV Humidity</h3>
                <div className='tempBoxContent'>
                  <h1 className='tempBoxData'>{humid} %</h1>
                  <WaterDropRoundedIcon color='primary' sx={{fontSize: 50}} className='tempIcon'/>
                </div>
              </Paper>
            </div>
            <div className='agvTimeline'>
            <Paper className='agvTimelinePaper'>
              <Timeline
                // sx={{
                //   [`& .${timelineItemClasses.root}:before`]: {
                //     flex: 0,
                //     padding: 0,
                //   },
                // }}
              >
                { checkpoints.map((item, id) => (
                  <TimelineItem>
                  {/* <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    9:30 am
                  </TimelineOppositeContent> */}
                  <TimelineSeparator>
                    {id!=0 && (id<=timelinepos0 ? <TimelineConnector sx={{ bgcolor: 'primary.main' }}/> : <TimelineConnector sx={{ bgcolor: 'grey.main' }}/>)}
                    {id==0 ? ((timelinepos0 <= 0 && timelinepos2<0) ? 
                    <TimelineDot variant="filled" color="grey">
                      <EmojiFoodBeverageRoundedIcon/>
                    </TimelineDot> :
                    <TimelineDot variant="filled" color="secondary">
                      <EmojiFoodBeverageRoundedIcon/>
                    </TimelineDot> ) : 
                    (id<=timelinepos1 ?
                      ((id==checkpoints.length-1) ?
                      <TimelineDot variant="filled" color="success">
                        <EmojiFoodBeverageRoundedIcon/>
                      </TimelineDot> :
                      <TimelineDot variant="filled" color="primary">
                        <EmojiFoodBeverageRoundedIcon/>
                      </TimelineDot> ) :
                      <TimelineDot variant="filled" color="grey">
                        <EmojiFoodBeverageRoundedIcon/>
                      </TimelineDot>)
                    }
                    {id!==checkpoints.length-1 && (id<=timelinepos2 ? <TimelineConnector sx={{ bgcolor: 'primary.main' }}/> : <TimelineConnector sx={{ bgcolor: 'grey.main' }}/>)}
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                      {(id==0) ? terminals[0] : (id==checkpoints.length-1) ? terminals[1] : `Checkpoint-${id}`}
                    </Typography>
                    {/* {id==0 ? (timelinepos0 <= 0 && timelinepos2<0 ? <Typography><RefreshRoundedIcon color="grey"/> Waiting...</Typography> : <Typography><CheckCircleOutlineRoundedIcon  color="secondary"/> Started</Typography>) : 
                    id==checkpoints.length-1 ? (id!=timelinepos1 ? <Typography><RefreshRoundedIcon  color="grey"/> Waiting...</Typography> : <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Finished</Typography>) :
                    (id<=timelinepos2 && id!=timelinepos1? <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Crossed</Typography> :
                      id==timelinepos2 && id==timelinepos1 ? <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Just Crossed</Typography> :
                        id==timelinepos1 ? <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Reached</Typography> :
                          id==timelinepos0 ? <Typography><RefreshRoundedIcon color="grey"/> Checkpoint About to Reach</Typography> :
                            id>timelinepos0 ? <Typography><RefreshRoundedIcon color="grey"/> Waiting...</Typography> : null)} */}
                    
                    {
                    id==0 ? (timelinepos0 <= 0 && timelinepos2<0 ? <Typography><RefreshRoundedIcon color="grey"/> Waiting...</Typography> : <Typography><CheckCircleOutlineRoundedIcon  color="secondary"/> Started</Typography>) : 
                    id==checkpoints.length-1 ? (id!=timelinepos1 ? <Typography><RefreshRoundedIcon  color="grey"/> Waiting...</Typography> : <Typography><CheckCircleOutlineRoundedIcon  color="success"/> Finished</Typography>) : 
                    ((id>timelinepos2) ? 
                      ( (id>timelinepos1) ? 
                        (id>timelinepos0 ? 
                          <Typography><RefreshRoundedIcon color="grey"/> Waiting...</Typography> :
                          (id==timelinepos0 && <Typography><RefreshRoundedIcon color="grey"/> Checkpoint About to Reach</Typography>)
                        ) : 
                        (id==timelinepos1 && id==timelinepos0 && <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Reached</Typography>)
                      ) : 
                      ( (id==timelinepos2) ? 
                        ((id==timelinepos1 && id==timelinepos0) ? 
                          <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Just Crossed</Typography> :
                          (id<=timelinepos1 && id<timelinepos0 && <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Crossed</Typography>) 
                        ) :
                        (id<timelinepos2 && id<timelinepos1 && id<timelinepos0 && <Typography><CheckCircleOutlineRoundedIcon  color="primary"/> Checkpoint Crossed</Typography>)
                      )
                    )
                    }
                  </TimelineContent>
                </TimelineItem>  
                ))}
              </Timeline>
            </Paper>
            </div>
          </div>
        </div>
    );
}