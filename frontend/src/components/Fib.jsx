import React, { useState, useEffect } from 'react';
import axios from "axios";

function Fib() {
    // const [seenIndexes, setSeenIndexes] = useState([]);
    // const [values, setValues] = useState({});
    // const [index, setIndex] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        fetch();
        // fetchValues();
        // fetchIndexes();
    }, [])

    const fetch = async () => {
        const response = await axios.get("/api/");
        setData(response?.data);
    }
    // const fetchValues = async () => {
    //     const values = await axios.get("/api/values/current");
    //     setValues(values.data);
    // }
    // const fetchIndexes = async () => {
    //     const seenIndexes = await axios.get("/api/values/all");
    //     setSeenIndexes(seenIndexes.data);
    // }

    // const renderSeenIndexes = () => {
    //     return seenIndexes.map(({ number }) => number).join(", ");
    // }
    // const renderValues = () => {
    //     const entries = [];
    //     for (let key in values) {
    //         entries.push(
    //             <div key={key}>
    //                 For index {key} I calculated {values[key]}
    //             </div>
    //         );
    //     }

    //     return entries;
    // }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     await axios.post("/api/values", { index });
    //     setIndex("");
    // }

    return (
        <div>
            <h1>{data}</h1>
            {/* <form onSubmit={handleSubmit}>
                <label>Enter your index: </label>
                <input type="text"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                />
                <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}

            <h3>Calculated values:</h3>
            {renderValues()} */}
        </div>
    )
}

export default Fib;
