import React, { useState, useEffect } from 'react';
import NetWorthChart from './NetWorthChart.jsx';
import { networthContent } from '../data/networth-content.js';

const NetWorthCalculator = ({ language = 'en' }) => {
  const [assets, setAssets] = useState({
    cash: 0,
    investments: 0,
    realEstate: 0,
    vehicles: 0,
    personalProperty: 0,
    retirement: 0,
    other: 0
  });

  const [liabilities, setLiabilities] = useState({
    mortgage: 0,
    creditCards: 0,
    studentLoans: 0,
    autoLoans: 0,
    personalLoans: 0,
    other: 0
  });

  const [results, setResults] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    netWorth: 0,
    calculated: false
  });

  const copyData = networthContent[language] || networthContent.en;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAssetChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setAssets(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleLiabilityChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setLiabilities(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const calculateNetWorth = () => {
    const totalAssets = Object.values(assets).reduce((sum, value) => sum + value, 0);
    const totalLiabilities = Object.values(liabilities).reduce((sum, value) => sum + value, 0);
    const netWorth = totalAssets - totalLiabilities;

    setResults({
      totalAssets,
      totalLiabilities,
      netWorth,
      calculated: true
    });
  };

  const resetCalculator = () => {
    setAssets({
      cash: 0,
      investments: 0,
      realEstate: 0,
      vehicles: 0,
      personalProperty: 0,
      retirement: 0,
      other: 0
    });
    setLiabilities({
      mortgage: 0,
      creditCards: 0,
      studentLoans: 0,
      autoLoans: 0,
      personalLoans: 0,
      other: 0
    });
    setResults({
      totalAssets: 0,
      totalLiabilities: 0,
      netWorth: 0,
      calculated: false
    });
  };

  const InputField = ({ label, value, onChange, placeholder = "0" }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {copyData.form.currency}
        </span>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {copyData.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {copyData.subtitle}
        </p>
      </div>

      {/* Calculator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Assets Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {copyData.form.assetsTitle}
          </h2>
          
          {Object.entries(copyData.form.assets).map(([key, label]) => (
            <InputField
              key={key}
              label={label}
              value={assets[key]}
              onChange={(value) => handleAssetChange(key, value)}
            />
          ))}
        </div>

        {/* Liabilities Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
            {copyData.form.liabilitiesTitle}
          </h2>
          
          {Object.entries(copyData.form.liabilities).map(([key, label]) => (
            <InputField
              key={key}
              label={label}
              value={liabilities[key]}
              onChange={(value) => handleLiabilityChange(key, value)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center mb-8">
        <button
          onClick={calculateNetWorth}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg mr-4 transition duration-200"
        >
          {copyData.form.calculate}
        </button>
        <button
          onClick={resetCalculator}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
        >
          {copyData.form.reset}
        </button>
      </div>

      {/* Results and Chart */}
      {results.calculated && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <NetWorthChart
            totalAssets={results.totalAssets}
            totalLiabilities={results.totalLiabilities}
            netWorth={results.netWorth}
            copyData={copyData}
            className="mb-6"
          />
        </div>
      )}

      {/* Educational Content */}
      <div className="space-y-8">
        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {copyData.content.aboutSection.title}
          </h2>
          <div className="space-y-4">
            {copyData.content.aboutSection.paragraphs.map((paragraph, index) => (
              <p 
                key={index}
                className="text-gray-600 dark:text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Importance */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {copyData.content.sections.importance.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {copyData.content.sections.importance.description}
            </p>
          </div>

          {/* Who Needs This */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {copyData.content.sections.whoNeeds.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {copyData.content.sections.whoNeeds.description}
            </p>
          </div>
        </div>

        {/* Formula Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {copyData.content.sections.formula.title}
          </h3>
          <div className="space-y-2">
            {copyData.content.sections.formula.formulas.map((formula, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg font-mono text-sm">
                {formula}
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {copyData.content.sections.tips.title}
          </h3>
          <ul className="space-y-2">
            {copyData.content.sections.tips.list.map((tip, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetWorthCalculator;
