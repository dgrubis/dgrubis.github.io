(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "PLAYER_NAME",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "nbastatsdefense",
        alias: "Defensive Data",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
$.getJSON("https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Defense&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2019-20&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=", function(resp) {
    var feat = resp.resultSets[0].rowSet,
        tableData = [];

    // Iterate over the JSON object
    for (var i = 0, len = feat.length; i < len; i++) {
        tableData.push({
            "PLAYER_NAME": feat[i][1]
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
