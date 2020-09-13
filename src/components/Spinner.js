import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";

const override = {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-25px 0 0 - 25px"
}

const Spinner = ({ isLoading }) => {
    return (
        <div style={override}>
            <SyncLoader
                size={25}
                color={"#3486eb"}
                loading={isLoading}
            />
            <p> Please wait ....</p>
        </div>
    )
}

export default Spinner;