$("#getArticles").on("click", function(e) {
        e.preventDefault();
        var time = new Date();
        var reqNum = $("#numRecords").val().trim();
        var startYear = $("#startRecords").val().trim();
        var thisYear = time.getFullYear();
        var thisMonth = ("0" + (time.getMonth() + 1)).slice(-2)
        var thisDay = ("0" + time.getDate()).slice(-2);
        var thisDate = thisYear + "" + thisMonth + "" + thisDay
        var customEnd = $("#endRecords").val().trim();
        var searchTerm = $("#searchTerm").val().trim();
        var params = {
            "api-key": "AfXBjmeuaoFEKzmLu0qavUZsSPCrevYH",
            "q":    searchTerm,
        }
        if($("#endRecords").val() != "" && $("#startRecords").val() != "") {
            params["end_date"] = customEnd + "1231";
            params["start_date"] = startYear + "0101";
        } else 
        if($("#startRecords").val() != "" && $("#endRecords").val() == ""){
            params["start_date"] = startYear + "0101";
            params["end_date"] = thisDate;
        }

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
        
        $.ajax({
            url: queryURL,
            method: "GET",
            data: params
        }).then(function(res) {
            console.log(params)
            var results = res.response.docs
            

            for(var i = 0; i < reqNum; i++){
                var counter = i + 1
                $("#articles").append(
                    $("<div class='row'>").append(
                        $("<div class='col-md-12'>").append(
                            $("<div>").append(
                                $("<span class='artNum'>" + counter + " </span>"),
                                $("<a/>", {
                                    text: results[i].headline.main,
                                    "title": results[i].headline.main,
                                    "href": results[i].web_url
                                }).css({"font-size": "1.5rem"})
                            ),
                            $("<div>" + results[i].byline.original + "</div>").css("margin-left", "1%")
                        )
                    )
                )    
            }
        });
    });
 