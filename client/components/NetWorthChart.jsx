import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const NetWorthChart = ({ totalAssets, totalLiabilities, netWorth, copyData, className = '' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const getNetWorthStatus = (netWorth) => {
    if (netWorth > 0) return { status: copyData.results.positive, color: '#00CC66' };
    if (netWorth < 0) return { status: copyData.results.negative, color: '#FF4D4D' };
    return { status: copyData.results.neutral, color: '#FFCC00' };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Donut chart for assets vs liabilities
  const donutOptions = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: { show: false },
      animations: { enabled: true },
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    labels: [copyData.chart.assets, copyData.chart.liabilities],
    colors: ['#00CC66', '#FF4D4D'],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const value = opts.w.config.series[opts.seriesIndex];
        return formatCurrency(value);
      },
      style: { 
        fontSize: '12px', 
        colors: [isDark ? '#F9FAFB' : '#111827'] 
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
            },
            value: {
              show: true,
              fontSize: '14px',
              formatter: function (val) {
                return formatCurrency(val);
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: copyData.chart.netWorth,
              fontSize: '16px',
              fontWeight: 600,
              color: getNetWorthStatus(netWorth).color,
              formatter: function () {
                return formatCurrency(netWorth);
              }
            }
          }
        }
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => formatCurrency(val),
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            position: 'bottom',
          }
        },
      },
    ],
  };

  // Bar chart for comparison
  const barOptions = {
    chart: {
      type: 'bar',
      height: 200,
      toolbar: { show: false },
      animations: { enabled: true },
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    series: [
      {
        name: copyData.chart.assets,
        data: [totalAssets],
      },
      {
        name: copyData.chart.liabilities,
        data: [totalLiabilities],
      },
      {
        name: copyData.chart.netWorth,
        data: [netWorth],
      }
    ],
    xaxis: {
      categories: ['Financial Position'],
      labels: {
        style: { fontSize: '12px', fontWeight: '600' },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        borderRadius: 8,
      },
    },
    colors: ['#00CC66', '#FF4D4D', getNetWorthStatus(netWorth).color],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return formatCurrency(val);
      },
      style: { 
        fontSize: '10px', 
        colors: [isDark ? '#F9FAFB' : '#111827'] 
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => formatCurrency(val),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          plotOptions: {
            bar: {
              columnWidth: '80%',
            },
          },
        },
      },
    ],
  };

  const donutSeries = [totalAssets, totalLiabilities];

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">
          {copyData.chart.title}
        </h3>
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {copyData.results.totalAssets}: <strong>{formatCurrency(totalAssets)}</strong>
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {copyData.results.totalLiabilities}: <strong>{formatCurrency(totalLiabilities)}</strong>
            </span>
          </div>
          <div className="mt-2">
            <span 
              className="text-lg font-bold"
              style={{ color: getNetWorthStatus(netWorth).color }}
            >
              {copyData.results.netWorth}: {formatCurrency(netWorth)}
            </span>
            <span 
              className="ml-2 text-sm font-medium"
              style={{ color: getNetWorthStatus(netWorth).color }}
            >
              ({getNetWorthStatus(netWorth).status})
            </span>
          </div>
        </div>
      </div>
      
      {/* Donut Chart */}
      <div className="mb-6">
        <Chart
          options={donutOptions}
          series={donutSeries}
          type="donut"
          height={300}
        />
      </div>
      
      {/* Bar Chart */}
      <div className="mb-4">
        <Chart
          options={barOptions}
          series={barOptions.series}
          type="bar"
          height={200}
        />
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center justify-center">
          <div className="w-3 h-3 bg-[#00CC66] rounded mr-2"></div>
          <span className="text-gray-600 dark:text-gray-400">{copyData.chart.assets}</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-3 h-3 bg-[#FF4D4D] rounded mr-2"></div>
          <span className="text-gray-600 dark:text-gray-400">{copyData.chart.liabilities}</span>
        </div>
        <div className="flex items-center justify-center">
          <div 
            className="w-3 h-3 rounded mr-2"
            style={{ backgroundColor: getNetWorthStatus(netWorth).color }}
          ></div>
          <span className="text-gray-600 dark:text-gray-400">{copyData.chart.netWorth}</span>
        </div>
      </div>
    </div>
  );
};

export default NetWorthChart;
