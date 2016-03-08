Gigs = new Meteor.Collection('gigs');
GigCats = new Meteor.Collection('gig_cats'); // Job categories
// On Client and Server
//let Players = new Meteor.Collection('players'),
  PlayersIndex = new EasySearch.Index({
    collection: Gigs,
    fields: ['title'],
    engine: new EasySearch.MongoDB()
  });

      
      
      


/*
var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['title'];

PackageSearch = new SearchSource('gigs', fields, options);

*/
/*
PlayersIndex = new EasySearch.Index({
  collection: Gigs,
  fields: ['title', 'description'],
  engine: new EasySearch.Minimongo()
});
*/









var handle = "";




if (Meteor.isClient) {
  

  
  
  Template.registerHelper("equals", function (a, b) {
            return (a === b);
          });
          
            Template.registerHelper("percent", function (a, b) {
              var eq = ((a / b) * 100);
            return +eq.toFixed(2); // The plus fixes the issue of it display the "0" in "1.50"
          });




 Template.search.helpers({
    categories: function () {
        Meteor.subscribe('allCats');
        return GigCats.find({});
        
      },
    
     });
  
  

Template.nav.onRendered(function() {
        $(document).foundation();
 /*       
        Tracker.autorun(function () {
  var cursor = PlayersIndex.search('g'); // search all docs that contain "Marie" in the name or score field

  console.log(cursor.fetch()); // log found documents with default search limit
  console.log(cursor.count()); // log count of all found documents
});
*/

    });
    
    
    
    Template.searchBox.onRendered(function(template, event) {
      
     // Session.set('searchQuery', "2");
      
    })
    
Template.searchBox.helpers({
  playersIndex: () => PlayersIndex
});
    
    
     Template.nav.helpers({
    categories: function () {
        Meteor.subscribe('allCats');
        return GigCats.find({});
        
      },
    
     });
    
    
    Template.nav.events({
    'click #logout': function(event){
        event.preventDefault();
        Meteor.logout();
    },
    
    'keypress #search-form': function (evt, template) {
    if (evt.which === 13) {
      event.preventDefault();
        
        var search = $('#search').val();
        console.log("search query: " + search);
        var search2 = "/search/"+search;
        
        
        Router.go(search2);
    }
  }
    


    });
    
    
    Template.postCat.events({
    'click .submit': function(event){
        event.preventDefault();
        
        
        var category = $('#category').val();
        
        Meteor.call('addCategory', category, function(error, result) {
              if (error) {
                
                console.log("ERROR adding the category!" + error);
                
              } else {
                
                console.log("Category Added!");
                
              }
              
              
      });
        
        
        
    }


    });
    
    
    Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = event.target.email.value;
        var username = event.target.username.value;
        var password = event.target.password.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
 
        var user = {
          
        email: email,
        username: username,
        password:password,
        profile:{
          name:{first: firstname, last: lastname},
          dateCreated: new Date(),
          gigsPosted: 0,
          submissions: {first: 0, first_accepted: 0, all: 0, all_accepted: 0},
          work: []
        }
          
        };
        
        Accounts.createUser(user,function(err){
            if(err) {
                alert("There was an error, please try again" + err.reason);
            } else {
              Router.go('/login');
            }
        });
    }
});


Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var username = event.target.username.value;
        var password = event.target.password.value;
        
        Meteor.loginWithPassword(username,password,function(err){
            if(!err) {
                Router.go('/');
            } else {
              alert("There was an error logging in: " + err.reason);
            }
        });
    }
});


Template.viewGig.onRendered(function(event,template) {
        $('#summernote').summernote();
        $('#summernote-probation').summernote();
        Session.set("gigSubmission",  Template.parentData(0).submits[0]);
        Session.set("gigSubmissionIndex", 1);
        var id = Template.parentData(0)._id;
        console.log("The id: " + id);
       



    });
    
var index = 1;



