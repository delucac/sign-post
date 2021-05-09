import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
    const [date, setDate] = useState(new Date());

    return (
        <DatePicker
            filterDate={d => {
                return new Date() < d;
            }}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mmaa"
            selected={date}
            onChange={date => setDate(date)}
        />
    );
}

