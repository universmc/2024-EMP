var Fred = require('fred-api');

apiKey = process.env.FRED_KEY;
fred   = new Fred(apiKey);

fred.getSeries({series_id: 'GNPCA'}, function(error, result) {
    console.log(result)
});
