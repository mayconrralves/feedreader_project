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


        /* Verificar se as urls dadas estejam bem formatadas
         */
         it("url well defined", function() {
            allFeeds.forEach(function(value){
                //https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
                var expReg =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;
               //para fazer o teste é usado o objeto javascript para expressões regulares: expReg
                expect(expReg.test(value.url)).toBe(true);
            });
         });

        /* Verificar se o nome de cada feed é definido e não esteje vazio;
         */

         it("name defined", function(){
            allFeeds.forEach( function(element) {
                expect(element.name.length).not.toBe(0);
            });
         });
    });




    /* Teste para as funcionalidades do menu*/
    describe("The menu", function(){
        /* Verificar  se o menu mantém se escondido ao carregar a página
         */
         var menu = $("body");
         it("initial visibility", function(){
            
            expect(menu.hasClass("menu-hidden")).toBe(true);
         });

         /* Veerificar se o menu troca sua exibição ao clicar no icone do mesmo.
          */
          it("Change visibility", function(){
           $(".menu-icon-link").trigger("click");
           expect(menu.hasClass("menu-hidden")).toBe(false);
           $(".menu-icon-link").trigger("click");
           expect(menu.hasClass("menu-hidden")).toBe(true);
          });

    });

  /*Teste para verificar o correto carregamento de novos feeds*/
    describe("Initial Entries", function(){
        /* Uso do beforeEach para executar a função assincrona loadFeed
         */
         beforeEach(function(done){
            loadFeed(0,done);
         });
         /*Verificar se foi adicionado o feed rss, depois de executada loadFeed() */
         it("async complete work", function(){
            expect($(".feed .entry").length).not.toBe(0);
         });
    });   

    
    /* Teste para verificar o carregamento de novas Feeds*/

    describe("New Feed Selection", function(){
        /* Verificar se depois de carregada a nova feed, o conteúdo realmente tenha mudado.
         */
         //guarda a feed anterior
         var oldFeed;
         /*executa a função loadFeed, passando a ela uma nova função anônima
           para executar novamente loadFeed, esta para carregar uma feed diferente
           da primeira 
         */
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
