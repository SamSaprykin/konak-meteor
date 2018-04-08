Meteor.publish('projects',function(){
    return Projects.find()
});

Meteor.publish('Allnews',function(){
    return Allnews.find()
});