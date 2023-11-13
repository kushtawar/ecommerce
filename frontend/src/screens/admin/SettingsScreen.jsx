// settingsScreen.jsx

import React, { useState } from 'react';

const SettingsScreen = () => {
  const [theme, setTheme] = useState('light'); // Default theme is light

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);

    // Save the selected theme in localStorage or any other persistent storage
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Select Theme:
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          {/* Add more theme options if needed */}
        </select>
      </label>
    </div>
  );
};

export default SettingsScreen;
