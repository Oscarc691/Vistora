import React from "react";
import { useState } from "react"
import TimezonePicker from "../../ui/TimezoneSelect";

const tabs = ['General', 'Notifications', 'Risk Thresholds', 'Integrations', 'Data and Security']

const Settings = () => {

  const [activeTab, setActiveTab] = useState('General');
  const [theme, setTheme] = useState('light'); 
  const [language, setLanguage] = useState('en'); 
  const [font_size, setFont_Size] = useState('md');
  const [delivery_method, setDelivery_Method] = useState('Email');
  const [frequency, setFrequency] = useState('Immediate');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'zh', label: 'Chinese' },
  ];
  
  const font_sizes = [
    { code: 'sm', label: 'Small' },
    { code: 'md', label: 'Medium' },
    { code: 'lg', label: 'Large' },
  ];
  
  const delivery_methods = [
    { code: 'Email', label: 'Email' },
    { code: 'SMS', label: 'SMS' },
    { code: 'In-app', label: 'In-app' },
  ];
  
  const frequencies = [
    { code: 'Immediate', label: 'Immediate' },
    { code: 'Daily Summary', label: 'Daily Summary' },
    { code: 'Weekly Digest', label: 'Weekly Digest' },
  ];

  const handleSave = (e) => {
    e.preventDefault(); // stop the page from reloading
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLangChange = (e) => {
    setLanguage(e.target.value);
  };
  
  const handleFont_SizeChange = (e) => {
    setFont_Size(e.target.value);
  };
  
  const handleDelivery_MethodChange = (e) => {
    setDelivery_Method(e.target.value);
  };
  
  const handleFrequencyChange = (e) => {
    setDelivery_Method(e.target.value);
  };

  return (
    <section className="m-0 h-screen w-full overflow-hidden p-6 flex flex-col gap-8 font-['Aktiv_Grotesk',_'Manrope',_sans-serif]">
      {/* Header Section */}
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* tabs */}
      <div className="border-b border-gray-300 flex space-x-6 mb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 w-1/6 md:w-1/5 text-xs md:text-md lg:text-lg font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-red-800 text-red-800'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[200px] mb-6">
        {activeTab === 'General' && (
          <div className="flex flex-row">
            <div className="w-full h-auto p-5 flex flex-col gap-0">
              <h2 className="text-lg font-semibold mb-2">General Settings</h2>
              {/* Input Fields */}
              <form onSubmit={handleSave} className="ml-4 flex flex-col gap-2">
                <label htmlFor="orgName">Organization Name:</label>
                <input className="w-3/5 px-4 py-1 rounded-xl border-2 border-gray-200" type="text" id="orgName" placeholder="Enter here..."/>
                <label htmlFor="Adress">Adress:</label>
                <input className="w-3/5 px-4 py-1 rounded-xl border-2 border-gray-200" type="text" id="Adress" placeholder="Enter here..."/>
                <label htmlFor="Email">Contact Email:</label>
                <input className="w-3/5 px-4 py-1 rounded-xl border-2 border-gray-200" type="text" id="Email" placeholder="Enter here..."/>
                <TimezonePicker />
                <fieldset className="mb-1">
                    <label className="block text-sm font-medium mb-2">Theme:</label>
                    <div className="flex gap-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="theme"
                          value="light"
                          checked={theme === 'light'}
                          onChange={handleThemeChange}
                          className="accent-blue-600"
                        />
                        <span className="text-sm">Light</span>
                      </label>

                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="theme"
                          value="dark"
                          checked={theme === 'dark'}
                          onChange={handleThemeChange}
                          className="accent-blue-600"
                        />
                        <span className="text-sm">Dark</span>
                      </label>
                    </div>
                </fieldset>
                <fieldset className="mb-0"> 
                  <label className="block text-sm font-medium mb-2">Language:</label>
                  <select
                    value={language}
                    onChange={handleLangChange}
                    className="w-fit max-w-xs border border-gray-300 rounded px-3 py-2 text-sm mb-2"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                  <label className="block text-sm font-medium mb-2">Font Size:</label>
                  <select
                    value={font_size}
                    onChange={handleFont_SizeChange}
                    className="w-fit max-w-xs border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    {font_sizes.map((font) => (
                      <option key={font.code} value={font.code}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <input type="submit" value="Save" className="w-fit px-4 py-1 border border-gray-300 bg-red-900 text-white rounded-xl shadow-md hover:cursor-pointer mb-2"/> 
              </form>
            </div>
            <div className="w-full h-auto p-5 flex flex-col items-center gap-3">
              <h2 className="w-1/2 text-lg font-semibold mb-2 border-b-2 text-center border-red-700">Support Line</h2>
              <span className="w-2/3 inline-flex gap-6">
                <span>Line Number:</span>
                <span>+1 (234)-567-8999</span>
              </span>
              <span className="w-2/3 inline-flex gap-6">
                <span>Line Email:</span>
                <span>VistoraTech@gmail.com</span>
              </span>
              {/* Input Fields */}
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-2">Notification Settings</h2>
            {/* Add toggle switches or checkboxes here */}
            <form className="ml-2 flex flex-col gap-8" onSubmit={handleSave}>
              <fieldset>
                <h4>Notify:</h4>
                <div className="ml-2">
                  <input className="mr-2" type="checkbox" id="NewClaim"/> 
                  <label htmlFor="">New claim submitted</label> <br />
                  <input className="mr-2" type="checkbox" id="FlaggedClaim" /> 
                  <label htmlFor="">Flagged claim detected</label> <br />
                  <input className="mr-2" type="checkbox" id="AppealFilled" />
                  <label htmlFor="">Appeal filed</label> <br />
                  <input className="mr-2" type="checkbox" id="Completed" />
                  <label htmlFor="">Approval/forward action completed</label>
                </div>
              </fieldset>
              <fieldset className="mb-0"> 
                  <label className="block text-sm font-medium mb-2">Delivery Method:</label>
                  <select
                    value={delivery_method}
                    onChange={handleDelivery_MethodChange}
                    className="w-fit max-w-xs border border-gray-300 rounded px-3 py-2 text-sm mb-2"
                  >
                    {delivery_methods.map((method) => (
                      <option key={method.code} value={method.code}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  <label className="block text-sm font-medium mb-2">Font Size:</label>
                  <select
                    value={frequency}
                    onChange={handleFrequencyChange}
                    className="w-fit max-w-xs border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    {frequencies.map((f) => (
                      <option key={f.code} value={f.code}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </fieldset>
                <input type="submit" value="Save" className="w-fit px-4 py-1 border border-gray-300 bg-red-900 text-white rounded-xl shadow-md hover:cursor-pointer mb-2"/> 
              </form>
          </div>
        )}

        {activeTab === 'Risk Thresholds' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Risk Threshold Settings</h2>
            {/* Add password inputs, toggles, etc. */}
            <form className="ml-2 flex flex-col">
              <h4>Risk Score Control:</h4>
            </form>
          </div>
        )}
        
        {activeTab === 'Integrations' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Integrations Settings</h2>
            <p className="text-sm text-gray-600">Password, 2FA, etc.</p>
            {/* Add password inputs, toggles, etc. */}
          </div>
        )}

        {activeTab === 'Data and Security' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Data and Security Preferences</h2>
            <p className="text-sm text-gray-600">Example setting content...</p>
            {/* Add form inputs here */}
          </div>
        )}
      </div>



      {/* <button className="w-fit h-auto px-8 py-2 text-white bg-red-800 border rounded-xl hover:bg-red-700">Save</button> */}
    </section>
  );
};

export default Settings;
