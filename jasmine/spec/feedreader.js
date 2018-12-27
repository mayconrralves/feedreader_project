/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it("url well defined", function() {
            allFeeds.forEach(function(value){
                //https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
                var expReg =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
                expect(expReg.test(value.url)).toBe(true);
            });
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it("name defined", function(){
            allFeeds.forEach( function(element) {
                expect(element.name.length).not.toBe(0);
            });
         });
    });




    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         var menu = $("body");
         it("initial visibility", function(){
            
            expect(menu.hasClass("menu-hidden")).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it("Change visibility", function(){
           $(".menu-icon-link").trigger("click");
           expect(menu.hasClass("menu-hidden")).toBe(false);
           $(".menu-icon-link").trigger("click");
           expect(menu.hasClass("menu-hidden")).toBe(true);
          });

    });

  /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0,done);
         });
         it("async complete work", function(){
            expect($(".feed").length).not.toBe(0);
            expect($(".entry").length).not.toBe(0);
         });
    });   

    

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe("New Feed Selection", function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var oldFeed;
          beforeEach(function(done){
            loadFeed(0,function(){
                oldFeed = $(".feed").html();
                loadFeed(1, done);
            });
           
         });
         it("Test Change Feeds", function(){
            expect(oldFeed).not.toBe($(".feed").html());
         });

    });
        
}());