Template.viewGig.events({
  
  
  'click #remove-gig': function(template, event){
      
      var id = this._id;
        
        
        Meteor.call('removeGig', id, function(error, result) {
              if (error) {
                
                console.log("ERROR removing the gig!" + error);
                
              } else {
                
                console.log("Gig removed!");
                Router.go("home");
                
              }
              
              
        });
        
        
        
    },
    
    
    'click #submit-work': function(template, event){
      
      
      var title = $('#title').val();
      var description = $('#summernote').summernote('code');
      var currentUser = Meteor.user().username;
      var title_gig = this.title;
      var description_gig = this.description;
      var id = this._id;
      var whole_gig = this;
        
        
        Meteor.call('probationOn', id, title, description, currentUser, title_gig, description_gig, whole_gig, function(error, result) {
              if (error) {
                
                console.log("ERROR setting the probation!" + error);
                
              } else {
                
                console.log("Probation set!");
                
              }
              
              
        });
        
        
        
    },
    
    
    
    'click #submit-work-probation': function(template, event){
      
      
      var title = $('#title-probation').val();
      var description = $('#summernote-probation').summernote('code');
      var currentUser = Meteor.user().username;
      var title_gig = this.title;
      var description_gig = this.description;
      var id = this._id;
      var whole_gig = this;
        
        
        Meteor.call('probationUpdate', id, title, description, currentUser, title_gig, description_gig, whole_gig, function(error, result) {
              if (error) {
                
                console.log("ERROR setting the probation!" + error);
                
              } else {
                
                console.log("Probation set!");
                
              }
              
              
        });
        
        
        
    },
    
    'click #right-submission': function(template, event){
      
      var index = Session.get("gigSubmissionIndex");
      console.log(index);
      var title = $('#title').val();
      var description = $('#summernote').summernote('code');
      var id = this._id;
      var currentUser = Meteor.user().username;
      var submitter = this.submitters[index-1];
      console.log("Submitter:");
      console.log(submitter);
        
        
        
        Meteor.call('submissionPicked', id, title, description, submitter, index, function(error, result) {
              if (error) {
                
                console.log("ERROR choosing the right submission!" + error);
                
              } else {
                
                console.log("Submission set!");
                Router.go("home");
                
              }
              
              
        });
      
        
        
    },
    
    
    
    'click #wrong-submission': function(template, event){
      
      
      var currentIndex = Session.get("gigSubmissionNumber");
      
      currentIndex = currentIndex + 1;
      
      // Have to figure out a way to iterate through an array showing one at a time. When user clicks this button, then it goes to the next array item.
      
      //Session.set("gigSubmission", this.submits[currentIndex]); 
      
        /*
        
        
        Meteor.call('probationOn', id, title, description, function(error, result) {
              if (error) {
                
                console.log("ERROR setting the probation!" + error);
                
              } else {
                
                console.log("Probation set!");
                
              }
              
              
        });
        */
        
        
        if (index >= this.submits.length) {
        alert("You reached the end of the array");
        
    } else {
    
    
    Session.set("gigSubmission", this.submits[index]); 
    Session.set("gigSubmissionIndex", index+1);

    index++;
    
    if (index >= this.submits.length) {
        //$( "#wrong-submission" ).addClass( "hide" );
        
        
    }
    
    }
        
        
    },
    
    
    
    
    
});


    
    
    Template.postGig.events({
      "click .remove": function (event) {
      
      
          Meteor.call('removeGigs', function(error, result) {
              if (error) {
                
                console.log("ERROR removing gigs!" + error);
                
              } else {
                
                console.log("Removed Gigs!");
                
              }
              
              
      });
      
      
      },
      
      
      "click #remove_users": function (event) {
      
      
          Meteor.call('removeUsers', function(error, result) {
              if (error) {
                
                console.log("ERROR removing users!" + error);
                
              } else {
                
                console.log("Removed Users!");
                
              }
              
              
      });
      
      
      },
      
      
      "click .tag": function (template, event) {
      
          $( template.currentTarget ).remove();
          console.log(template);
      
      
      },
      
      
      
      
    "click .submit": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var title = $('#title').val();
      var description = $(".froala-view").html();
      var category = $('#category').val();
      var price = $('#price').val();
      var tags = [];
      var currentUser = Meteor.user().username;
      
      $('.tag').each(function(){
      tags.push($(this).text());
    });
      
      console.log(title);
      console.log(description);
      console.log(category);
      console.log(price);
      console.log(tags);
      
      
      
      Meteor.call('addGig', title, description, category, price, tags, currentUser, function(error, result) {
              if (error) {
                
                console.log("ERROR posting the gig!" + error);
                
              } else {
                
                console.log("Sumbitted Gig!");
                
              }
              
              
      });
      
      
 
      // Insert a task into the collection
      /*
      Jobs.insert({
        title: title,
        description: description,
        price: price,
        tags: tags,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.text.value = "";
      */
    }
  });
  
  
  Template.viewGig.onRendered(function(event,template) {
    
    console.log(Template.parentData(0).createdAt);
    var end = moment(Template.parentData(0).createdAt); // another date
    
        var now = moment(new Date()); //todays date
    
    
var duration = moment.duration(now.diff(end));
var days = duration.days();
var hours = duration.hours();
var minutes = duration.minutes();
var seconds = duration.seconds();

var time = {
      
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
      
    }


Session.set("time", time);
    
        
       handle =  setInterval( Meteor.bindEnvironment(function() {
    
    var now = moment(new Date()); //todays date
    
    
var duration = moment.duration(now.diff(end));
var days = duration.days();
var hours = duration.hours();
var minutes = duration.minutes();
var seconds = duration.seconds();

var time = {
      
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
      
    }


Session.set("time", time);
  }), 1000);


    });
  
