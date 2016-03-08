Router.route('/', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'home', // This links to the template
  waitOn: function() {
        return Meteor.subscribe('homeGigs');
      },
      data: function() {
        return {
        gigs : Gigs.find({}, {limit: 5, sort:{createdAt: -1}})}
      },
      fastRender: true,
});


Router.route('/post', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'postGig', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs');
  },
  data: function() { return {category: GigCats.find({})} }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/gig/:_id', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewGig', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs');
  },
  data: function() { return Gigs.findOne(this.params._id); }, // This returns the id for the specified item
  fastRender: true,
});

Router.route('/gigs', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewGigs', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs');
  },
  data: function() { return {gigs: Gigs.find({}, {limit: 20, sort:{createdAt: -1}})} }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/catgeory/:category', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewCategory', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs');
  },
  data: function() { return {gigs: Gigs.find({category: this.params.category}, {limit: 20, sort:{createdAt: -1}})} }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/tag/:tag', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewTag', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs'); // \\/word\\  new RegExp(val)
  },
  data: function() { var val= this.params.tag; return {gigs: Gigs.find({tags: { $regex: new RegExp(val), $options: 'i'}}, {limit: 20, sort:{createdAt: -1}})} }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/user/:username', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewUser', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allUsers');
  },
  data: function() { return Meteor.users.findOne({username:this.params.username}) }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/my-gigs', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewYourGigs', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  waitOn: function() {
      return Meteor.subscribe('allGigs');
  },
  data: function() { return {gigs: Gigs.find({user: Meteor.user().username}) }}, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/login', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'login', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  fastRender: true,
});


Router.route('/register', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'register', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  fastRender: true,
});

Router.route('/post-cat', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'postCat', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  fastRender: true,
});

Router.route('/my-work', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'viewYourWork', // This links to the template
  data: function() { return Meteor.users.findOne({username: Meteor.user().username}) }, // This returns the id for the specified item
  fastRender: true,
});


Router.route('/search', { // Route to template to the specified link, and pull the id from the Mongodb collection.
  name: 'search', // This links to the template
  // There is a better way to do this. I want the fastest way to just return on collection item, without having to wait for everything - if possible.
  /*
  waitOn: function() {
      return Meteor.subscribe('allUsers');
  }, 
  data: function() { return {inputAttributes: { 'class': 'easy-search-input', 'placeholder': 'Start searching...', 'value': this.params.query}
    
    
    
  }
  }, 
  */
  fastRender: true,
});
