import React from 'react';
import ReactDOM from 'react-dom';

// Global React container system for Meteor/Blaze integration
window.ReactContainer = {
  render: function(component, element, props = {}) {
    if (element && component) {
      ReactDOM.render(React.createElement(component, props), element);
    }
  },
  
  unmount: function(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
};

// Helper function to create React-enabled Blaze templates
window.createReactTemplate = function(templateName, reactComponent) {
  Template[templateName].onRendered(function() {
    const element = this.find('.react-container');
    const props = this.data || {};
    window.ReactContainer.render(reactComponent, element, props);
  });
  
  Template[templateName].onDestroyed(function() {
    const element = this.find('.react-container');
    window.ReactContainer.unmount(element);
  });
};
