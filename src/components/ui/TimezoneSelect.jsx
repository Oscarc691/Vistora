import React, { useState } from "react";
import TimezoneSelect from "react-timezone-select";

const TimezonePicker = () => {
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  return (
    <div className="w-3/5 mb-6">
      <label className="block text-sm font-medium mb-2">Select Timezone</label>
      <TimezoneSelect
        value={timezone}
        onChange={(val) => setTimezone(val.value || val)}
        menuPlacement="top"
      />
    </div>
  );
};

export default TimezonePicker;
