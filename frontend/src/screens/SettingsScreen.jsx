// SettingsScreen.jsx
import React from 'react';

const SettingsScreen = ({ theme = 'light', onThemeChange = () => {} }) => {
  console.log('theme', theme);

  const handleThemeChange = (selectedTheme) => {
    onThemeChange(selectedTheme);
  };

  return (
    <div className="py-3">
      <label>
        Select Theme:
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
          {/* Add more theme options if needed */}
        </select>
      </label>
    </div>
  );
};

export default SettingsScreen;