/*  
Template.viewGig.created = function() {
  var self = this;
  this.timeP = new ReactiveVar(0);
  

  
  
  
  
  

  this.handle = Meteor.setInterval((function() {
    
    var now = moment(new Date()); //todays date
    var end = moment(Template.parentData(0).createdAt); // another date
    console.log(end);
var duration = moment.duration(now.diff(end));
var days = duration.days();
var hours = duration.hours();
var minutes = duration.minutes();
var seconds = duration.seconds();

    
    self.timeP.set({
      
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
      
    });
  }), 1000);
};
*/

Template.viewGig.destroyed = function() {
  //Meteor.clearInterval(this.handle);
  clearInterval(handle);
  handle = 0;
  Session.set('time', null);
//delete Session.keys.time;
console.log("Template destroyed!")
};

Template.viewUser.helpers({
  
  gigsActive: function () {
        
    var gigs = Meteor.subscribe('allGigs');    
        
    return Gigs.find({user: this.username});
    
  },
  
  
  
});

Template.viewUser.events({
    'click .gig': function(template, event){
        console.log(this);
        console.log(template);
        console.log(template.this);
        console.log(event);  
        console.log(event.this);
        $(template.currentTarget).toggleClass("auto-height").toggleClass("cut-off");
        
        $('html, body').animate({
            scrollTop: $(template.currentTarget).offset().top
        }, 500);
        
        
        $('.gig').not(template.currentTarget).each(function(){ // To close any other gig div other than the clicked one.
         $( this ).removeClass( "auto-height" ).addClass( "cut-off" );
     });

    }


    });
  
  
  
    Template.viewGig.helpers({
      
      
      getFEContext: function () {
    var self = this;
    return {
      // Set html content
      _value: self.title,
      // Preserving cursor markers
      _keepMarkers: true,
      // Override wrapper class 
      _className: "froala-reactive-meteorized-override",

      // Set some FE options
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      "_onblur": function (e, editor) {
        // Get edited HTML from Froala-Editor
        var newHTML = $(".gig_title .froala-view").text();
        var id= self._id
        // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
        if (!_.isEqual(newHTML, self.title)) {
          console.log("onSave HTML is :"+newHTML);
          Meteor.call('updateGigTitle', id, newHTML, function(error, result) {
              if (error) {
                
                console.log("ERROR updating the title!" + error);
                
              } else {
                
                console.log("Description Title!");
                
              }
              
              
      });
        }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
  
  
  
  getFEContext2: function () {
    var self = this;
    return {
      // Set html content
      _value: self.description,
      // Preserving cursor markers
      _keepMarkers: true,
      // Override wrapper class 
      _className: "froala-reactive-meteorized-override",

      // Set some FE options
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      "_onblur": function (e, editor) {
        // Get edited HTML from Froala-Editor
        var newHTML = $(".gig_description .froala-view").html();
        var id= self._id
        // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
        if (!_.isEqual(newHTML, self.title)) {
          console.log("onSave HTML is :"+newHTML);
          Meteor.call('updateGigDescription', id, newHTML, function(error, result) {
              if (error) {
                
                console.log("ERROR updating the description!" + error);
                
              } else {
                
                console.log("Description Updated!");
                
              }
              
              
      });
        }
        return false; // Stop Froala Editor from POSTing to the Save URL
      },
    }
  },
      
      
      
      date: function () {
        
        return moment(this.createdAt).format('MM/DD/YYYY');
        
      },
      
      time: function () {
        
        return moment(this.createdAt).format('hh:mm:ss A');
        
      }, 
      
                timeFrom: function () {

                  
                return Session.get("time");
                                  
                                  
                                 // return moment().from(this.createdAt);
                      
                  },
                  
  
                  gigSubmission: function () {

                  
                  return Session.get("gigSubmission");
                                    
                                    
                                   // return moment().from(this.createdAt);
                        
                    },
  
                    gigSubmissionIndex: function () {

                  
                    return Session.get("gigSubmissionIndex");
                                      
                                      
                                     // return moment().from(this.createdAt);
                          
                      },
  
  
                      gigSubmissionLength: function () {
                      
                                        
                      return this.submits.length;
                                        
                                        
                                       // return moment().from(this.createdAt);
                            
                        },
  
  
                  timeFromProbation: function () {
                  
                  
                  return moment().from(this.probation_time, true);
      
  },
  
  
            expireAt: function () {
                  
                  
                  return moment(this.expireAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
      
  },
  
  
  alreadySubmitted: function () {
        
        return this.submitters.indexOf(Meteor.user().username);
        
      },
      
      countSubmissions: function () {

                  
                return this.submitters.length;
                      
                  },
      
      
  });
    
    
    Template.postGig.onRendered(function() {
        //$('#summernote').summernote();
        $("#price").inputmask('currency', { rightAlign: false });
        $("#validation-example").validate();
         $('#edit').editable({
          heightMin: 300,
          inlineMode: false
        });
        $( ".froala-box" ).children().last().remove();
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //var tags = new ReactiveVar([]);
        $("#tag_box").keypress(function(e){
          
    if(e.which == 13) {
      var tag = $('#tag_box').val();
      $('#tag_box').val("");
        $( ".tags" ).append( "<div class='tag'>"+tag+"</div>" );
    }
});


    });
    
    
    Template.home.onRendered(function() {
      
      $(document).ready(function() {
      $('.slider1').owlCarousel({
    responsiveClass:true,
    center: true,
    animateIn: true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        800:{ // up from this number
            items:3,
            nav:false
        },
        1000:{
            items:6,
            nav:true,
            loop:false
        }
    }
});
      
      
      
  var owl = $('.slider1');    
Gigs.find().observeChanges({
  added: function() {
    
    //owl.trigger('refresh.owl.carousel');
var $owl = $('.slider1');
$owl.trigger('destroy.owl.carousel');
    $owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');
    $owl.owlCarousel({
    responsiveClass:true,
    center: true,
    animateIn: true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        800:{ // up from this number
            items:3,
            nav:false
        },
        1000:{
            items:6,
            nav:true,
            loop:false
        }
    }
});
  
// After destory, the markup is still not the same with the initial.
// The differences are:
//   1. The initial content was wrapped by a 'div.owl-stage-outer';
//   2. The '.owl-carousel' itself has an '.owl-loaded' class attached;
//   We have to remove that before the new initialization.


//$owl.html($owl.find('.owl-stage-outer').html()).removeClass('owl-loaded');

  
    
    
    
    
    
    
    
    
    
    
    console.log("Gig added");
  },
  changed: function() {
    console.log("Gig changed");
  },
  removed: function() {
    console.log("Gig removed");
  }
});
      





    });
});
}

if (Meteor.isServer) {
 
 Gigs._ensureIndex({
  'title': 'text',
  'description': 'text'
});
 
 
 
 
 /* 
  SearchSource.defineSource('packages', function(searchText, options) {
  var options = {sort: {title: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {packageName: regExp, description: regExp};
    return Packages.find(selector, options).fetch();
  } else {
    return Packages.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  var words = searchText.trim().split(/[ \-\:]+/);
  var exps = _.map(words, function(word) {
    return "(?=.*" + word + ")";
  });
  var fullExp = exps.join('') + ".+";
  return new RegExp(fullExp, "i");
}
  
  
  */
  
  
  
  
  
  
  
  
  
  
  
  
  Meteor.startup(function () {
    

    
        Meteor.publish('homeGigs', function() {
        //this.unblock();
  return Gigs.find({}, {fields: {title: 1, description: 1}, limit: 5}); 
});

Meteor.publish('allGigs', function() {
        //this.unblock();
  return Gigs.find({}); 
});

Meteor.publish('allGig', function(id) {
        //this.unblock();
  return Gigs.find({_id: id}); 
});


Meteor.publish('allUsers', function() {
        //this.unblock();
  return Meteor.users.find({}); 
});


Meteor.publish('allCats', function() {
        //this.unblock();
  return GigCats.find({}); 
});

    
    
    
  });
  
  
  
  
  
  
  
  
  Meteor.methods({
            addGig: function(title, description, category, price, tags, currentUser) {
                
                
                Gigs.insert({
                  title: title,
                  description: description,
                  category: category,
                  price: price,
                  tags: tags,
                  user:  currentUser,
                  probation: false,
                  submitters: [], // push the user whenever someone sumbits
                  submits: [], // push all of the info in the submission.
                  files: [], // push to this when users need to submit files with their work
                  createdAt: new Date() // current time
                });
                
                Meteor.users.update({username:currentUser},
                {$inc: {
                  "profile.gigsPosted": 1
                }
                  
                }
                );
                
            },
            
            
            removeGig: function(id) {
                
                Gigs.remove({_id: id});
                
            },
            
            
            removeGigs: function() {
                
                Gigs.remove({});
                
            },
            
            
            removeUsers: function() {
                
                Meteor.users.remove({});
                
            },
            
            
            
            probationOn: function(id, title, description, currentUser, title_gig, description_gig, whole_gig) {
                var date = new Date();
                var ahead = moment(date).add(2, 'day');
                Gigs.update({_id: id},{
                  $push: {
                        submitters: currentUser,
                        submits: {
                          title: title,
                          description: description,
                          user: currentUser,
                        }
                      },
                    $set: {
                    probation: true,
                    probation_time: date,
                    expireAt: ahead._d
                      
                    }
                    
                });
                
                Meteor.users.update({username:currentUser},
                {$inc: {
                  "profile.submissions.all": 1,
                  "profile.submissions.first": 1,
                },
                $push: {
                  "profile.work": whole_gig
                }
                  
                }
                
                );
                
                
                /*
                
                email: email,
        username: username,
        password:password,
        submissions: {first: 0, first_accepted: 0, all: 0, all_accepted: 0},
        profile:{
          name:{first: firstname, last: lastname},
          dateCreated: new Date(),
          gigsPosted: 0
        }
                
                
                */
                
            },
            
            
            probationUpdate: function(id, title, description, currentUser, title_gig, description_gig, whole_gig) {
                
                var date = new Date();
                Gigs.update({_id: id},{
                  $push: {
                        submitters: currentUser,
                        submits: {
                          title: title,
                          description: description,
                          user: currentUser,
                        }
                      },
                    
                });
                
                Meteor.users.update({username:currentUser},
                {$inc: {
                  "profile.submissions.all": 1,
                },
                $push: {
                  "profile.work": whole_gig
                }
                  
                }
                
                );
                
                
                
            },
            
            
            updateGigTitle: function(id, title) {
                
                Gigs.update({_id: id},{
                  $set: {
                        title: title
                      },
                    
                });
                
                
                
            },
            
            
            
            updateGigDescription: function(id, description) {
                
                Gigs.update({_id: id},{
                  $set: {
                        description: description
                      },
                    
                });
                
                
                
            },
            
            
            
            
            
            
            
            
            
            
            
            
            
            addCategory: function(catgeory) {
                
                
                GigCats.insert({
                  catgeory: catgeory,
                });
                
            },
            
            
            submissionPicked: function(id, title, description, submitter, index) {
                
                
                if (index === 1) { // If the submission accepted was the first one submitted
                  
                  Meteor.users.update({username:submitter},
                  {$inc: {
                    "profile.submissions.first_accepted": 1,
                    "profile.submissions.all_accepted": 1,
                  }
                    
                  }
                  
                  );
                  
                } else {
                  
                  Meteor.users.update({username:submitter},
                  {$inc: {
                    "profile.submissions.all_accepted": 1,
                  }
                    
                  }
                  
                  );
                  
                }
                
                
                Gigs.remove({_id: id});
                
                
                
            
                
                
                /*
                
                email: email,
        username: username,
        password:password,
        submissions: {first: 0, first_accepted: 0, all: 0, all_accepted: 0},
        profile:{
          name:{first: firstname, last: lastname},
          dateCreated: new Date(),
          gigsPosted: 0
        }
                
                
                */
                
            },
  
  
  
  });

  
  
  
  
  
  
  
  
  
  
  
  
  
  
}
