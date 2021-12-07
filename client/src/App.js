
import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [topic, setTopic] = useState('')
  const [data, setData] = useState('')
  const [table, setTable] = useState([])
  const submitTopic = () => {
    Axios.post('http://localhost:8080/insert', {
      topic: topic,
      data: data
    })
  }
  useEffect(() => {
    Axios.get('http://localhost:8080/table').then((res) => {
      setTable(res.data)
    })
  }, [])
  return (
    <div className="App">
      <div className="form">
        <h1>Topic/Data Fetcher</h1>
        <label htmlFor="topic">Topic: </label>
        <input type="text" name="topic" onChange={(e) => {
          setTopic(e.target.value)
        }} />
        <br />
        <label htmlFor="data">Data: </label>
        <input type="text" name="data" onChange={(e) => {
          setData(e.target.value)
        }} />
        <button onClick={submitTopic}>submit</button>
      </div>


      {table.map((data) => { return <p> {data.topic}, {data.data}</p> })}

    </div>
  );
}

export default App;
