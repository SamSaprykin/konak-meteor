Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'loading',
    notFoundTemplate:'notFound',
    waitOn: function(){
        return Meteor.subscribe('projects')
    }
});




Router.route("/",{
    name: "homeIndex"
});




Router.route("/invest",{
    name: "invest"
});


Router.route("/news",{
    name: "news",
    data:function(){
        return Allnews.findOne({id: this.params.id}) 
    }
});

Router.route("/brand",{
    name: "brand"
});


Router.route("/contacts",{
    name: "contacts"
});


Router.route("/projects/:sku",{
    name: "projects",
    data: function(){
        return Projects.findOne({sku: this.params.sku});
    }
});

Router.route("/projects/:sku/gallery",{
    name: "projectGallery",
    data: function(){
        return Projects.findOne({sku: this.params.sku});
    }
})

Router.route("/projects/:sku/map",{
    name: "mapProject",
    data: function(){
        return Projects.findOne({sku: this.params.sku});
    }
})




