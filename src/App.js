import React, { useState } from 'react';
import WeekCalendar from 'react-week-calendar';
import AngelModal from './AngelModal.js';
import 'react-week-calendar/dist/style.css';




function App() {

  }
  const [value, onChange] = useState(new Date());


  return (
      <div>
        <WeekCalendar
          onChange={onChange}
          value={value}
          modalComponent={AngelModal}
        />
      </div>
  );
}
export default App;
