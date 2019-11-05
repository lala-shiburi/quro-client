import React, { Component } from 'react';
import './App.scss';
import socketIOClient from 'socket.io-client';
import LineChart from './components/LineChart';
import Logo from './components/Logo';
import Loading from './components/Loading';


class App extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      endpoint: 'http://127.0.0.1:3000',
    };
  }y

   componentDidMount() {

     let { endpoint,response } = this.state;

     const socket = socketIOClient(endpoint);

     socket.on('ecgData', data => {
        response.push(data);

        setInterval(()=>{
          this.setState({response})
        }, 1500);
      
        //removes 50 data point when they reach above 200
        //This help clear the data from state and also help with displaying the data on the graph 
        setInterval(()=>{

          if(response.length>200){
            response = response.slice(response.length-150,response.length)
            this.setState({response})
          }
          
         },10000)
     
        });
   }

 

  render() {
    const { response } = this.state;
    return (
      <div className="App">
        <Logo/>
        <h1 style={{color:'#3B58B8'}}>Time-series ECG graph</h1>
        {response.length ? <LineChart data={response} /> : <Loading type={'bars'} color={'#3B58B8'} />}

      </div>
    );
  }
}

export default App;
