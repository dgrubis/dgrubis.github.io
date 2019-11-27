(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "DEF_RATING",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
    }];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
$.getJSON("https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Defense&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2019-20&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=", function(resp) {
    var feat = resp.features,
        tableData = [];

    // Iterate over the JSON object
    for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
            "id": feat[i].id,
            "mag": feat[i].properties.mag,
            "title": feat[i].properties.title,
            "location": feat[i].geometry
        });
    }

    table.appendRows(tableData);
    doneCallback();
});
};

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "NBA Stats Feed";
            tableau.submit();
        });
    });
    //event listener
})();
