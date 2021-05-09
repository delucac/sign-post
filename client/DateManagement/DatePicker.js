import React, { useState } from "react";
import DatePicker from "react-datepicker";

//import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
    const [date, setDate] = useState(null);

    return (
        <DatePicker
            placeholderText="Date/Time of event"
            isClearable
            filterDate={d => {
                return new Date() <= d;
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={date}
            selectdate
            onChange={date => setDate(date)}
        />
    );
}
