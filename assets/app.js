   
    var animal = ["Whale", "Zebra", "Giraffes", "Snake"];

    function renderButtons(){
        $('#button-view').empty();
        for (var i=0; i<animal.length;i++){
            createButton(animal[i]);
        }
    }
    function createButton(aName){
        var b =$('<button>');
        b.text(aName);
        b.attr('class','bAnimal')
        $('#button-view').append(b);
    }

    $("#addAnimal").on("click", function() {
        var v = $("#animal-input").val();

        animal.push(v);
        createButton(v);
        event.preventDefault();
        $("#animal-input").val("");
     });

     $(document).on('click','.bAnimal',function(){
         var animalName = $(this).text();
         var queryURL="https://api.giphy.com/v1/gifs/search?api_key=ZiFFnncAkeptJo40VQRABsE0pqzBcWbV&q="+ animalName +"&limit=10&offset=0&rating=G&lang=en"
        $('#gifs').empty();
         $.ajax({
             url:queryURL,
             method:'GET'
         }).then(function(response){
             console.log(response);
             for (var i=0; i<response.data.length;i++){
                 var img=$('<img>');
                 var p = $("<p>").text("Rating: " + response.data[i].rating);
                 img.attr('src',response.data[i].images.original_still.url);
                 img.attr('data-still', response.data[i].images.original_still.url);
                 img.attr('data-animate', response.data[i].images.original.url);
                 img.attr('class','gif');
                 img.attr('data-state', 'still');
                 $('#gifs').append(img);
                 $('#gifs').append(p);
             }
         })
         function changeState(){
             var state = $(this).attr('data-state');
             var animateGif=$(this).attr('data-animate');
             var stillGif = $(this).attr('data-still');
             if (state=='still'){
                 $(this).attr('src',animateGif);
                 $(this).attr('data-state','animate')
             }else if (state=='animate'){
                $(this).attr('src', stillGif);
                $(this).attr('data-state','still')
             }
         }
       $(document).on('click','.gif',changeState);
     })

        renderButtons();