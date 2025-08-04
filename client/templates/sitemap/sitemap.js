Template.sitemap.helpers({
  // Get all projects for the sitemap
  projectItems: function() {
    return Projects.find({}, {sort: {name: 1}});
  },
  
  // Get all news items for the sitemap
  newsItems: function() {
    return Allnews.find({}, {sort: {id: 1}});
  },
  
  // Count total projects
  projectCount: function() {
    return Projects.find().count();
  },
  
  // Count total news items
  newsCount: function() {
    return Allnews.find().count();
  }
});

Template.sitemap.events({
  // Add any click events or interactions here if needed
  'click .sitemap-link': function(event) {
    // Optional: Add analytics tracking for sitemap clicks
    console.log('Sitemap link clicked:', event.target.href);
  }
});
